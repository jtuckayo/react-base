import React from 'react';
import styles from '../MultiStepForm.module.css';

const PreferencesStep = ({ formData, updateFormData, errors, onNext, onPrev }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (name === 'interests') {
        const currentInterests = formData.interests || [];
        const updatedInterests = checked
          ? [...currentInterests, value]
          : currentInterests.filter(interest => interest !== value);
        updateFormData({ interests: updatedInterests });
      } else {
        updateFormData({ [name]: checked });
      }
    } else {
      updateFormData({ [name]: value });
    }
  };

  const interestOptions = [
    { value: 'technology', label: 'Technology' },
    { value: 'sports', label: 'Sports' },
    { value: 'music', label: 'Music' },
    { value: 'travel', label: 'Travel' },
    { value: 'cooking', label: 'Cooking' },
    { value: 'reading', label: 'Reading' },
    { value: 'gaming', label: 'Gaming' },
    { value: 'fitness', label: 'Fitness' }
  ];

  return (
    <div>
      <h3 style={{ marginBottom: '25px', color: '#333' }}>Preferences & Interests</h3>
      
      <div className={styles.formGroup}>
        <span className={styles.label}>
          Interests * (Select at least one)
        </span>
        <div className={styles.checkboxGroup}>
          {interestOptions.map(option => (
            <div key={option.value} className={styles.checkboxItem}>
              <input
                type="checkbox"
                id={`interest-${option.value}`}
                name="interests"
                value={option.value}
                checked={formData.interests?.includes(option.value) || false}
                onChange={handleChange}
                className={styles.checkbox}
              />
              <label 
                htmlFor={`interest-${option.value}`} 
                className={styles.checkboxLabel}
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
        {errors.interests && (
          <div className={styles.error}>{errors.interests}</div>
        )}
      </div>

      <div className={styles.formGroup}>
        <span className={styles.label}>
          Preferred Contact Method *
        </span>
        <div className={styles.radioGroup}>
          <div className={styles.radioItem}>
            <input
              type="radio"
              id="contact-email"
              name="preferredContact"
              value="email"
              checked={formData.preferredContact === 'email'}
              onChange={handleChange}
              className={styles.radio}
            />
            <label htmlFor="contact-email" className={styles.radioLabel}>
              Email
            </label>
          </div>
          <div className={styles.radioItem}>
            <input
              type="radio"
              id="contact-phone"
              name="preferredContact"
              value="phone"
              checked={formData.preferredContact === 'phone'}
              onChange={handleChange}
              className={styles.radio}
            />
            <label htmlFor="contact-phone" className={styles.radioLabel}>
              Phone
            </label>
          </div>
          <div className={styles.radioItem}>
            <input
              type="radio"
              id="contact-sms"
              name="preferredContact"
              value="sms"
              checked={formData.preferredContact === 'sms'}
              onChange={handleChange}
              className={styles.radio}
            />
            <label htmlFor="contact-sms" className={styles.radioLabel}>
              SMS
            </label>
          </div>
        </div>
        {errors.preferredContact && (
          <div className={styles.error}>{errors.preferredContact}</div>
        )}
      </div>

      <div className={styles.formGroup}>
        <div className={styles.checkboxItem}>
          <input
            type="checkbox"
            id="newsletter"
            name="newsletter"
            checked={formData.newsletter || false}
            onChange={handleChange}
            className={styles.checkbox}
          />
          <label htmlFor="newsletter" className={styles.checkboxLabel}>
            Subscribe to newsletter for updates and promotions
          </label>
        </div>
      </div>

      <div className={styles.formGroup}>
        <div className={styles.checkboxItem}>
          <input
            type="checkbox"
            id="notifications"
            name="notifications"
            checked={formData.notifications || false}
            onChange={handleChange}
            className={styles.checkbox}
          />
          <label htmlFor="notifications" className={styles.checkboxLabel}>
            Receive push notifications on mobile devices
          </label>
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="comments" className={styles.label}>
          Additional Comments (Optional)
        </label>
        <textarea
          id="comments"
          name="comments"
          value={formData.comments || ''}
          onChange={handleChange}
          className={styles.textarea}
          placeholder="Any additional information you'd like to share..."
          rows="4"
        />
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
          Review →
        </button>
      </div>
    </div>
  );
};

export default PreferencesStep;