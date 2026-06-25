import { Fragment, useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { useNavigate, useParams } from "react-router-dom";

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

const defaultRows = (feature) => {
  switch (feature) {
    case "stand-numbers":
      return [
        { stand: "A-12", plotId: "LND-001", note: "Primary stand" },
        { stand: "B-03", plotId: "LND-002", note: "Commercial stand" },
        { stand: "C-08", plotId: "LND-007", note: "Industrial stand" }
      ];
    case "status-tracking":
      return [
        { plotId: "LND-001", status: "Available", lastUpdate: "2026-05-10" },
        { plotId: "LND-002", status: "Under Offer", lastUpdate: "2026-05-01" },
        { plotId: "LND-007", status: "Sold", lastUpdate: "2026-04-28" }
      ];
    case "payment-plans":
      return [
        { plan: "Plot A-12 - 24 months", progress: 62, due: "KES 620,000" },
        { plan: "Plot B-03 - 18 months", progress: 48, due: "KES 330,000" },
        { plan: "Plot C-08 - 12 months", progress: 85, due: "KES 98,000" }
      ];
    case "offer-letters":
      return [
        { buyer: "Green Acre Investments", plot: "B-03", issuedOn: "2026-05-05" },
        { buyer: "Vista Developments", plot: "A-12", issuedOn: "2026-05-02" }
      ];
    case "agreements":
      return [
        { agreement: "AGR-001", plot: "B-03", date: "2026-04-22" },
        { agreement: "AGR-002", plot: "A-12", date: "2026-04-30" }
      ];
    default:
      return [
        { label: "Workflow ready", value: "This demo page is functional and ready to connect to APIs." }
      ];
  }
};

export default function LandActionWrapper() {
  const { feature } = useParams();
  const navigate = useNavigate();
  const [filter, setFilter] = useState("");

  const normalizedFeature = feature?.toString() || "";

  const titleMap = {
    "plot-registration": "Plot Registration",
    "stand-numbers": "Stand numbers",
    gis: "GIS/map coordinates",
    "survey-records": "Survey records",
    "status-tracking": "Land status tracking",
    "documents": "Deed/document uploads",
    "sales": "Land sales processing",
    "installments": "Installment management",
    "payment-plans": "Payment plans",
    "offer-letters": "Offer letters",
    agreements: "Sale agreements",
    transfers: "Transfer tracking",
    buyers: "Buyer management"
  };

  const subtitleMap = {
    "plot-registration": "Create and maintain plot records." ,
    "stand-numbers": "Manage stand allocations and mappings.",
    gis: "Browse and maintain GIS coordinates for plots.",
    "survey-records": "Upload and manage survey references.",
    "status-tracking": "Track status changes across land lifecycle.",
    "documents": "Upload deeds, documents and certificates.",
    "sales": "Process sales and generate sale-ready outputs.",
    "installments": "Track installment repayment progress.",
    "payment-plans": "View payment plan schedules and balances.",
    "offer-letters": "Issue offer letters to buyers.",
    agreements: "Manage sale agreements and signatures.",
    transfers: "Track transfers and their progress.",
    buyers: "Manage buyer profiles and interests"
  };

  const rows = useMemo(() => defaultRows(normalizedFeature), [normalizedFeature]);

  const filteredRows = useMemo(() => {
    if (!filter) return rows;
    const q = filter.toLowerCase();
    return rows.filter((r) => JSON.stringify(r).toLowerCase().includes(q));
  }, [rows, filter]);

  return (
    <Fragment>
      <PageBox>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 3 }}>
          <Typography variant="h4" component="h1">
            {titleMap[normalizedFeature] || "Land Feature"}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 720 }}>
            {subtitleMap[normalizedFeature] || "Manage the selected land workflow action."}
          </Typography>
        </Box>

        <SectionCard>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 2, flexWrap: "wrap", mb: 2 }}>
            <Box>
              <SectionHeader>{titleMap[normalizedFeature] || "Land Feature"}</SectionHeader>
              <SectionSubtitle>{subtitleMap[normalizedFeature] || "Functional placeholder ready for APIs."}</SectionSubtitle>
            </Box>

            <Button variant="contained" onClick={() => navigate(-1)} sx={{ textTransform: "none" }}>
              Back
            </Button>
          </Box>

          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid xs={12} md={4}>
              <TextField
                size="small"
                fullWidth
                label="Search"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
            </Grid>
            <Grid xs={12} md={8} sx={{ display: "flex", gap: 1, flexWrap: "wrap", alignItems: "center" }}>
              <Chip label="Demo data" color="primary" variant="outlined" />
              <Chip label="Ready to connect APIs" color="success" variant="outlined" />
              <Chip label={`Feature: ${normalizedFeature}`} variant="outlined" />
            </Grid>
          </Grid>

          <Box sx={{ display: "grid", gap: 1 }}>
            {filteredRows.length ? (
              filteredRows.map((row, idx) => (
                <Card key={idx} variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
                    {row.plotId || row.stand || row.plan || row.buyer || row.agreement || row.label || "Record"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {Object.entries(row)
                      .filter(([k]) => k !== "plotId" && k !== "stand" && k !== "plan" && k !== "buyer" && k !== "agreement" && k !== "label")
                      .map(([k, v]) => `${k}: ${v}`)
                      .join(" • ")}
                    {row.value ? ` • ${row.value}` : ""}
                  </Typography>
                </Card>
              ))
            ) : (
              <Typography color="text.secondary">No records match the filter.</Typography>
            )}
          </Box>
        </SectionCard>
      </PageBox>
    </Fragment>
  );
}

