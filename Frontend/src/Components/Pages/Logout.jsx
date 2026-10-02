import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import ServerContext from "../../Context/ServerContext.js";

function Logout() {
  const { logout } = useContext(ServerContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default Logout;
