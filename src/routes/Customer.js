import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { dbService } from "fbase";
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

import BannerNav from "components/BannerNav";
import CustomerBoard from "components/CustomerBoard";
import CustomerView from "components/CustomerView";

import { HiPencilAlt } from "react-icons/hi";
import CustomerForm from "components/CustomerForm";

const Customer = () => {
  let params = useParams();
  const [board, setBoard] = useState([]);
  const [admin, setAdmin] = useState("");
  const userData = useSelector((state) => state.userData);

  const [boardWrite, setBoardWrite] = useState(false);
  const bwHandleClose = () => setBoardWrite(false);

  useEffect(() => {
    const fetchData = async () => {
      const q = await query(
        collection(dbService, "board"),
        orderBy("no", "desc")
      );
      onSnapshot(q, (querySnapshot) => {
        const boardArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBoard(boardArray);
      });

      const querySnapshot = await getDocs(collection(dbService, "admin"));
      querySnapshot.forEach((doc) => {
        setAdmin(doc.data().adminId);
      });
    };
    fetchData();
  }, []);

  const onClickWriteBoard = () => {
    setBoardWrite(true);
  };

  return (
    <div className="container">
      <BannerNav subType={"customer"} />

      <div className="max-width-1000 mx-auto mb-2">
        {params.type === "list" && (
          <>
            {userData && userData.uid === admin && (
              <div className="float-clear">
                <HiPencilAlt
                  size={30}
                  className="float-right cursor-p mb-1"
                  onClick={onClickWriteBoard}
                />
              </div>
            )}
            <CustomerBoard board={board} />
          </>
        )}
        {params.type === "view" && <CustomerView />}
      </div>

      {boardWrite && (
        <CustomerForm
          boardWrite={boardWrite}
          bwHandleClose={bwHandleClose}
          boardLength={board.length}
        />
      )}
    </div>
  );
};

export default Customer;
