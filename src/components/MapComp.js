import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const MapComp = () => {
  const cafeData = useSelector((state) => state.cafeData);
  const { kakao } = window;

  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(cafeData.cafeLat, cafeData.cafeLng),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);
    const markerPosition = new kakao.maps.LatLng(
      cafeData.cafeLat,
      cafeData.cafeLng
    );
    const marker = new kakao.maps.Marker({
      position: markerPosition,
      clickable: true,
    });
    marker.setMap(map);

    const iwContent = `<div style="padding:5px; margin-right:30px;">${cafeData.cafeLoc}</div>`,
      iwRemoveable = true;

    const infowindow = new kakao.maps.InfoWindow({
      content: iwContent,
      removable: iwRemoveable,
    });

    kakao.maps.event.addListener(marker, "click", function () {
      infowindow.open(map, marker);
    });
  }, []);

  return (
    <div
      id="map"
      className="border-radius-1"
      style={{ width: "50vh", height: "50vh" }}
    ></div>
  );
};

export default MapComp;
