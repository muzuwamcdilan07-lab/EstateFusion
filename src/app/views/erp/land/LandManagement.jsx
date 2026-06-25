import { Fragment, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import MapIcon from "@mui/icons-material/Map";
import AssessmentIcon from "@mui/icons-material/Assessment";
import StorageIcon from "@mui/icons-material/Storage";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

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

const FeatureCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  cursor: "pointer",
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: theme.shadows[4],
    transform: "translateY(-2px)"
  }
}));

const landModules = [
  { id: "inventory", label: "Land Inventory", icon: "StorageIcon" },
  { id: "subdivision", label: "Land Subdivision", icon: "StorageIcon" },
  { id: "type", label: "Land Type", icon: "StorageIcon" },
  { id: "area", label: "Land Area", icon: "StorageIcon" },
  { id: "size", label: "Size", icon: "StorageIcon" },
  { id: "gis", label: "GIS & Mapping", icon: "MapIcon" },
  { id: "compliance", label: "Municipal Approvals", icon: "CheckCircleIcon" }
];

const moduleDetails = {
  inventory: {
    title: "Land Inventory",
    description: "Register and manage all land plots, stands, and parcels with complete documentation.",
    features: [
      { name: "Plot Registration", desc: "Register new plots with stand numbers and coordinates." },
      { name: "GIS/Map Coordinates", desc: "Store and manage GPS coordinates for each plot." },
      { name: "Survey Records", desc: "Attach official survey documents and records." },
      { name: "Land Size Measurements", desc: "Record land size in sqm and hectares." },
      { name: "Zoning Classification", desc: "Assign zoning classifications (Residential, Commercial, Industrial)." },
      { name: "Ownership Records", desc: "Track ownership details and ownership changes." },
      { name: "Deed/Document Uploads", desc: "Upload and manage land deeds and supporting documents." }
    ],
    subTabs: [
      { id: "plot-reg", name: "Plot Registration", count: 0 },
      { id: "survey", name: "Survey Records", count: 0 },
      { id: "ownership", name: "Ownership Records", count: 0 }
    ]
  },
  "inventory-sales": {
    title: "Land Sales Management",
    description: "Process land sales with installment management and buyer tracking.",
    features: [
      { name: "Land Sales Processing", desc: "Create and process land sales transactions." },
      { name: "Installment Management", desc: "Set up and track installment payment plans." },
      { name: "Payment Plans", desc: "Define custom payment schedules." },
      { name: "Offer Letters", desc: "Generate formal offer letters to buyers." },
      { name: "Sale Agreements", desc: "Create binding sale agreements." },
      { name: "Transfer Tracking", desc: "Monitor ownership transfer progress." },
      { name: "Buyer Management", desc: "Maintain buyer records and contact information." }
    ],
    subTabs: [
      { id: "sales", name: "Sales Transactions", count: 0 },
      { id: "installments", name: "Installment Plans", count: 0 },
      { id: "buyers", name: "Buyer Profiles", count: 0 }
    ]
  },
  subdivision: {
    title: "Land Subdivision",
    description: "Manage land subdivision phases, blocks, and infrastructure development.",
    features: [
      { name: "Phase Creation", desc: "Create development phases for large land projects." },
      { name: "Block Management", desc: "Organize plots into building blocks." },
      { name: "Stand Allocation", desc: "Allocate stands to buyers and track availability." },
      { name: "Infrastructure Progress", desc: "Monitor infrastructure development status." },
      { name: "Road Status", desc: "Track road construction and completion." },
      { name: "Water Status", desc: "Monitor water supply infrastructure." },
      { name: "Electricity Status", desc: "Track electricity connection status." }
    ],
    subTabs: [
      { id: "phases", name: "Development Phases", count: 0 },
      { id: "blocks", name: "Blocks", count: 0 },
      { id: "infrastructure", name: "Infrastructure Progress", count: 0 }
    ]
  },
  "pricing-engine": {
    title: "Land Pricing Engine",
    description: "Dynamic pricing management based on size and location.",
    features: [
      { name: "Price per Square Meter", desc: "Set base price per sqm for different zones." },
      { name: "Dynamic Pricing", desc: "Apply dynamic pricing based on demand and location factors." }
    ],
    subTabs: [
      { id: "pricing", name: "Pricing Rules", count: 0 },
      { id: "zones", name: "Zone Pricing", count: 0 }
    ]
  },
  type: {
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
  },
  area: {
    title: "Land Area",
    description: "Geographic area management and regional allocation.",
    features: [
      { name: "Harare", desc: "Land portfolio in Harare region." },
      { name: "Bulawayo", desc: "Land portfolio in Bulawayo region." },
      { name: "Gweru", desc: "Land portfolio in Gweru region." }
    ]
  },
  size: {
    title: "Size",
    description: "Land size measurement and categorization.",
    features: [
      { name: "Square Meters (sqm)", desc: "Size measurements in square meters." },
      { name: "Hectares (ha)", desc: "Size measurements in hectares." }
    ]
  },
  gis: {
    title: "GIS & Mapping",
    description: "Interactive mapping and geographic information system.",
    features: [
      { name: "Interactive Maps", desc: "Browse and interact with property maps." },
      { name: "Plot Selection", desc: "Select and highlight plots on the map." },
      { name: "GPS Integration", desc: "Integrate GPS coordinates for precise location." },
      { name: "Geo-location Services", desc: "Use geolocation for field surveys." }
    ],
    subTabs: [
      { id: "map-view", name: "Map View", count: 0 },
      { id: "gps", name: "GPS Data", count: 0 }
    ]
  },
  compliance: {
    title: "Municipal Approvals",
    description: "Track compliance requirements and municipal approvals.",
    features: [
      { name: "Compliance Checklist", desc: "Track municipal compliance requirements." },
      { name: "Document Expiry Alerts", desc: "Get alerts for expiring licenses and permits." }
    ],
    subTabs: [
      { id: "checklist", name: "Compliance Items", count: 0 },
      { id: "approvals", name: "Approvals", count: 0 }
    ]
  }
};

export default function LandManagement() {
  const { module } = useParams();
  const [activeModule, setActiveModule] = useState(module || "inventory");
  const [activeSubTab, setActiveSubTab] = useState(null);

  const currentModule = useMemo(
    () => moduleDetails[activeModule],
    [activeModule]
  );

  const handleModuleClick = (moduleId) => {
    setActiveModule(moduleId);
    setActiveSubTab(null);
  };

  const handleSubTabChange = (event, newValue) => {
    setActiveSubTab(newValue);
  };

  return (
    <Fragment>
      <PageBox>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 3 }}>
          <Typography variant="h4" component="h1">
            Land Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Comprehensive land inventory, subdivision, and property management system for stands, plots, farms, and commercial land.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* Module Navigation */}
          <Grid xs={12}>
            <SectionCard>
              <SectionHeader variant="h6">Land Management Modules</SectionHeader>
              <Grid container spacing={2}>
                {landModules.map((module) => (
                  <Grid xs={12} sm={6} md={4} lg={3} key={module.id}>
                    <FeatureCard
                      onClick={() => handleModuleClick(module.id)}
                      sx={{
                        border:
                          activeModule === module.id
                            ? "2px solid"
                            : "1px solid",
                        borderColor:
                          activeModule === module.id ? "primary.main" : "divider",
                        backgroundColor:
                          activeModule === module.id
                            ? "primary.50"
                            : "background.paper"
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <MapIcon sx={{ fontSize: "2rem", color: "primary.main" }} />
                        <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                            {module.label}
                          </Typography>
                        </Box>
                      </Box>
                    </FeatureCard>
                  </Grid>
                ))}
              </Grid>
            </SectionCard>
          </Grid>

          {/* Active Module Content */}
          <Grid xs={12}>
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
                  <SectionHeader variant="h6">{currentModule.title}</SectionHeader>
                  <SectionSubtitle>{currentModule.description}</SectionSubtitle>
                </Box>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  sx={{ textTransform: "none", mt: 1 }}
                >
                  New Entry
                </Button>
              </Box>

              {/* Sub-tabs if available */}
              {currentModule.subTabs && (
                <Box sx={{ mb: 2 }}>
                  <Tabs
                    value={activeSubTab || currentModule.subTabs[0].id}
                    onChange={handleSubTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                  >
                    {currentModule.subTabs.map((tab) => (
                      <Tab
                        key={tab.id}
                        value={tab.id}
                        label={`${tab.name} (${tab.count})`}
                      />
                    ))}
                  </Tabs>
                  <Divider sx={{ my: 2 }} />
                </Box>
              )}

              {/* Feature Grid */}
              <Grid container spacing={2}>
                {currentModule.features.map((feature) => (
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
          </Grid>

          {/* Land Type Integration */}
          <Grid xs={12} md={6}>
            <SectionCard>
              <SectionHeader variant="h6">Land Type Categories</SectionHeader>
              <SectionSubtitle>
                Integrated land type classification across the system
              </SectionSubtitle>
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
            </SectionCard>
          </Grid>

          {/* Area & Size Integration */}
          <Grid xs={12} md={6}>
            <SectionCard>
              <SectionHeader variant="h6">Geographic & Size Integration</SectionHeader>
              <SectionSubtitle>
                Manage land across regions and size measurements
              </SectionSubtitle>
              <Grid container spacing={2}>
                <Grid xs={12} sm={6}>
                  <Card sx={{ p: 2, textAlign: "center" }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                      Regions
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", justifyContent: "center", gap: 1 }}>
                      <Chip label="Harare" size="small" />
                      <Chip label="Bulawayo" size="small" />
                      <Chip label="Gweru" size="small" />
                    </Stack>
                  </Card>
                </Grid>
                <Grid xs={12} sm={6}>
                  <Card sx={{ p: 2, textAlign: "center" }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                      Size Units
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", justifyContent: "center", gap: 1 }}>
                      <Chip label="sqm" size="small" />
                      <Chip label="ha" size="small" />
                    </Stack>
                  </Card>
                </Grid>
              </Grid>
            </SectionCard>
          </Grid>

          {/* System Summary */}
          <Grid xs={12}>
            <SectionCard>
              <SectionHeader variant="h6">Integrated Land Management System</SectionHeader>
              <Grid container spacing={2}>
                <Grid xs={12} sm={6}>
                  <Box sx={{ p: 2, borderRadius: 2, bgcolor: "background.default" }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                      Core Inventory
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Plot registration with stand numbers, GIS coordinates, survey records, land size measurements, zoning classification, ownership records, and deed uploads.
                    </Typography>
                  </Box>
                </Grid>
                <Grid xs={12} sm={6}>
                  <Box sx={{ p: 2, borderRadius: 2, bgcolor: "background.default" }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                      Sales & Distribution
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Process land sales with installment plans, payment tracking, offer letters, sale agreements, transfer tracking, and comprehensive buyer management.
                    </Typography>
                  </Box>
                </Grid>
                <Grid xs={12} sm={6}>
                  <Box sx={{ p: 2, borderRadius: 2, bgcolor: "background.default" }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                      Subdivision & Infrastructure
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Manage development phases, blocks, stand allocation, and track infrastructure progress for roads, water, and electricity.
                    </Typography>
                  </Box>
                </Grid>
                <Grid xs={12} sm={6}>
                  <Box sx={{ p: 2, borderRadius: 2, bgcolor: "background.default" }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                      GIS & Compliance
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Interactive mapping with GPS integration, dynamic pricing engine, and municipal compliance tracking with document expiry alerts.
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </SectionCard>
          </Grid>
        </Grid>
      </PageBox>
    </Fragment>
  );
}
