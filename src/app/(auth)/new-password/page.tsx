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
import Button from "../../../shared/button";
import AuthCard from "../../../shared/authCard";
import InputField from "../../../shared/inputField";

// Validation schema
const newPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
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
    clearErrors,
  } = useForm<NewPasswordFormData>({
    resolver: zodResolver(newPasswordSchema),
  });

  useEffect(() => {
    // Get email and OTP from URL params or localStorage
    const emailParam = searchParams.get("email");
    const otpParam = searchParams.get("otp");

    if (emailParam) {
      setEmail(emailParam);
    }

    if (otpParam) {
      setOtp(otpParam);
    }
  }, [searchParams]);

  const onSubmit = async (data: NewPasswordFormData) => {
    if (!email) {
      dispatch(
        setError(
          "Email is required. Please go back and request password reset again.",
        ),
      );
      return;
    }

    if (!otp) {
      dispatch(
        setError(
          "OTP is required. Please go back and request password reset again.",
        ),
      );
      return;
    }

    dispatch(setLoading(true));
    dispatch(setError(null));
    clearErrors();

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp,
          new_password: data.password,
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Password reset successful, redirect to login
        router.push(
          "/login?message=Password reset successful. Please login with your new password.",
        );
      } else {
        dispatch(setError(result.message || "Failed to reset password"));
      }
    } catch (error) {
      dispatch(setError("Network error. Please try again."));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <AuthCard
      title="Set New Password"
      subtitle="Enter your new password below to complete the reset process."
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
        id="newPassword"
        label="New Password"
        type="password"
        placeholder="Enter New Password"
        register={register}
        error={errors.password?.message}
        showPasswordToggle
      />
      <InputField
        id="confirmNewPassword"
        label="Confirm New Password"
        type="password"
        placeholder="Confirm New Password"
        register={register}
        error={errors.confirmPassword?.message}
        showPasswordToggle
      />
      <Button
        disabled={isLoading}
        btnClass="w-full mb-5 mt-6"
        title={isLoading ? "Resetting..." : "Reset Password"}
        size="large"
        variant="purple"
      />
      <div className="w-full flex items-center justify-center gap-1.5">
        <span className="font-medium text-theme-black-50 text-base">
          Remember your password?
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

export default NewPasswordPage;
