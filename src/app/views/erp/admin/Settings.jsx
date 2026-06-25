import { Fragment } from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const PageBox = styled(Box)(({ theme }) => ({
  padding: "2rem",
  minHeight: "100vh",
  [theme.breakpoints.down("sm")]: { padding: "1rem" }
}));

export default function Settings() {
  return (
    <Fragment>
      <PageBox>
        <h2>Settings</h2>
        <p>Configure system defaults for the ERP.</p>

        <Box sx={{ mt: 3, display: "grid", gap: 2 }}>
          <Box>
            <h3 style={{ margin: 0 }}>System configuration</h3>
            <p style={{ marginTop: 6 }}>
              Example: organization name, default timezone, and notification rules.
            </p>
          </Box>

          <Box>
            <h3 style={{ margin: 0 }}>Default property types</h3>
            <p style={{ marginTop: 6 }}>
              Example: Apartment, Commercial, Warehouse.
            </p>
          </Box>

          <Box>
            <h3 style={{ margin: 0 }}>Map settings</h3>
            <p style={{ marginTop: 6 }}>
              Example: map provider, default zoom level, and boundary overlays.
            </p>
          </Box>
        </Box>
      </PageBox>
    </Fragment>
  );
}

