"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../store/store";
import { setLoading, setError, setOtpRequired, setOtpType, setUser, setToken } from "../../../store/slices/authSlice";

// Validation schema
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { error, isLoading } = useSelector((state: RootState) => state.auth);

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError: setFormError,
    clearErrors
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    clearErrors();

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        if (result.data?.requires_otp) {
          // Redirect to OTP verification for non-admin users
          dispatch(setOtpType('login'));
          dispatch(setOtpRequired(true));
          router.push(`/verify?email=${encodeURIComponent(data.email)}`);
        } else {
          // Admin login - directly set user and token
          dispatch(setUser(result.data.user));
          dispatch(setToken(result.data.token));
          router.push('/dashboard'); // or wherever admin users go
        }
      } else {
        dispatch(setError(result.message || 'Login failed'));
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
        WELCOME TO ARK AIR!
      </h1>
      <p className="text-center font-medium text-sm 1xl:text-base text-white mb-5">
        Sign in and start managing your Ark Air Account.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full rounded-[25px] 1xl:rounded-[35px] border border-solid p-5 1xl:p-[30px] bg-white border-theme-white-100 shadow-sm">
        {error && (
          <div className="w-full mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <div className="w-full mb-4">
          <label
            htmlFor="email"
            className="text-base 1xl:text-lg font-semibold text-theme-black-50 inline-flex mb-[10px]"
          >
            Email/Phone
          </label>
          <div className="w-full flex flex-col">
            <input
              {...register("email")}
              type="email"
              id="email"
              placeholder="Enter Email Id/Phone"
              className={`text-base 1xl:text-lg font-medium placeholder:text-theme-black-150 w-full min-h-[56px] 1xl:min-h-[66px] 1xl:px-5 px-4 py-3 1xl:py-4 rounded-xl 1xl:rounded-[15px] border bg-theme-white-150 outline-none text-theme-darkblue-00 ${
                errors.email ? 'border-red-500' : 'border-theme-white-100'
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
        </div>
        <div className="w-full mb-4">
          <label
            htmlFor="password"
            className="text-base 1xl:text-lg font-semibold text-theme-black-50 inline-flex mb-[10px]"
          >
            Password
          </label>
          <div className="w-full">
            <div className="w-full flex items-center relative">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter Password"
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
                  alt="icon"
                />
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>
        </div>
        <div className="w-full flex items-center justify-end mb-5 1xl:mb-[30px]">
          <Link
            href={"/forgot-password"}
            className="cursor-pointer font-semibold text-sm 1xl:text-base text-theme-blue-00 hover:underline hover:underline-offset-4"
          >
            Forgot Password ?
          </Link>
        </div>
        <div className="w-full">
          <button
            type="submit"
            disabled={isLoading}
            title="Login"
            className="w-full p-2 h-12 1xl:h-14 cursor-pointer flex items-center justify-center gap-2.5 text-white text-base 1xl:text-lg font-semibold bg-theme-purple-50 hover:bg-theme-purple-00 rounded-[10px] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Image
              className="w-5 1xl:w-[24px] img-filter-white h-auto shrink-0"
              src={"assets/images/svg/user-black-icon.svg"}
              width={24}
              height={24}
              alt="logo"
            ></Image>
            <span className="relative top-0.5">
              {isLoading ? 'Logging in...' : 'Login'}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
