import { Fragment } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";

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

export default function LandType() {
  const moduleDetails = {
    title: "Land Type",
    description: "Classify and manage different land types and density categories.",
    features: [
      { name: "Stand", desc: "Individually allocated residential or commercial stands." },
      { name: "Farm", desc: "Agricultural land and farming parcels." },
      { name: "Plot", desc: "General plots suitable for development." },
      { name: "Residential High Density", desc: "High-density residential zones." },
      { name: "Residential Medium Density", desc: "Medium-density residential zones." },
      { name: "Residential Low Density", desc: "Low-density residential zones." },
      { name: "Commercial", desc: "Commercial land parcels." },
      { name: "Industrial", desc: "Industrial zone parcels." }
    ]
  };

  const landTypes = [
    "Stand",
    "Farm",
    "Plot",
    "Residential HD",
    "Residential MD",
    "Residential LD",
    "Commercial",
    "Industrial"
  ];

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
              New Type
            </Button>
          </Box>

          {/* Land Types Grid */}
          <Grid container spacing={2}>
            {moduleDetails.features.map((feature) => (
              <Grid xs={12} sm={6} md={4} key={feature.name}>
                <Card sx={{ p: 2, height: "100%", display: "flex", flexDirection: "column" }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                    {feature.name}
                  </Typography>
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

          {/* Land Type Summary */}
          <Box sx={{ mt: 4, p: 2, borderRadius: 2, bgcolor: "background.default" }}>
            <SectionHeader variant="h6">Land Type Categories</SectionHeader>
            <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1 }}>
              <Chip label="Stand" color="primary" variant="outlined" />
              <Chip label="Farm" color="primary" variant="outlined" />
              <Chip label="Plot" color="primary" variant="outlined" />
              <Chip label="Residential HD" color="success" variant="outlined" />
              <Chip label="Residential MD" color="success" variant="outlined" />
              <Chip label="Residential LD" color="success" variant="outlined" />
              <Chip label="Commercial" color="warning" variant="outlined" />
              <Chip label="Industrial" color="error" variant="outlined" />
            </Stack>
          </Box>
        </SectionCard>
      </PageBox>
    </Fragment>
  );
}
