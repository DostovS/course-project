import { useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { storage } from "../firebase";
import { ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import axios from "../plugins/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import Loader from "../components/UI/Loader";
import BaseCard from "../components/UI/BaseCard/BaseCard";

export default function CreateItemPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [dataUploading, setDataUploading] = useState(false);

  const [imageUpload, setImageUpload] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(false);
  const [price, setPrice] = useState(false);
  const [year, setYear] = useState(false);
  const [from, setFrom] = useState(false);
  const [link, setLink] = useState(false);

  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);

  const nameRef = useRef("");
  const descriptionRef = useRef(null);
  const [priceRef, setPriceRef] = useState("");
  const [yearRef, setYearRef] = useState("");
  const [fromRef, setFromRef] = useState("");
  const [linkRef, setLinkRef] = useState("");
  const imageTitle = v4();

  const tagInput = useRef("");

  let { username, collectionID } = useParams();

  const additionalFields = (
    <div>
      <br />
      <br />
      <h3>{t("input-addmoreinput")}</h3>
      {!price ? (
        <span
          className="btn-secondary btn btn-sm btn-additional-fields"
          onClick={() => {
            setPrice(true);
          }}
        >
          {t("input-price")}
        </span>
      ) : null}
      {!year ? (
        <span
          className="btn-secondary btn btn-sm btn-additional-fields"
          onClick={() => {
            setYear(true);
          }}
        >
          {t("input-year")}
        </span>
      ) : null}
      {!from ? (
        <span
          className="btn-secondary btn btn-sm btn-additional-fields"
          onClick={() => {
            setFrom(true);
          }}
        >
          {t("input-from")}
        </span>
      ) : null}
      {!link ? (
        <span
          className="btn-secondary btn btn-sm btn-additional-fields"
          onClick={() => {
            setLink(true);
          }}
        >
          {t("input-link")}
        </span>
      ) : null}
      <br />
      <br />
    </div>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDataUploading(true);
    const nameInput = nameRef.current.value;
    const descriptionInput = descriptionRef.current.value;
    const priceInput = priceRef;
    const yearInput = yearRef;
    const fromInput = fromRef;
    const linkInput = linkRef;

    try {
      const data = {
        username: username,
        collectionID: collectionID,
        name: nameInput,
        description: descriptionInput,
        image: imageUpload ? imageTitle : "",
        tags: tags,
        price: priceInput ? priceInput : "",
        year: yearInput ? yearInput : "",
        from: fromInput ? fromInput : "",
        link: linkInput ? linkInput : "",
        customInputs: "",
      };
      await axios
        .post(`item/create/${username}/${collectionID}`, data)
        .then(() => {
          //Upload Image
          const uploadImage = (e) => {
            if (imageUpload == null) return;
            setUploadStatus(false);
            const imageRef = ref(storage, `images/${imageTitle}`);
            uploadBytes(imageRef, imageUpload).then((url) => {
              //   alert("Image Uploaded Successfuly");
              setUploadStatus(true);
              setImageUpload(null);
              window.location.href = `/user/${username}/${collectionID}`;
            });
          };
          uploadImage();
        });
      if (imageUpload == null) {
        window.location.href = `/user/${username}/${collectionID}`;
      }
    } catch (err) {
      alert("Something went wrong");
      console.error(err);

      return false;
    }
  };
  function addTag(e) {
    e.preventDefault();
    if (tagInput.current.value === "") {
      alert("Tag Field cannot be empty! Please, check your input");
      return false;
    }
    setTag("");
    tags.push({
      id: v4(),
      tag: tag.toLowerCase(),
    });
    tagInput.current.value = "";
    console.log(tags);
  }

  function removeTag(id) {
    setTags(tags.filter((tag) => tag.id !== id));
  }

  return (
    <>
      {dataUploading ? (
        <Loader />
      ) : (
        <div>
          <Link to="" className="link-back" onClick={() => navigate(-1)}>
            <FontAwesomeIcon icon={faLeftLong} /> {t("input-goback")}
          </Link>
          <BaseCard>
            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <h2>{t("input-create")}</h2>
              <div className="form-item">
                <br />
                <label className="form-label" htmlFor="name" required>
                  {t("input-name")}
                </label>
                <input
                  className="form-control input"
                  type="text"
                  ref={nameRef}
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
                  ref={descriptionRef}
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
                <div className="form-item mb-2">
                  <br />
                  <label className="form-label" htmlFor="title" required>
                    {t("input-tags")}
                  </label>
                  <div className="d-flex justify-content-between">
                    <input
                      className="form-control input input-inline"
                      type="text"
                      ref={tagInput}
                      value={tag}
                      onChange={(e) => setTag(e.target.value)}
                    />
                    <button
                      className="btn btn-secondary btn-inline ms-2"
                      onClick={(e) => {
                        addTag(e);
                      }}
                    >
                      {t("input-tags")}
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
                {!price || !year || !from || !link ? additionalFields : null}
                {price ? (
                  <div className="form-item">
                    <br />
                    <label className="form-label" htmlFor="price">
                      {t("input-price")}
                    </label>
                    <div className="d-flex justify-content-between">
                      <input
                        className="form-control input input-inline"
                        type="text"
                        onChange={(e) => setPriceRef(e.target.value)}
                      />
                      <button
                        onClick={() => {
                          setPrice(false);
                        }}
                        className="btn btn-danger btn-inline ms-2"
                      >
                        <FontAwesomeIcon icon={faTrashCan} />
                      </button>
                    </div>
                  </div>
                ) : null}
                {year ? (
                  <div className="form-item">
                    <br />
                    <label className="form-label" htmlFor="year">
                      {t("input-year")}
                    </label>
                    <div className="d-flex justify-content-between">
                      <input
                        className="form-control input input-inline"
                        type="text"
                        onChange={(e) => setYearRef(e.target.value)}
                      />
                      <button
                        onClick={() => {
                          setYear(false);
                        }}
                        className="btn btn-danger btn-inline ms-2"
                      >
                        <FontAwesomeIcon icon={faTrashCan} />
                      </button>
                    </div>
                  </div>
                ) : null}
                {from ? (
                  <div className="form-item">
                    <br />
                    <label className="form-label" htmlFor="from">
                      {t("input-from")}
                    </label>
                    <div className="d-flex justify-content-between">
                      <input
                        className="form-control input input-inline"
                        type="text"
                        onChange={(e) => setFromRef(e.target.value)}
                      />
                      <button
                        onClick={() => {
                          setFrom(false);
                        }}
                        className="btn btn-danger btn-inline ms-2"
                      >
                        <FontAwesomeIcon icon={faTrashCan} />
                      </button>
                    </div>
                  </div>
                ) : null}
                {link ? (
                  <div className="form-item">
                    <br />
                    <label className="form-label" htmlFor="link">
                      {t("input-link")}
                    </label>
                    <div className="d-flex justify-content-between">
                      <input
                        className="form-control input input-inline"
                        type="text"
                        onChange={(e) => setLinkRef(e.target.value)}
                      />
                      <button
                        onClick={() => {
                          setLink(false);
                        }}
                        className="btn btn-danger btn-inline ms-2"
                      >
                        <FontAwesomeIcon icon={faTrashCan} />
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
              <button className="btn btn-success btn-submit mt-3" type="submit">
                {t("input-submit")}
              </button>
            </form>
          </BaseCard>
        </div>
      )}
    </>
  );
}