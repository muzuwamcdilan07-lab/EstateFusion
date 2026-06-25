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

const SectionTitle = ({ children }) => (
  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
    {children}
  </Typography>
);

export default function OwnerProfile() {
  const [fullName, setFullName] = useState("John Owner");
  const [email, setEmail] = useState("owner@example.com");
  const [phone, setPhone] = useState("+1 (555) 123-4567");
  const [avatarDataUrl, setAvatarDataUrl] = useState("");

  const avatarSrc = useMemo(() => {
    return avatarDataUrl || "/assets/images/face-1.jpg";
  }, [avatarDataUrl]);

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setAvatarDataUrl(String(reader.result));
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    // Hook up to API later; for now keep it local.
    alert("Profile updated (demo)");
  };

  return (
    <Fragment>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>
          Owner Profile
        </Typography>

        {/* Personal Details */}
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <SectionTitle>Personal Details</SectionTitle>
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
                  <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
                  <TextField label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} fullWidth />

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

        {/* Contact Info */}
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <SectionTitle>Contact Info</SectionTitle>
            <Typography color="text.secondary" sx={{ mb: 1 }}>
              Keep your contact details up to date for faster communication.
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} fullWidth />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField label="Address" placeholder="Street, City, State" fullWidth defaultValue="" />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Divider sx={{ mb: 2 }} />

        {/* Linked Properties */}
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <SectionTitle>Linked Properties</SectionTitle>
            <Typography variant="body2" color="text.secondary">
              Example properties (wire to backend later):
            </Typography>
            <Box sx={{ mt: 1, display: "grid", gap: 1 }}>
              <Typography variant="body1">- 2B/3B Apartment • ID: PROP-1021</Typography>
              <Typography variant="body1">- Commercial Unit • ID: PROP-2044</Typography>
              <Typography variant="body1">- Warehouse • ID: PROP-3302</Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Documents */}
        <Card>
          <CardContent>
            <SectionTitle>Documents</SectionTitle>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Upload and manage your owner documents.
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography fontWeight={700}>Ownership Proof</Typography>
                    <Typography variant="body2" color="text.secondary">Uploaded: Jan 2026</Typography>
                    <Button sx={{ mt: 1 }} size="small" variant="text">View</Button>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography fontWeight={700}>ID Document</Typography>
                    <Typography variant="body2" color="text.secondary">Uploaded: Dec 2025</Typography>
                    <Button sx={{ mt: 1 }} size="small" variant="text">View</Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Fragment>
  );
}

