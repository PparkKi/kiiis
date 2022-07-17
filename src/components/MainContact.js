import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import footerImg from "images/footer/footer_img.png";
import { addDoc, collection } from "firebase/firestore";
import { dbService } from "fbase";

const theme = createTheme({
  palette: {
    neutral: {
      contrastText: "#fff",
    },
  },
});

const MainContact = () => {
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [desc, setDesc] = useState("");

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;

    if (name === "company") {
      setCompany(value);
    } else if (name === "phone") {
      setPhone(value);
    } else if (name === "desc") {
      setDesc(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (company === "" || phone === "" || desc === "") {
      alert("모든 내용을 입력해 주세요.");
      return;
    }

    let date = new Date();
    let year = date.getFullYear();
    let month = ("0" + (1 + date.getMonth())).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    let hours = ("0" + date.getHours()).slice(-2);
    let minutes = ("0" + date.getMinutes()).slice(-2);

    const contact = {
      company,
      phone,
      desc,
      createdAt: `${year}.${month}.${day}  ${hours}:${minutes}`,
    };
    await addDoc(collection(dbService, "contact"), contact).then(
      alert(
        "면접 제안이 성공적으로 이루어졌습니다.\n제안해 주셔서 감사드리며 빠른 시일 내에 연락드리도록 하겠습니다!"
      )
    );
    setCompany("");
    setPhone("");
    setDesc("");
  };

  return (
    <div className="flex flex-wrap justify-content max-width-900 mx-auto align-items-center justify-space-around">
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1 },
          width: "50%",
        }}
        noValidate
        autoComplete="off"
        onSubmit={onSubmit}
        id="mainOffer-form"
        className="flex flex-column mq-600-w30"
      >
        <TextField
          id="filled-basic"
          label="회사명"
          variant="filled"
          onChange={onChange}
          name="company"
          value={company}
          className="bgWhite"
        />
        <TextField
          id="filled-basic"
          label="전화번호"
          variant="filled"
          onChange={onChange}
          name="phone"
          type="number"
          value={phone}
          className="bgWhite"
        />
        <TextField
          id="filled-multiline-static"
          label="내용"
          multiline
          rows={3}
          variant="filled"
          style={{ display: "flex" }}
          onChange={onChange}
          name="desc"
          value={desc}
          className="bgWhite"
        />

        <ThemeProvider theme={theme}>
          <Button
            color="neutral"
            variant="contained"
            type="submit"
            className="bg-123-81-127"
          >
            제안하기
          </Button>
        </ThemeProvider>
      </Box>

      <div>
        <img src={footerImg} style={{ width: "18rem" }} />
      </div>
    </div>
  );
};

export default MainContact;
