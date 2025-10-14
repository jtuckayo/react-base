import { createRoot } from "react-dom/client";

const App = () => {
  return (
    <div>
      <h1>Base React App</h1>
      <p>This is a simple React application.</p>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
