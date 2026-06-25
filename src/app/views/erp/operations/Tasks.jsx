import { Fragment } from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const PageBox = styled(Box)(({ theme }) => ({
  padding: "2rem",
  minHeight: "100vh",
  [theme.breakpoints.down("sm")]: { padding: "1rem" }
}));

export default function Tasks() {
  return (
    <Fragment>
      <PageBox>
        <h2>Operations Tasks</h2>
        <p>Manage field operations and agent tasks.</p>
      </PageBox>
    </Fragment>
  );
}
