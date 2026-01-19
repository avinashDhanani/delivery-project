"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const ResetPasswordPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.password || !formData.confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // TODO: Implement reset password API call
      // For now, just redirect to login
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (error) {
      setError('Failed to reset password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center max-w-[465px] mx-auto">
      <h1 className="text-center font-bold text-[28px] 1xl:text-[34px] text-white mb-1">
        RESET PASSWORD
      </h1>
      <p className="text-center font-medium text-sm 1xl:text-base text-white mb-5">
        Enter your new password below
      </p>

      <form onSubmit={handleSubmit} className="w-full rounded-[25px] 1xl:rounded-[35px] border border-solid p-5 1xl:p-[30px] bg-white border-theme-white-100 shadow-sm">
        {error && (
          <div className="w-full mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <div className="w-full mb-4">
          <label className="text-base 1xl:text-lg font-semibold text-theme-black-50 inline-flex mb-[10px]">
            New Password
          </label>
          <div className="w-full flex items-center relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter new password"
              className="pr-14 text-base 1xl:text-lg font-medium placeholder:text-theme-black-150 w-full min-h-[56px] 1xl:min-h-[66px] 1xl:px-5 px-4 py-3 1xl:py-4 rounded-xl 1xl:rounded-[15px] border border-theme-white-100 bg-theme-white-150 outline-none text-theme-darkblue-00"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="size-4 1xl:size-5 flex items-center justify-center cursor-pointer hover:opacity-75 absolute right-4 1xl:right-5"
            >
              <Image
                className="size-full"
                src={"assets/images/svg/eye-close.svg"}
                width={18}
                height={18}
                alt="icon"
              />
            </button>
          </div>
        </div>

        <div className="w-full mb-5">
          <label className="text-base 1xl:text-lg font-semibold text-theme-black-50 inline-flex mb-[10px]">
            Confirm New Password
          </label>
          <div className="w-full flex items-center relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm new password"
              className="pr-14 text-base 1xl:text-lg font-medium placeholder:text-theme-black-150 w-full min-h-[56px] 1xl:min-h-[66px] 1xl:px-5 px-4 py-3 1xl:py-4 rounded-xl 1xl:rounded-[15px] border border-theme-white-100 bg-theme-white-150 outline-none text-theme-darkblue-00"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="size-4 1xl:size-5 flex items-center justify-center cursor-pointer hover:opacity-75 absolute right-4 1xl:right-5"
            >
              <Image
                className="size-full"
                src={"assets/images/svg/eye-close.svg"}
                width={18}
                height={18}
                alt="icon"
              />
            </button>
          </div>
        </div>

        <div className="w-full">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full p-2 h-12 1xl:h-14 cursor-pointer flex items-center justify-center gap-2.5 text-white text-base 1xl:text-lg font-semibold bg-theme-purple-50 hover:bg-theme-purple-00 rounded-[10px] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Image
              className="w-5 1xl:w-[24px] img-filter-white h-auto shrink-0"
              src={"assets/images/svg/user-black-icon.svg"}
              width={24}
              height={24}
              alt="logo"
            />
            <span className="relative top-0.5">
              {isLoading ? 'Resetting...' : 'Reset Password'}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
