import { Fragment, useMemo, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
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
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import PlotRegistrationForm from "./PlotRegistrationForm";




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

const initialPlots = [
  { id: "LND-001", stand: "A-12", coordinates: "1.2921° S, 36.8219° E", size: "1,250 sqm", zone: "Residential", owner: "Anna Kimani", status: "Available", surveyRef: "SR-2026-112" },
  { id: "LND-002", stand: "B-03", coordinates: "1.3005° S, 36.8200° E", size: "1.8 ha", zone: "Commercial", owner: "Mara Land Co.", status: "Under Offer", surveyRef: "SR-2026-089" }
];

const initialOwners = [
  { plotId: "LND-001", owner: "Anna Kimani", updatedAt: "2026-05-10" },
  { plotId: "LND-002", owner: "Mara Land Co.", updatedAt: "2026-04-28" }
];

const initialSurveyRecords = [
  { id: "SR-2026-112", plotId: "LND-001", type: "Boundary Survey", date: "2026-04-12" },
  { id: "SR-2026-089", plotId: "LND-002", type: "Topographic Survey", date: "2026-03-05" }
];

const initialBuyers = [
  { name: "Elijah Mwangi", company: "Green Acre Investments", interest: "Plot B-03", status: "Active" },
  { name: "Nina Wanjiru", company: "Vista Developments", interest: "Plot A-12", status: "Review" }
];

const initialInstallments = [
  { plot: "A-12", schedule: "24 months", progress: 62, due: "KES 620,000" },
  { plot: "B-03", schedule: "18 months", progress: 48, due: "KES 330,000" }
];

const initialTransferRecords = [
  { plotId: "LND-002", buyer: "Green Acre Investments", status: "Pending" },
  { plotId: "LND-007", buyer: "Damu Holdings", status: "Scheduled" }
];

const featureLabels = {
  "plot-registration": "Plot Registration",
  "survey-records": "Survey Records",
  "ownership-records": "Ownership Records",
  "gis": "GIS & Mapping",
  "documents": "Document Library",
  "sales": "Land Sales Processing",
  "installments": "Installment Plans",
  "offer-letters": "Offer Letters",
  "agreements": "Sale Agreements",
  "transfers": "Transfer Tracking",
  "buyers": "Buyer Management"
};

const featureDescriptions = {
  "plot-registration": "Register new plots, update stand numbers, coordinates, size, zone, and ownership.",
  "survey-records": "Store and review recorded surveys and topographic documents.",
  "ownership-records": "Track ownership changes and record transfer updates.",
  "gis": "View and manage GIS data, coordinates, and spatial overview.",
  "documents": "Upload deeds, sale agreements, survey documents, and transfer certificates.",
  "sales": "Process land sales, issue agreements, and monitor payment schedules.",
  "installments": "Manage installment plans and track repayment progress.",
  "offer-letters": "Create and issue offer letters to buyers quickly.",
  "agreements": "Generate sale agreements and store signed documents.",
  "transfers": "Monitor ownership transfer progress with clear status updates.",
  "buyers": "Manage buyer profiles and active land purchase interests."
};

export default function LandFeaturePage() {
  const { feature } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const query = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const plotId = query.get("plotId");

  const [plots, setPlots] = useState(initialPlots);
  const [plotForm, setPlotForm] = useState({ id: "", stand: "", coordinates: "", size: "", zone: "Residential", owner: "", surveyRef: "" });
  const [surveyRecords, setSurveyRecords] = useState(initialSurveyRecords);
  const [owners, setOwners] = useState(initialOwners);
  const [documentList, setDocumentList] = useState([]);
  const [buyers, setBuyers] = useState(initialBuyers);
  const [installments, setInstallments] = useState(initialInstallments);
  const [transfers, setTransfers] = useState(initialTransferRecords);
  const [offerLetter, setOfferLetter] = useState({ buyer: "", plot: "", amount: "" });
  const [documentName, setDocumentName] = useState("");

  const pageTitle = featureLabels[feature] || "Land Feature";
  const pageDescription = featureDescriptions[feature] || "Manage important land workflow actions and documents.";

  const selectedPlot = useMemo(
    () => plots.find((plot) => plot.id === plotId) || null,
    [plots, plotId]
  );

  const handlePlotFieldChange = (key, value) => {
    setPlotForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleAddPlot = () => {
    const nextPlot = { ...plotForm, id: `LND-${Math.floor(100 + Math.random() * 900)}` };
    setPlots((prev) => [nextPlot, ...prev]);
    setPlotForm({ id: "", stand: "", coordinates: "", size: "", zone: "Residential", owner: "", surveyRef: "" });
  };

  const handleSurveyUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSurveyRecords((prev) => [
        ...prev,
        { id: `SR-${new Date().getTime()}`, plotId: "LND-NEW", type: file.name, date: new Date().toISOString().slice(0, 10) }
      ]);
    }
  };

  const handleDocumentUpload = (event) => {
    const files = Array.from(event.target.files).map((file) => ({
      name: file.name,
      size: file.size,
      uploadedAt: new Date().toLocaleDateString()
    }));
    setDocumentList((prev) => [...files, ...prev]);
  };

  const handleAddBuyer = () => {
    if (!offerLetter.buyer) return;
    setBuyers((prev) => [
      { name: offerLetter.buyer, company: "New buyer firm", interest: offerLetter.plot || "Unassigned", status: "Active" },
      ...prev
    ]);
    setOfferLetter({ buyer: "", plot: "", amount: "" });
  };

  const handleOfferSubmit = () => {
    if (!offerLetter.buyer || !offerLetter.plot || !offerLetter.amount) return;
    setDocumentList((prev) => [
      { name: `Offer Letter - ${offerLetter.plot}`, size: 0, uploadedAt: new Date().toLocaleDateString() },
      ...prev
    ]);
    setOfferLetter({ buyer: "", plot: "", amount: "" });
  };

  const renderPlotRegistration = () => (
    <Box>
      <Grid container spacing={2}>
        <Grid xs={12} lg={7}>
          <SectionCard>
            <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 2, flexWrap: "wrap", mb: 2 }}>
              <Box>
                <SectionHeader>Plot Registration</SectionHeader>
                <SectionSubtitle>
                  Create a new land plot with complete stand details, GIS coordinates, survey reference and ownership.
                </SectionSubtitle>
              </Box>
              <Chip label="Pro" color="primary" variant="outlined" />
            </Box>

            <Grid container spacing={2}>
              <Grid xs={12} sm={6}>
                <TextField
                  label="Stand number"
                  size="small"
                  fullWidth
                  value={plotForm.stand}
                  onChange={(e) => handlePlotFieldChange("stand", e.target.value)}
                />
              </Grid>

              <Grid xs={12} sm={6}>
                <TextField
                  label="Coordinates"
                  size="small"
                  fullWidth
                  value={plotForm.coordinates}
                  onChange={(e) => handlePlotFieldChange("coordinates", e.target.value)}
                  placeholder="e.g. 1.2921° S, 36.8219° E"
                />
              </Grid>

              <Grid xs={12} sm={6}>
                <TextField
                  label="Survey reference"
                  size="small"
                  fullWidth
                  value={plotForm.surveyRef}
                  onChange={(e) => handlePlotFieldChange("surveyRef", e.target.value)}
                  placeholder="SR-YYYY-NNN"
                />
              </Grid>

              <Grid xs={12} sm={6}>
                <TextField
                  label="Size"
                  size="small"
                  fullWidth
                  value={plotForm.size}
                  onChange={(e) => handlePlotFieldChange("size", e.target.value)}
                  placeholder="e.g. 1250 sqm or 1.8 ha"
                />
              </Grid>

              <Grid xs={12} sm={6}>
                <FormControl fullWidth size="small">
                  <InputLabel>Zone</InputLabel>
                  <Select
                    label="Zone"
                    value={plotForm.zone}
                    onChange={(e) => handlePlotFieldChange("zone", e.target.value)}>
                    <MenuItem value="Residential">Residential</MenuItem>
                    <MenuItem value="Commercial">Commercial</MenuItem>
                    <MenuItem value="Industrial">Industrial</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid xs={12} sm={6}>
                <TextField
                  label="Owner"
                  size="small"
                  fullWidth
                  value={plotForm.owner}
                  onChange={(e) => handlePlotFieldChange("owner", e.target.value)}
                  placeholder="Owner name / company"
                />
              </Grid>

              <Grid xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 2,
                    flexWrap: "wrap",
                    mt: 1
                  }}>
                  <Typography variant="body2" color="text.secondary">
                    New plot ID will be generated automatically after saving.
                  </Typography>

                  <Button
                    variant="contained"
                    onClick={handleAddPlot}
                    startIcon={<AddIcon />}
                    sx={{ textTransform: "none" }}>
                    Save Plot
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </SectionCard>
        </Grid>

        <Grid xs={12} lg={5}>
          <SectionCard>
            <SectionHeader>Preview</SectionHeader>
            {selectedPlot ? (
              <Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2, mb: 2, flexWrap: "wrap" }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                    {selectedPlot.id}
                  </Typography>
                  <Chip label={selectedPlot.status || "Registered"} color="success" size="small" />
                </Box>

                <Stack spacing={1}>
                  <Typography variant="body2" color="text.secondary"><strong>Stand:</strong> {selectedPlot.stand}</Typography>
                  <Typography variant="body2" color="text.secondary"><strong>Coordinates:</strong> {selectedPlot.coordinates}</Typography>
                  <Typography variant="body2" color="text.secondary"><strong>Zone:</strong> {selectedPlot.zone}</Typography>
                  <Typography variant="body2" color="text.secondary"><strong>Owner:</strong> {selectedPlot.owner}</Typography>
                  {selectedPlot.surveyRef && (
                    <Typography variant="body2" color="text.secondary"><strong>Survey Ref:</strong> {selectedPlot.surveyRef}</Typography>
                  )}
                </Stack>

                <Divider sx={{ my: 2 }} />

                <Typography variant="caption" color="text.secondary">
                  Tip: Use the inventory list to select a plot and prefill details.
                </Typography>
              </Box>
            ) : (
              <Box>
                <Typography color="text.secondary" sx={{ mb: 2 }}>
                  Select a plot from Land Inventory to preview details.
                </Typography>

                <Card variant="outlined" sx={{ p: 2, borderRadius: 2, bgcolor: "background.default" }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1 }}>What you’ll store</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Stand number, GIS coordinates, survey reference, size, zoning and owner information.
                  </Typography>
                </Card>
              </Box>
            )}
          </SectionCard>
        </Grid>
      </Grid>
    </Box>
  );

  const renderSurveyRecords = () => (
    <Box>
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
        <Button variant="outlined" component="label" startIcon={<UploadFileIcon />} sx={{ textTransform: "none" }}>
          Upload Survey File
          <input hidden type="file" onChange={handleSurveyUpload} />
        </Button>
        <Button variant="contained" onClick={() => navigate(-1)} sx={{ textTransform: "none" }}>
          Return to inventory
        </Button>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Survey ref</TableCell>
              <TableCell>Plot ID</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {surveyRecords.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.id}</TableCell>
                <TableCell>{record.plotId}</TableCell>
                <TableCell>{record.type}</TableCell>
                <TableCell>{record.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );

  const renderOwnershipRecords = () => (
    <Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Plot</TableCell>
              <TableCell>Owner</TableCell>
              <TableCell>Updated</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {owners.map((owner) => (
              <TableRow key={`${owner.plotId}-${owner.updatedAt}`}>
                <TableCell>{owner.plotId}</TableCell>
                <TableCell>{owner.owner}</TableCell>
                <TableCell>{owner.updatedAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );

  const renderGIS = () => (
    <Box>
      <SectionCard sx={{ mb: 3, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>Coordinate Explorer</Typography>
          <Typography color="text.secondary">Inspect plot coordinates and deploy geospatial tracking.</Typography>
        </Box>
        <Button variant="contained" onClick={() => navigateToFeature("/app/mapping/map")} sx={{ textTransform: "none" }}>
          Launch GIS Map
        </Button>
      </SectionCard>

      <Grid container spacing={2}>
        {plots.map((plot) => (
          <Grid xs={12} sm={6} key={plot.id}>
            <Card sx={{ p: 2, borderRadius: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{plot.stand}</Typography>
              <Typography variant="body2" color="text.secondary">{plot.coordinates}</Typography>
              <Typography variant="body2" color="text.secondary">Zone: {plot.zone}</Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  const renderDocuments = () => (
    <Box>
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
        <Button variant="outlined" component="label" startIcon={<UploadFileIcon />} sx={{ textTransform: "none" }}>
          Upload Document
          <input hidden multiple type="file" onChange={handleDocumentUpload} />
        </Button>
        <Button variant="contained" onClick={() => navigate(-1)} sx={{ textTransform: "none" }}>
          Back to inventory
        </Button>
      </Box>
      <List>
        {documentList.length ? (
          documentList.map((doc) => (
            <ListItemButton key={`${doc.name}-${doc.uploadedAt}`}>
              <ListItemText primary={doc.name} secondary={`Uploaded ${doc.uploadedAt}`} />
            </ListItemButton>
          ))
        ) : (
          <Typography color="text.secondary">No documents have been uploaded yet.</Typography>
        )}
      </List>
    </Box>
  );

  const renderSales = () => (
    <Box>
      <Grid container spacing={2}>
        <Grid xs={12} lg={6}>
          <SectionCard>
            <SectionHeader>Create a sales transaction</SectionHeader>
            <SectionSubtitle>Enter sale details and generate agreement-ready documents.</SectionSubtitle>
            <Stack spacing={2}>
              <TextField label="Plot ID" size="small" fullWidth value={offerLetter.plot} onChange={(e) => setOfferLetter((prev) => ({ ...prev, plot: e.target.value }))} />
              <TextField label="Buyer name" size="small" fullWidth value={offerLetter.buyer} onChange={(e) => setOfferLetter((prev) => ({ ...prev, buyer: e.target.value }))} />
              <TextField label="Sale amount" size="small" fullWidth value={offerLetter.amount} onChange={(e) => setOfferLetter((prev) => ({ ...prev, amount: e.target.value }))} />
              <Button variant="contained" onClick={handleOfferSubmit} sx={{ textTransform: "none" }}>
                Generate Sale Agreement
              </Button>
            </Stack>
          </SectionCard>
        </Grid>
        <Grid xs={12} lg={6}>
          <SectionCard>
            <SectionHeader>Sales dashboard</SectionHeader>
            <Stack spacing={2}>
              <Card variant="outlined" sx={{ p: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Offer letters ready</Typography>
                <Typography color="text.secondary">Use this module to issue immediate buyer proposals.</Typography>
              </Card>
              <Card variant="outlined" sx={{ p: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Transfer tracking</Typography>
                <Typography color="text.secondary">Review pending and scheduled ownership transfers.</Typography>
              </Card>
            </Stack>
          </SectionCard>
        </Grid>
      </Grid>
    </Box>
  );

  const renderInstallments = () => (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Plot</TableCell>
            <TableCell>Schedule</TableCell>
            <TableCell>Progress</TableCell>
            <TableCell>Due amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {installments.map((item) => (
            <TableRow key={item.plot}>
              <TableCell>{item.plot}</TableCell>
              <TableCell>{item.schedule}</TableCell>
              <TableCell>{item.progress}%</TableCell>
              <TableCell>{item.due}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const renderOfferLetters = () => (
    <Box>
      <SectionCard sx={{ mb: 3 }}>
        <SectionHeader>Generate offer letters</SectionHeader>
        <Stack spacing={2}>
          <TextField label="Buyer name" size="small" fullWidth value={offerLetter.buyer} onChange={(e) => setOfferLetter((prev) => ({ ...prev, buyer: e.target.value }))} />
          <TextField label="Plot ID" size="small" fullWidth value={offerLetter.plot} onChange={(e) => setOfferLetter((prev) => ({ ...prev, plot: e.target.value }))} />
          <TextField label="Offer amount" size="small" fullWidth value={offerLetter.amount} onChange={(e) => setOfferLetter((prev) => ({ ...prev, amount: e.target.value }))} />
          <Button variant="contained" onClick={handleOfferSubmit} sx={{ textTransform: "none" }}>
            Issue Offer Letter
          </Button>
        </Stack>
      </SectionCard>
      <List>
        {documentList.filter((doc) => doc.name.startsWith("Offer Letter")).map((doc) => (
          <ListItemButton key={`${doc.name}-${doc.uploadedAt}`}>
            <ListItemText primary={doc.name} secondary={`Uploaded ${doc.uploadedAt}`} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  const renderAgreements = () => (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Document</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {documentList.filter((doc) => doc.name.includes("Agreement")).map((doc) => (
            <TableRow key={`${doc.name}-${doc.uploadedAt}`}>
              <TableCell>{doc.name}</TableCell>
              <TableCell>Sale agreement</TableCell>
              <TableCell>{doc.uploadedAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const renderTransfers = () => (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Plot</TableCell>
            <TableCell>Buyer</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transfers.map((item) => (
            <TableRow key={item.plotId}>
              <TableCell>{item.plotId}</TableCell>
              <TableCell>{item.buyer}</TableCell>
              <TableCell>
                <Chip label={item.status} color={item.status === "Pending" ? "warning" : "success"} size="small" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const renderBuyers = () => (
    <Box>
      <Grid container spacing={2}>
        <Grid xs={12} lg={4}>
          <SectionCard>
            <SectionHeader>Add buyer profile</SectionHeader>
            <Stack spacing={2}>
              <TextField label="Buyer name" size="small" fullWidth value={offerLetter.buyer} onChange={(e) => setOfferLetter((prev) => ({ ...prev, buyer: e.target.value }))} />
              <TextField label="Plot interest" size="small" fullWidth value={offerLetter.plot} onChange={(e) => setOfferLetter((prev) => ({ ...prev, plot: e.target.value }))} />
              <Button variant="contained" onClick={handleAddBuyer} sx={{ textTransform: "none" }}>
                Add Buyer
              </Button>
            </Stack>
          </SectionCard>
        </Grid>
        <Grid xs={12} lg={8}>
          <SectionCard>
            <SectionHeader>Buyer profiles</SectionHeader>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Company</TableCell>
                    <TableCell>Interest</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {buyers.map((buyer) => (
                    <TableRow key={buyer.name}>
                      <TableCell>{buyer.name}</TableCell>
                      <TableCell>{buyer.company}</TableCell>
                      <TableCell>{buyer.interest}</TableCell>
                      <TableCell>{buyer.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </SectionCard>
        </Grid>
      </Grid>
    </Box>
  );

  const renderFeatureContent = () => {
    switch (feature) {
      case "plot-registration":
        return (
          <PlotRegistrationForm
            navigateBack={() => navigate(-1)}
            onSaved={() => {
              // demo only; keep existing inventory demo data intact
            }}
          />
        );

      case "survey-records":
        return renderSurveyRecords();
      case "ownership-records":
        return renderOwnershipRecords();
      case "gis":
        return renderGIS();
      case "documents":
        return renderDocuments();
      case "sales":
        return renderSales();
      case "installments":
        return renderInstallments();
      case "offer-letters":
        return renderOfferLetters();
      case "agreements":
        return renderAgreements();
      case "transfers":
        return renderTransfers();
      case "buyers":
        return renderBuyers();
      default:
        return (
          <Typography color="text.secondary">The selected land workflow is not available yet. Use the navigation to choose another action.</Typography>
        );
    }
  };

  return (
    <Fragment>
      <PageBox>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 3 }}>
          <Typography variant="h4" component="h1">
            {pageTitle}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 720 }}>
            {pageDescription}
          </Typography>
        </Box>

        <SectionCard>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 2, flexWrap: "wrap", mb: 2 }}>
            <Box>
              <SectionHeader>{pageTitle}</SectionHeader>
              <SectionSubtitle>{pageDescription}</SectionSubtitle>
            </Box>
            <Button variant="contained" onClick={() => navigate(-1)} sx={{ textTransform: "none" }}>
              Back to Inventory
            </Button>
          </Box>

          {renderFeatureContent()}
        </SectionCard>
      </PageBox>
    </Fragment>
  );
}
