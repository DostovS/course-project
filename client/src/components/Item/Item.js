import BaseCard from "../UI/BaseCard/BaseCard";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../plugins/axios";
import './Item.scss';

export default function Item(props) {
  const [liked, setLiked] = useState(false);
  const currentUsername = localStorage.getItem("currentUser");
  const noImage =
    "https://media.istockphoto.com/vectors/no-image-available-picture-coming-soon-missing-photo-image-vector-id1379257950?b=1&k=20&m=1379257950&s=170667a&w=0&h=RyBlzT5Jt2U87CNkopCku3Use3c_3bsKS3yj6InGx1I=";
    const like = async (username, itemID) => {
      await axios.put(`item/like`, { username, itemID }).then(() => {
        setLiked(true);
      });
    };
    const unlike = async (username, itemID) => {
      await axios.put(`item/unlike`, { username, itemID }).then(() => {
        setLiked(false);
      });
    };
  
    return (
      <>
        <BaseCard>
          <div className="flexcontainer">
            <div className="image">
              {props.item.image === "" ? (
                <img src={noImage} alt="" />
              ) : (
                <img
                  src={`https://console.firebase.google.com/project/announce-ef079/storage/announce-ef079.appspot.com/o/images%2F${props.item.image}?alt=media`}
                  alt={props.item.image}
                />
              )}
            </div>
            <div>
              <h3>{props.item.name}</h3>
              <Link
                className="italic username"
                to={`/user/${props.item.username}`}
              >
                @{props.item.username}
              </Link>
              <p>Description: {props.item.description}</p>
              {props.item.price && <p>Price: ${props.item.price}</p>}
              {props.item.year && <p>Year: {props.item.year}</p>}
              {props.item.from && <p>From: {props.item.from}</p>}
              {props.item.link && (
                <p>
                  Link: <a href={props.item.link}>{props.item.link}</a>
                </p>
              )}
  
              <div className="tags">
                {props.item.tags.map((tag) => {
                  return (
                    <span className="tag" key={tag.id}>
                      {tag.tag}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="likes">
            <div className="like">
              {!liked ? (
                <button
                  className="btn btn-light btn-like"
                  onClick={() => {
                    like(currentUsername.username, props.item._id);
                  }}
                >
                  Like
                </button>
              ) : null}
              {liked ? (
                <button
                  className="btn btn-light btn-like"
                  onClick={() => {
                    unlike(currentUsername.username, props.item._id);
                  }}
                >
                  Unlike
                </button>
              ) : null} 
            </div>
            <div className="liked-by">
              <span>
                Liked by{" "}
                <strong>
                  <Link to="/">cockboner</Link>
                </strong>{" "}
                and{" "}
              </span>
              {props.item.likes.length !== 0 ? (
                <span className="underline">other 54 people</span>
              ) : null}{" "}
              others
            </div>
          </div>
        </BaseCard>
      </>
    );
  }