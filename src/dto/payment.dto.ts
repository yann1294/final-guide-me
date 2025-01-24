export type PaymentDTO = {
    id?: string;
    gateway: 'stripe' | 'paypal';
    resourceType: 'tours' | 'packages';
    resourceId: string;
    amount: number;
    currency: string;
    status?: 'pending' | 'completed' | 'canceled' | 'refunded' | 'refund-in-progress' | 'in-progress';
    bookingId?: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    receipt?: string;
  }
  