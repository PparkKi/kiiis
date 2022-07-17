import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { dbService, storageService } from "fbase";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

import CafeInfoForm from "./CafeInfoForm";

import TextareaAutosize from "@mui/material/TextareaAutosize";

const Cropper = (props) => {
  const userData = useSelector((state) => state.userData);
  const [src, selectFile] = useState(props.imgFile);
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({
    unit: props.cropStyle === "post" ? "%" : "px",
    x: 10,
    y: 10,
    width: props.cropStyle === "post" ? 80 : 300,
    height: props.cropStyle === "post" ? 80 : 300,
  });
  const [result, setResult] = useState(null);
  const fileInput = useRef();
  const [cafeName, setCafeName] = useState("");
  const [desc, setDesc] = useState("");
  const [cafeMent, setCafeMent] = useState("");
  const [cafeLoc, setCafeLoc] = useState("");
  const [cafeLat, setCafeLat] = useState("");
  const [cafeLng, setCafeLng] = useState("");

  function getCroppedImg(e) {
    e.preventDefault();

    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    const base64Image = canvas.toDataURL("image/jpeg");
    setResult(base64Image);
  }

  function onImageLoad(e) {
    setImage(e.currentTarget);
  }

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;

    if (name === "cafeName") {
      setCafeName(value);
    } else if (name === "cafeMent") {
      setCafeMent(value);
    } else if (name === "cafeLoc") {
      setCafeLoc(value);
    } else if (name === "cafeLat") {
      setCafeLat(value);
    } else if (name === "cafeLng") {
      setCafeLng(value);
    } else if (name === "desc") {
      setDesc(value);
    }
  };

  const onClickUpload = async (event) => {
    event.preventDefault();

    let imgUrl = "";
    if (result !== "") {
      const fileRef = ref(storageService, `${userData.uid}/${uuidv4()}`);
      const response = await uploadString(fileRef, result, "data_url");
      imgUrl = await getDownloadURL(fileRef);
    }

    let dataNow = Date.now();
    let date = new Date();
    let year = date.getFullYear();
    let month = ("0" + (1 + date.getMonth())).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    let hours = ("0" + date.getHours()).slice(-2);
    let minutes = ("0" + date.getMinutes()).slice(-2);

    const post = {
      creatorId: userData.uid,
      creatorNickName: userData.displayName,
      creatorPhoto: userData.photoURL,
      postFav: 0,
      postDesc: desc,
      createdAt: `${year}.${month}.${day}  ${hours}:${minutes}`,
      postUrl: imgUrl,
    };

    const cafe = {
      creatorId: userData.uid,
      creatorNickName: userData.displayName,
      createdAt: `${year}.${month}.${day}  ${hours}:${minutes}`,
      createdNow: dataNow,
      fileUrl: imgUrl,
      cafeName,
      cafeMent,
      cafeLoc,
      cafeLat,
      cafeLng,
      cafeDesc: desc,
    };

    if (result) {
      if (props.cropStyle === "post") {
        if (desc === "") {
          return alert("게시글을 입력해 주세요.");
        } else {
          await addDoc(
            collection(dbService, "cafe", props.cafeId, "posts"),
            post
          );
        }
      } else if (props.cropStyle === "cafe") {
        await addDoc(collection(dbService, "cafe"), cafe);
      }
      setResult("");
      setImage(null);
      props.completeUpload();
      fileInput.current.value = null;
    }
  };

  return (
    <div className="flex flex-column">
      {src && result === null && (
        <>
          <ReactCrop
            src={src}
            crop={crop}
            aspect={props.cropStyle === "cafe" && 1 / 1}
            onChange={setCrop}
            ruleOfThirds
          >
            <img src={src} onLoad={onImageLoad} className="max-height-40" />
          </ReactCrop>
          <button
            className="text-bold text-s1 py-1 bgNone cursor-p"
            onClick={getCroppedImg}
          >
            편집하기
          </button>
        </>
      )}
      {result && (
        <>
          <img
            src={result}
            ref={fileInput}
            alt="cropImg"
            className="max-height-40"
          />
          <div className="flex align-items-center px-1 flex-column">
            <TextareaAutosize
              aria-label="게시글 달기..."
              placeholder="게시글 달기..."
              onChange={onChange}
              name="desc"
              className="textarea-none flex-1 width-100p my-10px py-10px"
              maxRows={4}
            />
            {props.cropStyle === "cafe" && (
              <CafeInfoForm
                cafeName={cafeName}
                cafeMent={cafeMent}
                cafeLat={cafeLat}
                cafeLng={cafeLng}
                cafeLoc={cafeLoc}
                onChange={onChange}
              />
            )}
            <button
              className="text-bold text-s1 py-1 bgNone cursor-p"
              onClick={onClickUpload}
            >
              사진 업로드하기
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cropper;
