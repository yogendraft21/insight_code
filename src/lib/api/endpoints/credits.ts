// api/credits.ts
import { apiRequest } from '../client';

/**
 * Get current credit balance
 */
export const getBalance = async () => {
  return apiRequest({
    url: '/credits/balance',
    method: 'GET',
  });
};

/**
 * Get available credit packages
 */
export const getPackages = async () => {
  return apiRequest({
    url: '/credits/packages',
    method: 'GET',
  });
};

/**
 * Purchase credits
 */
export const purchaseCredits = async (packageId: string, paymentMethodId?: string) => {
  return apiRequest({
    url: '/credits/purchase',
    method: 'POST',
    data: { packageId, paymentMethodId },
  });
};

/**
 * Get credit usage history
 */
export const getUsageHistory = async (page?: number, limit?: number, type?: string) => {
  return apiRequest({
    url: '/credits/usage',
    method: 'GET',
    params: { page, limit, type },
  });
};

/**
 * Check credit availability
 */
export const checkAvailability = async (required: number) => {
  return apiRequest({
    url: '/credits/check-availability',
    method: 'GET',
    params: { required },
  });
};