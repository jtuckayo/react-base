import { useState } from "react";
import styles from "./ContactForm.module.css";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
      console.log("Form submitted:", formData);
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: "", email: "", subject: "", message: "" });
      }, 3000);
    } else {
      setErrors(newErrors);
    }
  };

  if (submitted) {
    return (
      <div className={styles.container}>
        <h2>Contact Form Practice</h2>
        <div className={styles.successMessage}>
          <h3>Thank you!</h3>
          <p>Your message has been submitted successfully.</p>
          <p>Form will reset in a moment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2>Contact Form Practice</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.fieldGroup}>
          <label htmlFor="name" className={styles.label}>
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
          />
          {errors.name && <div className={styles.error}>{errors.name}</div>}
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="email" className={styles.label}>
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
          />
          {errors.email && <div className={styles.error}>{errors.email}</div>}
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="subject" className={styles.label}>
            Subject *
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={`${styles.input} ${errors.subject ? styles.inputError : ''}`}
          />
          {errors.subject && <div className={styles.error}>{errors.subject}</div>}
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="message" className={styles.label}>
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
          />
          {errors.message && <div className={styles.error}>{errors.message}</div>}
        </div>

        <button type="submit" className={styles.submitButton}>
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactForm;