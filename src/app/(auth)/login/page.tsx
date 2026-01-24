"use client";

import React from "react";
import { useForm } from "react-hook-form";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "@/store/store";
import AuthCard from "@/shared/authCard";
import InputField from "@/shared/inputField";
import Button from "@/shared/button";
import { setError, setLoading, setOtpRequired, setOtpType, setToken, setUser } from "@/store/slices/authSlice";

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

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError: setFormError,
    clearErrors,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    clearErrors();

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        if (result.data?.requires_otp) {
          // Redirect to OTP verification for non-admin users
          dispatch(setOtpType("login"));
          dispatch(setOtpRequired(true));
          router.push(`/verify?email=${encodeURIComponent(data.email)}`);
        } else {
          // Admin login - directly set user and token
          dispatch(setUser(result.data.user));
          dispatch(setToken(result.data.token));
          router.push("/dashboard"); // or wherever admin users go
        }
      } else {
        dispatch(setError(result.message || "Login failed"));
      }
    } catch (error) {
      dispatch(setError("Network error. Please try again."));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <AuthCard
      title="WELCOME TO ARK AIR!"
      subtitle="Sign in and start managing your Ark Air Account."
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputField
        id="email"
        label="Email/Phone"
        type="email"
        placeholder="Enter Email Id/Phone"
        register={register}
        error={errors.email?.message}
      />
      <InputField
        id="password"
        label="Password"
        type="password"
        placeholder="Enter Password"
        register={register}
        error={errors.password?.message}
        showPasswordToggle
      />
      <Link
        href={"/forgot-password"}
        className="cursor-pointer font-semibold text-base text-theme-blue-00 hover:underline hover:underline-offset-4 flex items-center w-fit justify-center ml-auto mb-5"
      >
        Forgot Password ?
      </Link>
      <Button
        disabled={isLoading}
        btnClass="w-full"
        title={isLoading ? "Logging in..." : "Login"}
        size="large"
        variant="purple"
        iconName="single-person-icon"
      />
    </AuthCard>
  );
};

export default LoginPage;
