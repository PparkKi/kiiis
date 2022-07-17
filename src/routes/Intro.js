import React, { useState } from "react";
import PropTypes from "prop-types";
import { useMediaQuery } from "react-responsive";

import BannerNav from "components/BannerNav";
import IntroUse from "components/IntroUse";
import IntroEx from "components/IntroEx";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const ColorTabs = styled(Tabs)({
  div: {
    "& .css-1h9z7r5-MuiButtonBase-root-MuiTab-root.Mui-selected": {
      color: "#7b517f",
    },
    "& .css-1aquho2-MuiTabs-indicator": {
      backgroundColor: "#7b517f",
    },
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const Intro = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const isTablet = useMediaQuery({
    query: "(min-width:768px)",
  });

  return (
    <div className="container">
      <BannerNav subType={"intro"} />

      <div className="max-width-1000 mx-auto">
        <Box sx={{ width: "100%" }}>
          <ColorTabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            sx={{ borderBottom: 1, borderColor: "#7b517f" }}
          >
            <Tab label="카페 공간 사용법" {...a11yProps(0)} />
            <Tab label="카페 공간 제작 설명" {...a11yProps(1)} />
          </ColorTabs>

          <TabPanel value={value} index={0} className="flex justify-content">
            <IntroUse />
          </TabPanel>
          <TabPanel
            value={value}
            index={1}
            className="flex justify-content py-2"
          >
            <IntroEx />
          </TabPanel>
        </Box>
      </div>
    </div>
  );
};

export default Intro;
