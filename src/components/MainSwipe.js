import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { dbService } from "fbase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import { EffectFade, Autoplay } from "swiper";

import Button from "@mui/material/Button";

const MainSwipe = () => {
  const dispatch = useDispatch();
  const [mainCafe, setMainCafe] = useState([]);

  const isTablet = useMediaQuery({
    query: "(min-width:767px)",
  });
  const isMobile = useMediaQuery({
    query: "(min-width:480px)",
  });

  useEffect(() => {
    const fetchData = async () => {
      const q = await query(
        collection(dbService, "cafe"),
        orderBy("createdNow", "desc")
      );
      onSnapshot(q, (querySnapshot) => {
        const mainCafeArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMainCafe(mainCafeArray.slice(0, 2));
      });
    };
    fetchData();
  }, []);

  const onClickSwipeCafe = (mainCafe) => {
    dispatch({ type: "cafe", data: mainCafe });
  };

  return (
    <div className="flex flex-wrap justify-content">
      <Swiper
        loop="true"
        speed={1000}
        autoplay={{
          delay: 7000,
          disableOnInteraction: false,
        }}
        modules={[EffectFade, Autoplay]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        className="flex mq-mb-15 px-2 swiper-no-swiping"
      >
        {mainCafe.map((mainCafe, index) => (
          <SwiperSlide
            key={index}
            className={
              isTablet
                ? "flex justify-content max-height-350px"
                : "flex justify-content flex-wrap"
            }
          >
            <div
              style={{
                width: "350px",
                maxWidth: "350px",
                maxHeight: "350px",
                margin: 0,
              }}
            >
              <img
                key={index}
                src={mainCafe.fileUrl}
                alt={mainCafe.cafeName}
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>

            <div
              className={
                isMobile ? "text-left px-2 pb-1 mt-1" : "text-left pb-1 mt-1"
              }
            >
              <h2 className="text-s2 text-bold lspacing-1 text-shadow-70">
                {mainCafe.cafeName}
              </h2>
              <p className="my-2 lh-17 text-400 white-space-prew text-shadow-70">
                {mainCafe.cafeDesc}
              </p>

              <Link
                to={`/communit/${mainCafe.cafeName}`}
                onClick={() => {
                  onClickSwipeCafe(mainCafe);
                }}
              >
                <Button variant="contained" className="bg-123-81-127">
                  자세히 보기
                </Button>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MainSwipe;
