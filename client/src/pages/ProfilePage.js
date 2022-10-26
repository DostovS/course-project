import React from "react";
import User from "../components/user/User";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";

export default function ProfilePage() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();
  return (
    <div className="container">
      <Link to="/" className="link-back" 
        onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={faLeftLong} /> 
        Go back
      </Link>
      <div className="form">
        <User username={currentUser.username} />
      </div>
      
    </div>
  );
}