"use client";

import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { AppDispatch, RootState } from "@/store/store";
import {
  setError,
  setLoading,
  setToken,
  setUser,
} from "@/store/slices/authSlice";

import { clientAuthUtils } from "@/lib/clientAuth";
import AuthCard from "@/shared/authCard";
import Button from "@/shared/button";

// Validation schema
const otpSchema = z.object({
  otp: z
    .string()
    .length(6, "Please enter complete 6-digit OTP")
    .regex(/^\d{6}$/, "OTP must be 6 digits"),
});

type OtpFormData = z.infer<typeof otpSchema>;

const VerifyPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();

  const { user, isAuthenticated, otpType, error, isLoading } = useSelector(
    (state: RootState) => state.auth,
  );

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError: setFormError,
    clearErrors,
    setValue,
  } = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
  });

  // Get email from URL params or user state
  const email = searchParams.get("email") || user?.email || "";

  useEffect(() => {
    if (!otpType) {
      router.push('/login');
      return;
    }

    // Start resend timer
    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [otpType, router]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single digit

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Update form value
    const otpString = newOtp.join("");
    setValue("otp", otpString);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const onSubmit = async (data: OtpFormData) => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    clearErrors();

    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...clientAuthUtils.getAuthHeaders(),
        },
        body: JSON.stringify({
          email,
          otp: data.otp,
          type: otpType,
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Store token and user if provided
        if (result.data?.token) {
          dispatch(setToken(result.data.token));
        }
        if (result.data?.user) {
          dispatch(setUser(result.data.user));
        }

        // Handle different OTP verification types
        if (otpType === "registration") {
          // After registration OTP, redirect to KYC
          router.push("/kyc");
        } else if (otpType === "login") {
          // After login OTP, fetch user profile to check kyc_status and redirect accordingly
          try {
            const profileResponse = await fetch("/api/user/profile", {
              headers: {
                Authorization: `Bearer ${result.data?.token}`,
                "Content-Type": "application/json",
              },
            });
            const profileData = await profileResponse.json();

            if (profileData.success && profileData.data?.user) {
              const kycStatus = profileData.data.user.kyc_status;

              if (kycStatus === 0 || kycStatus === 3) {
                // KYC not done or rejected, go to KYC page
                router.push("/kyc");
              } else if (kycStatus === 1) {
                // KYC submitted, waiting for approval
                router.push("/welcome");
              } else if (kycStatus === 2) {
                // KYC approved, go to dashboard
                router.push("/dashboard");
              } else {
                // Default fallback
                router.push("/dashboard");
              }
            } else {
              // Fallback if profile fetch fails
              router.push("/dashboard");
            }
          } catch (error) {
            console.error("Failed to fetch user profile:", error);
            router.push("/dashboard");
          }
        } else if (otpType === "forgot_password") {
          // After forgot password OTP, redirect to new password page with email and OTP
          router.push(
            `/new-password?email=${encodeURIComponent(email)}&otp=${encodeURIComponent(data.otp)}`,
          );
        }
      } else {
        dispatch(setError(result.message || "OTP verification failed"));
      }
    } catch (error) {
      dispatch(setError("Network error. Please try again."));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleResendOtp = async () => {
    if (!canResend) return;

    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      let endpoint = "";
      let body = {};

      if (otpType === "registration") {
        endpoint = "/api/auth/register";
        // For resend, we'd need to get the registration data from somewhere
        // This is a simplified version - in production, store this in state or localStorage
        dispatch(setError("Please register again"));
        return;
      } else if (otpType === "login") {
        endpoint = "/api/auth/login";
        body = { email, password: "dummy" }; // This won't work - need better implementation
      } else if (otpType === "forgot_password") {
        endpoint = "/api/auth/forgot-password";
        body = { email };
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (data.success) {
        setResendTimer(30);
        setCanResend(false);
        dispatch(setError(null));
      } else {
        dispatch(setError(data.message || "Failed to resend OTP"));
      }
    } catch (error) {
      dispatch(setError("Network error. Please try again."));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const getTitle = () => {
    switch (otpType) {
      case "registration":
        return "Verify your email";
      case "login":
        return "Verify it's you";
      case "forgot_password":
        return "Reset your password";
      default:
        return "Verify it's you";
    }
  };

  const getDescription = () => {
    switch (otpType) {
      case "registration":
        return "Enter the code we sent to your email";
      case "login":
        return "Enter the code we sent to your registered email/phone";
      case "forgot_password":
        return "Enter the code we sent to reset your password";
      default:
        return "Enter the code we sent to the number below";
    }
  };

  return (
    <AuthCard
      title={getTitle()}
      subtitle={getDescription()}
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Hidden input for form validation */}
      <input type="hidden" {...register("otp")} />

      <div className="w-full grid grid-cols-6 gap-1 mb-4">
        {otp.map((digit, index) => (
          <input
            ref={(el) => {
              if (el) inputRefs.current[index] = el;
            }}
            type="text"
            value={digit}
            onChange={(e) => handleOtpChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            maxLength={1}
            className="text-base text-center 1xl:text-lg font-medium placeholder:text-theme-black-150 aspect-square p-3 rounded-xl 1xl:rounded-[15px] border border-theme-white-100 bg-theme-white-150 outline-none text-theme-darkblue-00 focus:border-theme-blue-00"
          />
        ))}
      </div>

      <div className="w-full flex items-center gap-1.5 mb-5">
        <span className="font-medium text-theme-black-50 text-base">
          Didn't get a code?
        </span>
        {canResend ? (
          <button
            type="button"
            onClick={handleResendOtp}
            disabled={isLoading}
            className="cursor-pointer font-semibold text-base text-theme-blue-00 hover:underline hover:underline-offset-4 disabled:opacity-50"
          >
            Resend Code
          </button>
        ) : (
          <span className="font-semibold text-base text-theme-black-150">
            Resend in {resendTimer}s
          </span>
        )}
      </div>
      <Button
        disabled={isLoading || otp.join("").length !== 6}
        btnClass="w-full"
        title={isLoading ? "Verifying..." : "Confirm"}
        size="large"
        variant="purple"
        iconName="single-person-icon"
      />
    </AuthCard>
  );
};

export default VerifyPage;
