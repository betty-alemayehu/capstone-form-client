import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { UserProvider } from "./utils/UserContext.jsx"; // Import UserProvider

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserProvider>
    <App />
  </UserProvider>
);
