import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "./App.css";

const Gallery = () => {
  const [images, setImages] = useState();
  const [modal, setModal] = useState(false);
  const [modalImgSrc, setModalImgSrc] = useState("");
  const getImg = (imgSrc) => {
    setModalImgSrc(imgSrc);
    setModal(true);
  };

  useEffect(() => {
    fetch("images?limit=10")
      .then((res) => res.json())
      .then((data) => {
        console.log("Success:", data);
        setImages(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const closeModal = () => {
    setModalImgSrc();
    setModal(false);
  };

  const handleKeyPress = (e, url) => {
    console.log(e, url )
    if(e.key === 'Enter') {
      getImg(url);
    }
  };

  const placeholder = <div className="photo-placeholder"></div>;

  return (
    <>
      <div className={modal ? "modal open" : "modal"}>
        <img src={`${modalImgSrc}.jpg`} alt="" />
        <button
          className="closeModal"
          onClick={closeModal}
          type="button"
          aria-label="Close Image Full View"
        ></button>
      </div>
      <div className="gallery">
        {images &&
          images.map((img) => (
            <div
              key={img.id}
              className="photos"
              onClick={() => getImg(img.url)}
              tabIndex="0"
              onKeyPress={(e) => handleKeyPress(e, img.url )}
              role="button"
            >
              <LazyLoadImage
                key={img.id}
                src={`${img.url}.jpg`}
                effect="blur"
                className="lazyImg"
                placeholderSrc={placeholder}
              ></LazyLoadImage>
              {/* <img src={`${img.url}.jpg`} alt='' loading="lazy"/> */}
              <div className="userProfileImage">
                <img
                  src={`${img.user.profile_image}.webp`}
                  alt=""
                  loading="lazy"
                />
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Gallery;
