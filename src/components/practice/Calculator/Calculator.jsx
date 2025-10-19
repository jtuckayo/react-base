import { useState } from "react";
import styles from "./Calculator.module.css";

const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num) => {
    if (waitingForOperand) {
      setDisplay(String(num));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? String(num) : display + num);
    }
  };

  const inputOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case "+": return firstValue + secondValue;
      case "-": return firstValue - secondValue;
      case "×": return firstValue * secondValue;
      case "÷": return firstValue / secondValue;
      case "=": return secondValue;
      default: return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const clear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  return (
    <div className={styles.container}>
      <h2>Calculator Practice</h2>
      <div className={styles.calculator}>
        <div className={styles.display}>
          {display}
        </div>
        <div className={styles.buttonGrid}>
          <button className={styles.button} onClick={clear}>C</button>
          <button className={styles.button} onClick={() => inputOperation("÷")}>÷</button>
          <button className={styles.button} onClick={() => inputOperation("×")}>×</button>
          <button className={styles.button} onClick={() => inputOperation("-")}>-</button>
          
          <button className={styles.button} onClick={() => inputNumber(7)}>7</button>
          <button className={styles.button} onClick={() => inputNumber(8)}>8</button>
          <button className={styles.button} onClick={() => inputNumber(9)}>9</button>
          <button className={styles.button} onClick={() => inputOperation("+")}>+</button>
          
          <button className={styles.button} onClick={() => inputNumber(4)}>4</button>
          <button className={styles.button} onClick={() => inputNumber(5)}>5</button>
          <button className={styles.button} onClick={() => inputNumber(6)}>6</button>
          <button className={`${styles.button} ${styles.equalsButton}`} onClick={performCalculation}>=</button>
          
          <button className={styles.button} onClick={() => inputNumber(1)}>1</button>
          <button className={styles.button} onClick={() => inputNumber(2)}>2</button>
          <button className={styles.button} onClick={() => inputNumber(3)}>3</button>
          
          <button className={`${styles.button} ${styles.zeroButton}`} onClick={() => inputNumber(0)}>0</button>
          <button className={styles.button} onClick={() => setDisplay(display + ".")}>.</button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;