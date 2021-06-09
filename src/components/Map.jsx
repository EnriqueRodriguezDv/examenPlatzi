import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const Map = ({data}) => {
  const mapStyles = {
    height: "50vh",
    width: "100%",
  };

  const defaultCenter = {
    lat: data.latitude || 37.3754338,
    lng: data.longitude || -5.9900776,
  };

  const never= {
    lat: 37.3754338, lng: -5.9900776
  }

  return (
    <LoadScript googleMapsApiKey={process.env.MAP_KEY}>
      <GoogleMap mapContainerStyle={mapStyles} zoom={9} center={data ? defaultCenter :  never}>
        {data && <Marker position={defaultCenter } />}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
