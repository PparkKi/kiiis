import React, { useState } from "react";
import { useSelector } from "react-redux";
import { dbService } from "fbase";
import { addDoc, collection } from "firebase/firestore";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

const CustomerForm = (props) => {
  const userData = useSelector((state) => state.userData);
  const [boardTitle, setBoardTitle] = useState("");
  const [boardDesc, setBoardDesc] = useState("");
  const [boardType, setBoardType] = useState("");

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;

    if (name === "title") {
      setBoardTitle(value);
    } else if (name === "desc") {
      setBoardDesc(value);
    }
  };

  const onChangeRadio = (e) => {
    setBoardType(e.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (boardType == "") {
      alert("게시글 유형을 선택해주세요.");
      return;
    }

    let date = new Date();
    let year = date.getFullYear();
    let month = ("0" + (1 + date.getMonth())).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);

    const noticeInfo = {
      no: props.boardLength + 1,
      boardTitle: `[${boardType}] ${boardTitle}`,
      boardDesc: boardDesc,
      createdAt: `${year}.${month}.${day}`,
      createdDate: date,
      creatorId: userData.uid,
      creatorNickName: userData.displayName,
      viewCount: 0,
      type: boardType,
    };

    await addDoc(collection(dbService, "board"), noticeInfo);
    props.bwHandleClose();
  };

  return (
    <div>
      <Modal
        open={props.boardWrite}
        onClose={props.bwHandleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex align-items-center justify-content text-center"
      >
        <Box
          component="form"
          onSubmit={onSubmit}
          className="bgWhite border-radius min-width-250px pxy-2 mxy-1"
        >
          <TextField
            id="standard-basic"
            label="제목"
            variant="standard"
            type="text"
            name="title"
            onChange={onChange}
            fullWidth={true}
            inputProps={{ maxLength: 100 }}
          />
          <br />
          <br />
          <TextField
            id="outlined-multiline-static"
            label="내용"
            multiline
            rows={4}
            type="text"
            name="desc"
            onChange={onChange}
            fullWidth={true}
            inputProps={{ maxLength: 500 }}
          />
          <br />
          <br />
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
              row
            >
              <FormControlLabel
                value="공지"
                control={<Radio />}
                label="공지"
                onChange={onChangeRadio}
              />
              <FormControlLabel
                value="이벤트"
                control={<Radio />}
                label="이벤트"
                onChange={onChangeRadio}
              />
            </RadioGroup>
          </FormControl>
          <input type="submit" value="게시" />
        </Box>
      </Modal>
    </div>
  );
};

export default CustomerForm;
