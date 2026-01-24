"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { clearAuth } from "../../store/slices/authSlice";
import { clientAuthUtils } from "../../lib/clientAuth";

const DashboardPage = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const handleLogout = () => {
    dispatch(clearAuth());
    router.push('/login');
  };

  useEffect(() => {
    const checkAuthAndKyc = async () => {
      // Check authentication on mount
      if (!clientAuthUtils.isAuthenticated()) {
        router.push('/login');
        return;
      }

      try {
        // Fetch user profile to check kyc_status
        const response = await fetch('/api/user/profile');
        const data = await response.json();

        if (data.success && data.data?.user) {
          const kycStatus = data.data.user.kyc_status;

          if (kycStatus === 0 || kycStatus === 3) {
            // KYC not done or rejected, go to KYC page
            router.push('/kyc');
            return;
          } else if (kycStatus === 1) {
            // KYC submitted, waiting for approval
            router.push('/welcome');
            return;
          }
          // kycStatus 2: allow access to dashboard
        }
      } catch (error) {
        console.error('Failed to check KYC status:', error);
      }

      setIsCheckingAuth(false);
    };

    checkAuthAndKyc();
  }, [router]);

  // Show loading while checking authentication
  if (isCheckingAuth || !isAuthenticated || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-theme-purple-00 mx-auto"></div>
          <p className="mt-4 text-theme-black-50">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-theme-purple-00 mx-auto"></div>
          <p className="mt-4 text-theme-black-50">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user.email}</span>
              <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                {user.role_type}
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* User Info Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-theme-purple-00 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {user.email.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Email</dt>
                      <dd className="text-lg font-medium text-gray-900">{user.email}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* KYC Status Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      user.kyc_status === 1 ? 'bg-green-100' :
                      user.kyc_status === 2 ? 'bg-red-100' : 'bg-yellow-100'
                    }`}>
                      <span className={`font-semibold text-sm ${
                        user.kyc_status === 1 ? 'text-green-800' :
                        user.kyc_status === 2 ? 'text-red-800' : 'text-yellow-800'
                      }`}>
                        {user.kyc_status === 1 ? '✓' :
                         user.kyc_status === 2 ? '✗' : '?'}
                      </span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">KYC Status</dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {user.kyc_status === 0 && 'Pending'}
                        {user.kyc_status === 1 && 'Approved'}
                        {user.kyc_status === 2 && 'Rejected'}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Status Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      user.is_active ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      <span className={`font-semibold text-sm ${
                        user.is_active ? 'text-green-800' : 'text-red-800'
                      }`}>
                        {user.is_active ? '✓' : '✗'}
                      </span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Account Status</dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {user.is_active ? 'Active' : 'Inactive'}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Profile Section */}
          {user.customerProfile && (
            <div className="mt-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Customer Profile</h2>
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 sm:p-6">
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Company Name</dt>
                      <dd className="mt-1 text-sm text-gray-900">{user.customerProfile.company_name || 'N/A'}</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">GST Number</dt>
                      <dd className="mt-1 text-sm text-gray-900">{user.customerProfile.gst_no || 'N/A'}</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Address</dt>
                      <dd className="mt-1 text-sm text-gray-900">{user.customerProfile.address || 'N/A'}</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Credit Limit</dt>
                      <dd className="mt-1 text-sm text-gray-900">₹{user.customerProfile.credit_limit.toLocaleString()}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
