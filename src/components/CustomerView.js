import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Button from "@mui/material/Button";

const CustomerView = () => {
  const boardData = useSelector((state) => state.boardData);

  return (
    <div className="max-width-1000 mx-auto mb-2">
      <div className="width-100p border-top-2-3c3c3c">
        <div className="pxy-24-20-30 border-bottom-1-e2e2e2">
          <h1 className="text-s15 text-bold lh-2 mb-1">{boardData.boardTitle}</h1>
          <span>{boardData.createdAt}</span>
        </div>

        <div className="pxy-60-20 border-bottom-1-e2e2e2 mb-3 white-space-prew">
          {boardData.boardDesc}
        </div>

        <div className="text-center mb-3">
          <Link to="/customer/list">
            <Button
              variant="outlined"
              className="pxy-05-25 border-1-7b517f text-color-7b517f"
            >
              목록
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CustomerView;
