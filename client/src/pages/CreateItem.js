import React, {useState, useRef} from 'react'
import BaseCard from '../components/UI/BaseCard/BaseCard';
import { Link } from 'react-router-dom';
import { v4 } from "uuid";
import { storage } from "../firebase";
import { ref, uploadBytes } from "firebase/storage";
export default function CreateItemPage() {
  const [imageUpload, setImageUpload] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(false);
  const [imageTitle, setImageTitle] = useState("");
  const [price, setPrice] = useState(false);
  const [year, setYear] = useState(false);
  const [from, setFrom] = useState(false);
  const [link, setLink] = useState(false);

  const nameInput = useRef();
  const descriptionInput = useRef();
  const priceInput = useRef();
  const yearInput = useRef();
  const fromInput = useRef();
  const linkInput = useRef();
  const tagInput = useRef();

  console.log(price, year, from, link);
  const additionalFields = (
    <div>
      <br />
      <br />
      <h3>Add more inputs</h3>
      {!price ? (
        <span
          className="btn-secondary btn btn-sm btn-additional-fields"
          onClick={() => {
            setPrice(true);
          }}
        >
          Price
        </span>
      ) : null}
      {!year ? (
        <span
          className="btn-secondary btn btn-sm btn-additional-fields"
          onClick={() => {
            setYear(true);
          }}
        >
          Year
        </span>
      ) : null}
      {!from ? (
        <span
          className="btn-secondary btn btn-sm btn-additional-fields"
          onClick={() => {
            setFrom(true);
          }}
        >
          From
        </span>
      ) : null}
      {!link ? (
        <span
          className="btn-secondary btn btn-sm btn-additional-fields"
          onClick={() => {
            setLink(true);
          }}
        >
          Link
        </span>
      ) : null}
      <br />
      <br />
    </div>
  );
  const uploadImage = (event) => {
    event.preventDefault();
    if (imageUpload == null) return;
    setImageTitle(v4());
    console.log(imageTitle);
    console.log(imageUpload);
    setUploadStatus(false)   

    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((url) => {
      alert("Image Uploaded Successfuly");
      setUploadStatus(true);
      setImageUpload(null);
    });
  };

  
  async function handleSubmit(event) {
    event.preventDefault();
    console.log(`name: ${nameInput.current.value}
    descrtiptio: ${descriptionInput.current.value}
    price: ${priceInput.current.value}
    year: ${yearInput.current.value}
    from: ${fromInput.current.value}
    link: ${linkInput.current.value}`);
  }

  return (
    <div className='container'>
      <Link to=""></Link>
      <BaseCard>
        <form onSubmit={handleSubmit}>
          <h2>Create Item</h2>
          <div className="form-tem">
            <label className="form-label" htmlFor="name" required>
              Name
            </label>
            <input className="form-control" type="text" ref={nameInput} />
          </div>
          <div className="form-item">
            <label className="form-label" htmlFor="image">
              Image
            </label>
            <div className="">
              <input
                className="form-control"
                type="file"
                onChange={(event) => {
                  if (uploadStatus) event.target.files[0] = null;
                  setImageUpload(event.target.files[0]);
                }}
              />
              {!uploadStatus ? (
                <button
                  onClick={uploadImage}
                  className="btn btn-secondary form-button"
                >
                  Upload Photo
                </button>
              ) : null}
            </div>
            <div className="form-item">
              <label className="form-label" htmlFor="title" required>
                Tags
              </label>
              <div className="d-flex justify-content-between">
                <input
                  className="form-control input-inline"
                  type="text"
                  ref={tagInput}
                />
                <button className="btn btn-secondary btn-inline">
                  Add tag
                </button>
              </div>
            </div>
            {!price || !year || !from || !link ? additionalFields : null}
            {price ? (
              <div className="form-tem">
                <label className="form-label" htmlFor="price">
                  Price
                </label>
                <div className="d-flex justify-content-between">
                  <input
                    className="form-control input-inline"
                    type="text"
                    ref={priceInput}
                  />
                  <button
                    onClick={() => {
                      setPrice(false);
                    }}
                    className="btn btn-danger btn-inline"
                  >
                    Remove Input
                  </button>
                </div>
              </div>
            ) : null}
            {year ? (
              <div className="form-tem">
                <label className="form-label" htmlFor="year">
                  Year
                </label>
                <div className="d-flex justify-content-between">
                  <input
                    className="form-control input-inline"
                    type="text"
                    ref={yearInput}
                  />
                  <button
                    onClick={() => {
                      setYear(false);
                    }}
                    className="btn btn-danger btn-inline"
                  >
                    Remove Input
                  </button>
                </div>
              </div>
            ) : null}
            {from ? (
              <div className="form-tem">
                <label className="form-label" htmlFor="from">
                  From (Place)
                </label>
                <div className="d-flex justify-content-between">
                  <input
                    className="form-control input-inline"
                    type="text"
                    ref={fromInput}
                  />
                  <button
                    onClick={() => {
                      setFrom(false);
                    }}
                    className="btn btn-danger btn-inline"
                  >
                    Remove Input
                  </button>
                </div>
              </div>
            ) : null}
            {link ? (
              <div className="form-tem">
                <label className="form-label" htmlFor="link">
                  Link to website
                </label>
                <div className="d-flex justify-content-between">
                  <input
                    className="form-control input-inline"
                    type="text"
                    ref={linkInput}
                  />
                  <button
                    onClick={() => {
                      setLink(false);
                    }}
                    className="btn btn-danger btn-inline"
                  >
                    Remove Input
                  </button>
                </div>
              </div>
            ) : null}
          </div>
          <button className="btn btn-success btn-submit">Submit</button>
          
        </form>
      </BaseCard>
    </div>
  );
}