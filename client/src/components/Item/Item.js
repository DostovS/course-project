import BaseCard from "../UI/BaseCard/BaseCard";
import { useState } from "react";
import { Link } from "react-router-dom";
export default function Item() {
  const [liked, setLiked] = useState(false);


  const toggleLike = () => {
    setLiked(!liked);
  };
  return (
    <>
      <BaseCard>
        <div className="flexcontainer">
          <div className="image">
            <img src="" alt="" />
            </div>
          <div>
            <h3>Motherfucker Bruh</h3>
            <Link className="italic username" to="/">
              @username
            </Link>
            <ul>
              <li>
                Here is the description of an item that no one gives a fuck of
                its presence
              </li>
              <li>Price: $978.99</li>
              <li>Year: 2002</li>
              <li>From: Uzbekistan</li>
            </ul>
            <div className="tags">
              <span className="tag">dev</span>
              <span className="tag">fullstack</span>
              <span className="tag">web</span>
            </div>
            <div className="likes">
              <div className="like">
                {liked ? (
                  <button
                    className="btn btn-light btn-like"
                    onClick={toggleLike}
                  >
                    Like 👍
                  </button>
                ) : null}
                {!liked ? (
                  <button
                    className="btn btn-light btn-like"
                    onClick={toggleLike}
                  >
                    Remove Like 🚮
                  </button>
                ) : null}
              </div>
              <div className="liked-by">
                <span>
                  Liked by <strong>cockboner</strong> and{" "}
                </span>
                <span className="underline">other 54 people</span>
              </div>
            </div>
          </div>
        </div>
      </BaseCard>
    </>
  );
}