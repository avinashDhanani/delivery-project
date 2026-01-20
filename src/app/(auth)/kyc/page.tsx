"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../store/store";
import { setLoading, setError } from "../../../store/slices/authSlice";
import { clientAuthUtils } from "../../../lib/clientAuth";

interface DocumentFile {
  file: File | null;
  preview: string;
  name: string;
}

const KycPage = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const { error, isLoading, user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  // Check authentication and KYC status on mount
  useEffect(() => {
    const checkAuthAndKyc = async () => {
      if (!clientAuthUtils.isAuthenticated()) {
        router.push("/login");
        return;
      }

      try {
        console.log("Checking KYC status", clientAuthUtils.getAuthHeaders());
        // Fetch user profile to check kyc_status
        const response = await fetch("/api/user/profile", {
          headers: {
            ...clientAuthUtils.getAuthHeaders(),
          }
        });
        const data = await response.json();

        if (data.success && data.data?.user) {
          const kycStatus = data.data.user.kyc_status;

          if (kycStatus === 1) {
            // KYC submitted, waiting for approval
            router.push("/welcome");
            return;
          } else if (kycStatus === 2) {
            // KYC approved, go to dashboard
            router.push("/dashboard");
            return;
          }
          // kycStatus 0 or 3: allow access to KYC page
        }
      } catch (error) {
        console.error("Failed to check KYC status:", error);
      }

      setIsCheckingAuth(false);
    };

    checkAuthAndKyc();
  }, [router]);

  const [documents, setDocuments] = useState<{
    aadhaarFront: DocumentFile;
    aadhaarBack: DocumentFile;
    panFront: DocumentFile;
    other1: DocumentFile;
    other2: DocumentFile;
  }>({
    aadhaarFront: { file: null, preview: "", name: "" },
    aadhaarBack: { file: null, preview: "", name: "" },
    panFront: { file: null, preview: "", name: "" },
    other1: { file: null, preview: "", name: "" },
    other2: { file: null, preview: "", name: "" },
  });

  const fileInputRefs = {
    aadhaarFront: useRef<HTMLInputElement>(null),
    aadhaarBack: useRef<HTMLInputElement>(null),
    panFront: useRef<HTMLInputElement>(null),
    other1: useRef<HTMLInputElement>(null),
    other2: useRef<HTMLInputElement>(null),
  };

  const handleFileSelect = (
    documentType: keyof typeof documents,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const preview = e.target?.result as string;
        setDocuments((prev) => ({
          ...prev,
          [documentType]: {
            file,
            preview,
            name: file.name,
          },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileClick = (documentType: keyof typeof documents) => {
    // fileInputRefs[documentType].current?.click();
  };

  const handleRemoveFile = (documentType: keyof typeof documents) => {
    setDocuments((prev) => ({
      ...prev,
      [documentType]: { file: null, preview: "", name: "" },
    }));

    // Clear the file input
    if (fileInputRefs[documentType].current) {
      fileInputRefs[documentType].current.value = "";
    }
  };

  const uploadDocument = async (
    file: File,
    docType: string
  ): Promise<boolean> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("doc_type", docType);

    // Get user ID from Redux store or local storage
    const user = clientAuthUtils.getStoredUser();
    if (user?.id) {
      formData.append("user_id", user.id.toString());
    }

    try {
      const response = await fetch("/api/kyc/upload", {
        method: "POST",
        headers: {
          ...clientAuthUtils.getAuthHeaders(),
        },
        body: formData,
      });

      const data = await response.json();
      return data.success;
    } catch (error) {
      console.error(`Failed to upload ${docType}:`, error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if at least Aadhaar and PAN front are uploaded
    const requiredDocs = ["aadhaarFront", "aadhaarBack", "panFront"];
    const missingDocs = requiredDocs.filter(
      (docType) => !documents[docType as keyof typeof documents].file
    );

    if (missingDocs.length > 0) {
      dispatch(
        setError(
          "Please upload all required documents (Aadhaar front/back and PAN)"
        )
      );
      return;
    }

    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      // Upload all documents
      const uploadPromises = Object.entries(documents).map(
        async ([docType, docData]) => {
          if (docData.file) {
            const docTypeMap: { [key: string]: string } = {
              aadhaarFront: "Aadhaar_Front",
              aadhaarBack: "Aadhaar_Back",
              panFront: "PAN",
              panBack: "PAN",
              other1: "Other",
              other2: "Other",
            };

            return uploadDocument(docData.file, docTypeMap[docType]);
          }
          return true; // Skip if no file
        }
      );

      const results = await Promise.all(uploadPromises);
      const failedUploads = results.filter((result) => !result);

      if (failedUploads.length > 0) {
        dispatch(
          setError("Some documents failed to upload. Please try again.")
        );
        return;
      }

      // All uploads successful - redirect to welcome page or dashboard
      router.push("/welcome");
    } catch (error) {
      dispatch(setError("Failed to submit documents. Please try again."));
    } finally {
      dispatch(setLoading(false));
    }
  };
  // Show loading while checking authentication
  if (isCheckingAuth || !isAuthenticated || !user) {
    return (
      <div className="w-full flex flex-col items-center justify-center max-w-[695px] mx-auto">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-theme-purple-00 mx-auto"></div>
            <p className="mt-4 text-theme-black-50">Loading...</p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full flex flex-col items-center justify-center max-w-[695px] mx-auto">
      <h1 className="authTitle">
        KYC MANAGEMENT
      </h1>
      <p className="authSubtitle">
        Upload your Document and let a KYC
      </p>
      <form
        onSubmit={handleSubmit}
        className="w-full rounded-[25px] 1xl:rounded-[35px] border border-solid p-5 1xl:p-[30px] bg-white border-theme-white-100 shadow-sm"
      >
        {error && (
          <div className="w-full mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <div className="w-full mb-4">
          <h4 className="font-bold text-base 1xl:text-lg text-theme-darkblue-00 mb-[10px]">
            Aadhar Card *
          </h4>
          <div className="w-full grid grid-cols-2 gap-2.5">
            <div
              className="w-full h-[170px] relative overflow-hidden bg-theme-white-200 border-2 border-dashed border-theme-white-100 rounded-xl 1xl:rounded-[15px] cursor-pointer hover:border-theme-blue-00"
              onClick={() => handleFileClick("aadhaarFront")}
            >
              <input
                ref={fileInputRefs.aadhaarFront}
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => handleFileSelect("aadhaarFront", e)}
                className="absolute inset-0 opacity-0"
              />
              <div className="size-full flex flex-col items-center justify-center text-center p-6">
                {documents.aadhaarFront.preview ? (
                  <div className="w-full h-full flex flex-col items-center justify-center relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFile("aadhaarFront");
                      }}
                      className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 z-10"
                    >
                      ×
                    </button>
                    <Image
                      className="max-w-full max-h-16 object-contain mb-2"
                      src={documents.aadhaarFront.preview}
                      width={80}
                      height={60}
                      alt="Aadhaar Front"
                    />
                    <p className="text-xs text-theme-black-150 truncate w-full">
                      {documents.aadhaarFront.name}
                    </p>
                  </div>
                ) : (
                  <>
                    <Image
                      className="w-[120px] h-auto mb-4"
                      src={"/assets/images/png/upload-front-side.png"}
                      width={110}
                      height={70}
                      alt="img"
                    />
                    <p className="text-sm text-theme-black-50 font-medium">
                      Upload Front Side
                    </p>
                  </>
                )}
              </div>
            </div>
            <div
              className="w-full h-[170px] relative overflow-hidden bg-theme-white-200 border-2 border-dashed border-theme-white-100 rounded-xl 1xl:rounded-[15px] cursor-pointer hover:border-theme-blue-00"
              onClick={() => handleFileClick("aadhaarBack")}
            >
              <input
                ref={fileInputRefs.aadhaarBack}
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => handleFileSelect("aadhaarBack", e)}
                className="absolute inset-0 opacity-0"
              />
              <div className="size-full flex flex-col items-center justify-center text-center p-6">
                {documents.aadhaarBack.preview ? (
                  <div className="w-full h-full flex flex-col items-center justify-center relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFile("aadhaarBack");
                      }}
                      className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 z-10"
                    >
                      ×
                    </button>
                    <Image
                      className="max-w-full max-h-16 object-contain mb-2"
                      src={documents.aadhaarBack.preview}
                      width={80}
                      height={60}
                      alt="Aadhaar Back"
                    />
                    <p className="text-xs text-theme-black-150 truncate w-full">
                      {documents.aadhaarBack.name}
                    </p>
                  </div>
                ) : (
                  <>
                    <Image
                      className="w-[120px] h-auto mb-4"
                      src={"/assets/images/png/upload-back-side.png"}
                      width={110}
                      height={70}
                      alt="img"
                    />
                    <p className="text-sm text-theme-black-50 font-medium">
                      Upload Back Side
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full mb-4">
          <h4 className="font-bold text-base 1xl:text-lg text-theme-darkblue-00 mb-[10px]">
            Pan Card *
          </h4>
          <div className="w-full grid grid-cols-1 gap-2.5 max-w-[200px] mx-auto">
            <div
              className="w-full h-[170px] relative overflow-hidden bg-theme-white-200 border-2 border-dashed border-theme-white-100 rounded-xl 1xl:rounded-[15px] cursor-pointer hover:border-theme-blue-00"
              onClick={() => handleFileClick("panFront")}
            >
              <input
                ref={fileInputRefs.panFront}
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => {
                  handleFileSelect("panFront", e);
                }}
                className="absolute inset-0 opacity-0"
              />
              <div className="size-full flex flex-col items-center justify-center text-center p-6">
                {documents.panFront.preview ? (
                  <div className="w-full h-full flex flex-col items-center justify-center relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFile("panFront");
                      }}
                      className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 z-10"
                    >
                      ×
                    </button>
                    <Image
                      className="max-w-full max-h-16 object-contain mb-2"
                      src={documents.panFront.preview}
                      width={80}
                      height={60}
                      alt="PAN Card"
                    />
                    <p className="text-xs text-theme-black-150 truncate w-full">
                      {documents.panFront.name}
                    </p>
                  </div>
                ) : (
                  <>
                    <Image
                      className="w-[120px] h-auto mb-4"
                      src={"/assets/images/png/upload-front-side.png"}
                      width={110}
                      height={70}
                      alt="img"
                    />
                    <p className="text-sm text-theme-black-50 font-medium">
                      Upload PAN Card
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full mb-4">
          <h4 className="font-bold text-base 1xl:text-lg text-theme-darkblue-00 mb-[10px]">
            Upload Your other documents (Optional)
          </h4>
          <div className="w-full grid grid-cols-2 gap-2.5">
            <div
              className="w-full h-[170px] relative overflow-hidden bg-theme-white-200 border-2 border-dashed border-theme-white-100 rounded-xl 1xl:rounded-[15px] cursor-pointer hover:border-theme-blue-00"
              onClick={() => handleFileClick("other1")}
            >
              <input
                ref={fileInputRefs.other1}
                type="file"
                accept="image/*,.pdf,.doc,.docx"
                onChange={(e) => handleFileSelect("other1", e)}
                className="absolute inset-0 opacity-0"
              />
              <div className="size-full flex flex-col items-center justify-center text-center p-6">
                {documents.other1.preview ? (
                  <div className="w-full h-full flex flex-col items-center justify-center relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFile("other1");
                      }}
                      className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 z-10"
                    >
                      ×
                    </button>
                    <Image
                      className="max-w-12 max-h-12 object-contain mb-2"
                      src={documents.other1.preview}
                      width={48}
                      height={48}
                      alt="Other Document 1"
                    />
                    <p className="text-xs text-theme-black-150 truncate w-full">
                      {documents.other1.name}
                    </p>
                  </div>
                ) : (
                  <>
                    <Image
                      className="w-[50px] h-auto mb-4"
                      src={"/assets/images/svg/file-svg.svg"}
                      width={45}
                      height={58}
                      alt="img"
                    />
                    <p className="text-sm text-theme-black-50 font-medium">
                      Upload Document
                    </p>
                  </>
                )}
              </div>
            </div>
            <div
              className="w-full h-[170px] relative overflow-hidden bg-theme-white-200 border-2 border-dashed border-theme-white-100 rounded-xl 1xl:rounded-[15px] cursor-pointer hover:border-theme-blue-00"
              onClick={() => handleFileClick("other2")}
            >
              <input
                ref={fileInputRefs.other2}
                type="file"
                accept="image/*,.pdf,.doc,.docx"
                onChange={(e) => handleFileSelect("other2", e)}
                className="absolute inset-0 opacity-0"
              />
              <div className="size-full flex flex-col items-center justify-center text-center p-6">
                {documents.other2.preview ? (
                  <div className="w-full h-full flex flex-col items-center justify-center relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFile("other2");
                      }}
                      className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 z-10"
                    >
                      ×
                    </button>
                    <Image
                      className="max-w-12 max-h-12 object-contain mb-2"
                      src={documents.other2.preview}
                      width={48}
                      height={48}
                      alt="Other Document 2"
                    />
                    <p className="text-xs text-theme-black-150 truncate w-full">
                      {documents.other2.name}
                    </p>
                  </div>
                ) : (
                  <>
                    <Image
                      className="w-[50px] h-auto mb-4"
                      src={"/assets/images/svg/file-svg.svg"}
                      width={45}
                      height={58}
                      alt="img"
                    />
                    <p className="text-sm text-theme-black-50 font-medium">
                      Upload Document
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-[30px] w-full flex items-center justify-center">
          <button
            type="submit"
            disabled={isLoading}
            title="Submit Documents"
            className="w-[251px] p-2 h-12 1xl:h-14 cursor-pointer flex items-center justify-center gap-2.5 text-white text-base 1xl:text-lg font-semibold bg-theme-purple-50 hover:bg-theme-purple-00 rounded-[10px] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Image
              className="w-5 1xl:w-[24px] img-filter-white h-auto shrink-0"
              src={"assets/images/svg/doc-white-icon.svg"}
              width={24}
              height={24}
              alt="logo"
            ></Image>
            <span className="relative top-0.5">
              {isLoading ? "Submitting..." : "Submit Documents"}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default KycPage;
