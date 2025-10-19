import { useState } from "react";
import styles from "./BankAccountDetails.module.css";
import { validateForm, validateFile, formatFileSize } from "./utils";

const BankAccountDetails = () => {
  const [formData, setFormData] = useState({
    accountNumber: "",
    accountName: "",
    pdfFile: null,
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // For account number, only allow digits and limit to 10
    if (name === "accountNumber") {
      const digitsOnly = value.replace(/\D/g, "");
      if (digitsOnly.length <= 10) {
        setFormData((prev) => ({
          ...prev,
          [name]: digitsOnly,
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const fileErrors = validateFile(file);
      
      if (fileErrors) {
        setErrors((prev) => ({
          ...prev,
          ...fileErrors,
        }));
        return;
      }

      setFormData((prev) => ({
        ...prev,
        pdfFile: file,
      }));

      // Clear error
      if (errors.pdfFile) {
        setErrors((prev) => ({
          ...prev,
          pdfFile: "",
        }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm(formData);

    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
      console.log("Bank Account Details submitted:", {
        accountNumber: formData.accountNumber,
        accountName: formData.accountName,
        fileName: formData.pdfFile.name,
        fileSize: formData.pdfFile.size,
      });

      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ accountNumber: "", accountName: "", pdfFile: null });
        // Reset file input
        const fileInput = document.getElementById("pdfUpload");
        if (fileInput) fileInput.value = "";
      }, 3000);
    } else {
      setErrors(newErrors);
    }
  };

  if (submitted) {
    return (
      <div className={styles.container}>
        <h2>Bank Account Details</h2>
        <div className={styles.successMessage}>
          <h3>✅ Details Submitted Successfully!</h3>
          <p>Your bank account information has been processed.</p>
          <div className={styles.submittedDetails}>
            <p>
              <strong>Account Number:</strong> ****-****-
              {formData.accountNumber.slice(-2)}
            </p>
            <p>
              <strong>Account Name:</strong> {formData.accountName}
            </p>
            <p>
              <strong>Document:</strong> {formData.pdfFile?.name}
            </p>
          </div>
          <p className={styles.resetMessage}>
            Form will reset in a moment...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2>Bank Account Details</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Account Number Field */}
        <div className={styles.fieldGroup}>
          <label htmlFor="accountNumber" className={styles.label}>
            Bank Account Number *
          </label>
          <input
            type="text"
            id="accountNumber"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleInputChange}
            placeholder="Enter 10-digit account number"
            className={`${styles.input} ${styles.accountNumberInput} ${errors.accountNumber ? styles.inputError : ''}`}
          />
          <div className={styles.helperText}>
            {formData.accountNumber.length}/10 digits
          </div>
          {errors.accountNumber && (
            <div className={styles.error}>{errors.accountNumber}</div>
          )}
        </div>

        {/* Account Name Field */}
        <div className={styles.fieldGroup}>
          <label htmlFor="accountName" className={styles.label}>
            Account Holder Name *
          </label>
          <input
            type="text"
            id="accountName"
            name="accountName"
            value={formData.accountName}
            onChange={handleInputChange}
            placeholder="Enter full account holder name"
            className={`${styles.input} ${errors.accountName ? styles.inputError : ''}`}
          />
          {errors.accountName && (
            <div className={styles.error}>{errors.accountName}</div>
          )}
        </div>

        {/* PDF Upload Field */}
        <div className={styles.fieldGroup}>
          <label htmlFor="pdfUpload" className={styles.label}>
            Upload Bank Statement (PDF) *
          </label>
          <input
            type="file"
            id="pdfUpload"
            accept=".pdf"
            onChange={handleFileChange}
            className={`${styles.fileInput} ${errors.pdfFile ? styles.inputError : ''}`}
          />
          <div className={styles.helperText}>
            PDF files only, max 5MB
          </div>
          {formData.pdfFile && (
            <div className={styles.fileInfo}>
              📄 {formData.pdfFile.name} ({formatFileSize(formData.pdfFile.size)} KB)
            </div>
          )}
          {errors.pdfFile && <div className={styles.error}>{errors.pdfFile}</div>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={styles.submitButton}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#218838")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#28a745")}
          onFocus={(e) => (e.target.style.backgroundColor = "#218838")}
          onBlur={(e) => (e.target.style.backgroundColor = "#28a745")}
        >
          Submit Bank Details
        </button>
      </form>
    </div>
  );
};

export default BankAccountDetails;