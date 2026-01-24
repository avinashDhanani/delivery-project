"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AppDispatch, RootState } from "@/store/store";
import {
  setError,
  setLoading,
  setOtpRequired,
  setOtpType,
} from "@/store/slices/authSlice";
import Button from "@/shared/button";
import AuthCard from "@/shared/authCard";
import InputField from "@/shared/inputField";

// Validation schema
const signupSchema = z
  .object({
    first_name: z
      .string()
      .min(1, "First name is required")
      .max(50, "First name too long"),
    last_name: z
      .string()
      .min(1, "Last name is required")
      .max(50, "Last name too long"),
    email: z.string().email("Please enter a valid email address"),
    phone: z
      .string()
      .min(10, "Phone number must be at least 10 digits")
      .max(15, "Phone number too long")
      .regex(/^[\+]?[1-9][\d]{0,14}$/, "Please enter a valid phone number"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
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
    clearErrors,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });
  const onSubmit = async (data: SignupFormData) => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    clearErrors();

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
        dispatch(setOtpType("registration"));
        dispatch(setOtpRequired(true));
        router.push(`/verify?email=${encodeURIComponent(data.email)}`);
      } else {
        dispatch(setError(result.message || "Registration failed"));
      }
    } catch (error) {
      dispatch(setError("Network error. Please try again."));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <AuthCard
      size="large"
      title="CREATE YOUR ACCOUNT"
      subtitle=" Welcome to Ark Air - Let's create account for you!"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full grid grid-cols-2 mb-[30px] gap-4">
        <InputField
          id="fname"
          label="First Name"
          type="text"
          placeholder="John"
          register={register}
        />
        <InputField
          id="lname"
          label="Last Name"
          type="text"
          placeholder="Deo"
          register={register}
        />
        <InputField
          id="email"
          label="Email Id"
          type="email"
          placeholder="example@gmail.com"
          register={register}
          error={errors.email?.message}
        />
        <InputField
          id="pNumber"
          label="Phone Number"
          type="text"
          placeholder="+91 098 765 4321"
          register={register}
        />
        <InputField
          id="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter Password"
          register={register}
          error={errors.password?.message}
          showPasswordToggle
        />
        <InputField
          id="confirmPassword"
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Enter Password"
          register={register}
          error={errors.confirmPassword?.message}
          showPasswordToggle
        />
      </div>
      <Button
        disabled={isLoading}
        btnClass="ml-auto"
        title={isLoading ? "Signing Up..." : "Sign Up"}
        size="large"
        variant="purple"
        iconName="single-person-icon"
      />
    </AuthCard>
  );
};

export default SignUpPage;
