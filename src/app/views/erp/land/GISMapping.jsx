import { Fragment } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import MapIcon from "@mui/icons-material/Map";

const PageBox = styled(Box)(({ theme }) => ({
  padding: "2rem",
  minHeight: "100vh",
  background: theme.palette.background.default,
  [theme.breakpoints.down("sm")]: { padding: "1rem" }
}));

const SectionCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  background: theme.palette.background.paper
}));

const SectionHeader = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1.5),
  fontWeight: 700,
  color: theme.palette.text.primary
}));

const SectionSubtitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  color: theme.palette.text.secondary
}));

export default function GISMapping() {
  const moduleDetails = {
    title: "GIS & Mapping",
    description: "Interactive mapping and geographic information system.",
    features: [
      { name: "Interactive Maps", desc: "Browse and interact with property maps." },
      { name: "Plot Selection", desc: "Select and highlight plots on the map." },
      { name: "GPS Integration", desc: "Integrate GPS coordinates for precise location." },
      { name: "Geo-location Services", desc: "Use geolocation for field surveys." }
    ]
  };

  return (
    <Fragment>
      <PageBox>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 3 }}>
          <Typography variant="h4" component="h1">
            {moduleDetails.title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {moduleDetails.description}
          </Typography>
        </Box>

        <SectionCard>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 2,
              flexWrap: "wrap",
              mb: 2
            }}
          >
            <Box>
              <SectionHeader variant="h6">{moduleDetails.title}</SectionHeader>
              <SectionSubtitle>{moduleDetails.description}</SectionSubtitle>
            </Box>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{ textTransform: "none", mt: 1 }}
            >
              New Map
            </Button>
          </Box>

          {/* GIS Features Grid */}
          <Grid container spacing={2}>
            {moduleDetails.features.map((feature) => (
              <Grid xs={12} sm={6} md={4} key={feature.name}>
                <Card sx={{ p: 2, height: "100%", display: "flex", flexDirection: "column" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                    <MapIcon sx={{ color: "primary.main" }} />
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                      {feature.name}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
                    {feature.desc}
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ alignSelf: "flex-start", textTransform: "none" }}
                  >
                    Manage
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Map Preview Section */}
          <Box sx={{ mt: 4, p: 3, borderRadius: 2, bgcolor: "background.default", border: "1px dashed", borderColor: "divider" }}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
              <MapIcon sx={{ fontSize: 60, color: "text.secondary" }} />
              <Typography variant="body1" sx={{ textAlign: "center", color: "text.secondary" }}>
                Interactive map for viewing and managing land parcels and properties.
              </Typography>
              <Button variant="contained">
                Open Map View
              </Button>
            </Box>
          </Box>
        </SectionCard>
      </PageBox>
    </Fragment>
  );
}
