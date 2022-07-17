import React, { useState } from "react";
import { useSelector } from "react-redux";
import { dbService } from "fbase";
import { addDoc, collection } from "firebase/firestore";

import { Box } from "@mui/system";
import Button from "@mui/material/Button";
import TextareaAutosize from "react-textarea-autosize";

const CommCommForm = ({ userData, cafeId, postId }) => {
  const [comment, setComment] = useState("");
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setComment(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!userData) {
      return alert("로그인 후 이용해 주세요.");
    }

    let date = new Date();
    let year = date.getFullYear();
    let month = ("0" + (1 + date.getMonth())).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    let hours = ("0" + date.getHours()).slice(-2);
    let minutes = ("0" + date.getMinutes()).slice(-2);

    const commentData = {
      creatorId: userData.uid,
      creatorNickName: userData.displayName,
      createdAt: `${year}.${month}.${day}  ${hours}:${minutes}`,
      createdDate: date,
      postComment: comment,
      creatorPhoto: userData.photoURL,
    };

    if (comment === "") {
      return alert("메시지를 입력해 주세요!");
    } else {
      await addDoc(
        collection(dbService, "cafe", cafeId, "posts", postId, "comment"),
        commentData
      );
      setComment("");
    }
  };

  return (
    <>
      <Box
        component="form"
        autoComplete="off"
        onSubmit={onSubmit}
        className="flex align-items-center"
      >
        <TextareaAutosize
          placeholder="댓글 달기..."
          onChange={onChange}
          className="textarea-none flex-1"
          maxRows={4}
          value={comment}
        />
        <Button variant="outlined" disableElevation type="submit">
          전송
        </Button>
      </Box>
    </>
  );
};

export default CommCommForm;
