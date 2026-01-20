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
import { setLoading, setError, setOtpRequired, setOtpType } from "../../../store/slices/authSlice";

// Validation schema
const signupSchema = z.object({
  first_name: z.string().min(1, "First name is required").max(50, "First name too long"),
  last_name: z.string().min(1, "Last name is required").max(50, "Last name too long"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number too long")
    .regex(/^[\+]?[1-9][\d]{0,14}$/, "Please enter a valid phone number"),
  password: z.string()
    .min(6, "Password must be at least 6 characters")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain at least one uppercase letter, one lowercase letter, and one number"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignupFormData = z.infer<typeof signupSchema>;

const SignUpPage = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { error, isLoading } = useSelector((state: RootState) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError: setFormError,
    clearErrors
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });
  const onSubmit = async (data: SignupFormData) => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    clearErrors();

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          phone: data.phone,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Set OTP type and redirect to verification
        dispatch(setOtpType('registration'));
        dispatch(setOtpRequired(true));
        router.push(`/verify?email=${encodeURIComponent(data.email)}`);
      } else {
        dispatch(setError(result.message || 'Registration failed'));
      }
    } catch (error) {
      dispatch(setError('Network error. Please try again.'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center max-w-[653px] mx-auto">
      <h1 className="authTitle">
        CREATE YOUR ACCOUNT
      </h1>
      <p className="authSubtitle">
        Welcome to Ark Air - Let's create account
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full rounded-[25px] 1xl:rounded-[35px] border border-solid p-5 1xl:p-[30px] bg-white border-theme-white-100 shadow-sm">
        {error && (
          <div className="w-full mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <div className="w-full grid grid-cols-2 mb-[30px] gap-4">
          <div className="w-full">
            <label
              htmlFor="first_name"
              className="text-base 1xl:text-lg font-semibold text-theme-black-50 inline-flex mb-[10px]"
            >
              First Name
            </label>
            <div className="w-full flex flex-col">
              <input
                {...register("first_name")}
                type="text"
                id="first_name"
                placeholder="John"
                className={`text-base 1xl:text-lg font-medium placeholder:text-theme-black-150 w-full min-h-[56px] 1xl:min-h-[66px] 1xl:px-5 px-4 py-3 1xl:py-4 rounded-xl 1xl:rounded-[15px] border bg-theme-white-150 outline-none text-theme-darkblue-00 ${
                  errors.first_name ? 'border-red-500' : 'border-theme-white-100'
                }`}
              />
              {errors.first_name && (
                <p className="text-red-500 text-sm mt-1">{errors.first_name.message}</p>
              )}
            </div>
          </div>
          <div className="w-full">
            <label
              htmlFor="last_name"
              className="text-base 1xl:text-lg font-semibold text-theme-black-50 inline-flex mb-[10px]"
            >
              Last Name
            </label>
            <div className="w-full flex flex-col">
              <input
                {...register("last_name")}
                type="text"
                id="last_name"
                placeholder="Deo"
                className={`text-base 1xl:text-lg font-medium placeholder:text-theme-black-150 w-full min-h-[56px] 1xl:min-h-[66px] 1xl:px-5 px-4 py-3 1xl:py-4 rounded-xl 1xl:rounded-[15px] border bg-theme-white-150 outline-none text-theme-darkblue-00 ${
                  errors.last_name ? 'border-red-500' : 'border-theme-white-100'
                }`}
              />
              {errors.last_name && (
                <p className="text-red-500 text-sm mt-1">{errors.last_name.message}</p>
              )}
            </div>
          </div>
          <div className="w-full">
            <label
              htmlFor="email"
              className="text-base 1xl:text-lg font-semibold text-theme-black-50 inline-flex mb-[10px]"
            >
              Email Id
            </label>
            <div className="w-full flex flex-col">
              <input
                {...register("email")}
                type="email"
                id="email"
                placeholder="example@gmail.com"
                className={`text-base 1xl:text-lg font-medium placeholder:text-theme-black-150 w-full min-h-[56px] 1xl:min-h-[66px] 1xl:px-5 px-4 py-3 1xl:py-4 rounded-xl 1xl:rounded-[15px] border bg-theme-white-150 outline-none text-theme-darkblue-00 ${
                  errors.email ? 'border-red-500' : 'border-theme-white-100'
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
          </div>
          <div className="w-full">
            <label
              htmlFor="phone"
              className="text-base 1xl:text-lg font-semibold text-theme-black-50 inline-flex mb-[10px]"
            >
              Phone Number
            </label>
            <div className="w-full flex flex-col">
              <input
                {...register("phone")}
                type="tel"
                id="phone"
                placeholder="+91 098 765 4321"
                className={`text-base 1xl:text-lg font-medium placeholder:text-theme-black-150 w-full min-h-[56px] 1xl:min-h-[66px] 1xl:px-5 px-4 py-3 1xl:py-4 rounded-xl 1xl:rounded-[15px] border bg-theme-white-150 outline-none text-theme-darkblue-00 ${
                  errors.phone ? 'border-red-500' : 'border-theme-white-100'
                }`}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
              )}
            </div>
          </div>
          <div className="w-full">
            <label
              htmlFor="password"
              className="text-base 1xl:text-lg font-semibold text-theme-black-50 inline-flex mb-[10px]"
            >
              Password
            </label>
            <div className="w-full flex flex-col">
              <div className="w-full flex items-center relative">
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="123456789"
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
          <div className="w-full">
            <label
              htmlFor="confirmPassword"
              className="text-base 1xl:text-lg font-semibold text-theme-black-50 inline-flex mb-[10px]"
            >
              Confirm Password
            </label>
            <div className="w-full flex flex-col">
              <div className="w-full flex items-center relative">
                <input
                  {...register("confirmPassword")}
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  placeholder="123456789"
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
                    alt="icon"
                  />
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-end">
          <button
            type="submit"
            disabled={isLoading}
            title="Sign Up"
            className="w-[150px] p-2 h-12 1xl:h-14 cursor-pointer flex items-center justify-center gap-2.5 text-white text-base 1xl:text-lg font-semibold bg-theme-purple-50 hover:bg-theme-purple-00 rounded-[10px] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Image
              className="w-5 1xl:w-[24px] img-filter-white h-auto shrink-0"
              src={"assets/images/svg/user-black-icon.svg"}
              width={24}
              height={24}
              alt="logo"
            ></Image>
            <span className="relative top-0.5">
              {isLoading ? 'Signing Up...' : 'Sign Up'}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
