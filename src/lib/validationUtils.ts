// Common validation functions for forms

// Helper function to validate non-empty content with specific labels
export const validateNonEmpty = (label: string) => (value: string | undefined) => {
  const trimmedValue = value?.trim();
  if (!trimmedValue || trimmedValue.length === 0) {
    return `${label} is required`;
  }
  return true;
};

// Helper function to validate email
export const validateEmail = (value: string) => {
  // First check for spaces (before any trimming)
  if (value && /\s/.test(value)) {
    return "Email ID cannot contain spaces";
  }
  
  const trimmedValue = value?.trim();
  if (!trimmedValue || trimmedValue.length === 0) {
    return "Email ID is required";
  }
  
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  if (!emailRegex.test(trimmedValue)) {
    return "Please enter a valid email address";
  }
  return true;
};

// Helper function to validate and format phone number
export const validatePhoneNumber = (value: string, countryCode: string = "+91") => {
  const trimmedValue = value?.replace(/\s/g, "");
  if (!trimmedValue || trimmedValue.length === 0) {
    return "Mobile number is required";
  }
  // Remove all non-digit characters
  const digitsOnly = trimmedValue.replace(/\D/g, "");

  // India (+91) - strictly 10 digits
  if (countryCode === "+91") {
    if (digitsOnly.length !== 10) {
      return "Mobile number must be exactly 10 digits for India";
    }
    if (!/^[6-9]\d{9}$/.test(digitsOnly)) {
      return "Invalid Indian mobile number (should start with 6-9)";
    }
  }
  // US (+1) - 10 digits
  else if (countryCode === "+1") {
    if (digitsOnly.length !== 10) {
      return "Mobile number must be 10 digits for US";
    }
  }
  // UK (+44) - 10-11 digits
  else if (countryCode === "+44") {
    if (digitsOnly.length < 10 || digitsOnly.length > 11) {
      return "Mobile number must be 10-11 digits for UK";
    }
  }
  // Germany (+49) - 10-12 digits
  else if (countryCode === "+49") {
    if (digitsOnly.length < 10 || digitsOnly.length > 12) {
      return "Mobile number must be 10-12 digits for Germany";
    }
  }
  // Default validation for other countries
  else {
    if (digitsOnly.length < 7 || digitsOnly.length > 15) {
      return "Mobile number must be 7-15 digits";
    }
  }
  return true;
};

// Helper function to format phone number input
export const formatPhoneNumberInput = (
  e: React.FormEvent<HTMLInputElement>,
  countryCode: string = "+91"
) => {
  // Remove all whitespace and non-digit characters
  let value = e.currentTarget.value.replace(/\s/g, "").replace(/\D/g, "");

  let maxLength = 15; // default max length

  // Set max length based on country code
  if (countryCode === "+91") {
    maxLength = 10; // India - 10 digits
  } else if (countryCode === "+1") {
    maxLength = 10; // US - 10 digits
  } else if (countryCode === "+44") {
    maxLength = 11; // UK - 10-11 digits (max 11)
  } else if (countryCode === "+49") {
    maxLength = 12; // Germany - 10-12 digits (max 12)
  }

  // Limit to max length
  if (value.length > maxLength) {
    value = value.slice(0, maxLength);
  }

  e.currentTarget.value = value;
};

// Helper function to validate GST number
export const validateGSTNumber = (value: string) => {
  if (!value) return "GST number is required";
  const gstRegex =
    /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  if (!gstRegex.test(value)) {
    return "Invalid GST number";
  }
  return true;
};

// Helper function to validate PAN Card number
export const validatePANCard = (value: string) => {
  if (!value) return "PAN Card number is required";
  if (value.length !== 10) return "PAN Card number must be 10 characters";
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  if (!panRegex.test(value)) {
    return "Invalid PAN Card number format (e.g., ABCDE1234F)";
  }
  return true;
};

// Helper function to validate account number
export const validateAccountNumber = (value: string) => {
  if (!value) return "Account number is required";
  const accountRegex = /^[0-9]{9,18}$/;
  if (!accountRegex.test(value)) {
    return "Invalid account number";
  }
  return true;
};

// Helper function to validate IFSC code
export const validateIFSCCode = (value: string) => {
  if (!value) return "IFSC code is required";
  const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
  if (!ifscRegex.test(value)) {
    return "Invalid IFSC code";
  }
  return true;
};

// Helper function to truncate file names
export const truncateFileName = (fileName: string, maxLength: number = 30) => {
  if (!fileName) return fileName;
  if (fileName.length <= maxLength) return fileName;

  const extension = fileName.split(".").pop();
  const nameWithoutExtension = fileName.substring(
    0,
    fileName.lastIndexOf(".")
  );
  const truncatedName =
    nameWithoutExtension.substring(0, maxLength - 4) + "...";

  return extension ? `${truncatedName}.${extension}` : truncatedName;
};

// File validation constants
export const FILE_VALIDATION = {
  MAX_SIZE_BYTES: 5 * 1024 * 1024, // 5 MB
  ALLOWED_TYPES: [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "image/jpeg",
    "image/jpg",
    "image/png",
  ],
  ALLOWED_TYPES_LAND: [
    "application/pdf",
    "image/jpeg",
    "image/jpg",
  ],
};

// Helper function to validate file size
export const validateFileSize = (file: File, maxSizeInBytes: number = FILE_VALIDATION.MAX_SIZE_BYTES) => {
  if (file.size > maxSizeInBytes) {
    return `File size too large. Maximum allowed size is ${(maxSizeInBytes / (1024 * 1024)).toFixed(0)} MB. Current file size: ${(
      file.size / (1024 * 1024)
    ).toFixed(2)} MB`;
  }
  return null;
};

// Helper function to validate file type
export const validateFileType = (file: File, allowedTypes: string[] = FILE_VALIDATION.ALLOWED_TYPES) => {
  if (!allowedTypes.includes(file.type)) {
    const typeNames = allowedTypes.map(type => {
      if (type.includes('pdf')) return 'PDF';
      if (type.includes('msword')) return 'DOC';
      if (type.includes('wordprocessingml')) return 'DOCX';
      if (type.includes('jpeg') || type.includes('jpg')) return 'JPG/JPEG';
      if (type.includes('png')) return 'PNG';
      return type;
    }).filter((v, i, a) => a.indexOf(v) === i); // Remove duplicates
    
    return `Invalid file type. Please upload ${typeNames.join(', ')} files only.`;
  }
  return null;
};

// Generic file upload handler
export const createFileUploadHandler = <T extends Record<string, string>>(
  setFileErrors: React.Dispatch<React.SetStateAction<T>>,
  setFileNames: React.Dispatch<React.SetStateAction<T>>,
  setValue: any,
  setError: any,
  uploadApi: (file: File) => Promise<any>,
  allowedTypes: string[] = FILE_VALIDATION.ALLOWED_TYPES,
  maxSizeInBytes: number = FILE_VALIDATION.MAX_SIZE_BYTES
) => {
  return async (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    const file = e.target.files?.[0];

    // Clear any previous errors for this field
    setFileErrors((prev) => ({
      ...prev,
      [fieldName]: "",
    }));

    // Set file name immediately when file is selected
    if (file) {
      setFileNames((prev) => ({
        ...prev,
        [fieldName]: file.name,
      }));
    } else {
      setFileNames((prev) => ({
        ...prev,
        [fieldName]: "",
      }));
      return;
    }

    // File size validation
    const sizeError = validateFileSize(file, maxSizeInBytes);
    if (sizeError) {
      setFileErrors((prev) => ({
        ...prev,
        [fieldName]: sizeError,
      }));
      
      // Set form validation error so it shows during form validation
      setError(fieldName, {
        type: "manual",
        message: sizeError,
      });
      
      // Clear the file input
      e.target.value = "";
      setFileNames((prev) => ({
        ...prev,
        [fieldName]: "",
      }));
      return;
    }

    // File type validation
    const typeError = validateFileType(file, allowedTypes);
    if (typeError) {
      setFileErrors((prev) => ({
        ...prev,
        [fieldName]: typeError,
      }));
      
      // Set form validation error so it shows during form validation
      setError(fieldName, {
        type: "manual",
        message: typeError,
      });
      
      // Clear the file input
      e.target.value = "";
      setFileNames((prev) => ({
        ...prev,
        [fieldName]: "",
      }));
      return;
    }

    try {
      const response = await uploadApi(file);
      setValue(fieldName, response?.result?.fileName, { shouldValidate: true });
    } catch (error: any) {
      console.error(`Upload failed for ${fieldName}:`, error);
      // Clear the file input on error
      e.target.value = "";
      setFileNames((prev) => ({
        ...prev,
        [fieldName]: "",
      }));

      // Provide more specific error messages
      let errorMessage = `Upload failed for ${fieldName}. Please try again.`;

      if (error.message) {
        if (error.message.includes("size") || error.message.includes("large")) {
          errorMessage = `File size too large. Maximum allowed size is ${(maxSizeInBytes / (1024 * 1024)).toFixed(0)} MB.`;
        } else if (
          error.message.includes("type") ||
          error.message.includes("format")
        ) {
          const typeNames = allowedTypes.map(type => {
            if (type.includes('pdf')) return 'PDF';
            if (type.includes('msword')) return 'DOC';
            if (type.includes('wordprocessingml')) return 'DOCX';
            if (type.includes('jpeg') || type.includes('jpg')) return 'JPG/JPEG';
            if (type.includes('png')) return 'PNG';
            return type;
          }).filter((v, i, a) => a.indexOf(v) === i);
          errorMessage = `Invalid file type. Please upload ${typeNames.join(', ')} files only.`;
        } else if (
          error.message.includes("network") ||
          error.message.includes("timeout")
        ) {
          errorMessage = `Network error. Please check your connection and try again.`;
        }
      }

      setFileErrors((prev) => ({
        ...prev,
        [fieldName]: errorMessage,
      }));
      
      // Set form validation error so it shows during form validation
      setError(fieldName, {
        type: "manual",
        message: errorMessage,
      });
    }
  };
}; 