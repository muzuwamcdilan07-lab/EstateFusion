import { Fragment } from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import PropertyOverviewTable from "../dashboard/shared/PropertyOverviewTable";

const PageBox = styled(Box)(({ theme }) => ({
  padding: "2rem",
  minHeight: "100vh",
  [theme.breakpoints.down("sm")]: { padding: "1rem" }
}));

export default function Properties() {
  return (
    <Fragment>
      <PageBox>
        <h2>Properties</h2>
        <p>All properties and their information.</p>

        {/* Keep existing dashboard table design */}
        <PropertyOverviewTable />
      </PageBox>
    </Fragment>
  );
}

