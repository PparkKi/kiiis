import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { dbService } from "fbase";
import { useMediaQuery } from "react-responsive";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

import CommCommForm from "./CommCommForm";
import CommPostComment from "./CommPostComment";

import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Modal from "@mui/material/Modal";
import { FaHeart } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CommPost = (props) => {
  const userData = useSelector((state) => state.userData);
  const cafeData = useSelector((state) => state.cafeData);
  const [cafeId, setCafeId] = useState(cafeData ? cafeData.id : null);
  const [cafePost, setCafePost] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [snackbar, setSnackbar] = useState(false);
  const snackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar(false);
  };
  const [slideIndex, setSlideIndex] = useState(0);
  const [postNickName, setPostNickName] = useState(null);
  const [postDesc, setPostDesc] = useState([]);
  const [postDate, setPostDate] = useState([]);
  const [postPhotoURL, setPostPhotoURL] = useState([]);
  const [postId, setPostId] = useState(null);
  const isTablet = useMediaQuery({
    query: "(min-width:768px)",
  });
  const isMobile = useMediaQuery({
    query: "(min-width:480px)",
  });

  useEffect(() => {
    if (!cafeData) return;

    const fetchData = async () => {
      const q = await query(
        collection(dbService, "cafe", cafeId, "posts"),
        orderBy("createdAt", "desc")
      );
      onSnapshot(q, (querySnapshot) => {
        const postArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCafePost(postArray);
        props.cafePostLength(postArray.length);
      });
    };
    fetchData();
  }, []);

  const onClickPost = (index) => {
    setSlideIndex(index + 1);
    setPostDesc(cafePost[index].postDesc);
    setPostDate(cafePost[index].createdAt);
    setPostNickName(cafePost[index].creatorNickName);
    setPostPhotoURL(cafePost[index].creatorPhoto);
    handleOpen();
  };

  const slides = [];
  for (let i = 0; i < cafePost.length; i++) {
    slides.push(
      <SwiperSlide key={`slide-${i}`}>
        <img
          src={cafePost[i].postUrl}
          className="width-100p height-100p objectFit-contain"
        />
      </SwiperSlide>
    );
  }

  const onClickFav = async () => {
    const favObj = {
      user_id: userData.uid,
      post_id: postId,
    };

    const q = query(
      collection(dbService, "fav_whether"),
      where("user_id", "==", userData.uid),
      where("post_id", "==", postId)
    );
    const querySnapshot = await getDocs(q);

    let favId;
    querySnapshot.docs.map((doc) => {
      favId = doc.id;
    });

    if (querySnapshot.size === 1) {
      await deleteDoc(doc(dbService, `fav_whether/${favId}`));
      await updateDoc(doc(dbService, `cafe/${cafeId}/posts/${postId}`), {
        postFav: cafePost[slideIndex - 1].postFav - 1,
      });
    } else if (querySnapshot.size === 0) {
      await addDoc(collection(dbService, "fav_whether"), favObj);
      await updateDoc(doc(dbService, `cafe/${cafeId}/posts/${postId}`), {
        postFav: cafePost[slideIndex - 1].postFav + 1,
      });
      setSnackbar(true);
    }
  };

  return (
    <>
      <Box>
        <ImageList variant="masonry" cols={3} gap={8}>
          {cafePost.map((post, index) => (
            <ImageListItem
              key={index}
              className="cursor-p"
              onClick={() => {
                setPostId(post.id);
                onClickPost(index);
              }}
            >
              <img
                src={post.postUrl}
                srcSet={post.postUrl}
                alt={index}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>

      <div>
        {open && (
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className={
              isTablet
                ? "flex align-items-center justify-content"
                : "flex flex-column align-items-center justify-content"
            }
          >
            <>
              <div
                className="absolute top-10px right-10px cursor-p pxy-05"
                onClick={handleClose}
              >
                <IoMdClose size={30} color="white" />
              </div>

              <div
                className={
                  isTablet
                    ? "flex width-resp max-height-resp"
                    : "flex flex-column align-items-center width-50p max-height-80p min-width-20rm"
                }
              >
                <Swiper
                  modules={[Navigation]}
                  navigation
                  className={
                    isTablet
                      ? "text-center width-65p bgBlac radius-tl-bl-1 swiper-tablet-width"
                      : "text-center width-100p bgBlac radius-tlr-1 max-height-30p"
                  }
                  loop={true}
                  onSwiper={(swiper) => {
                    swiper.slideTo(slideIndex, 0);
                  }}
                  onSlideChange={(swiper) => {
                    onClickPost(swiper.realIndex);
                    setPostId(cafePost[swiper.realIndex].id);
                  }}
                >
                  {slides}
                </Swiper>

                <div
                  className={
                    isTablet
                      ? "flex flex-column width-35p bgWhite mb-2px radius-tr-br-1 desc-tablet-width"
                      : "flex flex-column width-100p max-height-70p bgWhite mb-2px overflow-s radius-blr-1"
                  }
                >
                  <div
                    className={
                      isMobile
                        ? "flex align-items-center pxy-1 border-bottom-1"
                        : "flex align-items-center px-1 py-05 border-bottom-1"
                    }
                  >
                    <img
                      src={cafeData.fileUrl}
                      alt={cafeData.cafeName}
                      className={
                        isMobile
                          ? "width-4 height-4 border-radius-2 mr-2 objectFit-cover"
                          : "width-205 height-205 border-radius-2 mr-2 objectFit-cover"
                      }
                    />
                    <h1>{cafeData.cafeName}</h1>
                  </div>

                  <div className="pxy-1 border-bottom-1 flex-1 overflow-y-s">
                    <div className="flex pb-3">
                      <div className="width-40px height-40px min-width-40px min-height-40px mr-1">
                        {postPhotoURL === null ? (
                          <Avatar className="width-100p height-100p border-radius-2 mr-2 objectFit-cover" />
                        ) : (
                          <img
                            src={postPhotoURL}
                            alt={cafePost.creatorNickName}
                            className="width-100p height-100p border-radius-2 mr-2 objectFit-cover"
                          />
                        )}
                      </div>

                      <div>
                        <h2 className="mb-05 text-bold">{postNickName}</h2>
                        <p className="lh-12">{postDesc}</p>
                      </div>
                    </div>

                    <CommPostComment cafeId={cafeId} postId={postId} />
                  </div>

                  <div className="pxy-1 border-bottom-1">
                    <div className="flex justify-content-space-between align-items-flex-end">
                      <span className="text-s0875 text-color">{postDate}</span>
                      <div className="cursor-p flex" onClick={onClickFav}>
                        <FaHeart color="red" className="mr-03" />
                        <span>좋아요 {cafePost[slideIndex - 1].postFav}개</span>
                        <Snackbar
                          open={snackbar}
                          autoHideDuration={2000}
                          onClose={snackbarClose}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "center",
                          }}
                        >
                          <Alert
                            onClose={snackbarClose}
                            severity="success"
                            sx={{ width: "100%" }}
                          >
                            좋아요!
                          </Alert>
                        </Snackbar>
                      </div>
                    </div>
                  </div>

                  <div className="pxy-1">
                    <CommCommForm
                      userData={userData}
                      cafeId={cafeId}
                      postId={postId}
                    />
                  </div>
                </div>
              </div>
            </>
          </Modal>
        )}
      </div>
    </>
  );
};

export default CommPost;
