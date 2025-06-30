export type UserRole = 'client' | 'designer' | 'vendor' | 'contractor';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  company?: string;
  location?: string;
  phone?: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  clientId: string;
  designerId?: string;
  status: ProjectStatus;
  budget: {
    amount: number;
    currency: 'PHP' | 'USD' | 'SGD' | 'EUR';
  };
  timeline: {
    startDate: Date;
    endDate: Date;
  };
  category: ProjectCategory;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export type ProjectStatus = 'draft' | 'active' | 'in-progress' | 'review' | 'completed' | 'cancelled';
export type ProjectCategory = 'residential' | 'commercial' | 'interior' | 'landscape' | 'renovation' | 'new-construction';

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  assigneeId?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: Date;
  estimatedHours?: number;
  actualHours?: number;
  createdAt: Date;
  updatedAt: Date;
}

export type TaskStatus = 'todo' | 'in-progress' | 'review' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface InventoryItem {
  id: string;
  vendorId: string;
  name: string;
  description: string;
  category: string;
  price: {
    amount: number;
    currency: 'PHP' | 'USD' | 'SGD' | 'EUR';
  };
  stock: number;
  images: string[];
  specifications: Record<string, any>;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  projectId?: string;
  content: string;
  type: 'text' | 'file' | 'image';
  attachments?: string[];
  isRead: boolean;
  createdAt: Date;
}

export interface Payment {
  id: string;
  projectId: string;
  amount: number;
  currency: 'PHP' | 'USD' | 'SGD' | 'EUR';
  status: PaymentStatus;
  method: PaymentMethod;
  provider: PaymentProvider;
  transactionId?: string;
  paidAt?: Date;
  createdAt: Date;
}

export type PaymentStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';
export type PaymentMethod = 'card' | 'bank-transfer' | 'gcash' | 'paymaya' | 'paypal';
export type PaymentProvider = 'paymongo' | 'xendit' | 'stripe';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  company?: string;
  phone?: string;
}

export interface Country {
  code: string;
  name: string;
  currency: string;
  timezone: string;
  phoneCode: string;
}

export interface LocalizationConfig {
  locale: string;
  currency: string;
  dateFormat: string;
  timeFormat: string;
  numberFormat: string;
} 