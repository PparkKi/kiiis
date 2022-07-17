import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";

import CommFilter from "components/CommFilter";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const BannerNav = ({ subType, cafeAllData }) => {
  const cafeData = useSelector((state) => state.cafeData);
  const searchData = useSelector((state) => state.searchData);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");

  const isMobile = useMediaQuery({
    query: "(min-width:480px)",
  });

  const breadcrumbs = [
    <Typography key="1" className="text-s07">
      홈
    </Typography>,
    <Typography key="2" className="text-s07" color="text.primary">
      {title}
    </Typography>,
  ];

  useEffect(() => {
    if (subType === "communit") {
      setTitle("카페 공간");
      setSubTitle("카페의 좋은 경험을 공유해 보세요!");
    } else if (subType === "intro") {
      setTitle("소개 공간");
    } else if (subType === "customer") {
      setTitle("고객 공간");
    }
  }, []);

  return (
    <div className="mb-2 border-bottom-1">
      <div className="bgDiv white flex flex-column align-items-center justify-content">
        <h1
          className={
            isMobile
              ? "text-s5 text-bold font-Dongle text-shadow-70"
              : "text-s3 text-bold font-Dongle text-shadow-70"
          }
        >
          “ {title} ”
        </h1>

        {!cafeData && subType === "communit" && (
          <CommFilter cafeAllData={cafeAllData} />
        )}

        {subType === "communit" && (
          <p className="text-300 text-s2 font-Dongle text-shadow-70">{subTitle}</p>
        )}
      </div>

      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        className="max-width-list-resp mx-auto pt-05 pb-05 pl-1rem"
      >
        {breadcrumbs}
      </Breadcrumbs>
    </div>
  );
};

export default BannerNav;
