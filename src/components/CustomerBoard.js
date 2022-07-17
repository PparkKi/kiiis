import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { dbService } from "fbase";
import { doc, updateDoc } from "firebase/firestore";

import Pagination from "@mui/material/Pagination";
import { styled } from "@mui/material/styles";

const CustomerBoard = ({ board }) => {
  const itemsPerPage = 10;
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const ColorPagination = styled(Pagination)({
    ul: {
      "& .css-1to7aaw-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected": {
        backgroundColor: "#7b517f",
      },
    },
  });

  const handleChange = (event, value) => {
    setPage(value);
  };

  const onClickList = async (boardItem) => {
    dispatch({ type: "board", data: boardItem });

    await updateDoc(doc(dbService, `board/${boardItem.id}`), {
      viewCount: boardItem.viewCount + 1,
    });
  };

  return (
    <>
      <table className="width-100p border-top-2-3c3c3c">
        <caption></caption>
        <colgroup>
          <col className="width-10p" />
          <col className="width-74p" />
          <col className="width-16p" />
        </colgroup>
        <thead>
          <tr className="border-bottom-1-e2e2e2">
            <th className="pxy-17-10-19">번호</th>
            <th className="pxy-17-10-19">제목</th>
            <th className="pxy-17-10-19">날짜</th>
          </tr>
        </thead>
        <tbody>
          {board
            .slice((page - 1) * itemsPerPage, page * itemsPerPage)
            .map((boardItem, index) => {
              return (
                <tr key={index} style={{ borderBottom: "1px solid #e2e2e2" }}>
                  <td className="text-center pxy-13-19 color-3c3c3c">
                    {boardItem.no}
                  </td>
                  <td className="pxy-13-19 color-3c3c3c cursor-p">
                    <Link
                      to="/customer/view"
                      className="block color-3c3c3c"
                      onClick={() => {
                        onClickList(boardItem);
                      }}
                    >
                      {boardItem.boardTitle}
                    </Link>
                  </td>
                  <td className="text-center pxy-13-19 color-3c3c3c">
                    {boardItem.createdAt}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <ColorPagination
        count={Math.ceil(board.length / 10)}
        page={page}
        onChange={handleChange}
        defaultPage={1}
        color="primary"
        size="middle"
        showFirstButton
        showLastButton
        className="flex justify-content my-2"
      />
    </>
  );
};

export default CustomerBoard;
