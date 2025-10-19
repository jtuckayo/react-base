import React from 'react';
import styles from '../MultiStepForm.module.css';

const ContactInfoStep = ({ formData, updateFormData, errors, onNext, onPrev }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  return (
    <div>
      <h3 style={{ marginBottom: '25px', color: '#333' }}>Contact Information</h3>
      
      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
            placeholder="Enter your email address"
          />
          {errors.email && (
            <div className={styles.error}>{errors.email}</div>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="phone" className={styles.label}>
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
            placeholder="Enter your phone number"
          />
          {errors.phone && (
            <div className={styles.error}>{errors.phone}</div>
          )}
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="address" className={styles.label}>
          Street Address *
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className={`${styles.input} ${errors.address ? styles.inputError : ''}`}
          placeholder="Enter your street address"
        />
        {errors.address && (
          <div className={styles.error}>{errors.address}</div>
        )}
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="city" className={styles.label}>
            City *
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className={`${styles.input} ${errors.city ? styles.inputError : ''}`}
            placeholder="Enter your city"
          />
          {errors.city && (
            <div className={styles.error}>{errors.city}</div>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="country" className={styles.label}>
            Country *
          </label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className={`${styles.select} ${errors.country ? styles.inputError : ''}`}
          >
            <option value="">Select country</option>
            <option value="us">United States</option>
            <option value="ca">Canada</option>
            <option value="uk">United Kingdom</option>
            <option value="au">Australia</option>
            <option value="de">Germany</option>
            <option value="fr">France</option>
            <option value="jp">Japan</option>
            <option value="other">Other</option>
          </select>
          {errors.country && (
            <div className={styles.error}>{errors.country}</div>
          )}
        </div>
      </div>

      <div className={styles.buttonContainer}>
        <button
          type="button"
          onClick={onPrev}
          className={`${styles.button} ${styles.prevButton}`}
        >
          ← Previous
        </button>
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

export default ContactInfoStep;