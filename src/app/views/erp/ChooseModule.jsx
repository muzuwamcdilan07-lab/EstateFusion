import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import MapIcon from "@mui/icons-material/Map";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";

const ContentBox = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  padding: "2rem",
  [theme.breakpoints.down("sm")]: { padding: "1rem" }
}));

const ModuleCard = styled(Card)(({ theme }) => ({
  padding: "2rem",
  textAlign: "center",
  cursor: "pointer",
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: theme.shadows[8],
    transform: "translateY(-5px)"
  }
}));

const ModuleIcon = styled(Box)(({ theme }) => ({
  fontSize: "3rem",
  marginBottom: "1rem",
  color: theme.palette.primary.main
}));

const ModuleTitle = styled("h3")(() => ({
  fontSize: "1.25rem",
  fontWeight: "600",
  marginBottom: "0.5rem"
}));

const ModuleDescription = styled("p")(({ theme }) => ({
  fontSize: "0.875rem",
  color: theme.palette.text.secondary,
  marginBottom: "1rem"
}));

export default function ChooseModule() {
  const navigate = useNavigate();

  const modules = [
    {
      title: "Dashboard",
      description: "View ERP and land management overview",
      icon: <HomeIcon sx={{ fontSize: "3rem" }} />,
      path: "/erp/dashboard"
    },
    {
      title: "Land Management",
      description: "Manage zones and land parcels",
      icon: <MapIcon sx={{ fontSize: "3rem" }} />,
      path: "/erp/land/map"
    },
    {
      title: "Reports",
      description: "Generate custom reports",
      icon: <SettingsIcon sx={{ fontSize: "3rem" }} />,
      path: "/erp/reports"
    }
  ];

  return (
    <Fragment>
      <ContentBox>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <h1 style={{ fontSize: "2rem", fontWeight: "700", marginBottom: "0.5rem" }}>
              EstateFusion ERP
            </h1>
            <p style={{ fontSize: "1rem", color: "#999" }}>
              Land Management System
            </p>
          </Box>

          <Grid container spacing={3}>
            {modules.map((module) => (
              <Grid size={{ md: 6, xs: 12 }} key={module.path}>
                <ModuleCard
                  elevation={3}
                  onClick={() => navigate(module.path)}
                >
                  <ModuleIcon>{module.icon}</ModuleIcon>
                  <ModuleTitle>{module.title}</ModuleTitle>
                  <ModuleDescription>{module.description}</ModuleDescription>
                  <Button variant="contained" size="small">
                    Open
                  </Button>
                </ModuleCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </ContentBox>
    </Fragment>
  );
}
