import { Fragment, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Chip from "@mui/material/Chip";
import LinearProgress from "@mui/material/LinearProgress";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TerrainIcon from "@mui/icons-material/Terrain";
import { useNavigate } from "react-router-dom";

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
  marginBottom: theme.spacing(1),
  fontWeight: 700,
  color: theme.palette.text.primary
}));

const SectionSubtitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  color: theme.palette.text.secondary
}));

const metricCards = [
  { label: "Total Plots", value: "128", icon: <TerrainIcon />, color: "primary", path: "/app/land-management/action/plot-registration" },
  { label: "Active Sales", value: "24", icon: <AttachMoneyIcon />, color: "success", path: "/app/land-management/action/sales" },
  { label: "Pending Transfers", value: "8", icon: <TrendingUpIcon />, color: "warning", path: "/app/land-management/action/transfers" },
  { label: "Registered Buyers", value: "46", icon: <AccountCircleIcon />, color: "info", path: "/app/land-management/action/buyers" }
];

const landPlots = [
  {
    id: "LND-001",
    stand: "A-12",
    coordinates: "1.2921° S, 36.8219° E",
    surveyRef: "SR-2026-112",
    size: "1,250 sqm",
    zone: "Residential",
    owner: "Anna Kimani",
    status: "Available",
    saleStage: "Listing",
    transfer: "None"
  },
  {
    id: "LND-002",
    stand: "B-03",
    coordinates: "1.3005° S, 36.8200° E",
    surveyRef: "SR-2026-089",
    size: "1.8 ha",
    zone: "Commercial",
    owner: "Mara Land Co.",
    status: "Under Offer",
    saleStage: "Negotiation",
    transfer: "Pending"
  },
  {
    id: "LND-007",
    stand: "C-08",
    coordinates: "1.2947° S, 36.8232° E",
    surveyRef: "SR-2026-134",
    size: "950 sqm",
    zone: "Industrial",
    owner: "Damu Holdings",
    status: "Sold",
    saleStage: "Agreement",
    transfer: "Scheduled"
  },
  {
    id: "LND-011",
    stand: "D-01",
    coordinates: "1.2990° S, 36.8198° E",
    surveyRef: "SR-2026-142",
    size: "2,140 sqm",
    zone: "Residential",
    owner: "Samuel Otieno",
    status: "Available",
    saleStage: "Listing",
    transfer: "None"
  }
];

const salesPipeline = [
  { title: "Offer letters issued", subtitle: "Issued in last 30 days", count: 12 },
  { title: "Active agreements", subtitle: "Pending signatures", count: 6 },
  { title: "Installment plans", subtitle: "Open repayment schedules", count: 9 }
];

const paymentPlans = [
  { plan: "Plot A-12 - 24 months", progress: 62, due: "KES 620,000" },
  { plan: "Plot B-03 - 18 months", progress: 48, due: "KES 330,000" },
  { plan: "Plot C-08 - 12 months", progress: 85, due: "KES 98,000" }
];

const buyers = [
  { name: "Elijah Mwangi", interest: "Plot B-03", company: "Green Acre Investments", status: "Active" },
  { name: "Nina Wanjiru", interest: "Plot A-12", company: "Vista Developments", status: "In Review" },
  { name: "Leo Onyango", interest: "Plot D-01", company: "Lakefront Properties", status: "Offer Submitted" }
];

const statusMap = {
  Available: "success",
  "Under Offer": "warning",
  Sold: "default"
};

export default function LandInventory() {
  const [searchText, setSearchText] = useState("");
  const [zoneFilter, setZoneFilter] = useState("");
  const [uploadedDocs, setUploadedDocs] = useState([]);
  const navigate = useNavigate();

  const featureRoutes = {
    "Plot Registration": "/app/land-management/action/plot-registration",
    "GIS/Map Coordinates": "/app/land-management/action/gis",
    "Survey Records": "/app/land-management/action/survey-records",
    "Land Size Measurements": "/app/land-management/size",
    "Zoning Classification": "/app/zones",
    "Ownership Records": "/app/owners",
    "Deed/Document Uploads": "/app/land-management/action/documents"
  };

  const pipelineRoutes = {
    "Offer letters issued": "/app/land-management/action/offer-letters",
    "Active agreements": "/app/land-management/action/agreements",
    "Installment plans": "/app/land-management/action/installments"
  };

  const navigateToFeature = (path) => {
    navigate(path);
  };

  const handlePlotRow = (plot) => {
    navigate(`/app/land-management/action/plot-registration?plotId=${plot.id}`);
  };

  const filteredPlots = useMemo(() => {
    return landPlots.filter((plot) => {
      const searchLower = searchText.toLowerCase();
      const matchesText =
        plot.stand.toLowerCase().includes(searchLower) ||
        plot.coordinates.toLowerCase().includes(searchLower) ||
        plot.owner.toLowerCase().includes(searchLower) ||
        plot.zone.toLowerCase().includes(searchLower);
      const matchesZone = zoneFilter ? plot.zone === zoneFilter : true;
      return matchesText && matchesZone;
    });
  }, [searchText, zoneFilter]);

  const handleDocumentUpload = (event) => {
    const files = Array.from(event.target.files).map((file) => ({
      name: file.name,
      size: file.size,
      uploadedAt: new Date().toLocaleDateString()
    }));
    setUploadedDocs((prev) => [...prev, ...files]);
  };

  return (
    <Fragment>
      <PageBox>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 3 }}>
          <Typography variant="h4" component="h1">
            Land Inventory & Sales Management
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 680 }}>
            Centralize plot registration, GIS coordinates, survey documentation, ownership records, sales agreements, payment plans, and transfer tracking in one modern control panel.
          </Typography>
        </Box>

        <Grid container spacing={3} sx={{ mb: 3 }}>
          {metricCards.map((metric) => (
            <Grid xs={12} sm={6} md={3} key={metric.label}>
              <Card
                onClick={() => navigateToFeature(metric.path)}
                sx={{
                  p: 3,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  minHeight: 130,
                  cursor: "pointer",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  '&:hover': { transform: 'translateY(-2px)', boxShadow: 6 }
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box sx={{ color: `${metric.color}.main` }}>{metric.icon}</Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    {metric.label}
                  </Typography>
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  {metric.value}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3}>
          <Grid xs={12} lg={8}>
            <SectionCard>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 2, mb: 3 }}>
                <Box>
                  <SectionHeader>Plot Registration & Inventory</SectionHeader>
                  <SectionSubtitle>Browse registered plots, stand numbers, zoning, ownership, and transfer status.</SectionSubtitle>
                </Box>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  sx={{ textTransform: "none" }}
                  onClick={() => navigateToFeature("/app/land-management/action/plot-registration")}
                >
                  Register Plot
                </Button>
              </Box>

              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Search plots, owners or coordinates"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Zone filter</InputLabel>
                    <Select
                      value={zoneFilter}
                      label="Zone filter"
                      onChange={(e) => setZoneFilter(e.target.value)}
                    >
                      <MenuItem value="">All zones</MenuItem>
                      <MenuItem value="Residential">Residential</MenuItem>
                      <MenuItem value="Commercial">Commercial</MenuItem>
                      <MenuItem value="Industrial">Industrial</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mb: 2, flexWrap: "wrap" }}>
                <Button
                  variant="text"
                  onClick={() => navigateToFeature("/app/land-management/action/gis")}
                  sx={{ textTransform: "none" }}
                >
                  Open Map View
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => navigateToFeature("/app/land-management/action/documents")}
                  sx={{ textTransform: "none" }}
                >
                  Open Document Library
                </Button>
              </Box>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Plot / Stand</TableCell>
                      <TableCell>Coordinates</TableCell>
                      <TableCell>Survey ref</TableCell>
                      <TableCell>Size</TableCell>
                      <TableCell>Zoning</TableCell>
                      <TableCell>Owner</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Transfer</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredPlots.map((plot) => (
                      <TableRow
                        key={plot.id}
                        hover
                        onClick={() => handlePlotRow(plot)}
                        sx={{ cursor: "pointer" }}
                      >
                        <TableCell>
                          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{plot.stand}</Typography>
                          <Typography variant="caption" color="text.secondary">{plot.id}</Typography>
                        </TableCell>
                        <TableCell>{plot.coordinates}</TableCell>
                        <TableCell>{plot.surveyRef}</TableCell>
                        <TableCell>{plot.size}</TableCell>
                        <TableCell>
                          <Chip label={plot.zone} size="small" color={plot.zone === "Residential" ? "primary" : plot.zone === "Commercial" ? "success" : "warning"} />
                        </TableCell>
                        <TableCell>{plot.owner}</TableCell>
                        <TableCell>
                          <Chip label={plot.status} size="small" color={statusMap[plot.status] || "default"} />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {plot.transfer}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </SectionCard>
          </Grid>

          <Grid xs={12} lg={4}>
            <SectionCard sx={{ mb: 3 }}>
              <SectionHeader>Sales Pipeline</SectionHeader>
              <SectionSubtitle>Track offer letters, agreements and installment management.</SectionSubtitle>

              <Stack spacing={2}>
                {salesPipeline.map((item) => (
                  <Card
                    key={item.title}
                    variant="outlined"
                    sx={{ p: 2, cursor: "pointer", '&:hover': { boxShadow: 6 } }}
                    onClick={() => navigateToFeature(pipelineRoutes[item.title])}
                  >
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>{item.title}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{item.subtitle}</Typography>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>{item.count}</Typography>
                  </Card>
                ))}
              </Stack>
            </SectionCard>

            <SectionCard>
              <SectionHeader>Installment & Payment Plans</SectionHeader>
              <SectionSubtitle>View active schedules, remaining balances and due amounts.</SectionSubtitle>

              <Stack spacing={2}>
                {paymentPlans.map((plan) => (
                  <Box key={plan.plan} sx={{ p: 2, borderRadius: 2, bgcolor: "background.default", border: 1, borderColor: "divider" }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{plan.plan}</Typography>
                      <Typography variant="subtitle2" color="text.secondary">{plan.due}</Typography>
                    </Box>
                    <LinearProgress variant="determinate" value={plan.progress} sx={{ height: 10, borderRadius: 5, mb: 1 }} />
                    <Typography variant="caption" color="text.secondary">{plan.progress}% paid</Typography>
                  </Box>
                ))}
              </Stack>
            </SectionCard>
          </Grid>

          <Grid xs={12} md={6}>
            <SectionCard>
              <SectionHeader>Deed & Document Uploads</SectionHeader>
              <SectionSubtitle>Upload deeds, survey docs, agreements, and transfer records.</SectionSubtitle>

              <Button
                variant="outlined"
                component="label"
                startIcon={<UploadFileIcon />}
                sx={{ textTransform: "none", mb: 2 }}
              >
                Upload Documents
                <input hidden multiple type="file" onChange={handleDocumentUpload} />
              </Button>
              <Button
                variant="text"
                onClick={() => navigateToFeature("/app/land-management/action/documents")}
                sx={{ textTransform: "none", mb: 2 }}
              >
                View Document Library
              </Button>

              <Stack spacing={1}>
                {uploadedDocs.length ? (
                  uploadedDocs.map((doc) => (
                    <Card key={`${doc.name}-${doc.uploadedAt}`} variant="outlined" sx={{ p: 2 }}>
                      <Typography variant="subtitle2">{doc.name}</Typography>
                      <Typography variant="caption" color="text.secondary">Uploaded on {doc.uploadedAt}</Typography>
                    </Card>
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary">No documents uploaded yet. Add deeds, survey reports, or sale agreements here.</Typography>
                )}
              </Stack>
            </SectionCard>
          </Grid>

          <Grid xs={12} md={6}>
            <SectionCard>
              <SectionHeader>Buyer & Transfer Tracking</SectionHeader>
              <SectionSubtitle>Manage buyers, transfer status, and active offers.</SectionSubtitle>

              <Stack spacing={2}>
                {buyers.map((buyer) => (
                  <Box key={buyer.name} sx={{ p: 2, borderRadius: 2, bgcolor: "background.default", border: 1, borderColor: "divider" }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{buyer.name}</Typography>
                      <Chip
                        label={buyer.status}
                        size="small"
                        color={buyer.status === "Active" ? "success" : buyer.status === "Offer Submitted" ? "warning" : "default"}
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary">{buyer.company}</Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}><strong>Interest:</strong> {buyer.interest}</Typography>
                  </Box>
                ))}
              </Stack>

              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <Button
                  variant="contained"
                  onClick={() => navigateToFeature("/app/land-management/action/buyers")}
                  sx={{ textTransform: "none" }}
                >
                  Manage Buyers
                </Button>
              </Box>
            </SectionCard>
          </Grid>
        </Grid>
      </PageBox>
    </Fragment>
  );
}
