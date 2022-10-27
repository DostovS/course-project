import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../plugins/axios";
import User from "../components/user/User";
import Collection from "../components/Collection/Collection";
import Loader from '../components/UI/Loader';

export default function ProfilePage() {
  const [collections, setCollections] = useState([]);
  let refreshRate = 0;
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  console.log(currentUser.username);

  setInterval(function () {
    refreshRate++;
  }, 5000);

  useEffect(() => {
    async function fetchCollections() {
      const res = await axios.get(
        `collection/?username=${currentUser.username}`
      );
      console.log(res.data);
      setCollections(res.data);
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
        <User user={currentUser.username} />
        <h2 className="page-title">Collections</h2>
        {collections.length === 0 ? (
          <Loader />
        ) : null}
        {collections.map((col) => (
          <Collection collection={col} key={col._id} />
        ))}
      </div> 
      
    </div>
  );
}