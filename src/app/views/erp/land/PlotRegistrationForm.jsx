import { Fragment, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import LinearProgress from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DescriptionIcon from "@mui/icons-material/Description";

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
  fontWeight: 800,
  color: theme.palette.text.primary
}));

const SectionSubtitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  color: theme.palette.text.secondary
}));

const zoneOptions = ["Residential", "Commercial", "Industrial", "Agricultural"];

const initialForm = {
  standNumber: "",
  plotName: "",
  coordinates: "",
  zone: "Residential",
  sizeValue: "",
  sizeUnit: "sqm",
  countyWard: "",
  municipality: "",
  surveyReference: "",
  ownerName: "",
  ownerPhone: "",
  ownerIdNumber: "",
  ownershipType: "Individual",
  notes: "",
  documentFiles: []
};

function normalizeNumber(value) {
  const s = (value ?? "").toString().trim();
  if (!s) return "";
  return s;
}

export default function PlotRegistrationForm({ navigateBack, onSaved }) {
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);
  const [snack, setSnack] = useState({ open: false, severity: "success", message: "" });

  const quality = useMemo(() => {
    const checks = [
      !!form.standNumber,
      !!form.coordinates,
      !!form.surveyReference,
      !!form.sizeValue,
      !!form.ownerName
    ];
    const score = checks.filter(Boolean).length;
    return { score, pct: Math.round((score / checks.length) * 100) };
  }, [form]);

  const errors = useMemo(() => {
    const e = {};
    if (!form.standNumber.trim()) e.standNumber = "Stand number is required.";
    if (!form.coordinates.trim()) e.coordinates = "Coordinates are required.";
    if (!form.surveyReference.trim()) e.surveyReference = "Survey reference is required.";
    if (!normalizeNumber(form.sizeValue)) e.sizeValue = "Size value is required.";
    const v = Number(form.sizeValue);
    if (normalizeNumber(form.sizeValue) && Number.isNaN(v)) e.sizeValue = "Size value must be a number.";
    if (!form.ownerName.trim()) e.ownerName = "Owner name is required.";
    return e;
  }, [form]);

  const canSave = Object.keys(errors).length === 0 && !saving;

  const handleField = (key) => (event) => {
    const value = event?.target?.value;
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleDocumentUpload = (event) => {
    const files = Array.from(event.target.files ?? []);
    if (!files.length) return;
    const normalized = files.map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type || "",
      uploadedAt: new Date().toISOString()
    }));
    setForm((prev) => ({ ...prev, documentFiles: [...normalized, ...prev.documentFiles] }));
  };

  const handleSave = async () => {
    if (!canSave) {
      setSnack({ open: true, severity: "error", message: "Fix the highlighted fields to continue." });
      return;
    }

    setSaving(true);
    // demo-only
    await new Promise((r) => setTimeout(r, 650));

    const payload = {
      id: `LND-${Math.floor(100 + Math.random() * 900)}`,
      ...form,
      size: `${form.sizeValue} ${form.sizeUnit}`,
      ownershipStatus: "Registered",
      createdAt: new Date().toISOString()
    };

    setSaving(false);
    setSnack({ open: true, severity: "success", message: "Plot registered successfully (demo)." });
    onSaved?.(payload);
    setForm(initialForm);
  };

  const handleReset = () => {
    setForm(initialForm);
    setSnack({ open: true, severity: "info", message: "Form cleared." });
  };

  const documentCount = form.documentFiles.length;

  return (
    <Fragment>
      <PageBox>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 3 }}>
          <Typography variant="h4" component="h1">
            Plot Registration
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 780 }}>
            Enter complete plot details (stand, GIS coordinates, zoning, size, survey reference and ownership) to register a new land plot.
          </Typography>
        </Box>

        <SectionCard>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: 2,
              flexWrap: "wrap",
              mb: 2
            }}
          >
            <Box>
              <SectionHeader>Registration checklist</SectionHeader>
              <SectionSubtitle>Make sure the required fields below are complete before saving.</SectionSubtitle>
            </Box>
            <Box sx={{ minWidth: 240 }}>
              <Stack spacing={1}>
                <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2, alignItems: "center" }}>
                  <Chip label={`${quality.pct}% complete`} color={quality.pct === 100 ? "success" : "primary"} />
                  <Typography variant="caption" color="text.secondary">
                    {quality.score}/5 required
                  </Typography>
                </Box>
                <LinearProgress variant="determinate" value={quality.pct} />
              </Stack>
            </Box>
          </Box>

          <Grid container spacing={2.5}>
            {/* Left: Form */}
            <Grid xs={12} lg={8}>
              <Paper
                variant="outlined"
                sx={{
                  p: 2.25,
                  borderRadius: 3,
                  bgcolor: "background.default",
                  borderColor: "divider"
                }}
              >
                <Grid container spacing={2}>
                  <Grid xs={12} md={6}>
                    <TextField
                      label="Stand number *"
                      size="small"
                      fullWidth
                      value={form.standNumber}
                      onChange={(e) => setForm((prev) => ({ ...prev, standNumber: e.target.value }))}
                      error={!!errors.standNumber}
                      helperText={errors.standNumber}
                    />
                  </Grid>

                  <Grid xs={12} md={6}>
                    <TextField
                      label="Plot name / reference"
                      size="small"
                      fullWidth
                      value={form.plotName}
                      onChange={handleField("plotName")}
                      placeholder="e.g. Block A - Plot 12"
                    />
                  </Grid>

                  <Grid xs={12} md={6}>
                    <TextField
                      label="GIS coordinates *"
                      size="small"
                      fullWidth
                      value={form.coordinates}
                      onChange={(e) => setForm((prev) => ({ ...prev, coordinates: e.target.value }))}
                      error={!!errors.coordinates}
                      helperText={errors.coordinates}
                      placeholder="e.g. 1.2921° S, 36.8219° E"
                    />
                  </Grid>

                  <Grid xs={12} md={6}>
                    <FormControl fullWidth size="small" error={!!errors.zone}>
                      <InputLabel>Zone</InputLabel>
                      <Select label="Zone" value={form.zone} onChange={handleField("zone")}>
                        {zoneOptions.map((z) => (
                          <MenuItem key={z} value={z}>
                            {z}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid xs={12} sm={7}>
                    <TextField
                      label="Size value *"
                      size="small"
                      fullWidth
                      value={form.sizeValue}
                      onChange={(e) => setForm((prev) => ({ ...prev, sizeValue: e.target.value }))}
                      error={!!errors.sizeValue}
                      helperText={errors.sizeValue}
                      placeholder="e.g. 1250"
                      inputProps={{ inputMode: "numeric" }}
                    />
                  </Grid>

                  <Grid xs={12} sm={5}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Unit</InputLabel>
                      <Select label="Unit" value={form.sizeUnit} onChange={handleField("sizeUnit")}>
                        <MenuItem value="sqm">sqm</MenuItem>
                        <MenuItem value="ha">ha</MenuItem>
                        <MenuItem value="acres">acres</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid xs={12} md={6}>
                    <TextField
                      label="County / Ward"
                      size="small"
                      fullWidth
                      value={form.countyWard}
                      onChange={handleField("countyWard")}
                      placeholder="Optional"
                    />
                  </Grid>

                  <Grid xs={12} md={6}>
                    <TextField
                      label="Municipality"
                      size="small"
                      fullWidth
                      value={form.municipality}
                      onChange={handleField("municipality")}
                      placeholder="Optional"
                    />
                  </Grid>

                  <Grid xs={12} md={6}>
                    <TextField
                      label="Survey reference *"
                      size="small"
                      fullWidth
                      value={form.surveyReference}
                      onChange={(e) => setForm((prev) => ({ ...prev, surveyReference: e.target.value }))}
                      error={!!errors.surveyReference}
                      helperText={errors.surveyReference}
                      placeholder="SR-YYYY-NNN"
                    />
                  </Grid>

                  <Grid xs={12} md={6}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Ownership type</InputLabel>
                      <Select label="Ownership type" value={form.ownershipType} onChange={handleField("ownershipType")}>
                        <MenuItem value="Individual">Individual</MenuItem>
                        <MenuItem value="Company">Company</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid xs={12} md={6}>
                    <TextField
                      label="Owner name *"
                      size="small"
                      fullWidth
                      value={form.ownerName}
                      onChange={(e) => setForm((prev) => ({ ...prev, ownerName: e.target.value }))}
                      error={!!errors.ownerName}
                      helperText={errors.ownerName}
                      placeholder="Owner / company"
                    />
                  </Grid>

                  <Grid xs={12} md={3}>
                    <TextField
                      label="Owner phone"
                      size="small"
                      fullWidth
                      value={form.ownerPhone}
                      onChange={handleField("ownerPhone")}
                      placeholder="Optional"
                    />
                  </Grid>

                  <Grid xs={12} md={3}>
                    <TextField
                      label="Owner ID number"
                      size="small"
                      fullWidth
                      value={form.ownerIdNumber}
                      onChange={handleField("ownerIdNumber")}
                      placeholder="Optional"
                    />
                  </Grid>

                  <Grid xs={12}>
                    <TextField
                      label="Notes"
                      size="small"
                      fullWidth
                      value={form.notes}
                      onChange={handleField("notes")}
                      multiline
                      minRows={3}
                      placeholder="Add any additional context (e.g., block, historical reference, remarks)"
                    />
                  </Grid>

                  <Grid xs={12}>
                    <Divider sx={{ my: 1.25 }} />

                    <Stack direction="row" spacing={1} flexWrap="wrap" alignItems="center" justifyContent="space-between" useFlexGap>
                      <Stack direction="row" spacing={1} flexWrap="wrap" alignItems="center">
                        <Button variant="outlined" component="label" startIcon={<UploadFileIcon />} sx={{ textTransform: "none" }}>
                          Upload documents
                          <input hidden multiple type="file" onChange={handleDocumentUpload} />
                        </Button>
                        <Chip label={documentCount ? `${documentCount} file(s)` : "No files"} variant="outlined" />
                      </Stack>

                      <Stack direction="row" spacing={1} flexWrap="wrap">
                        <Button variant="text" onClick={handleReset} sx={{ textTransform: "none" }} disabled={saving}>
                          Clear
                        </Button>
                        <Button
                          variant="contained"
                          onClick={handleSave}
                          disabled={!canSave}
                          startIcon={saving ? undefined : <AddIcon />}
                          sx={{ textTransform: "none" }}
                        >
                          {saving ? "Saving..." : "Save plot"}
                        </Button>
                      </Stack>
                    </Stack>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            {/* Right: Summary */}
            <Grid xs={12} lg={4}>
              <Stack spacing={2}>
                <SectionCard sx={{ p: 2.25 }}>
                  <Stack spacing={1.25}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <LocationOnIcon color="primary" />
                      <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                        Plot summary
                      </Typography>
                    </Box>
                    <Divider />

                    <Box sx={{ display: "grid", gap: 1 }}>
                      <SummaryRow label="Stand" value={form.standNumber || "—"} />
                      <SummaryRow label="Coordinates" value={form.coordinates || "—"} />
                      <SummaryRow label="Zone" value={form.zone || "—"} />
                      <SummaryRow
                        label="Size"
                        value={form.sizeValue ? `${form.sizeValue} ${form.sizeUnit}` : "—"}
                      />
                      <SummaryRow label="Survey" value={form.surveyReference || "—"} />
                    </Box>
                  </Stack>
                </SectionCard>

                <SectionCard sx={{ p: 2.25 }}>
                  <Stack spacing={1.25}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <AccountCircleIcon color="primary" />
                      <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                        Ownership
                      </Typography>
                    </Box>
                    <Divider />
                    <Box sx={{ display: "grid", gap: 1 }}>
                      <SummaryRow label="Owner" value={form.ownerName || "—"} />
                      <SummaryRow label="Type" value={form.ownershipType || "—"} />
                      <SummaryRow label="Phone" value={form.ownerPhone || "—"} />
                      <SummaryRow label="ID" value={form.ownerIdNumber || "—"} />
                    </Box>
                  </Stack>
                </SectionCard>

                <SectionCard sx={{ p: 2.25 }}>
                  <Stack spacing={1.25}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <DescriptionIcon color="primary" />
                      <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                        Documents
                      </Typography>
                    </Box>
                    <Divider />
                    {documentCount ? (
                      <Stack spacing={0.75}>
                        {form.documentFiles.slice(0, 3).map((d) => (
                          <Typography key={d.name + d.uploadedAt} variant="body2" color="text.secondary" noWrap>
                            • {d.name}
                          </Typography>
                        ))}
                        {documentCount > 3 && (
                          <Typography variant="caption" color="text.secondary">
                            +{documentCount - 3} more
                          </Typography>
                        )}
                      </Stack>
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        Upload deeds, survey reports and supporting documents.
                      </Typography>
                    )}

                    <Box sx={{ mt: 1 }}>
                      <Chip
                        icon={<CheckCircleIcon />}
                        label={Object.keys(errors).length ? "Missing required fields" : "Ready to save"}
                        color={Object.keys(errors).length ? "warning" : "success"}
                        variant="outlined"
                        sx={{ width: "100%", justifyContent: "center" }}
                      />
                    </Box>
                  </Stack>
                </SectionCard>

                {navigateBack && (
                  <Button variant="text" onClick={navigateBack} sx={{ textTransform: "none" }}>
                    Return to inventory
                  </Button>
                )}
              </Stack>
            </Grid>
          </Grid>
        </SectionCard>
      </PageBox>

      <Snackbar
        open={snack.open}
        autoHideDuration={3200}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={snack.severity}
          onClose={() => setSnack((s) => ({ ...s, open: false }))}
          sx={{ width: "100%" }}
          variant="filled"
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </Fragment>
  );
}

function SummaryRow({ label, value }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2, alignItems: "baseline" }}>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 650 }} noWrap>
        {value}
      </Typography>
    </Box>
  );
}

