interface PayhereParams {
  merchant_id: string;
  return_url: string;
  cancel_url: string;
  notify_url: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  order_id: string;
  items: string;
  currency: string;
  amount: number;
  hash: string;
}

export const initializePayment = (params: Partial<PayhereParams>) => {
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = 'https://sandbox.payhere.lk/pay/checkout'; // Use https://www.payhere.lk/pay/checkout for production

  Object.entries(params).forEach(([key, value]) => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = key;
    input.value = value?.toString() || '';
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
};

export const generateHash = (params: Partial<PayhereParams>, merchantSecret: string) => {
  const orderedParams = [
    params.merchant_id,
    params.order_id,
    params.amount?.toFixed(2),
    params.currency,
    merchantSecret
  ].join('');

  // In a real implementation, you would use a proper hashing function
  // This is just a placeholder
  return btoa(orderedParams);
}; 