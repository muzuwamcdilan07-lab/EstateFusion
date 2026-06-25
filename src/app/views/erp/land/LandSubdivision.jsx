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
import LinearProgress from "@mui/material/LinearProgress";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
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

export default function LandSubdivision() {
  const [phaseForm, setPhaseForm] = useState({ name: "", targetDate: "", plots: 0 });
  const [phases, setPhases] = useState([
    { id: 1, name: "Phase 1", targetDate: "2026-10-20", plots: 24, progress: 68 },
    { id: 2, name: "Phase 2", targetDate: "2027-01-15", plots: 32, progress: 40 }
  ]);

  const [blockForm, setBlockForm] = useState({ name: "", phase: "Phase 1", stands: 0 });
  const [blocks, setBlocks] = useState([
    { id: "Block A", phase: "Phase 1", stands: 14, status: "Ready" },
    { id: "Block B", phase: "Phase 2", stands: 18, status: "Preparing" }
  ]);

  const [standForm, setStandForm] = useState({ number: "", block: "Block A", owner: "", zone: "Residential" });
  const [stands, setStands] = useState([
    { number: "A-12", block: "Block A", owner: "Available", zone: "Residential", status: "Available" },
    { number: "A-13", block: "Block A", owner: "Sold", zone: "Residential", status: "Allocated" },
    { number: "B-01", block: "Block B", owner: "Available", zone: "Commercial", status: "Available" }
  ]);

  const [infrastructure, setInfrastructure] = useState({ road: 62, water: 48, electricity: 35 });
  const [zonePrice, setZonePrice] = useState("Residential");
  const [pricePerSqm, setPricePerSqm] = useState(5200);
  const [demandFactor, setDemandFactor] = useState(1.1);
  const [selectedPlot, setSelectedPlot] = useState("A-12");
  const [complianceChecklist, setComplianceChecklist] = useState([
    { id: 1, item: "Planning permit", dueDate: "2026-08-12", status: "Valid" },
    { id: 2, item: "Environmental review", dueDate: "2026-09-05", status: "Pending" },
    { id: 3, item: "Electrical clearance", dueDate: "2026-11-22", status: "Valid" }
  ]);

  const pricingPreview = useMemo(() => Math.round(pricePerSqm * demandFactor), [pricePerSqm, demandFactor]);

  const addPhase = () => {
    if (!phaseForm.name || !phaseForm.targetDate || !phaseForm.plots) return;
    setPhases((prev) => [
      ...prev,
      { id: prev.length + 1, name: phaseForm.name, targetDate: phaseForm.targetDate, plots: phaseForm.plots, progress: 0 }
    ]);
    setPhaseForm({ name: "", targetDate: "", plots: 0 });
  };

  const addBlock = () => {
    if (!blockForm.name || !blockForm.phase || !blockForm.stands) return;
    setBlocks((prev) => [
      ...prev,
      { id: blockForm.name, phase: blockForm.phase, stands: blockForm.stands, status: "Design" }
    ]);
    setBlockForm({ name: "", phase: "Phase 1", stands: 0 });
  };

  const allocateStand = () => {
    if (!standForm.number || !standForm.owner) return;
    setStands((prev) =>
      prev.map((stand) =>
        stand.number === standForm.number
          ? { ...stand, owner: standForm.owner, status: "Allocated" }
          : stand
      )
    );
    setStandForm({ number: "", block: "Block A", owner: "", zone: "Residential" });
  };

  const increaseInfrastructure = (type) => {
    setInfrastructure((prev) => ({ ...prev, [type]: Math.min(100, prev[type] + 12) }));
  };

  const toggleChecklist = (id) => {
    setComplianceChecklist((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: item.status === "Valid" ? "Pending" : "Valid" }
          : item
      )
    );
  };

  const complianceAlerts = useMemo(
    () => complianceChecklist.filter((item) => new Date(item.dueDate) <= new Date("2026-09-30")),
    [complianceChecklist]
  );

  return (
    <Fragment>
      <PageBox>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 3 }}>
          <Typography variant="h4" component="h1">
            Land Subdivision & Planning
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 720 }}>
            Manage phases, block allocation, infrastructure progress, pricing, GIS mapping, and compliance with a streamlined subdivision workflow.
          </Typography>
        </Box>

        <Grid container spacing={3} sx={{ mb: 3 }}>
          {[
            { label: "Active phases", value: phases.length, color: "primary" },
            { label: "Managed blocks", value: blocks.length, color: "success" },
            { label: "Allocated stands", value: stands.filter((stand) => stand.status === "Allocated").length, color: "warning" },
            { label: "Infrastructure score", value: `${Math.round((infrastructure.road + infrastructure.water + infrastructure.electricity) / 3)}%`, color: "info" }
          ].map((metric) => (
            <Grid xs={12} sm={6} md={3} key={metric.label}>
              <Card sx={{ p: 3, minHeight: 120, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <Typography variant="subtitle2" color="text.secondary">{metric.label}</Typography>
                <Typography variant="h4" sx={{ fontWeight: 700, color: `${metric.color}.main` }}>{metric.value}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3}>
          <Grid xs={12} lg={7}>
            <SectionCard sx={{ mb: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 2, mb: 3 }}>
                <Box>
                  <SectionHeader>Phase Creation</SectionHeader>
                  <SectionSubtitle>Define and release subdivision phases with target timelines and plot counts.</SectionSubtitle>
                </Box>
              </Box>

              <Grid container spacing={2}>
                <Grid xs={12} md={4}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Phase name"
                    value={phaseForm.name}
                    onChange={(e) => setPhaseForm((prev) => ({ ...prev, name: e.target.value }))}
                  />
                </Grid>
                <Grid xs={12} md={4}>
                  <TextField
                    fullWidth
                    size="small"
                    type="date"
                    label="Target date"
                    InputLabelProps={{ shrink: true }}
                    value={phaseForm.targetDate}
                    onChange={(e) => setPhaseForm((prev) => ({ ...prev, targetDate: e.target.value }))}
                  />
                </Grid>
                <Grid xs={12} md={4}>
                  <TextField
                    fullWidth
                    size="small"
                    type="number"
                    label="Plots"
                    value={phaseForm.plots}
                    onChange={(e) => setPhaseForm((prev) => ({ ...prev, plots: Number(e.target.value) }))}
                  />
                </Grid>
              </Grid>

              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <Button variant="contained" onClick={addPhase} startIcon={<AddIcon />} sx={{ textTransform: "none" }}>
                  Create phase
                </Button>
              </Box>

              <Divider sx={{ my: 3 }} />
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Phase</TableCell>
                      <TableCell>Target</TableCell>
                      <TableCell>Plots</TableCell>
                      <TableCell>Progress</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {phases.map((phase) => (
                      <TableRow key={phase.id}>
                        <TableCell>{phase.name}</TableCell>
                        <TableCell>{phase.targetDate}</TableCell>
                        <TableCell>{phase.plots}</TableCell>
                        <TableCell>{phase.progress}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </SectionCard>

            <SectionCard>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 2, mb: 3 }}>
                <Box>
                  <SectionHeader>Block Management</SectionHeader>
                  <SectionSubtitle>Group phase plots into blocks and prepare them for allocation.</SectionSubtitle>
                </Box>
              </Box>

              <Grid container spacing={2}>
                <Grid xs={12} md={5}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Block name"
                    value={blockForm.name}
                    onChange={(e) => setBlockForm((prev) => ({ ...prev, name: e.target.value }))}
                  />
                </Grid>
                <Grid xs={12} md={4}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Phase"
                    value={blockForm.phase}
                    onChange={(e) => setBlockForm((prev) => ({ ...prev, phase: e.target.value }))}
                    select
                  >
                    {phases.map((phase) => (
                      <MenuItem key={phase.id} value={phase.name}>{phase.name}</MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid xs={12} md={3}>
                  <TextField
                    fullWidth
                    size="small"
                    type="number"
                    label="Stand count"
                    value={blockForm.stands}
                    onChange={(e) => setBlockForm((prev) => ({ ...prev, stands: Number(e.target.value) }))}
                  />
                </Grid>
              </Grid>

              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <Button variant="contained" onClick={addBlock} startIcon={<AddIcon />} sx={{ textTransform: "none" }}>
                  Add block
                </Button>
              </Box>

              <Divider sx={{ my: 3 }} />
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Block</TableCell>
                      <TableCell>Phase</TableCell>
                      <TableCell>Stands</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {blocks.map((block) => (
                      <TableRow key={block.id}>
                        <TableCell>{block.id}</TableCell>
                        <TableCell>{block.phase}</TableCell>
                        <TableCell>{block.stands}</TableCell>
                        <TableCell>{block.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </SectionCard>
          </Grid>

          <Grid xs={12} lg={5}>
            <SectionCard sx={{ mb: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 2, mb: 3 }}>
                <Box>
                  <SectionHeader>Land Pricing Engine</SectionHeader>
                  <SectionSubtitle>Build pricing rules by zone and apply dynamic demand factors in real time.</SectionSubtitle>
                </Box>
              </Box>

              <Stack spacing={2}>
                <FormControl fullWidth size="small">
                  <InputLabel>Zone</InputLabel>
                  <Select value={zonePrice} label="Zone" onChange={(e) => setZonePrice(e.target.value)}>
                    <MenuItem value="Residential">Residential</MenuItem>
                    <MenuItem value="Commercial">Commercial</MenuItem>
                    <MenuItem value="Industrial">Industrial</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  label="Base price per sqm"
                  value={pricePerSqm}
                  onChange={(e) => setPricePerSqm(Number(e.target.value))}
                />
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  label="Demand factor"
                  value={demandFactor}
                  inputProps={{ step: 0.05 }}
                  onChange={(e) => setDemandFactor(Number(e.target.value))}
                />
                <Box sx={{ p: 2, borderRadius: 2, bgcolor: "background.default" }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Calculated price</Typography>
                  <Typography variant="h5" sx={{ mt: 1 }}>{`KES ${pricingPreview.toLocaleString()} / sqm`}</Typography>
                  <Typography variant="body2" color="text.secondary">Dynamic price based on selected zone and market demand.</Typography>
                </Box>
              </Stack>
            </SectionCard>

            <SectionCard sx={{ mb: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 2, mb: 3 }}>
                <Box>
                  <SectionHeader>GIS & Mapping</SectionHeader>
                  <SectionSubtitle>Coordinate plots, select parcels, and launch geo-services.</SectionSubtitle>
                </Box>
                <Button variant="contained" startIcon={<MapIcon />} sx={{ textTransform: "none" }}>
                  Launch map
                </Button>
              </Box>

              <Card sx={{ p: 2, mb: 2, bgcolor: "background.default" }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>Selected plot</Typography>
                <Typography variant="body2" color="text.secondary">{selectedPlot}</Typography>
                <Typography variant="body2" color="text.secondary">GPS: 1.2920° S, 36.8218° E</Typography>
              </Card>
              <Button variant="outlined" sx={{ textTransform: "none" }}>Select a plot</Button>
            </SectionCard>

            <SectionCard>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 2, mb: 3 }}>
                <Box>
                  <SectionHeader>Municipal approvals</SectionHeader>
                  <SectionSubtitle>Track compliance and stay ahead of document expiry.</SectionSubtitle>
                </Box>
                <Chip label="Compliance" color="success" />
              </Box>

              <List>
                {complianceChecklist.map((item) => (
                  <ListItemButton key={item.id} onClick={() => toggleChecklist(item.id)}>
                    <ListItemText
                      primary={item.item}
                      secondary={`${item.dueDate} • ${item.status}`}
                    />
                    <Chip label={item.status} color={item.status === "Valid" ? "success" : "warning"} size="small" />
                  </ListItemButton>
                ))}
              </List>

              {complianceAlerts.length > 0 && (
                <Box sx={{ mt: 2, p: 2, borderRadius: 2, bgcolor: "warning.lighter" }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Expiry alerts</Typography>
                  {complianceAlerts.map((item) => (
                    <Typography key={item.id} variant="body2" color="text.secondary">{item.item} expires on {item.dueDate}</Typography>
                  ))}
                </Box>
              )}
            </SectionCard>
          </Grid>

          <Grid xs={12}>
            <SectionCard>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 2, mb: 3 }}>
                <Box>
                  <SectionHeader>Stand Allocation</SectionHeader>
                  <SectionSubtitle>Allocate stands to buyers, set zoning, and confirm availability.</SectionSubtitle>
                </Box>
              </Box>

              <Grid container spacing={2}>
                <Grid xs={12} md={3}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Stand number"
                    value={standForm.number}
                    onChange={(e) => setStandForm((prev) => ({ ...prev, number: e.target.value }))}
                    select
                  >
                    {stands.map((stand) => (
                      <MenuItem key={stand.number} value={stand.number}>{stand.number}</MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid xs={12} md={3}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Block"
                    value={standForm.block}
                    onChange={(e) => setStandForm((prev) => ({ ...prev, block: e.target.value }))}
                    select
                  >
                    {blocks.map((block) => (
                      <MenuItem key={block.id} value={block.id}>{block.id}</MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid xs={12} md={3}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Owner"
                    value={standForm.owner}
                    onChange={(e) => setStandForm((prev) => ({ ...prev, owner: e.target.value }))}
                  />
                </Grid>
                <Grid xs={12} md={3}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Zone"
                    value={standForm.zone}
                    onChange={(e) => setStandForm((prev) => ({ ...prev, zone: e.target.value }))}
                    select
                  >
                    <MenuItem value="Residential">Residential</MenuItem>
                    <MenuItem value="Commercial">Commercial</MenuItem>
                    <MenuItem value="Industrial">Industrial</MenuItem>
                  </TextField>
                </Grid>
              </Grid>

              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <Button variant="contained" onClick={allocateStand} sx={{ textTransform: "none" }}>
                  Allocate stand
                </Button>
              </Box>

              <Divider sx={{ my: 3 }} />
              <Grid container spacing={2}>
                {stands.map((stand) => (
                  <Grid xs={12} sm={6} md={4} key={stand.number}>
                    <Card sx={{ p: 2, borderRadius: 2, bgcolor: "background.default" }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{stand.number}</Typography>
                      <Typography variant="body2" color="text.secondary">Block: {stand.block}</Typography>
                      <Typography variant="body2" color="text.secondary">Zone: {stand.zone}</Typography>
                      <Typography variant="body2" color="text.secondary">Owner: {stand.owner}</Typography>
                      <Chip label={stand.status} size="small" sx={{ mt: 1 }} color={stand.status === "Allocated" ? "success" : "default"} />
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </SectionCard>
          </Grid>

          <Grid xs={12} md={4}>
            <SectionCard>
              <SectionHeader>Infrastructure progress</SectionHeader>
              <SectionSubtitle>Track roads, water, and electricity delivery across the subdivision.</SectionSubtitle>
              <Stack spacing={3}>
                {Object.entries(infrastructure).map(([key, value]) => (
                  <Box key={key}>
                    <Typography variant="subtitle2" sx={{ textTransform: "capitalize", mb: 1 }}>{key}</Typography>
                    <LinearProgress variant="determinate" value={value} sx={{ height: 10, borderRadius: 5 }} />
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1 }}>
                      <Typography variant="caption" color="text.secondary">{value}% complete</Typography>
                      <Button size="small" onClick={() => increaseInfrastructure(key)} sx={{ textTransform: "none" }}>
                        Update
                      </Button>
                    </Box>
                  </Box>
                ))}
              </Stack>
            </SectionCard>
          </Grid>

          <Grid xs={12} md={8}>
            <SectionCard>
              <SectionHeader>Compliance & approvals</SectionHeader>
              <SectionSubtitle>Maintain municipal approvals and stay alert to expiring documents.</SectionSubtitle>
              <Grid container spacing={2}>
                {complianceChecklist.map((item) => (
                  <Grid xs={12} sm={6} key={item.id}>
                    <Card sx={{ p: 2, borderRadius: 2 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{item.item}</Typography>
                      <Typography variant="body2" color="text.secondary">Due: {item.dueDate}</Typography>
                      <Typography variant="body2" color="text.secondary">Status: {item.status}</Typography>
                      <Button size="small" onClick={() => toggleChecklist(item.id)} sx={{ mt: 1, textTransform: "none" }}>
                        Toggle status
                      </Button>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              {complianceAlerts.length > 0 && (
                <Box sx={{ mt: 3, p: 2, borderRadius: 2, bgcolor: "warning.lighter" }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Expiry alerts</Typography>
                  {complianceAlerts.map((item) => (
                    <Typography key={item.id} variant="body2" color="text.secondary">{item.item} expires on {item.dueDate}</Typography>
                  ))}
                </Box>
              )}
            </SectionCard>
          </Grid>
        </Grid>
      </PageBox>
    </Fragment>
  );
}
