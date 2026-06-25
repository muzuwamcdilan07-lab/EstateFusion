import { Fragment } from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const PageBox = styled(Box)(({ theme }) => ({
  padding: "2rem",
  minHeight: "100vh",
  [theme.breakpoints.down("sm")]: { padding: "1rem" }
}));

export default function SyncCenter() {
  return (
    <Fragment>
      <PageBox>
        <h2>Synchronization Center</h2>
        <p>Sync data between mobile devices and the central system.</p>
      </PageBox>
    </Fragment>
  );
}
