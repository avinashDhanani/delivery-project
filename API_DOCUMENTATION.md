# Delivery System API Documentation

## Overview

This document provides comprehensive API documentation for the Delivery System user authentication and KYC management endpoints.

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Base URL

```
http://localhost:3000/api
```

---

## 🔐 Authentication APIs

### 1. User Registration

**Endpoint:** `POST /api/auth/register`

**Description:** Register a new user account. Requires OTP verification to activate.

**Request Body:**
```json
{
  "first_name": "string (required)",
  "last_name": "string (required)",
  "email": "string (required)",
  "phone": "string (required)",
  "password": "string (required, min 6 characters)"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Registration initiated. Please verify OTP sent to your email/phone.",
  "data": {
    "user_id": 1,
    "email": "user@example.com",
    "requires_otp": true
  }
}
```

**Error Responses:**
- `400`: Validation error
- `409`: User already exists
- `500`: Server error

---

### 2. User Login

**Endpoint:** `POST /api/auth/login`

**Description:** Authenticate user credentials. Customers require OTP verification, admins get direct access.

**Request Body:**
```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

**Success Response for Customers (200):**
```json
{
  "success": true,
  "message": "Login initiated. Please verify OTP.",
  "data": {
    "requires_otp": true,
    "user_id": 1
  }
}
```

**Success Response for Admins (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "email": "admin@example.com",
      "mobile": "+1234567890",
      "role_type": "admin",
      "is_active": true,
      "kyc_status": 1
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Responses:**
- `400`: Invalid credentials
- `401`: Authentication failed
- `403`: Account not activated
- `500`: Server error

---

### 3. Forgot Password

**Endpoint:** `POST /api/auth/forgot-password`

**Description:** Initiate password reset process. Sends OTP to user's email.

**Request Body:**
```json
{
  "email": "string (required)"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "If the email exists, a password reset OTP has been sent."
}
```

**Error Responses:**
- `400`: Invalid email
- `500`: Server error

---

### 4. OTP Verification

**Endpoint:** `POST /api/auth/verify-otp`

**Description:** Verify OTP for registration, login, or password reset.

**Request Body:**
```json
{
  "email": "string (required)",
  "otp": "string (required)",
  "type": "registration | login | forgot_password (required)",
  "new_password": "string (optional, required for forgot_password)"
}
```

**Success Response for Registration (200):**
```json
{
  "success": true,
  "message": "Account activated successfully. Please login.",
  "data": {
    "user_id": 1,
    "email": "user@example.com",
    "activated": true
  }
}
```

**Success Response for Login (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "mobile": "+1234567890",
      "role_type": "customer",
      "is_active": true,
      "kyc_status": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "kyc_required": true
  }
}
```

**Success Response for Password Reset (200):**
```json
{
  "success": true,
  "message": "Password reset successfully",
  "data": {
    "password_reset": true
  }
}
```

**Error Responses:**
- `400`: Invalid or expired OTP
- `404`: User not found
- `500`: Server error

---

## 📋 KYC Management APIs

### 5. Upload KYC Document

**Endpoint:** `POST /api/kyc/upload`

**Authentication:** Required (Bearer token)

**Content-Type:** `multipart/form-data`

**Description:** Upload KYC documents. Supports image and PDF files.

**Form Data:**
```
doc_type: Aadhaar_Front | Aadhaar_Back | PAN | GST | Bank_Statement | Other
file: (file, max 5MB, JPEG/PNG/PDF only)
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Document uploaded successfully",
  "data": {
    "document_id": 1,
    "doc_type": "Aadhaar_Front",
    "file_path": "/api/uploads/kyc/abc123.jpg",
    "uploaded_at": "2024-01-01T10:00:00.000Z"
  }
}
```

**Error Responses:**
- `400`: Invalid file type or missing fields
- `401`: Authentication required
- `413`: File too large
- `500`: Server error

---

### 6. Get KYC Status

**Endpoint:** `GET /api/kyc/status`

**Authentication:** Required (Bearer token)

**Description:** Get user's KYC status and document information.

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "kyc_status": "pending | approved | rejected",
    "mandatory_documents": {
      "required": ["Aadhaar_Front", "Aadhaar_Back", "PAN"],
      "uploaded": ["Aadhaar_Front"],
      "missing": ["Aadhaar_Back", "PAN"]
    },
    "documents": [
      {
        "id": 1,
        "doc_type": "Aadhaar_Front",
        "uploaded_at": "2024-01-01T10:00:00.000Z"
      }
    ],
    "customer_profile": {
      "id": 1,
      "company_name": "ABC Corp",
      "gst_no": "GST123456",
      "address": "123 Main St",
      "city": "Mumbai",
      "zip_code": "400001",
      "kyc_status": "Pending"
    }
  }
}
```

**Error Responses:**
- `401`: Authentication required
- `404`: User not found
- `500`: Server error

---

### 7. Get User Profile

**Endpoint:** `GET /api/user/profile`

**Authentication:** Required (Bearer token)

**Description:** Get user's profile information.

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "mobile": "+1234567890",
      "role_type": "customer",
      "is_active": true,
      "kyc_status": 0
    },
    "customer_profile": {
      "id": 1,
      "company_name": "ABC Corp",
      "gst_no": "GST123456",
      "address": "123 Main St",
      "city": "Mumbai",
      "zip_code": "400001",
      "ref_name": "John Doe",
      "ref_mobile": "+0987654321"
    }
  }
}
```

---

### 8. Update User Profile

**Endpoint:** `PUT /api/user/profile`

**Authentication:** Required (Bearer token)

**Description:** Update user's profile information.

**Request Body:**
```json
{
  "company_name": "string (optional)",
  "gst_no": "string (optional)",
  "address": "string (optional)",
  "city": "string (optional)",
  "zip_code": "string (optional)",
  "ref_name": "string (optional)",
  "ref_mobile": "string (optional)"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "customer_profile": {
      "id": 1,
      "user_id": 1,
      "company_name": "ABC Corp",
      "gst_no": "GST123456",
      "address": "123 Main St",
      "city": "Mumbai",
      "zip_code": "400001"
    }
  }
}
```

---

### 9. Download KYC Document

**Endpoint:** `GET /api/uploads/kyc/{filename}`

**Authentication:** Required (Bearer token)

**Description:** Download uploaded KYC document.

**Parameters:**
- `filename`: The filename of the uploaded document

**Success Response (200):** Binary file data

**Error Responses:**
- `401`: Authentication required
- `404`: File not found

---

## 📊 Response Format

All API responses follow this standard format:

**Success Response:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

---

## 🔒 Security Features

- **JWT Authentication:** Bearer token required for protected endpoints
- **Password Hashing:** Bcrypt with 12 salt rounds
- **OTP Verification:** 6-digit OTP with 10-minute expiration
- **File Validation:** Type checking, size limits (5MB max)
- **Rate Limiting:** Recommended for production deployment
- **HTTPS:** Required for production use

---

## 🚀 API Flow Examples

### Customer Registration & Login Flow

1. **Register:** `POST /api/auth/register`
2. **Verify Registration:** `POST /api/auth/verify-otp` (type: "registration")
3. **Login:** `POST /api/auth/login`
4. **Verify Login:** `POST /api/auth/verify-otp` (type: "login")
5. **Check KYC Status:** `GET /api/kyc/status`
6. **Upload Documents:** `POST /api/kyc/upload` (multiple times)
7. **Update Profile:** `PUT /api/user/profile`

### Password Reset Flow

1. **Request Reset:** `POST /api/auth/forgot-password`
2. **Verify OTP:** `POST /api/auth/verify-otp` (type: "forgot_password", include new_password)

### Admin Login Flow

1. **Login:** `POST /api/auth/login` (direct token, no OTP required)

---

## 📋 KYC Document Types

**Mandatory Documents:**
- `Aadhaar_Front`: Front side of Aadhaar card
- `Aadhaar_Back`: Back side of Aadhaar card
- `PAN`: PAN card front side

**Optional Documents:**
- `GST`: GST certificate
- `Bank_Statement`: Recent bank statement
- `Other`: Any other supporting document

---

## ⚠️ Important Notes

- All timestamps are in ISO 8601 format (UTC)
- File uploads are limited to 5MB
- OTP expires in 10 minutes
- JWT tokens expire in 7 days (configurable)
- Admin users bypass OTP verification for login
- Customer accounts require OTP verification after registration and login
- OTP codes are stored directly in the users table (otp_code, otp_expires_at, otp_type fields)
- KYC status automatically updates based on uploaded documents

---

## 🔧 Environment Variables

```env
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
DB_NAME=delivery_local
DB_USER=app_user
DB_PASSWORD=strong_password
DB_HOST=localhost
DB_PORT=5432
```

---

## 🧪 Testing

Use tools like Postman or curl to test the APIs. Example curl commands:

```bash
# Register user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "password": "password123"
  }'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'

# Verify OTP
curl -X POST http://localhost:3000/api/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "otp": "123456",
    "type": "login"
  }'
```

---

## 👨‍💼 Admin APIs

### 1. Admin Login

**Endpoint:** `POST /api/admin/login`

**Description:** Authenticate admin user and receive JWT token. Admin login bypasses OTP verification.

**Request Body:**
```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Admin login successful",
  "data": {
    "user": {
      "id": 1,
      "email": "admin@delivery.com",
      "role_type": "admin",
      "is_active": true
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Responses:**
- `400`: Email and password are required
- `401`: Invalid email or password
- `403`: Account is deactivated
- `500`: Internal server error

---

### 2. Get All Users (Admin Only)

**Endpoint:** `GET /api/admin/users`

**Description:** Retrieve paginated list of all users (excluding admin users) with optional filters and sorting. Requires admin authentication.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10, max: 100)
- `search` (optional): Search by email or mobile number
- `role_type` (optional): Filter by role ('customer', 'admin', 'public')
- `kyc_status` (optional): Filter by KYC status (0=Pending, 1=Approved, 2=Rejected)
- `is_active` (optional): Filter by active status ('true' or 'false')
- `sort_by` (optional): Sort field ('created_at', 'email', 'role_type', 'kyc_status') - default: 'created_at'
- `sort_order` (optional): Sort order ('ASC', 'DESC') - default: 'DESC'

**Headers:**
```
Authorization: Bearer <admin_jwt_token>
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Users retrieved successfully",
  "data": {
    "users": [
      {
        "id": 2,
        "role_group_id": 2,
        "email": "customer@example.com",
        "mobile": "+1234567890",
        "role_type": "customer",
        "is_active": true,
        "kyc_status": 0,
        "kyc_reject_message": null,
        "kyc_reject_at": null,
        "last_login_at": "2024-01-15T10:30:00Z",
        "created_at": "2024-01-10T08:00:00Z",
        "updated_at": "2024-01-15T10:30:00Z",
        "customerProfile": {
          "id": 1,
          "user_id": 2,
          "company_name": "ABC Corp",
          "gst_no": "GST123456",
          "address": "123 Main St",
          "city": "New York",
          "zip_code": "10001",
          "kyc_status": "Pending",
          "credit_limit": 10000,
          "wallet_balance": 0,
          "terms_agreed": true,
          "terms_agreed_at": "2024-01-10T08:00:00Z"
        }
      }
    ],
    "pagination": {
      "current_page": 1,
      "per_page": 10,
      "total_count": 25,
      "total_pages": 3,
      "has_next_page": true,
      "has_prev_page": false
    }
  }
}
```

**Error Responses:**
- `401`: Authorization token required / Invalid token
- `403`: Admin access required
- `500`: Internal server error

---

### 3. Approve User Profile (Admin Only)

**Endpoint:** `POST /api/admin/users/{id}/approve`

**Description:** Approve a user's KYC profile and activate their account. Requires admin authentication.

**URL Parameters:**
- `id`: User ID (integer)

**Headers:**
```
Authorization: Bearer <admin_jwt_token>
```

**Request Body:**
```json
{}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "User approved successfully",
  "data": {
    "user": {
      "id": 2,
      "email": "customer@example.com",
      "mobile": "+1234567890",
      "role_type": "customer",
      "is_active": true,
      "kyc_status": 1,
      "customerProfile": {
        "id": 1,
        "user_id": 2,
        "company_name": "ABC Corp",
        "kyc_status": "Approved",
        "credit_limit": 10000,
        "wallet_balance": 0
      }
    }
  }
}
```

**Error Responses:**
- `400`: Invalid user ID / Cannot approve admin users / User already approved
- `401`: Authorization token required / Invalid token
- `403`: Admin access required
- `404`: User not found
- `500`: Internal server error

---

### 4. Reject User Profile (Admin Only)

**Endpoint:** `POST /api/admin/users/{id}/reject`

**Description:** Reject a user's KYC profile, deactivate their account, and provide a rejection reason. Requires admin authentication.

**URL Parameters:**
- `id`: User ID (integer)

**Headers:**
```
Authorization: Bearer <admin_jwt_token>
```

**Request Body:**
```json
{
  "reject_message": "string (required) - Reason for rejection"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "User rejected successfully",
  "data": {
    "user": {
      "id": 2,
      "email": "customer@example.com",
      "mobile": "+1234567890",
      "role_type": "customer",
      "is_active": false,
      "kyc_status": 2,
      "kyc_reject_message": "Documents are not clear enough",
      "kyc_reject_at": "2024-01-15T12:00:00Z",
      "customerProfile": {
        "id": 1,
        "user_id": 2,
        "company_name": "ABC Corp",
        "kyc_status": "Rejected",
        "credit_limit": 10000,
        "wallet_balance": 0
      }
    }
  }
}
```

**Error Responses:**
- `400`: Invalid user ID / Rejection message required / Cannot reject admin users / User already rejected
- `401`: Authorization token required / Invalid token
- `403`: Admin access required
- `404`: User not found
- `500`: Internal server error

---

## 📋 Admin API Usage Examples

### Admin Login
```bash
curl -X POST http://localhost:3000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin_delivery@yopmail.com",
    "password": "Dev@1234"
  }'
```

### Get Users List (with filters)
```bash
curl -X GET "http://localhost:3000/api/admin/users?page=1&limit=5&role_type=customer&kyc_status=0&sort_by=created_at&sort_order=DESC" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

### Approve User
```bash
curl -X POST http://localhost:3000/api/admin/users/2/approve \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Reject User
```bash
curl -X POST http://localhost:3000/api/admin/users/2/reject \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "reject_message": "GST certificate is expired"
  }'
```

---

## 🔒 Admin Access Control

- All admin endpoints require a valid JWT token with `role_type: "admin"`
- Admin users are excluded from user management operations
- Admin login bypasses OTP verification for faster access
- Admin endpoints use the `withAdminAuth` middleware for authorization
