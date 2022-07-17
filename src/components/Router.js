import React, { useState, useEffect } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";

import Header from "./Header";
import Footer from "./Footer";
import Main from "../routes/Main";
import Account from "../routes/Account";
import Communit from "../routes/Communit";
import Intro from "routes/Intro";
import Customer from "routes/Customer";

import { dbService, authService } from "fbase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { updateProfile } from "firebase/auth";

import Box from "@mui/material/Box";

const AppRouter = () => {
  const dispatch = useDispatch();
  const [cafeAllData, setCafeAllData] = useState([]);
  const [cafe9Data, setCafe9Data] = useState([]);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        // 구글, 페이스북 로그인
        dispatch({
          type: "user",
          data: {
            displayName: user.displayName,
            uid: user.uid,
            photoURL: user.photoURL,
            updateProfile: (args) =>
              updateProfile(authService.currentUser, {
                displayName: user.displayName,
                photoURL: user.photoURL,
              }),
          },
        });

        // 신규 가입자 로그인
        if (user.displayName == null) {
          dispatch({
            type: "user",
            data: {
              displayName: "사용자",
              uid: user.uid,
              photoURL: user.photoURL,
              updateProfile: (args) =>
                updateProfile(authService.currentUser, {
                  displayName: user.displayName,
                  photoURL: user.photoURL,
                }),
            },
          });
        }
      } else {
        dispatch({ type: "user", data: null });
      }
    });

    const fetchData = async () => {
      const q = await query(
        collection(dbService, "cafe"),
        orderBy("createdNow", "desc")
      );
      onSnapshot(q, (querySnapshot) => {
        const cafeArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCafeAllData(cafeArray);
        setCafe9Data(cafeArray.slice(0, 9));
      });
    };
    fetchData();
  }, []);

  const refreshUser = () => {
    const user = authService.currentUser;

    dispatch({
      type: "user",
      data: {
        displayName: user.displayName,
        uid: user.uid,
        photoURL: user.photoURL,
        updateProfile: (args) =>
          updateProfile(user, {
            displayName: user.displayName,
            photoURL: user.photoURL,
          }),
      },
    });
  };

  return (
    <>
      <Router>
        <Header refreshUser={refreshUser} />
        <Box sx={{ p: "64px 0 0 0 !important" }}>
          <Routes>
            <Route path="/" element={<Main cafeAllData={cafe9Data} />} />
            <Route path="/account/:accountType" element={<Account />} />
            <Route
              path="/communit/:cafe"
              element={<Communit cafeAllData={cafeAllData} />}
            />
            <Route path="/intro" element={<Intro />} />
            <Route path="/customer/:type" element={<Customer />} />
          </Routes>
        </Box>
        <Footer />
      </Router>
    </>
  );
};

export default AppRouter;
