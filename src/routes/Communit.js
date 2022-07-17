import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";

import CommPost from "components/CommPost";
import CommPostForm from "components/CommPostForm";
import MainList from "components/MainList";
import MapComp from "components/MapComp";
import BannerNav from "components/BannerNav";

import Modal from "@mui/material/Modal";
import { MdAddBox } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import { BsFillArrowUpSquareFill } from "react-icons/bs";

const Communit = ({ cafeAllData }) => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.userData);
  const cafeData = useSelector((state) => state.cafeData);
  const searchData = useSelector((state) => state.searchData);
  const [cafePostLen, setCafePostLen] = useState(Number);
  const [postFile, setPostFile] = useState("");

  const [map, setMap] = useState(false);
  const maphandleClose = () => setMap(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    if (!userData) {
      alert("로그인 후 이용해 주세요.");
      return;
    } else setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setPostFile("");
  };

  const isMobile = useMediaQuery({
    query: "(min-width:480px)",
  });

  const cafePostLength = (len) => {
    setCafePostLen(len);
  };

  const onScrollTop = () => {
    window.scrollTo({ top: 0, left: 0 });
  };

  useEffect(() => {
    onScrollTop();

    if (!cafeData) {
      navigate(`/communit/cafe`);
    }
  }, []);

  return (
    <>
      {!cafeData && (
        <BannerNav subType={"communit"} cafeAllData={cafeAllData} />
      )}

      <div className="container">
        <div className="max-width-list-resp mx-auto">
          {cafeData ? (
            <>
              <div
                className={
                  isMobile
                    ? "flex flex-row justify-content-start align-items-center pxy-3-0 border-bottom-1"
                    : "flex flex-column justify-content-start align-items-stretch pt-15 border-bottom-1"
                }
              >
                <div className="flex-1">
                  <div className="width-150px height-150px mx-auto">
                    <img
                      src={cafeData.fileUrl}
                      alt={cafeData.cafeName}
                      className="width-100p height-100p border-radius-50p"
                    />
                  </div>
                </div>

                <div
                  className={
                    isMobile
                      ? "flex flex-column flex-2 pr-1rem"
                      : "flex flex-column flex-2 pxy-1"
                  }
                >
                  <div
                    className={
                      isMobile
                        ? "flex align-items-center"
                        : "flex align-items-center justify-content-space-between"
                    }
                  >
                    <h1 className="text-s2 text-bold mr-3">
                      {cafeData.cafeName}
                    </h1>
                    <div className="flex align-items-center">
                      <MdAddBox
                        size={35}
                        className="mr-1 cursor-p"
                        onClick={handleOpen}
                      />
                      <FaMapMarkerAlt
                        size={30}
                        className=" cursor-p"
                        onClick={() => {
                          setMap(true);
                        }}
                      />
                    </div>
                  </div>
                  <p className="my-15 text-300 lh-12 white-space-prew lh-1">
                    {cafeData.cafeDesc}
                  </p>
                  <span>게시물 &nbsp; {cafePostLen}</span>
                </div>
              </div>

              {open && (
                <CommPostForm
                  postOpen={open}
                  postFormClose={handleClose}
                  postFile={postFile}
                />
              )}
            </>
          ) : (
            <div className="mb-2">
              <MainList
                cafeAllData={!searchData ? cafeAllData : searchData}
                commStyle={true}
              />
            </div>
          )}

          {cafeData && (
            <div className={isMobile ? "pxy-3-1" : "pxy-1"}>
              <CommPost cafePostLength={cafePostLength} />
            </div>
          )}

          {map && (
            <Modal
              open={map}
              onClose={maphandleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              className="flex align-items-center justify-content text-center"
            >
              <div>
                <MapComp />
              </div>
            </Modal>
          )}
        </div>
      </div>

      <BsFillArrowUpSquareFill
        size={40}
        onClick={onScrollTop}
        className="cursor-p fixed bottom-10px right-10px z-index-1 text-color-7b517f"
      />
    </>
  );
};

export default Communit;
