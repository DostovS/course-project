import { useState, useEffect } from "react";
import Collection from "../components/Collection/Collection";
import Item from "../components/Item/Item";
import Loader from "../components/UI/Loader";
import axios from "../plugins/axios";
import { useTranslation } from "react-i18next";

export default function HomePage() {
  const { t } = useTranslation();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  //eslint-disable-next-line
  const [items, setItems] = useState([]);
  const [collections, setCollections] = useState([]);
  const [isSelected, setIsSelected] = useState("items");
  const [itemPage, setItemPage] = useState(0);
  const [itemsLeft, setItemsLeft] = useState(true);

  const getItems = async () => {
    const res = await axios.get(`recent/${itemPage}`);
    if (res.data.length < 5) setItemsLeft(false);
    items.push(...res.data);
    setItemPage(itemPage + 1);
  };
  const getCollections = async () => {
    const res = await axios.get("feed/collection");
    setCollections(res.data);
  };

  const loadMore = () => {
    setItemPage(itemPage + 1);
    getItems();
  };
  const refreshData = () => {
    setItemPage(itemPage - 1);
    setItemsLeft(true);
  };

  async function likeItem(username, itemID) {
    await axios.put(`item/like/`, { username: username, itemID: itemID });
  }
  async function unlikeItem(username, itemID) {
    await axios.put(`item/unlike/`, { username: username, itemID: itemID });
  }

  useEffect(() => {
    getCollections();
    getItems(itemPage);

    // getCollections();
    // getItems();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h1 className="text-center">
        {t("welcome")}
        <span className="fw-bold">{currentUser.name}</span>
      </h1>
      <p className="text-center">{t("lets-see-whats-over-there")}</p>
      <div className="btn-group m-auto">
        <button
          className={
            isSelected === "items" ? "btn btn-primary" : "btn btn-secondary"
          }
          onClick={() => {
            setIsSelected("items");
          }}
        >
          {t("items")}
        </button>
        <button
          className={
            isSelected === "collections"
              ? "btn btn-primary"
              : "btn btn-secondary"
          }
          onClick={() => {
            setIsSelected("collections");
          }}
        >
          {t("collections")}
        </button>
      </div>
      <div>
        {/* Show Collections */}
        {isSelected === "collections" &&
          collections.map((collection) => {
            console.log(collection);
            return <Collection key={collection._id} collection={collection} />;
          })}

        {/* Show Items  */}
        {isSelected === "items" ? (
          <div>
            {items.map((item) => {
              return (
                <div key={item._id}>
                  <Item
                    item={item}
                    refresh={refreshData}
                    like={() => {
                      likeItem(currentUser.username, item._id);
                    }}
                    unlike={() => {
                      unlikeItem(currentUser.username, item._id);
                    }}
                  />
                </div>
              );
            })}
            {collections.length === 0 && <Loader />}
            {itemsLeft ? (
              <button className="btn btn-secondary" onClick={loadMore}>
                {t("load-more")}
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}