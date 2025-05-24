// hooks/useSubscription.ts
import api from '@/lib/api';
import { useState, useEffect } from 'react';

export const useSubscription = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentSubscription, setCurrentSubscription] = useState<any>(null);
  const [plans, setPlans] = useState<any[]>([]);

  const fetchCurrentSubscription = async () => {
    try {
      setLoading(true);
      const response = await api.subscription.getCurrentSubscription();
      if (response.success) {
        setCurrentSubscription(response);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const response = await api.subscription.getPlans();
      if (response.success) {
        setPlans(response.plans);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createSubscription = async (planId: string, paymentMethodId?: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.subscription.createSubscription(planId, paymentMethodId);
      return response;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateSubscription = async (planId: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.subscription.updateSubscription(planId);
      if (response.success) {
        await fetchCurrentSubscription();
      }
      return response;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const cancelSubscription = async (immediate: boolean = false) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.subscription.cancelSubscription(immediate);
      if (response.success) {
        await fetchCurrentSubscription();
      }
      return response;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentSubscription();
    fetchPlans();
  }, []);

  return {
    loading,
    error,
    currentSubscription,
    plans,
    createSubscription,
    updateSubscription,
    cancelSubscription,
    fetchCurrentSubscription,
    fetchPlans,
  };
};