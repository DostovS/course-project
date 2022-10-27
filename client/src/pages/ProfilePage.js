import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import axios from "../plugins/axios";
import User from "../components/user/User";
import Collection from "../components/Collection/Collection";
import Loader from "../components/UI/Loader";

export default function ProfilePage() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [user, setUser] = useState({});
  const [collections, setCollections] = useState([]);
  let refreshRate = 0;
  const navigate = useNavigate();

  setInterval(function () {
    refreshRate++;
  }, 5000);

  useEffect(() => {
    async function fetchUser() {
      const res = await axios.post(`user`, { username: currentUser.username });

      setUser(res);
      console.log(user);
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      console.log(res);
    }
    async function fetchCollections() {
      const res = await axios.get(`collection/user/${currentUser._id}`);
      console.log(res.data);
      setCollections(res.data);
    }
    fetchUser();
    fetchCollections();
    // eslint-disable-next-line
  }, [refreshRate]);

  return (
    <div className="container">
      <Link to="" className="link-back" 
        onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon={faLeftLong} /> 
          Go back
      </Link>
      <div className="form">
        <User username={currentUser.username} />
        <h2 className="page-title">
          Collections
        </h2>
        {collections.length === 0 ? <Loader /> : null}
        {collections.map((col) => (
          <Collection collection={col} key={col._id} />
        ))}
      </div> 
    </div>
  );
}