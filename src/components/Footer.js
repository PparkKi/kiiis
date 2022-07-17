import React from "react";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  
  return (
    <>
      {(location.pathname != "/account/login" &&
        location.pathname != "/account/signup") && (
        <div className="relative bg-170-155-221 text-center white text-100 py-2 footer-border-t text-s0875 lh-13 text-s07">
          <p>
            본 사이트는 상업적 목적이 아닌 개인 포트폴리오용으로 제작되었습니다.
          </p>
          <p>&copy; 2022 Park, Ki-Sung. All Rights Reserved.</p>
        </div>
      )}
    </>
  );
};

export default Footer;
