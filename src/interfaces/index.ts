export interface UserType {
  _id: string;
  name: string;
  email: string;
  isStaff: boolean;
  createdAt: string;
}
export interface EventType {
  _id: string;
  name: string;
  description: string;
  organizer: string;
  guests: string[];
  address: string;
  city: string;
  postcode: string;
  date: string;
  time: string;
  media: (string | UploadFileResponse)[];
  ticketTypes: [
    {
      name: string;
      price: number;
      limit: number;
      available?: number;
    }
  ];
}

export interface BookingType {
  _id?: string;
  user?: UserType;
  event: EventType;
  ticketType: string;
  ticketsCount: number;
  quantity?: number;
  totalAmount: number;
  paymentId?: string;
  status: string;
  createdAt?: string;
}

export interface UploadFileResponse {
  url: string;
}

export interface AuthData {
  email: string;
  password: string;
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  password?: string;
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface PaymentModalProps {
  showPaymentModal: boolean;
  setShowPaymentModal: (value: boolean) => void;
  selectedTicketType: string;
  selectedTicketCount: number;
  totalAmount: number;
  event: EventType;
}

export interface ApiResponse<T> {
  data: T;
}

export interface UploadFileResponse {
  url: string;
  // Other fields you may have in the UploadFileResponse
}
