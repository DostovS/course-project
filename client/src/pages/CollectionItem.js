import { useEffect, useState } from "react";
import axios from "../plugins/axios";
import { useParams } from "react-router-dom";
import Item from "../components/Item/Item";
import Collection from "../components/Collection/Collection";

export default function CollectionItems() {
  let { collectionID } = useParams();
  const [collection, setCollection] = useState([]);
  const [items, setItems] = useState([]);
  const [refreshRate, setRefreshRate] = useState(0);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  setInterval(() => {
    setRefreshRate(refreshRate + 1);
  }, 5000);
  async function getCollection() {
    const res = await axios.get(`collection/${collectionID}`);
    setCollection(res.data);
  }
  async function getItems() {
    const res = await axios.get(`items/${collectionID}`);
    const reversedItems = res.data.reverse();
    setItems(reversedItems);
  }
  useEffect(() => {
    getCollection();
    getItems();
    // eslint-disable-next-line
  }, []);
  async function likeItem(username, itemID) {
    await axios.put(`item/like/`, { username: username, itemID: itemID });
    getCollection();
    getItems();
  }
  async function unlikeItem(username, itemID) {
    await axios.put(`item/unlike/`, { username: username, itemID: itemID });
    getCollection();
    getItems();
  }
  return (
    <>
      <Collection collection={collection} />
      {items.map((item) => {
        return (
          <Item
            item={item}
            key={item._id}
            refresh={()=>{
                getCollection();
                getItems();
            }}
            like={() => {
              likeItem(currentUser.username, item._id);
            }}
            unlike={() => {
              unlikeItem(currentUser.username, item._id);
            }}
          />
        );
      })}
    </>
  );
}