import BaseCard from "../UI/BaseCard/BaseCard";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../plugins/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { v4 } from "uuid";
import Modal from "../UI/Modal";
import './Item.scss';
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Loader from '../UI/Loader';
import { faComment } from "@fortawesome/free-solid-svg-icons";

export default function Item(props) {
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const currentUsername = localStorage.getItem("currentUser");
  const currentUser = JSON.parse(currentUsername);
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
  const getDate = (date) => {
    const date1 = new Date(date);
    return new Intl.DateTimeFormat().format(date1);
  };
  const sendComment = async () => {
    setLoading(true);
    const comment = {
      itemID: v4(),
      username: currentUser.username,
      comment: commentInput,
    };
    if (commentInput.trim() !== "") {
      await axios.put(`item/comment/${props.item._id}`, comment).then(() => {
        setLoading(false);
        setCommentInput("");
      });
    } else {
      alert("Comment cannot be empty");
      return false;
    }
  };
  const checkIfLiked = (item) => {
    for (let i = 0; i < props.item.likes.length; i++) {
      if (props.item.likes[i] === currentUser.username) {
        return true;
      } else {
        return false;
      }
    }
  };
    return (
      <>
        <BaseCard>
          <div className="item">
            <div className="flexcontainer">
              <div className="image">
                {props.item.image === "" ? (
                  <img src={noImage} alt="" />
                ) : (
                  <img
                    src={`https://firebasestorage.googleapis.com/v0/b/itransition-a1be2.appspot.com/o/images%2F${props.item.image}?alt=media`}
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
                <p>
                  Description:{" "}
                  {props.item.description.trim() === ""
                    ? "No description..."
                    : props.item.description}
                </p>
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
              {liked && checkIfLiked() ? (
                  <button
                    className="btn btn-light btn-like"
                    onClick={() => {
                      like(currentUser.username, props.item._id);
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faHeart}
                      className="heart-icon-crack"
                    />
                  </button>
                ) : null}
                {liked ? (
                  <button
                    className="btn btn-light btn-like"
                    onClick={() => {
                      unlike(currentUser.username, props.item._id);
                    }}
                  >
                    <FontAwesomeIcon icon={faHeart} className="heart-icon" />
                  </button>
                ) : null}
              </div>
              <div className="liked-by">
                {props.item.likes.length !== 0 ? (
                  <div>
                    <span>
                      Liked by <Link to="/">{props.item.likes[0]}</Link>
                    </span>
                  </div>
                ) : null}
              </div>
              <span
                className="btn-liked-usernames"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                {props.item.likes.length > 1 ? (
                  <span className="underline">
                    {" "}
                    and other {props.item.likes.length - 1} users
                  </span>
                ) : null}
              </span>
              <Modal title="Likes">
                <ul className="list-group">
                  {props.item.likes.map((username) => {
                    return (
                      <li
                        className="list-group-item"
                        key={v4()}
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                      >
                        <Link to={`/user/${username}`}>{username}</Link>
                      </li>
                    );
                  })}
                </ul>
              </Modal>
            </div>

            {loading ? (
              <Loader />
            ) : (
              <div>
                <div className="form-item">
                  <div className="d-flex justify-content-between">
                    <input
                      className="form-control input-inline"
                      type="text"
                      placeholder="Type your comment here ..."
                      onChange={(e) => {
                        setCommentInput(e.target.value);
                      }}
                    />
                    <button
                      className="btn btn-primary btn-inline"
                      onClick={sendComment}
                    >
                      <FontAwesomeIcon icon={faPaperPlane} />
                    </button>
                  </div>
                </div>
              </div>
            )}
            <div className="form-item">
              <ul className="list-group">
                {props.item.comments.map((comment) => {
                  return (
                    <li className="list-group-item" key={comment.commentID}>
                    <div className="comment">
                      <div className="d-flex align-items-center">
                        <FontAwesomeIcon icon={faComment} className="p-2 badge bg-primary text-wrap" />
                        <Link to={`/user/${comment.username}`} className="p-2">
                          @{comment.username}
                        </Link>
                        <span className="ms-auto p-2">
                          {getDate(comment.date)}
                        </span>
                      </div>
                      <p className="p-2">{comment.comment}</p>
                    </div>
                  </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </BaseCard>
      </>
    )
  }