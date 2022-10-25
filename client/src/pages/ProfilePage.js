import React from "react";
import User from "../components/user/User";

export default function ProfilePage() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  return (
    <div className="container form">
      <User username={currentUser.username} />
    </div>
  );
}