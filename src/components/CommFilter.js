import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { HiOutlineSearch } from "react-icons/hi";

const CommFilter = ({ cafeAllData }) => {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");
  const [searchCafe, setSearchCafe] = useState(cafeAllData);
  const [selected, setSelected] = useState(true);

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
      <Select
        value={selected}
        onChange={handleChange}
        className="border-radius-30px bgWhite text-color-7b517f box-shadow-0"
      >
        <MenuItem value={true}>카페 이름</MenuItem>
        <MenuItem value={false}>카페 주소</MenuItem>
      </Select>

      <TextField
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
