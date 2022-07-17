import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import { authService, dbService } from "fbase";
import { collection, getDocs } from "firebase/firestore";

import HeaderMenu from "./HeaderMenu";
import Cropper from "./Cropper";
import EditProfileForm from "./EditProfileForm";

import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Logout from "@mui/icons-material/Logout";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { IoMdImages } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import logoImg from "../images/header/logo.png";

const Header = ({ refreshUser }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData);
  const navItems = ["카페공간", "소개공간", "고객공간"];
  const linkTo = ["/communit/cafe", "/intro", "/customer/list"];
  const [cafeFile, setCafeFile] = useState("");
  const [admin, setAdmin] = useState("");

  const [anchorEl, setAnchorEl] = useState(null);
  const userOpen = Boolean(anchorEl);
  const userhandleClick = (event) => setAnchorEl(event.currentTarget);
  const userhandleClose = () => setAnchorEl(null);

  const [edit, setEdit] = useState(false);
  const edithandleClose = () => setEdit(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setCafeFile("");
  };

  const completeUpload = () => handleClose();

  const fileInput = useRef();

  const isMobile = useMediaQuery({
    query: "(min-width:767px)",
  });

  const hdInnerIsMobile = isMobile ? "header-inner" : "m-header-inner";
  const logoIsMobile = isMobile ? "header-logo flex" : "m-header-logo";
  const hdAccIsMobile = isMobile
    ? "flex align-items-center text-bold text-s0875"
    : "m-header-acc";

  const onClickMenu = (item) => {
    if (item === "카페공간") {
      dispatch({ type: "cafe", data: null });
    }
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;

    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;

      setCafeFile(result);
    };
    reader.readAsDataURL(theFile);
  };

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(dbService, "admin"));
      querySnapshot.forEach((doc) => {
        setAdmin(doc.data().adminId);
      });
    };
    fetchData();
  }, []);

  const onLogOutClick = () => {
    authService.signOut();
    navigate("/");
  };

  return (
    <div id="header">
      <div className={hdInnerIsMobile}>
        {isMobile ? null : <HeaderMenu />}

        <Box className="flex align-items-stretch">
          <h1 className={logoIsMobile}>
            <Link
              to="/"
              className="flex align-items-center"
              onClick={onClickMenu}
            >
              <img src={logoImg} alt="logo" />
            </Link>
          </h1>

          {isMobile && (
            <nav className="flex text-bold">
              {navItems.map((item, index) => (
                <Link
                  key={linkTo[index]}
                  to={linkTo[index]}
                  className="flex align-items-center ml-2 text-color p-025 text-s0875"
                  onClick={() => {
                    onClickMenu(item);
                  }}
                >
                  {item}
                </Link>
              ))}
            </nav>
          )}
        </Box>
        {userData ? (
          <div className="flex align-items-center cursor-p">
            {userData.uid === admin && (
              <MdOutlineAddPhotoAlternate
                size={30}
                className="mr-1"
                onClick={handleOpen}
              />
            )}

            <>
              <div className="width-40px height-40px" onClick={userhandleClick}>
                {!userData.photoURL ? (
                  <Avatar />
                ) : (
                  <img src={userData.photoURL} alt="프로필 사진" className="width-100p height-100p border-radius-50p objectFit-cover" />
                )}
              </div>

              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={userOpen}
                onClose={userhandleClose}
                onClick={userhandleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem
                  className="text-color text-bold"
                  onClick={() => {
                    setEdit(true);
                  }}
                >
                  <Avatar /> 프로필 수정
                </MenuItem>
                <Divider />
                <MenuItem
                  onClick={onLogOutClick}
                  className="text-color text-bold"
                >
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  로그아웃
                </MenuItem>
              </Menu>
            </>
          </div>
        ) : (
          <Box className={hdAccIsMobile}>
            {isMobile && (
              <Link to="/account/login" className="text-color mr-2">
                로그인
              </Link>
            )}
            <Link to="/account/signup">
              <Button variant="contained" className="text-bold text-s0875">
                회원가입
              </Button>
            </Link>
          </Box>
        )}
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex align-items-center justify-content flex-column"
      >
        <>
          <div className="flex justify-content align-items-center width-40p bgWhite border-radius-1 min-width-20rm min-height-25rm pt-15px">
            {cafeFile ? (
              <>
                <Cropper
                  imgFile={cafeFile}
                  completeUpload={completeUpload}
                  cropStyle="cafe"
                />
              </>
            ) : (
              <>
                <label className="cursor-p" htmlFor="cafe-file">
                  <IoMdImages size={100} />
                  <p>사진 선택하기</p>
                </label>
                <input
                  id="cafe-file"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  ref={fileInput}
                  onChange={onFileChange}
                />
              </>
            )}
          </div>

          <div
            className="absolute top-10px right-10px cursor-p pxy-05"
            onClick={handleClose}
          >
            <IoMdClose size={30} color="white" />
          </div>
        </>
      </Modal>

      {edit && (
        <EditProfileForm
          edit={edit}
          edithandleClose={edithandleClose}
          refreshUser={refreshUser}
        />
      )}
    </div>
  );
};

export default Header;
