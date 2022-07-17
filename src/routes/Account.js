import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { authService, googleProvider, facebookProvider } from "fbase";
import { signInWithPopup } from "firebase/auth";
import AccForm from "components/AccForm";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 350,
  bgcolor: "background.paper",
  border: "1px solid #7b517f",
  boxShadow: 24,
  p: 4,
};

const Account = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let accVal = Boolean;
  if (params.accountType === "login") accVal = true;
  else if (params.accountType === "signup") accVal = false;

  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;

    let provider;
    if (name === "google") {
      provider = googleProvider;
    } else if (name === "facebook") {
      provider = facebookProvider;
    }
    await signInWithPopup(authService, provider);
    navigate(`/`);
  };

  return (
    <div className="flex align-items-center mt-7 flex-column px-1">
      <h1 className="text-s2 text-bold text-shadow-10 text-center">
        카페 공간에 오신걸 환영합니다.
      </h1>
      <AccForm accVal={accVal} />

      <span>or</span>

      <div className="pxy-3-0 max-width-25 width-100p">
        <button
          onClick={onSocialClick}
          name="google"
          className="social-google social-button"
          id="icon-google"
        >
          <FcGoogle size={20} className="mr-05" /> google 로그인
        </button>
        <button
          onClick={onSocialClick}
          name="facebook"
          className="social-facebook social-button"
          id="icon-facebook"
        >
          <FaFacebook size={20} className="mr-05" /> facebook 로그인
        </button>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          우측 상단 "회원가입" 버튼 클릭 시 회원가입이 가능하며
          <br />
          테스트 계정을 사용하셔도 됩니다!
          <br /><br />
          <p>
            ID : t1@t1.com
            <br />
            PW : asd123
          </p>
        </Box>
      </Modal>
    </div>
  );
};

export default Account;
