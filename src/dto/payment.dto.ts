export type PaymentDTO = {
    id?: string;
    gateway: 'stripe' | 'paypal';
    amount: number;
    currency: string;
    status?: 'pending' | 'completed' | 'canceled' | 'refunded' | 'refund-in-progress' | 'in-progress';
    bookingId: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
  }
  