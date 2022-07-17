import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { authService } from "fbase";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { FiMenu } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

const HeaderMenu = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState(false);
  const userData = useSelector((state) => state.userData);

  const toggleDrawer = () => {
    setState(!state);
  };

  const linkTo = [
    "communit/cafe",
    "intro",
    "customer/list",
    `${userData ? "" : "account/login"}`,
  ];

  const menuArr = [
    "카페공간",
    "소개공간",
    "고객공간",
    `${userData ? "로그아웃" : "로그인"}`,
  ];

  const onClickLogOut = (text) => {
    if (text === "카페공간") {
      dispatch({ type: "cafe", data: null });
    }

    if (text === "로그아웃") {
      authService.signOut();
    }
  };

  const list = (
    <Box
      sx={{ width: "auto" }}
      role="presentation"
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
    >
      <List>
        {menuArr.map((text, index) => (
          <Link
            to={linkTo[index]}
            key={index}
            className="text-color-000 text-bold cursor-p"
            onClick={() => {
              onClickLogOut(text);
            }}
          >
            <ListItem key={text} className="text-center">
              <ListItemText primary={text} />
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <FiMenu size={30} className="cursor-p" onClick={toggleDrawer} />
      <Drawer anchor="top" open={state} onClose={toggleDrawer}>
        {list}
      </Drawer>
    </div>
  );
};

export default HeaderMenu;
