"use client";

import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const ReactKakaoMap = () => {
  const apiKey: string | undefined = process.env.NEXT_PUBLIC_KAKAO_KEY;

  // Define constants for latitude and longitude
  const LATITUDE = 33.5563;
  const LONGITUDE = 126.79581;

  const [scriptLoad, setScriptLoad] = useState<boolean>(false);

  useEffect(() => {
    const script: HTMLScriptElement = document.createElement("script");
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`;
    document.head.appendChild(script);

    script.addEventListener("load", () => {
      setScriptLoad(true);
    });
  }, []);

  return (
    <div>
      {scriptLoad ? (
        <Map
          center={{ lat: LATITUDE, lng: LONGITUDE }}
          style={{ width: "800px", height: "600px" }}
          level={3}
        >
          <MapMarker
            position={{ lat: LATITUDE, lng: LONGITUDE }} // Marker position
            image={{
              src: "/maker.png", // Custom marker image path
              size: { width: 40, height: 50 }, // Adjust size to match design
            }}
          ></MapMarker>
        </Map>
      ) : (
        <div>map error</div>
      )}
    </div>
  );
};

export default ReactKakaoMap;
