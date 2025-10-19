// Validation utilities for BankAccountDetails
export const validateForm = (formData) => {
  const newErrors = {};

  // Validate account number
  if (!formData.accountNumber) {
    newErrors.accountNumber = "Account number is required";
  } else if (formData.accountNumber.length !== 10) {
    newErrors.accountNumber = "Account number must be exactly 10 digits";
  }

  // Validate account name
  if (!formData.accountName.trim()) {
    newErrors.accountName = "Account name is required";
  } else if (formData.accountName.trim().length < 2) {
    newErrors.accountName = "Account name must be at least 2 characters";
  }

  // Validate PDF file
  if (!formData.pdfFile) {
    newErrors.pdfFile = "Please upload a PDF document";
  }

  return newErrors;
};

// File validation utilities
export const validateFile = (file) => {
  const errors = {};

  // Check if it's a PDF
  if (file.type !== "application/pdf") {
    errors.pdfFile = "Please select a PDF file only";
    return errors;
  }

  // Check file size (limit to 5MB)
  if (file.size > 5 * 1024 * 1024) {
    errors.pdfFile = "File size must be less than 5MB";
    return errors;
  }

  return null; // No errors
};

// Format file size for display
export const formatFileSize = (bytes) => {
  return (bytes / 1024).toFixed(1);
};