import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { storage } from "../firebase";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import axios from "../plugins/axios";
import Loader from "../components/UI/Loader";
import BaseCard from "../components/UI/BaseCard/BaseCard";

export default function UpdateItemPage(props) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  let { id } = useParams();

  const [dataUploading, setDataUploading] = useState(false);
  const [imageUpload, setImageUpload] = useState(null);
  const [tags, setTags] = useState([]);

  //Input states
  const [uploadStatus, setUploadStatus] = useState(false);
  const [priceState, setPriceState] = useState(false);
  const [yearState, setYearState] = useState(false);
  const [fromState, setFromState] = useState(false);
  const [linkState, setLinkState] = useState(false);

  //Inputs
  const [username, setUsername] = useState("");
  const [collectionID, setCollectionID] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [year, setYear] = useState("");
  const [from, setFrom] = useState("");
  const [link, setLink] = useState("");
  const [tag, setTag] = useState("");
  const [retrievedImageLink, setRetrievedImageLink] = useState("");
  const imageTitle = v4();

  useEffect(() => {
    const getItem = async () => {
      const res = await axios.get(`item/get/${id}`);
      console.log(res.data);
      setRetrievedImageLink(res.data.image);
      setCollectionID(res.data.collectionID);
      setUsername(res.data.username);
      setName(res.data.name);
      setDescription(res.data.description);
      setPrice(res.data.price);
      setYear(res.data.year);
      setFrom(res.data.from);
      setLink(res.data.link);
      setTags(res.data.tags);
      setRetrievedImageLink(res.data.image);

      //Set states
      if (res.data.price !== "") setPriceState(true);
      if (res.data.year !== "") setYearState(true);
      if (res.data.from !== "") setFromState(true);
      if (res.data.link !== "") setLinkState(true);
    };
    getItem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setDataUploading(true);
    let image = "";
    if (imageUpload) image = imageTitle;
    if (!imageUpload) image = retrievedImageLink;
    try {
      const data = {
        username: username,
        collectionID: collectionID,
        name: name,
        description: description,
        image: image,
        tags: tags,
        price: price ? price : "",
        year: year ? year : "",
        from: from ? from : "",
        link: link ? link : "",
        customInputs: "",
      };
      await axios.put(`item/update/${id}`, data).then(() => {
        //Upload Image
        const uploadImage = (e) => {
          if (imageUpload == null) return;
          setUploadStatus(false);
          const imageRef = ref(storage, `images/${imageTitle}`);
          uploadBytes(imageRef, imageUpload).then((url) => {
            //   alert("Image Uploaded Successfuly");
            setUploadStatus(true);
            setImageUpload(null);
            window.location.href = `/collection/items/${collectionID}`;
          });
        };
        uploadImage();
      });
      if (imageUpload == null) {
        window.location.href = `/user/${username}/${collectionID}`;
      }
    } catch (err) {
      alert(t("uitem-failed"));
      console.error(err);

      return false;
    }
  };
  function addTag(e) {
    e.preventDefault();
    if (tag === "") {
      alert(t("uitem-tag-fail"));
      return false;
    }
    setTag("");
    tags.push({
      id: v4(),
      tag: tag.toLowerCase(),
    });
    tag.current.value = "";
    console.log(tags);
  }

  function removeTag(id) {
    setTags(tags.filter((tag) => tag.id !== id));
  }

  const additionalFields = (
    <div>
      <br />
      <br />
      <h3>{t("input-addmoreinput")}</h3>
      {!priceState ? (
        <span
          className="btn-secondary btn btn-sm btn-additional-fields"
          onClick={() => {
            setPriceState(true);
          }}
        >
          {t("input-price")}
        </span>
      ) : null}
      {!yearState ? (
        <span
          className="btn-secondary btn btn-sm btn-additional-fields"
          onClick={() => {
            setYearState(true);
          }}
        >
          {t("input-year")}
        </span>
      ) : null}
      {!fromState ? (
        <span
          className="btn-secondary btn btn-sm btn-additional-fields"
          onClick={() => {
            setFromState(true);
          }}
        >
          {t("input-from")}
        </span>
      ) : null}
      {!linkState ? (
        <span
          className="btn-secondary btn btn-sm btn-additional-fields"
          onClick={() => {
            setLinkState(true);
          }}
        >
          {t("input-link")}
        </span>
      ) : null}
      <br />
      <br />
    </div>
  );

  return (
    <>
      {dataUploading ? (
        <Loader />
      ) : (
        <div>
          <Link to="" className="link-back" onClick={() => navigate(-1)}>
            <FontAwesomeIcon icon={faLeftLong} /> {t("goback")}
          </Link>
          <BaseCard>
            <form
              onSubmit={(e) => {
                handleUpdate(e);
              }}
            >
              <h2>{t("uitem-edit")}</h2>
              <div className="form-item">
                <br />
                <label className="form-label" htmlFor="name" required>
                  {t("input-name")}
                </label>
                <input
                  className="form-control input"
                  type="text"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  value={name}
                />
              </div>
              <div className="form-item">
                <br />
                <label className="form-label" htmlFor="description">
                  {t("input-description")}
                </label>
                <textarea
                  name="description"
                  rows="3"
                  className="form-control input"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  value={description}
                ></textarea>
              </div>
              <div className="form-item">
                <br />
                <label className="form-label" htmlFor="image">
                  {t("input-image")}
                </label>
                <div className="">
                  <input
                    className="form-control input"
                    type="file"
                    onChange={(event) => {
                      if (uploadStatus) event.target.files[0] = null;
                      setImageUpload(event.target.files[0]);
                    }}
                  />
                </div>
                <div className="form-item">
                  <br />
                  <label className="form-label" htmlFor="title" required>
                    {t("input-tags")}
                  </label>
                  <div className="d-flex justify-content-between">
                    <input
                      className="form-control input input-inline"
                      type="text"
                      value={tag}
                      onChange={(e) => setTag(e.target.value)}
                    />
                    <button
                      className="btn btn-secondary btn-inline"
                      onClick={(e) => {
                        addTag(e);
                      }}
                    >
                      {t("input-addtag")}
                    </button>
                  </div>
                </div>
                <div className="form-item tags">
                  {tags.map((t) => {
                    return (
                      <span className=" tag" key={t.id}>
                        {t.tag}
                        <FontAwesomeIcon
                          icon={faXmark}
                          className="tag-remove-icon"
                          onClick={() => {
                            removeTag(t.id);
                          }}
                        />
                      </span>
                    );
                  })}
                </div>
                {!priceState || !yearState || !fromState || !linkState
                  ? additionalFields
                  : null}
                {priceState ? (
                  <div className="form-tem">
                    <br />
                    <label className="form-label" htmlFor="price">
                      {t("input-price")}
                    </label>
                    <div className="d-flex justify-content-between">
                      <input
                        className="form-control input input-inline"
                        type="text"
                        onChange={(e) => {
                          setPrice(e.target.value);
                        }}
                        value={price}
                      />
                      <button
                        onClick={() => {
                          setPriceState(false);
                        }}
                        className="btn btn-danger btn-inline"
                      >
                        <FontAwesomeIcon icon={faTrashCan} />
                      </button>
                    </div>
                  </div>
                ) : null}
                {yearState ? (
                  <div className="form-tem">
                    <br />
                    <label className="form-label" htmlFor="year">
                      {t("input-year")}
                    </label>
                    <div className="d-flex justify-content-between">
                      <input
                        className="form-control input input-inline"
                        type="text"
                        onChange={(e) => {
                          setYear(e.target.value);
                        }}
                        value={year}
                      />
                      <button
                        onClick={() => {
                          setYearState(false);
                        }}
                        className="btn btn-danger btn-inline"
                      >
                        <FontAwesomeIcon icon={faTrashCan} />
                      </button>
                    </div>
                  </div>
                ) : null}
                {fromState ? (
                  <div className="form-tem">
                    <br />
                    <label className="form-label" htmlFor="from">
                      {t("input-from")}
                    </label>
                    <div className="d-flex justify-content-between">
                      <input
                        className="form-control input input-inline"
                        type="text"
                        onChange={(e) => {
                          setFrom(e.target.value);
                        }}
                        value={from}
                      />
                      <button
                        onClick={() => {
                          setFromState(false);
                        }}
                        className="btn btn-danger btn-inline"
                      >
                        <FontAwesomeIcon icon={faTrashCan} />
                      </button>
                    </div>
                  </div>
                ) : null}
                {linkState ? (
                  <div className="form-tem">
                    <br />
                    <label className="form-label" htmlFor="link">
                      {t("input-link")}
                    </label>
                    <div className="d-flex justify-content-between">
                      <input
                        className="form-control input input-inline"
                        type="text"
                        onChange={(e) => {
                          setLink(e.target.value);
                        }}
                        value={link}
                      />
                      <button
                        onClick={() => {
                          setLinkState(false);
                        }}
                        className="btn btn-danger btn-inline"
                      >
                        <FontAwesomeIcon icon={faTrashCan} />
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
              <button className="btn btn-success btn-submit" type="submit">
                {t("uitem-update")}
              </button>
            </form>
          </BaseCard>
        </div>
      )}
    </>
  );
}