import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { experimentalStyled as styled } from "@mui/material/styles";
import { FiMoreHorizontal } from "react-icons/fi";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1.5),
  margin: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  boxShadow: "5px 5px 10px 2px rgb(0 0 0 / 20%)",
}));

const MainList = ({ cafeAllData, commStyle }) => {
  const dispatch = useDispatch();
  let params = useParams();

  const onClickList = (cafe) => {
    dispatch({ type: "cafe", data: cafe });
  };

  return (
    <>
      {cafeAllData.length != 0 ? (
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 5, md: 3 }}
            columns={{ xs: 2, sm: 8, md: 12 }}
          >
            {cafeAllData.map((cafe, index) => (
              <Grid
                item
                xs={2}
                sm={4}
                md={4}
                key={index}
                className="grid-hover cursor-p"
                onClick={() => {
                  onClickList(cafe);
                }}
              >
                <Link
                  to={
                    commStyle
                      ? `/communit/${cafe.cafeName}`
                      : `communit/${cafe.cafeName}`
                  }
                >
                  <Item>
                    <img src={cafe.fileUrl} alt={cafe.cafeName} />
                    <div className="flex flex-row flex-noWrap justify-content-space-between align-items-center">
                      <h1 className="text-bold text-s12">{cafe.cafeName}</h1>
                      <span>
                        <FiMoreHorizontal size={30} />
                      </span>
                    </div>
                  </Item>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        <>
          {params.cafe && (
            <p className="text-center py-10rem px-1">
              검색한 정보의 카페가 없습니다!
              <br />
              <br />
              ex. 카페 이름 : 덕미 / 카페 주소 : 부산(수영, 해운대, 기장등..)
            </p>
          )}
        </>
      )}
    </>
  );
};

export default MainList;
