// User Types

export interface User {
  id: number;
  role_group_id: number;
  email: string;
  mobile?: string;
  role_type: 'customer' | 'admin' | 'public';
  is_active: boolean;
  kyc_status: number;
  kyc_reject_message?: string;
  kyc_reject_at?: Date;
  last_login_at?: Date;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
  customerProfile?: CustomerProfile;
  kycDocuments?: KycDocument[];
}

export interface CustomerProfile {
  id: number;
  user_id: number;
  company_name?: string;
  gst_no?: string;
  address?: string;
  city?: string;
  zip_code?: string;
  kyc_status: 'Pending' | 'Approved' | 'Rejected';
  credit_limit: number;
  wallet_balance: number;
  terms_agreed: boolean;
  terms_agreed_at?: Date;
  ref_name?: string;
  ref_mobile?: string;
}

export interface KycDocument {
  id: number;
  user_id: number;
  doc_type: string;
  file_path: string;
  uploaded_at: Date;
}

export interface RegisterRequest {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  email: string;
  otp: string;
  new_password: string;
}

export interface VerifyOtpRequest {
  email: string;
  otp: string;
  type: 'registration' | 'login' | 'forgot_password';
}

export interface KycDocumentUploadRequest {
  doc_type: 'Aadhaar_Front' | 'Aadhaar_Back' | 'PAN' | 'GST' | 'Bank_Statement' | 'Other';
  file: File;
}

export interface UserResponse {
  id: number;
  email: string;
  mobile?: string;
  role_type: string;
  is_active: boolean;
  kyc_status: number;
  customerProfile?: CustomerProfile;
}
