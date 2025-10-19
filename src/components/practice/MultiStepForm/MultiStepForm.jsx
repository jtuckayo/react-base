import React, { useState } from "react";
import styles from "./MultiStepForm.module.css";

// Step Components
import PersonalInfoStep from "./steps/PersonalInfoStep";
import ContactInfoStep from "./steps/ContactInfoStep";
import PreferencesStep from "./steps/PreferencesStep";
import ReviewStep from "./steps/ReviewStep";
import SuccessStep from "./steps/SuccessStep";

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",

    // Contact Info
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",

    // Preferences
    interests: [],
    newsletter: false,
    notifications: false,
    preferredContact: "email",

    // Additional
    comments: "",
  });

  const [stepErrors, setStepErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = [
    { id: 1, title: "Personal Info", component: PersonalInfoStep },
    { id: 2, title: "Contact Info", component: ContactInfoStep },
    { id: 3, title: "Preferences", component: PreferencesStep },
    { id: 4, title: "Review", component: ReviewStep },
    { id: 5, title: "Complete", component: SuccessStep },
  ];

  const updateFormData = (stepData) => {
    setFormData((prev) => ({
      ...prev,
      ...stepData,
    }));
  };

  const validateStep = (stepNumber) => {
    const errors = {};

    switch (stepNumber) {
      case 1: // Personal Info
        if (!formData.firstName.trim())
          errors.firstName = "First name is required";
        if (!formData.lastName.trim())
          errors.lastName = "Last name is required";
        if (!formData.dateOfBirth)
          errors.dateOfBirth = "Date of birth is required";
        if (!formData.gender) errors.gender = "Gender is required";
        break;

      case 2: // Contact Info
        if (!formData.email.trim()) errors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email))
          errors.email = "Email is invalid";
        if (!formData.phone.trim()) errors.phone = "Phone number is required";
        if (!formData.address.trim()) errors.address = "Address is required";
        if (!formData.city.trim()) errors.city = "City is required";
        if (!formData.country.trim()) errors.country = "Country is required";
        break;

      case 3: // Preferences
        if (formData.interests.length === 0)
          errors.interests = "Please select at least one interest";
        if (!formData.preferredContact)
          errors.preferredContact = "Please select preferred contact method";
        break;

      default:
        break;
    }

    return errors;
  };

  const nextStep = () => {
    const errors = validateStep(currentStep);

    if (Object.keys(errors).length > 0) {
      setStepErrors(errors);
      return;
    }

    setStepErrors({});
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setStepErrors({});
    }
  };

  const submitForm = async () => {
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Form submitted:", formData);
      setCurrentStep(5); // Go to success step
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setCurrentStep(1);
    setFormData({
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      gender: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      country: "",
      interests: [],
      newsletter: false,
      notifications: false,
      preferredContact: "email",
      comments: "",
    });
    setStepErrors({});
  };

  const getCurrentStepComponent = () => {
    const StepComponent = steps[currentStep - 1]?.component;

    if (!StepComponent) return null;

    return (
      <StepComponent
        formData={formData}
        updateFormData={updateFormData}
        errors={stepErrors}
        onNext={nextStep}
        onPrev={prevStep}
        onSubmit={submitForm}
        isSubmitting={isSubmitting}
        onReset={resetForm}
      />
    );
  };

  const getStepStatus = (stepId) => {
    if (stepId < currentStep) return "completed";
    if (stepId === currentStep) return "active";
    return "pending";
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Multi-Step Registration Form</h2>

        {/* Progress Indicator */}
        <div className={styles.progressContainer}>
          {steps.map((step, index) => (
            <div key={step.id} className={styles.stepIndicator}>
              <div
                className={`${styles.stepCircle} ${
                  styles[getStepStatus(step.id)]
                }`}
              >
                {getStepStatus(step.id) === "completed" ? "✓" : step.id}
              </div>
              <span
                className={`${styles.stepTitle} ${
                  styles[getStepStatus(step.id)]
                }`}
              >
                {step.title}
              </span>
              {index < steps.length - 1 && (
                <div
                  className={`${styles.stepConnector} ${
                    getStepStatus(step.id) === "completed"
                      ? styles.completed
                      : ""
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className={styles.stepContent}>{getCurrentStepComponent()}</div>
      </div>
    </div>
  );
};

export default MultiStepForm;
