export type PaymentDTO = {
  id?: string;
  gateway: "stripe" | "paypal";
  paymentId?: string;
  resourceType: "tours" | "packages";
  resourceId: string;
  amount: number;
  currency: string;
  status?:
    | "pending"
    | "completed"
    | "canceled"
    | "refunded"
    | "refund-in-progress"
    | "in-progress";
  bookingId?: string;
  userId: string;
  receipt?: string;
  createdAt: string;
  updatedAt: string;
  sessionId?: string; // Add this if you plan to use it (matches backend optional)
};
