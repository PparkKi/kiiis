import React, { useState } from "react";

import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import TextField from "@mui/material/TextField";

const CafeInfoForm = (porps) => {
  const steps = [
    {
      description: (
        <TextField
          id="outlined-basic"
          placeholder="카페 이름"
          variant="outlined"
          onChange={porps.onChange}
          name="cafeName"
          value={porps.cafeName}
          className="bgWhite width-100p"
        />
      ),
    },
    {
      description: (
        <TextField
          id="outlined-basic"
          placeholder="카페 한마디"
          variant="outlined"
          onChange={porps.onChange}
          name="cafeMent"
          value={porps.cafeMent}
          className="bgWhite width-100p"
        />
      ),
    },
    {
      description: (
        <TextField
          id="outlined-basic"
          placeholder="카페 주소"
          variant="outlined"
          onChange={porps.onChange}
          name="cafeLoc"
          value={porps.cafeLoc}
          className="bgWhite width-100p"
        />
      ),
    },
    {
      description: (
        <TextField
          id="outlined-basic"
          placeholder="카페 위치 Lat"
          variant="outlined"
          onChange={porps.onChange}
          name="cafeLat"
          value={porps.cafeLat}
          className="bgWhite width-100p"
        />
      ),
    },
    {
      description: (
        <TextField
          id="outlined-basic"
          placeholder="카페 위치 Lng"
          variant="outlined"
          onChange={porps.onChange}
          name="cafeLng"
          value={porps.cafeLng}
          className="bgWhite width-100p"
        />
      ),
    },
  ];
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = steps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <>
      <Box className="width-100p">
        <div>{steps[activeStep].description}</div>
        <MobileStepper
          variant="text"
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              Next
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          }
        />
      </Box>
    </>
  );
};

export default CafeInfoForm;
