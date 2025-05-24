// hooks/useBilling.ts
import api from '@/lib/api';
import { useState, useEffect } from 'react';

export const useBilling = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<any[]>([]);

  const fetchTransactions = async (page: number = 1, limit: number = 10) => {
    try {
      setLoading(true);
      const response = await api.billing.getTransactions(page, limit);
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

  const fetchInvoices = async (limit: number = 10) => {
    try {
      setLoading(true);
      const response = await api.billing.getInvoices(limit);
      if (response.success) {
        setInvoices(response.invoices);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchPaymentMethods = async () => {
    try {
      setLoading(true);
      const response = await api.billing.getPaymentMethods();
      if (response.success) {
        setPaymentMethods(response.paymentMethods);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addPaymentMethod = async (paymentMethodId: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.billing.addPaymentMethod(paymentMethodId);
      if (response.success) {
        await fetchPaymentMethods();
      }
      return response;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const setDefaultPaymentMethod = async (paymentMethodId: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.billing.setDefaultPaymentMethod(paymentMethodId);
      if (response.success) {
        await fetchPaymentMethods();
      }
      return response;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removePaymentMethod = async (paymentMethodId: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.billing.removePaymentMethod(paymentMethodId);
      if (response.success) {
        await fetchPaymentMethods();
      }
      return response;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const downloadInvoice = async (transactionId: string) => {
    try {
      const blob = await api.billing.downloadInvoice(transactionId);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `invoice-${transactionId}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchTransactions();
    fetchPaymentMethods();
  }, []);

  return {
    loading,
    error,
    transactions,
    invoices,
    paymentMethods,
    fetchTransactions,
    fetchInvoices,
    fetchPaymentMethods,
    addPaymentMethod,
    setDefaultPaymentMethod,
    removePaymentMethod,
    downloadInvoice,
  };
};