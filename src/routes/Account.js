import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { authService, googleProvider, facebookProvider } from "fbase";
import { signInWithPopup } from "firebase/auth";
import AccForm from "components/AccForm";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

const Account = () => {
  const params = useParams();
  const navigate = useNavigate();

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
    </div>
  );
};

export default Account;
