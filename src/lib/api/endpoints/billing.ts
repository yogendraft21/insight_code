// api/billing.ts
import { apiRequest } from '../client';

/**
 * Get transaction history
 */
export const getTransactions = async (page?: number, limit?: number, type?: string, status?: string) => {
  return apiRequest({
    url: '/billing/transactions',
    method: 'GET',
    params: { page, limit, type, status },
  });
};

/**
 * Get invoices
 */
export const getInvoices = async (limit?: number) => {
  return apiRequest({
    url: '/billing/invoices',
    method: 'GET',
    params: { limit },
  });
};

/**
 * Get payment methods
 */
export const getPaymentMethods = async () => {
  return apiRequest({
    url: '/billing/payment-methods',
    method: 'GET',
  });
};

/**
 * Add a payment method
 */
export const addPaymentMethod = async (paymentMethodId: string) => {
  return apiRequest({
    url: '/billing/payment-methods',
    method: 'POST',
    data: { paymentMethodId },
  });
};

/**
 * Set default payment method
 */
export const setDefaultPaymentMethod = async (paymentMethodId: string) => {
  return apiRequest({
    url: '/billing/default-payment',
    method: 'PUT',
    data: { paymentMethodId },
  });
};

/**
 * Remove payment method
 */
export const removePaymentMethod = async (paymentMethodId: string) => {
  return apiRequest({
    url: `/billing/payment-methods/${paymentMethodId}`,
    method: 'DELETE',
  });
};

/**
 * Download invoice
 */
export const downloadInvoice = async (transactionId: string) => {
  return apiRequest({
    url: `/billing/invoice/${transactionId}`,
    method: 'GET',
    responseType: 'blob',
  });
};