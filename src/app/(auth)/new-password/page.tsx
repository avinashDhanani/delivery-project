"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../store/store";
import { setLoading, setError } from "../../../store/slices/authSlice";

// Validation schema
const newPasswordSchema = z.object({
  password: z.string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain at least one uppercase letter, one lowercase letter, and one number"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type NewPasswordFormData = z.infer<typeof newPasswordSchema>;

const NewPasswordPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();

  const { error, isLoading } = useSelector((state: RootState) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError: setFormError,
    clearErrors
  } = useForm<NewPasswordFormData>({
    resolver: zodResolver(newPasswordSchema),
  });

  useEffect(() => {
    // Get email and OTP from URL params or localStorage
    const emailParam = searchParams.get('email');
    const otpParam = searchParams.get('otp');

    if (emailParam) {
      setEmail(emailParam);
    }

    if (otpParam) {
      setOtp(otpParam);
    }
  }, [searchParams]);

  const onSubmit = async (data: NewPasswordFormData) => {
    if (!email) {
      dispatch(setError('Email is required. Please go back and request password reset again.'));
      return;
    }

    if (!otp) {
      dispatch(setError('OTP is required. Please go back and request password reset again.'));
      return;
    }

    dispatch(setLoading(true));
    dispatch(setError(null));
    clearErrors();

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          otp,
          new_password: data.password
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Password reset successful, redirect to login
        router.push('/login?message=Password reset successful. Please login with your new password.');
      } else {
        dispatch(setError(result.message || 'Failed to reset password'));
      }
    } catch (error) {
      dispatch(setError('Network error. Please try again.'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center max-w-[465px] mx-auto">
      <h1 className="text-center font-bold text-[28px] 1xl:text-[34px] text-white mb-1">
        Set New Password
      </h1>
      <p className="text-center font-medium text-sm 1xl:text-base text-white mb-5">
        Enter your new password below to complete the reset process.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full rounded-[25px] 1xl:rounded-[35px] border border-solid p-5 1xl:p-[30px] bg-white border-theme-white-100 shadow-sm">
        <div className="w-full flex items-center justify-center mb-5">
          <Image
            className="size-20 1xl:size-[100px] shrink-0"
            src={"assets/images/svg/mailbox-icon.svg"}
            width={100}
            height={100}
            alt="icon"
          ></Image>
        </div>

        {error && (
          <div className="w-full mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <div className="w-full mb-4">
          <label
            htmlFor="password"
            className="text-base 1xl:text-lg font-semibold text-theme-black-50 inline-flex mb-[10px]"
          >
           New Password
          </label>
          <div className="w-full flex items-center relative">
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter new password"
              className={`pr-14 text-base 1xl:text-lg font-medium placeholder:text-theme-black-150 w-full min-h-[56px] 1xl:min-h-[66px] 1xl:px-5 px-4 py-3 1xl:py-4 rounded-xl 1xl:rounded-[15px] border bg-theme-white-150 outline-none text-theme-darkblue-00 ${
                errors.password ? 'border-red-500' : 'border-theme-white-100'
              }`}
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
                alt="toggle password visibility"
              ></Image>
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        <div className="w-full mb-4">
          <label
            htmlFor="confirmPassword"
            className="text-base 1xl:text-lg font-semibold text-theme-black-50 inline-flex mb-[10px]"
          >
           Confirm New Password
          </label>
          <div className="w-full flex items-center relative">
            <input
              {...register("confirmPassword")}
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              placeholder="Confirm new password"
              className={`pr-14 text-base 1xl:text-lg font-medium placeholder:text-theme-black-150 w-full min-h-[56px] 1xl:min-h-[66px] 1xl:px-5 px-4 py-3 1xl:py-4 rounded-xl 1xl:rounded-[15px] border bg-theme-white-150 outline-none text-theme-darkblue-00 ${
                errors.confirmPassword ? 'border-red-500' : 'border-theme-white-100'
              }`}
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
                alt="toggle password visibility"
              ></Image>
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>

        <div className="w-full mt-[30px]">
          <button
            type="submit"
            disabled={isLoading}
            title="Reset Password"
            className="w-full p-2 h-12 1xl:h-14 cursor-pointer flex items-center justify-center gap-2.5 text-white text-base 1xl:text-lg font-semibold bg-theme-purple-50 hover:bg-theme-purple-00 rounded-[10px] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="relative top-0.5">
              {isLoading ? 'Resetting...' : 'Reset Password'}
            </span>
          </button>
        </div>

        <div className="w-full flex items-center justify-center gap-1.5 mt-5">
          <p className="font-medium text-theme-black-50 text-sm 1xl:text-base">
            Remember your password?
          </p>
          <Link
            href={"/login"}
            className="cursor-pointer font-semibold text-sm 1xl:text-base text-theme-blue-00 hover:underline hover:underline-offset-4"
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default NewPasswordPage;
