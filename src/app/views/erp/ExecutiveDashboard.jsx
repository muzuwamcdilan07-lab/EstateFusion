import { Fragment } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import PropertyStatCards from "./dashboard/shared/PropertyStatCards";
import PropertyTrendChart from "./dashboard/shared/PropertyTrendChart";
import PropertyCoverageChart from "./dashboard/shared/PropertyCoverageChart";
// STYLED COMPONENTS
const ContentBox = styled("div")(({ theme }) => ({
  margin: "2rem",
  [theme.breakpoints.down("sm")]: { margin: "1rem" }
}));

const DashboardTitle = styled("h2")(({ theme }) => ({
  fontSize: "1.5rem",
  fontWeight: "600",
  marginBottom: "0.5rem",
  color: theme.palette.text.primary
}));

const DashboardSubtitle = styled("p")(({ theme }) => ({
  fontSize: "0.875rem",
  color: theme.palette.text.secondary,
  marginBottom: "2rem"
}));

const SectionTitle = styled("h4")(({ theme }) => ({
  fontSize: "1rem",
  fontWeight: "500",
  marginBottom: "1rem",
  marginTop: "1.5rem",
  textTransform: "capitalize",
  color: theme.palette.text.secondary
}));

const ActionButton = styled(Button)(({ theme }) => ({
  marginBottom: "2rem"
}));

export default function ExecutiveDashboard() {
  return (
    <Fragment>
      <ContentBox className="dashboard">
        {/* Header Section */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Box>
            <DashboardTitle>EstateFusion Dashboard</DashboardTitle>
            <DashboardSubtitle>GIS Property Management Overview</DashboardSubtitle>
          </Box>
          <ActionButton variant="contained" startIcon={<AddIcon />}>
            Add Property
          </ActionButton>
        </Box>

        {/* Stats Cards */}
        <PropertyStatCards />

        {/* Charts Section */}
        <Grid container spacing={3} sx={{ mb: "24px" }}>
          {/* Trend Chart */}
          <Grid size={{ md: 8, xs: 12 }}>
            <Card sx={{ px: 3, py: 2, mb: 3 }}>
              <SectionTitle>Property Mapping Trends</SectionTitle>
              <PropertyTrendChart height="350px" />
            </Card>
          </Grid>

          {/* Coverage Chart */}
          <Grid size={{ md: 4, xs: 12 }}>
            <Card sx={{ px: 3, py: 2, mb: 3 }}>
              <SectionTitle>Coverage Distribution</SectionTitle>
              <PropertyCoverageChart height="350px" />
            </Card>
          </Grid>
        </Grid>

      </ContentBox>
    </Fragment>
  );
}

