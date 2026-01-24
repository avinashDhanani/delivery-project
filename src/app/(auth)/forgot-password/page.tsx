"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AppDispatch, RootState } from "@/store/store";
import { setError, setLoading, setOtpRequired, setOtpType } from "@/store/slices/authSlice";

import AuthCard from "@/shared/authCard";
import InputField from "@/shared/inputField";
import Button from "@/shared/button";

// Validation schema
const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordPage = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { error, isLoading } = useSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError: setFormError,
    clearErrors,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    clearErrors();

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email }),
      });

      const result = await response.json();

      if (result.success) {
        // Set OTP type and redirect to verification
        dispatch(setOtpType("forgot_password"));
        dispatch(setOtpRequired(true));
        router.push(`/verify?email=${encodeURIComponent(data.email)}`);
      } else {
        dispatch(setError(result.message || "Failed to send reset email"));
      }
    } catch (error) {
      dispatch(setError("Network error. Please try again."));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <AuthCard
      title="FORGOT PASSWORD?"
      subtitle="Don’t worry! Enter your registered email address to get password reset instructions."
      onSubmit={handleSubmit(onSubmit)}
    >
      <Image
        className="mx-auto mb-5 size-[100px] shrink-0"
        src={"assets/images/svg/mailbox-icon.svg"}
        width={100}
        height={100}
        alt="icon"
      ></Image>
      <InputField
        id="email"
        label="Email Address"
        type="email"
        placeholder="Sample@gmail.com"
        register={register}
        error={errors.email?.message}
      />
      <div className="w-full flex items-center gap-1.5 mb-[30px]">
        <span className="font-medium text-theme-black-50 text-base">
          Didn’t get a code?
        </span>
        <Link
          href={""}
          className="cursor-pointer font-semibold text-base text-theme-blue-00 hover:underline hover:underline-offset-4"
        >
          Resend Code
        </Link>
      </div>
      <Button
        disabled={isLoading}
        btnClass="w-full mb-5"
        title={isLoading ? "Sending..." : "Send"}
        size="large"
        variant="purple"
      />
      <div className="w-full flex items-center justify-center gap-1.5">
        <span className="font-medium text-theme-black-50 text-base">
          Back to
        </span>
        <Link
          href={"/login"}
          className="cursor-pointer font-semibold text-base text-theme-blue-00 hover:underline hover:underline-offset-4"
        >
          Login
        </Link>
      </div>
    </AuthCard>
  );
};

export default ForgotPasswordPage;
