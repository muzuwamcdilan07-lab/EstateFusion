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

export default function LandArea() {
  const moduleDetails = {
    title: "Land Area",
    description: "Geographic area management and regional allocation.",
    features: [
      { name: "Harare", desc: "Land portfolio in Harare region." },
      { name: "Bulawayo", desc: "Land portfolio in Bulawayo region." },
      { name: "Gweru", desc: "Land portfolio in Gweru region." }
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
              New Area
            </Button>
          </Box>

          {/* Area Grid */}
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
                    View
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Regions Summary */}
          <Box sx={{ mt: 4, p: 2, borderRadius: 2, bgcolor: "background.default" }}>
            <SectionHeader variant="h6">Geographic Regions</SectionHeader>
            <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1 }}>
              <Chip label="Harare" size="small" />
              <Chip label="Bulawayo" size="small" />
              <Chip label="Gweru" size="small" />
            </Stack>
          </Box>
        </SectionCard>
      </PageBox>
    </Fragment>
  );
}
