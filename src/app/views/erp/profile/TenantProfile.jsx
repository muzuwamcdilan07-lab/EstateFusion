import { Fragment, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";

const SectionTitle = ({ children }) => (
  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
    {children}
  </Typography>
);

export default function TenantProfile() {
  const [fullName, setFullName] = useState("Jane Tenant");
  const [email, setEmail] = useState("tenant@example.com");
  const [phone, setPhone] = useState("+1 (555) 555-0101");
  const [idNumber, setIdNumber] = useState("ID-789456");
  const [avatarDataUrl, setAvatarDataUrl] = useState("");
  const [leaseId, setLeaseId] = useState("LEASE-7781");
  const [leaseStart, setLeaseStart] = useState("2026-01-01");
  const [leaseEnd, setLeaseEnd] = useState("2027-12-31");
  const [rentAmount, setRentAmount] = useState("$1,500");
  const [paymentDueDay, setPaymentDueDay] = useState("1st of every month");
  const [paymentMethod, setPaymentMethod] = useState("Bank transfer");
  const [currency, setCurrency] = useState("USD");
  const [linkedProperty, setLinkedProperty] = useState("2B/3B Apartment • ID: PROP-1021");

  const avatarSrc = useMemo(() => {
    return avatarDataUrl || "/assets/images/face-3.jpg";
  }, [avatarDataUrl]);

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setAvatarDataUrl(String(reader.result));
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    alert("Tenant profile updated (demo)");
  };

  return (
    <Fragment>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>
          Tenant Profile
        </Typography>

        {/* Tenant Details */}
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <SectionTitle>Tenant Details</SectionTitle>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={3}>
                <Avatar
                  src={avatarSrc}
                  sx={{ width: 96, height: 96, mb: 1 }}
                />
                <Button variant="outlined" component="label" size="small">
                  Change profile pic
                  <input hidden accept="image/*" type="file" onChange={handleAvatarChange} />
                </Button>
              </Grid>

              <Grid item xs={12} md={9}>
                <Box sx={{ display: "grid", gap: 2 }}>
                  <TextField
                    label="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    fullWidth
                  />
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="ID Number"
                        value={idNumber}
                        onChange={(e) => setIdNumber(e.target.value)}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Chip label="Status: Active" color="success" variant="outlined" />
                      </Box>
                    </Grid>
                  </Grid>

                  <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
                    <Button variant="contained" onClick={handleSave}>
                      Save Changes
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Divider sx={{ mb: 2 }} />

        {/* Lease Info */}
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <SectionTitle>Lease Info</SectionTitle>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Lease ID"
                  value={leaseId}
                  onChange={(e) => setLeaseId(e.target.value)}
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Lease Start Date"
                  type="date"
                  value={leaseStart}
                  onChange={(e) => setLeaseStart(e.target.value)}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Lease End Date"
                  type="date"
                  value={leaseEnd}
                  onChange={(e) => setLeaseEnd(e.target.value)}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Monthly Rent Amount"
                  value={rentAmount}
                  onChange={(e) => setRentAmount(e.target.value)}
                  fullWidth
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Payment Terms */}
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <SectionTitle>Payment Terms</SectionTitle>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Due Day"
                  value={paymentDueDay}
                  onChange={(e) => setPaymentDueDay(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Preferred Payment Method"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Currency"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  fullWidth
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Linked Property */}
        <Card>
          <CardContent>
            <SectionTitle>Linked Property</SectionTitle>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              The property assigned to this tenant.
            </Typography>
            <Box sx={{ p: 2, bgcolor: "background.default", borderRadius: 1 }}>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                {linkedProperty}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Wire to backend to dynamically fetch the tenant's assigned property.
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Fragment>
  );
}
