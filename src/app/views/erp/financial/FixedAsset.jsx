import { Fragment } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Divider from "@mui/material/Divider";
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

export default function FixedAsset() {
  const moduleDetails = {
    title: "Fixed Asset",
    description: "Manage fixed asset acquisition, depreciation, maintenance, and retirement.",
    features: [
      { name: "Asset Registration", desc: "Register and track fixed assets with location and condition." },
      { name: "Asset Classification", desc: "Classify assets by type, category, and department." },
      { name: "Depreciation", desc: "Calculate depreciation using various methods (straight-line, declining balance)." },
      { name: "Asset Maintenance", desc: "Track maintenance schedules and costs." },
      { name: "Asset Impairment", desc: "Monitor and record asset impairment adjustments." },
      { name: "Asset Disposal", desc: "Record asset retirement, disposal, and sale transactions." },
      { name: "Asset Reports", desc: "Generate asset register, depreciation, and valuation reports." }
    ],
    subTabs: [
      { id: "register", name: "Asset Register", count: 0 },
      { id: "depreciation", name: "Depreciation", count: 0 },
      { id: "maintenance", name: "Maintenance", count: 0 }
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
              New Asset
            </Button>
          </Box>

          {/* Sub-tabs */}
          <Box sx={{ mb: 2 }}>
            <Tabs
              defaultValue="register"
              variant="scrollable"
              scrollButtons="auto"
            >
              {moduleDetails.subTabs.map((tab) => (
                <Tab
                  key={tab.id}
                  value={tab.id}
                  label={`${tab.name} (${tab.count})`}
                />
              ))}
            </Tabs>
            <Divider sx={{ my: 2 }} />
          </Box>

          {/* Feature Grid */}
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
        </SectionCard>
      </PageBox>
    </Fragment>
  );
}
