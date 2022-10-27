import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../plugins/axios";
import User from "../components/user/User";
import Collection from "../components/Collection/Collection";

export default function ProfilePage() {
  const [collections, setCollections] = useState([]);
  let refreshRate = 0;
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  console.log(currentUser._id);

  setInterval(function () {
    refreshRate++;
    console.log(refreshRate);
  }, 2000);

  useEffect(() => {
    async function fetchCollections() {
      const res = await axios.get(`collection/${currentUser.username}`);
      console.log(res);
      setCollections(res);
    }
    fetchCollections();
  }, [refreshRate]);

  return (
    <div className="container">
      <Link to="/" className="link-back" 
        onClick={() => navigate(-1)}>
         Go back
      </Link>
      <div className="form">
        <User username={currentUser.username} />
        <h2>Collections</h2>
        {collections.map((col) => (
          <Collection />
        ))}
      </div> 
      
    </div>
  );
}