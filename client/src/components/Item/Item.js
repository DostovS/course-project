import BaseCard from "./UI/BaseCard/BaseCard";
import { useState } from "react";
import { Link } from "react-router-dom";
import image from 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.citypng.com%2Fphoto%2F21603%2Fpng-shop-market-round-vector-icon&psig=AOvVaw2l3i_RWmD0dqbm6NUYYv5f&ust=1666950003916000&source=images&cd=vfe&ved=0CA0QjRxqFwoTCIiWyumOgPsCFQAAAAAdAAAAABAE'
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
            <img src={image} alt="" />
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