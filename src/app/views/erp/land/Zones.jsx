import { Fragment } from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const PageBox = styled(Box)(({ theme }) => ({
  padding: "2rem",
  minHeight: "100vh",
  [theme.breakpoints.down("sm")]: { padding: "1rem" }
}));

export default function Zones() {
  return (
    <Fragment>
      <PageBox>
        <h2>Zone Management</h2>
        <p>Manage geographic zones and land divisions.</p>
      </PageBox>
    </Fragment>
  );
}
