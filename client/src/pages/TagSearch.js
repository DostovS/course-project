import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../plugins/axios";
import Loader from "../components/UI/Loader";
import Item from "../components/Item/Item";
import { useTranslation } from "react-i18next";

export default function TagSearchPage() {
  const { t } = useTranslation();
  const { tag } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  async function fetchData() {
    try {
      const response = await axios.post(`item/tag`, { tag: tag });
      setItems(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }
  async function likeItem(username, itemID) {
    await axios.put(`item/like/`, { username: username, itemID: itemID });
    fetchData();
  }
  async function unlikeItem(username, itemID) {
    await axios.put(`item/unlike/`, { username: username, itemID: itemID });
    fetchData();
  }
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Loader />;
  if (error) return <div>{t("tag-fail")}</div>;
  return (
    <div>
      <h1>{t("tag-title")}: {tag}</h1>
      <div className="items">
        {items.length === 0 && <h2>{t("tag-empty")}</h2>}
        {items.map((item) => (
          <Item
            key={item._id}
            item={item}
            refresh={() => {
              fetchData();
            }}
            like={() => {
              likeItem(currentUser.username, item._id);
            }}
            unlike={() => {
              unlikeItem(currentUser.username, item._id);
            }}
          />
        ))}
      </div>
    </div>
  );
}