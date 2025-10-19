import { createRoot } from "react-dom/client";
import { useState } from "react";
import TodoApp from "./components/practice/TodoApp";
import Calculator from "./components/practice/Calculator";
import ContactForm from "./components/practice/ContactForm";
import BankAccountDetails from "./components/practice/BankAccountDetails";
import LoginApp from "./components/practice/LoginApp";
import MultiStepForm from "./components/practice/MultiStepForm";

const App = () => {
  const [currentComponent, setCurrentComponent] = useState("menu");

  const components = {
    menu: "Component Menu",
    todo: "Todo App",
    calculator: "Calculator",
    contact: "Contact Form",
    bankAccount: "Bank Account Details",
    loginApp: "Login & Authentication",
    multiStepForm: "Multi-Step Form",
  };

  const renderComponent = () => {
    switch (currentComponent) {
      case "todo":
        return <TodoApp />;
      case "calculator":
        return <Calculator />;
      case "contact":
        return <ContactForm />;
      case "bankAccount":
        return <BankAccountDetails />;
      case "loginApp":
        return <LoginApp />;
      case "multiStepForm":
        return <MultiStepForm />;
      default:
        return (
          <div
            style={{
              maxWidth: "600px",
              margin: "0 auto",
              padding: "20px",
              textAlign: "center",
            }}
          >
            <h1>React Practice Components</h1>
            <p>Choose a component to practice with:</p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                marginTop: "30px",
              }}
            >
              {Object.entries(components).map(([key, name]) => {
                if (key === "menu") return null;
                return (
                  <button
                    key={key}
                    onClick={() => setCurrentComponent(key)}
                    style={{
                      padding: "15px 20px",
                      fontSize: "16px",
                      background: "#f7991f",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      transition: "background-color 0.2s",
                    }}
                    onMouseOver={(e) =>
                      (e.target.style.backgroundColor = "#f8d10d")
                    }
                    onMouseOut={(e) =>
                      (e.target.style.backgroundColor = "#f7991f")
                    }
                    onFocus={(e) =>
                      (e.target.style.backgroundColor = "#f8d10d")
                    }
                    onBlur={(e) => (e.target.style.backgroundColor = "#f7991f")}
                  >
                    {name}
                  </button>
                );
              })}
            </div>
          </div>
        );
    }
  };

  return (
    <div>
      {currentComponent !== "menu" && (
        <div
          style={{
            padding: "10px",
            background: "#f8f9fa",
            borderBottom: "1px solid #dee2e6",
          }}
        >
          <button
            onClick={() => setCurrentComponent("menu")}
            style={{
              padding: "8px 16px",
              background: "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            ← Back to Menu
          </button>
          <span
            style={{ marginLeft: "15px", fontSize: "18px", fontWeight: "bold" }}
          >
            {components[currentComponent]}
          </span>
        </div>
      )}
      {renderComponent()}
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
