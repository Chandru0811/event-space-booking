import React, { useEffect, useState } from "react";
import User from "./layouts/User";
import Admin from "./layouts/Admin";
import "../src/styles/client.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    sessionStorage.setItem("isAuthenticated", true);
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("isAuthenticated");
  };

  useEffect(() => {
    const isAuthenticatedFromStorage =
      sessionStorage.getItem("isAuthenticated");
    if (isAuthenticatedFromStorage === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <div className="App">
      {isAuthenticated ? (
        <Admin handleLogout={handleLogout} />
      ) : (
        <User handleLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
