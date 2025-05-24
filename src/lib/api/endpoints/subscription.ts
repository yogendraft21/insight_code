// api/subscription.ts
import { apiRequest } from '../client';

/**
 * Get all available subscription plans
 */
export const getPlans = async () => {
  return apiRequest({
    url: '/subscription/plans',
    method: 'GET',
  });
};

/**
 * Get current user's subscription status
 */
export const getCurrentSubscription = async () => {
  return apiRequest({
    url: '/subscription/current',
    method: 'GET',
  });
};

/**
 * Create a new subscription
 */
export const createSubscription = async (planId: string, paymentMethodId?: string) => {
  return apiRequest({
    url: '/subscription/subscribe',
    method: 'POST',
    data: { planId, paymentMethodId },
  });
};

/**
 * Update subscription plan
 */
export const updateSubscription = async (planId: string) => {
  return apiRequest({
    url: '/subscription/update',
    method: 'PUT',
    data: { planId },
  });
};

/**
 * Cancel subscription
 */
export const cancelSubscription = async (immediate: boolean = false) => {
  return apiRequest({
    url: '/subscription/cancel',
    method: 'POST',
    data: { immediate },
  });
};

/**
 * Reactivate a cancelled subscription
 */
export const reactivateSubscription = async () => {
  return apiRequest({
    url: '/subscription/reactivate',
    method: 'POST',
  });
};