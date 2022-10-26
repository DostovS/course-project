import React from "react";
import User from "../components/user/User";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import axios from "../plugins/axios";
import Collection from "../components/Collection/Collection";

export default function ProfilePage() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();
  async function fetchCollections() {
    const res = await axios.get(`collection/${currentUser.username}`);
    console.log(res);

  }
  fetchCollections();
  return (
    <div className="container">
      <Link to="/" className="link-back" 
        onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={faLeftLong} /> 
        Go back
      </Link>
      <div className="form">
        <User username={currentUser.username} />
        <Collection />
      </div>
      
    </div>
  );
}