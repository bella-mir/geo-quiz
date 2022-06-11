import React from "react";
import { useRef, useState } from "react";
import L from "leaflet";
import {
  MapContainer,
  GeoJSON,
  ScaleControl,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";
import "proj4leaflet";
import "proj4";
import russia from "../data/rus_regions_2.json";
import Quiz from "./Quiz";
import "./Map.css"
import Title from "./Title";

const RussiaMap = () => {
  let [answer, SetAnswer] = useState(null);
  let selected = null;

  const HighlightFeature = (layer) => {
    if (selected == null || selected._leaflet_id !== layer._leaflet_id) {
      layer.setStyle({
        weight: 1.5,
        opacity: 1,
        fillOpacity: 0.1,
      });
      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }
    }
  };

  const geoJsonRef = useRef();

  const ResetHighlight = (layer) => {
    if (selected == null || selected._leaflet_id !== layer._leaflet_id) {
      geoJsonRef.current.resetStyle(layer);
    }
  };

  const Select = (layer) => {
    SetAnswer(layer.feature.properties.UNIVERSAL)
  };

  const onEachFeatureF = (feature, layer) => {
    layer.on({
      click: function (e) {
        Select(e.target);
        // console.log(info);
      },

      mouseover: function (e) {
        HighlightFeature(e.target);
      },
      mouseout: function (e) {
        ResetHighlight(e.target);
      },
    });
  };

  const basemapStyle2 = {
      weight: 1.5,
      Opacity: 1,
      fillColor: "#FFFFFF",
      fillOpacity: 1,
      color: "#DAE0F2"
  };

  const crs = new L.Proj.CRS(
    "EPSG:3576",
    "+proj=laea +lat_0=90 +lon_0=90 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs",
    {
      resolutions: [
        32768, 16384, 8192, 4096, 2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4,
        2, 1, 0.5,
      ],
      //origin: [ -180, -90 ]
    }
  );

  return (
    <>
      <MapContainer
        style={{ height: "100vh" }}
        zoomControl={false}
        zoom={2}
        center={[65, 130]}
        minZoom={2}
        maxZoom={5}
        crs={crs}
        maxBounds={[
          [20, 75],
          [870, 2000],
        ]}
      >
        <GeoJSON
          data={russia}
          style={basemapStyle2}
          onEachFeature={onEachFeatureF}
          ref={geoJsonRef}
        />
        <Title>RUSSIAN REGIONS GEO-QUIZ</Title>
        <Quiz answer={answer}/>

        <ScaleControl position="bottomleft" />
      </MapContainer>
    </>
  );
};

export default RussiaMap;
