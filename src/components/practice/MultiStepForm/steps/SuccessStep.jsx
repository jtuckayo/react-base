import styles from "../MultiStepForm.module.css";

const SuccessStep = ({ onReset }) => {
  return (
    <div className={styles.successContainer}>
      <div className={styles.successIcon}>🎉</div>

      <h3 className={styles.successTitle}>
        Registration Completed Successfully!
      </h3>

      <div className={styles.successMessage}>
        <p>
          Thank you for completing your registration. Your information has been
          submitted successfully and is being processed.
        </p>
        <p>
          You will receive a confirmation email shortly with further
          instructions and next steps.
        </p>
      </div>

      <div
        style={{
          background: "#f8d10dcc",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "30px",
          border: "1px solid #f8d10d",
        }}
      >
        <h4 style={{ margin: "0 0 10px 0", color: "#333" }}>
          What happens next?
        </h4>
        <ul
          style={{
            textAlign: "left",
            color: "#333",
            paddingLeft: "20px",
            margin: 0,
            lineHeight: "1.6",
          }}
        >
          <li>You&apos;ll receive a confirmation email within 5 minutes</li>
          <li>Our team will review your application within 24 hours</li>
          <li>
            You&apos;ll be contacted via your preferred method once approved
          </li>
          <li>Access credentials will be sent to your registered email</li>
        </ul>
      </div>

      <button type="button" onClick={onReset} className={styles.resetButton}>
        Start New Registration
      </button>
    </div>
  );
};

export default SuccessStep;
