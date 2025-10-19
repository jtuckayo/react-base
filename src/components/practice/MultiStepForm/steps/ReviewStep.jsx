import React from 'react';
import styles from '../MultiStepForm.module.css';

const ReviewStep = ({ formData, onPrev, onSubmit, isSubmitting }) => {
  const formatInterests = (interests) => {
    if (!interests || interests.length === 0) return 'None selected';
    return interests.map(interest => 
      interest.charAt(0).toUpperCase() + interest.slice(1)
    ).join(', ');
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not provided';
    return new Date(dateString).toLocaleDateString();
  };

  const formatBoolean = (value) => {
    return value ? 'Yes' : 'No';
  };

  const getCountryName = (countryCode) => {
    const countries = {
      us: 'United States',
      ca: 'Canada',
      uk: 'United Kingdom',
      au: 'Australia',
      de: 'Germany',
      fr: 'France',
      jp: 'Japan',
      other: 'Other'
    };
    return countries[countryCode] || countryCode;
  };

  return (
    <div>
      <h3 style={{ marginBottom: '25px', color: '#333' }}>Review Your Information</h3>
      <p style={{ marginBottom: '30px', color: '#666' }}>
        Please review all the information below before submitting your registration.
      </p>

      {/* Personal Information */}
      <div className={styles.reviewSection}>
        <h4 className={styles.reviewTitle}>Personal Information</h4>
        <div className={styles.reviewItem}>
          <span className={styles.reviewLabel}>Full Name:</span>
          <span className={styles.reviewValue}>
            {formData.firstName} {formData.lastName}
          </span>
        </div>
        <div className={styles.reviewItem}>
          <span className={styles.reviewLabel}>Date of Birth:</span>
          <span className={styles.reviewValue}>
            {formatDate(formData.dateOfBirth)}
          </span>
        </div>
        <div className={styles.reviewItem}>
          <span className={styles.reviewLabel}>Gender:</span>
          <span className={styles.reviewValue}>
            {formData.gender ? formData.gender.charAt(0).toUpperCase() + formData.gender.slice(1).replace('-', ' ') : 'Not specified'}
          </span>
        </div>
      </div>

      {/* Contact Information */}
      <div className={styles.reviewSection}>
        <h4 className={styles.reviewTitle}>Contact Information</h4>
        <div className={styles.reviewItem}>
          <span className={styles.reviewLabel}>Email:</span>
          <span className={styles.reviewValue}>{formData.email}</span>
        </div>
        <div className={styles.reviewItem}>
          <span className={styles.reviewLabel}>Phone:</span>
          <span className={styles.reviewValue}>{formData.phone}</span>
        </div>
        <div className={styles.reviewItem}>
          <span className={styles.reviewLabel}>Address:</span>
          <span className={styles.reviewValue}>
            {formData.address}, {formData.city}, {getCountryName(formData.country)}
          </span>
        </div>
      </div>

      {/* Preferences */}
      <div className={styles.reviewSection}>
        <h4 className={styles.reviewTitle}>Preferences & Interests</h4>
        <div className={styles.reviewItem}>
          <span className={styles.reviewLabel}>Interests:</span>
          <span className={styles.reviewValue}>
            {formatInterests(formData.interests)}
          </span>
        </div>
        <div className={styles.reviewItem}>
          <span className={styles.reviewLabel}>Preferred Contact:</span>
          <span className={styles.reviewValue}>
            {formData.preferredContact ? formData.preferredContact.toUpperCase() : 'Not specified'}
          </span>
        </div>
        <div className={styles.reviewItem}>
          <span className={styles.reviewLabel}>Newsletter:</span>
          <span className={styles.reviewValue}>
            {formatBoolean(formData.newsletter)}
          </span>
        </div>
        <div className={styles.reviewItem}>
          <span className={styles.reviewLabel}>Push Notifications:</span>
          <span className={styles.reviewValue}>
            {formatBoolean(formData.notifications)}
          </span>
        </div>
        {formData.comments && (
          <div className={styles.reviewItem}>
            <span className={styles.reviewLabel}>Comments:</span>
            <span className={styles.reviewValue}>{formData.comments}</span>
          </div>
        )}
      </div>

      <div style={{ 
        background: '#f8d10dcc', 
        padding: '15px', 
        borderRadius: '6px', 
        marginBottom: '20px',
        border: '1px solid #f8d10d'
      }}>
        <p style={{ margin: 0, fontSize: '14px', color: '#333' }}>
          <strong>Note:</strong> By submitting this form, you agree to our terms of service 
          and privacy policy. Your information will be processed securely.
        </p>
      </div>

      <div className={styles.buttonContainer}>
        <button
          type="button"
          onClick={onPrev}
          className={`${styles.button} ${styles.prevButton}`}
          disabled={isSubmitting}
        >
          ← Previous
        </button>
        <button
          type="button"
          onClick={onSubmit}
          className={`${styles.button} ${styles.submitButton}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Registration'}
        </button>
      </div>
    </div>
  );
};

export default ReviewStep;