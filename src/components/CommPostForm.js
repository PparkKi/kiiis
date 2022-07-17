import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";

import Cropper from "components/Cropper";

import Modal from "@mui/material/Modal";
import { IoMdImages } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

const CommPostForm = (props) => {
  const cafeData = useSelector((state) => state.cafeData);
  const [open, setOpen] = useState(props.postOpen ? true : false);
  const [cafeId, setCafeId] = useState(cafeData ? cafeData.id : null);
  const [postFile, setPostFile] = useState(props.postFile);

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;

    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;

      setPostFile(result);
    };
    reader.readAsDataURL(theFile);
  };

  const fileInput = useRef();

  const completeUpload = () => {
    props.postFormClose();
  };

  return (
    <>
      <Modal
        open={open}
        onClose={props.postFormClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex align-items-center justify-content flex-column"
      >
        <>
          <div className="flex justify-content align-items-center width-40p bgWhite border-radius-1 min-width-20rm min-height-25rm pt-15px">
            {postFile ? (
              <>
                <Cropper
                  imgFile={postFile}
                  cafeId={cafeId}
                  completeUpload={completeUpload}
                  cropStyle="post"
                />
              </>
            ) : (
              <>
                <label className="cursor-p" htmlFor="post-file">
                  <IoMdImages size={100} />
                  <p>사진 선택하기</p>
                </label>
                <input
                  id="post-file"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  ref={fileInput}
                  onChange={onFileChange}
                />
              </>
            )}
          </div>

          <div
            className="absolute top-10px right-10px cursor-p pxy-05"
            onClick={props.postFormClose}
          >
            <IoMdClose size={30} color="white" />
          </div>
        </>
      </Modal>
    </>
  );
};

export default CommPostForm;
