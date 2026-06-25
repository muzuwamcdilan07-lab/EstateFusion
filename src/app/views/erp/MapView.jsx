import { Fragment } from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const PageBox = styled(Box)(({ theme }) => ({
  padding: "2rem",
  minHeight: "100vh",
  [theme.breakpoints.down("sm")]: { padding: "1rem" }
}));

export default function MapView() {
  return (
    <Fragment>
      <PageBox>
        <h2>GIS Map View</h2>
        <p>Interactive map for viewing and managing land parcels and properties.</p>
        <p>This component will integrate with mapping libraries like Mapbox or Leaflet.</p>
      </PageBox>
    </Fragment>
  );
}
