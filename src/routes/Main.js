import React from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import MainSwipe from "components/MainSwipe";
import MainList from "components/MainList";
import MainContact from "components/MainContact";

import Button from "@mui/material/Button";

const Main = ({ cafeAllData }) => {
  const isMobile = useMediaQuery({
    query: "(min-width:480px)",
  });

  return (
    <>
      <div className="relative text-center mb-5">
        <h1
          className={
            isMobile
              ? "text-s3 text-bold pt-5 text-shadow-10 lh-4"
              : "text-s2 text-bold pt-5 text-shadow-10 lh-4"
          }
        >
          Hello! 카페공간의
          <br />
          방문을 환영합니다!
        </h1>

        <p className="text-s12 mt-0875 mb-2 lh-15">
          여러 사람들이 좋아할 만한 <br />
          카페 정보를 볼 수 있도록 공유해 보세요.
        </p>

        <Link to="/communit/cafe">
          <Button
            variant="outlined"
            color="inherit"
            className="pxy-05-15 text-color-7b517f border-1-7b517f"
          >
            바로가기
          </Button>
        </Link>
      </div>

      <div className="relative bg-170-155-221 text-center pt-3 pb-4 white mb-2 swiper-bg bg-dot">
        <div className="mb-2 lh-25">
          <h2
            className={
              isMobile
                ? "text-s4 font-Dongle text-shadow-70"
                : "text-s3 font-Dongle text-shadow-70"
            }
          >
            추천 카페 &amp; 이벤트
          </h2>
          <span className="text-s2 font-Dongle text-shadow-70">
            " 여기 좋아요!! "
          </span>
        </div>
        <MainSwipe />
      </div>

      <div className="relative text-center max-width-1200 mx-auto py-3">
        <div className="mb-2 lh-25">
          <h2
            className={
              isMobile ? "text-s4 font-Dongle mb-1" : "text-s3 font-Dongle mb-1"
            }
          >
            한번쯤 가보고 싶은 카페!
          </h2>
          <span className="text-s2 font-Dongle">"어디부터 가면 좋을까?!"</span>
        </div>
        <MainList cafeAllData={cafeAllData} />
      </div>

      <div className="relative bg-170-155-221 text-center pt-3 pb-3 white">
        <h2 className="text-s4 mb-2 font-Dongle text-shadow-70">CONTACT</h2>
        <MainContact />
      </div>
    </>
  );
};

export default Main;
