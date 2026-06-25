import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";

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

const licenses = [
  {
    id: "L-001",
    agent: "Nia Harrison",
    license: "Sales License",
    issued: "2024-01-18",
    expires: "2026-01-18",
    status: "Active"
  },
  {
    id: "L-012",
    agent: "Samuel Okoro",
    license: "Rental Permit",
    issued: "2024-04-10",
    expires: "2025-04-10",
    status: "Pending"
  },
  {
    id: "L-019",
    agent: "Leah Mwangi",
    license: "Referral Clearance",
    issued: "2023-09-07",
    expires: "2025-09-07",
    status: "Active"
  },
  {
    id: "L-021",
    agent: "David Moyo",
    license: "Agent Registration",
    issued: "2023-12-03",
    expires: "2024-12-03",
    status: "Expired"
  }
];

export default function LicenseDetails() {
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedLicenseId, setSelectedLicenseId] = useState(licenses[0].id);

  const filteredLicenses = useMemo(
    () => licenses.filter((license) => statusFilter === "All" || license.status === statusFilter),
    [statusFilter]
  );

  const selectedLicense = useMemo(
    () => licenses.find((license) => license.id === selectedLicenseId) || licenses[0],
    [selectedLicenseId]
  );

  return (
    <PageBox>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 3 }}>
        <Typography variant="h4">License Details</Typography>
        <Typography color="text.secondary">
          Track each agent license record, expiry status and renewal readiness in one centralized dashboard.
        </Typography>
      </Box>

      <SectionCard sx={{ mb: 3 }}>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
          {['All', 'Active', 'Pending', 'Expired'].map((filter) => (
            <Chip
              key={filter}
              label={filter}
              clickable
              color={statusFilter === filter ? 'primary' : 'default'}
              onClick={() => setStatusFilter(filter)}
            />
          ))}
        </Box>

        <Grid container spacing={2}>
          {filteredLicenses.map((license) => (
            <Grid xs={12} sm={6} md={3} key={license.id}>
              <Card
                onClick={() => setSelectedLicenseId(license.id)}
                sx={{
                  p: 2,
                  cursor: 'pointer',
                  border: license.id === selectedLicenseId ? '2px solid' : '1px solid',
                  borderColor: license.id === selectedLicenseId ? 'primary.main' : 'divider',
                  transition: 'border-color 150ms ease-in-out'
                }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                  {license.license}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {license.agent}
                </Typography>
                <Typography variant="body2">Expires: {license.expires}</Typography>
                <Typography variant="body2">Status: {license.status}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </SectionCard>

      <SectionCard>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
          License Summary
        </Typography>
        <Grid container spacing={2}>
          <Grid xs={12} md={8}>
            <Card sx={{ p: 3, minHeight: 220 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                {selectedLicense.license}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {selectedLicense.agent}
              </Typography>
              <Typography variant="body2">License ID: {selectedLicense.id}</Typography>
              <Typography variant="body2">Issued: {selectedLicense.issued}</Typography>
              <Typography variant="body2">Expires: {selectedLicense.expires}</Typography>
              <Typography variant="body2">Status: {selectedLicense.status}</Typography>
            </Card>
          </Grid>
          <Grid xs={12} md={4}>
            <Card sx={{ p: 3, minHeight: 220, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                  Renewal Actions
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Keep agent licenses compliant with automated renewals and alert management ahead of expiry.
                </Typography>
              </Box>
              <Button
                variant="contained"
                color={selectedLicense.status === 'Expired' ? 'error' : 'primary'}
                fullWidth
              >
                {selectedLicense.status === 'Expired' ? 'Renew Now' : 'Schedule Renewal'}
              </Button>
            </Card>
          </Grid>
        </Grid>
      </SectionCard>
    </PageBox>
  );
}
