import React from 'react';
import styles from '../MultiStepForm.module.css';

const PersonalInfoStep = ({ formData, updateFormData, errors, onNext }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  return (
    <div>
      <h3 style={{ marginBottom: '25px', color: '#333' }}>Personal Information</h3>
      
      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="firstName" className={styles.label}>
            First Name *
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={`${styles.input} ${errors.firstName ? styles.inputError : ''}`}
            placeholder="Enter your first name"
          />
          {errors.firstName && (
            <div className={styles.error}>{errors.firstName}</div>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="lastName" className={styles.label}>
            Last Name *
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={`${styles.input} ${errors.lastName ? styles.inputError : ''}`}
            placeholder="Enter your last name"
          />
          {errors.lastName && (
            <div className={styles.error}>{errors.lastName}</div>
          )}
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="dateOfBirth" className={styles.label}>
            Date of Birth *
          </label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className={`${styles.input} ${errors.dateOfBirth ? styles.inputError : ''}`}
          />
          {errors.dateOfBirth && (
            <div className={styles.error}>{errors.dateOfBirth}</div>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="gender" className={styles.label}>
            Gender *
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className={`${styles.select} ${errors.gender ? styles.inputError : ''}`}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer-not-to-say">Prefer not to say</option>
          </select>
          {errors.gender && (
            <div className={styles.error}>{errors.gender}</div>
          )}
        </div>
      </div>

      <div className={styles.buttonContainer}>
        <div></div> {/* Empty div for spacing */}
        <button
          type="button"
          onClick={onNext}
          className={`${styles.button} ${styles.nextButton}`}
        >
          Next Step →
        </button>
      </div>
    </div>
  );
};

export default PersonalInfoStep;