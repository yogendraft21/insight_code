// hooks/useCredits.ts
import api from '@/lib/api';
import { useState, useEffect } from 'react';

export const useCredits = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [balance, setBalance] = useState<any>(null);
  const [packages, setPackages] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);

  const fetchBalance = async () => {
    try {
      setLoading(true);
      const response = await api.credits.getBalance();
      if (response.success) {
        setBalance({
          total: response.total,
          used: response.used,
          available: response.available,
          monthlyAllocation: response.monthlyAllocation,
          lastReset: response.lastReset,
        });
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const response = await api.credits.getPackages();
      if (response.success) {
        setPackages(response.packages);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsageHistory = async (page: number = 1, limit: number = 10) => {
    try {
      setLoading(true);
      const response = await api.credits.getUsageHistory(page, limit);
      if (response.success) {
        setTransactions(response.transactions);
        return response.pagination;
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const purchaseCredits = async (packageId: string, paymentMethodId?: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.credits.purchaseCredits(packageId, paymentMethodId);
      return response;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const checkAvailability = async (required: number) => {
    try {
      const response = await api.credits.checkAvailability(required);
      return response;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchBalance();
    fetchPackages();
  }, []);

  return {
    loading,
    error,
    balance,
    packages,
    transactions,
    fetchBalance,
    fetchPackages,
    fetchUsageHistory,
    purchaseCredits,
    checkAvailability,
  };
};