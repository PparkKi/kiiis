import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import { HiOutlineSearch } from "react-icons/hi";

const CommFilter = ({ cafeAllData }) => {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");
  const [searchCafe, setSearchCafe] = useState(cafeAllData);
  const [selected, setSelected] = useState(true);

  const ColorSelect = styled(Select)({
    "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
  });
  const ColorTextField = styled(TextField)({
    "& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root": {
      borderRadius: "30px",
      backgroundColor: "#fff",
    },
    "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
      border: "none",
      boxShadow:
        "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
    },
  });

  const isMobile = useMediaQuery({
    query: "(min-width:480px)",
  });

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setKeyword(value);
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelected(value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (keyword === "") {
      dispatch({ type: "search", data: null });
      alert("검색어를 입력해 주세요.");
    }

    if (keyword !== "") {
      const results = cafeAllData.filter((cafe) => {
        if (selected)
          return cafe.cafeName.toLowerCase().includes(keyword.toLowerCase());
        else return cafe.cafeLoc.toLowerCase().includes(keyword.toLowerCase());
      });
      setSearchCafe(results);
      dispatch({ type: "search", data: results });
      setKeyword("");
    } else {
      setSearchCafe(cafeAllData);
      setKeyword("");
    }
  };

  useEffect(() => {
    return () => {
      dispatch({ type: "search", data: null });
    };
  }, []);

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={onSubmit}
      className={
        isMobile
          ? "flex justify-content mt-1 mb-2"
          : "flex flex-column justify-content mt-1 mb-2"
      }
    >
      <ColorSelect
        value={selected}
        onChange={handleChange}
        className="border-radius-30px bgWhite text-color-7b517f box-shadow-0"
      >
        <MenuItem value={true}>카페 이름</MenuItem>
        <MenuItem value={false}>카페 주소</MenuItem>
      </ColorSelect>

      <ColorTextField
        id="outlined-search"
        type="search"
        placeholder="검색어를 입력해 주세요."
        value={keyword}
        onChange={onChange}
      />

      <Button
        variant="contained"
        type="submit"
        className="cursor-p border-radius-30px bgWhite"
      >
        <HiOutlineSearch size={30} className="text-color-7b517f">
          검색
        </HiOutlineSearch>
      </Button>
    </Box>
  );
};

export default CommFilter;
