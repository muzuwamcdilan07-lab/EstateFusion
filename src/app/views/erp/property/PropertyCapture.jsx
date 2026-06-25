import { Fragment, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import MapIcon from "@mui/icons-material/Map";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

const PageBox = styled(Box)(({ theme }) => ({
  padding: "2rem",
  minHeight: "100vh",
  background: theme.palette.background.default,
  [theme.breakpoints.down("sm")]: { padding: "1rem" }
}));

const SectionCard = styled(Card)(({ theme }) => ({
  padding: "24px",
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

export default function PropertyCapture() {
  const generatedPropertyId = useMemo(() => `P-${Date.now().toString().slice(-6)}` , []);

  const [propertyType, setPropertyType] = useState("Residential");
  const [occupancy, setOccupancy] = useState("Occupied");
  const [address, setAddress] = useState("");
  const [landSize, setLandSize] = useState("");
  const [standNumber, setStandNumber] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [utilities, setUtilities] = useState({ water: true, electricity: true });

  const handleUtilityChange = (event) => {
    setUtilities({
      ...utilities,
      [event.target.name]: event.target.checked
    });
  };

  const detectLocation = () => {
    if (!navigator.geolocation) {
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude.toFixed(6));
        setLongitude(position.coords.longitude.toFixed(6));
      },
      () => {
        // location access denied or unavailable
      },
      { enableHighAccuracy: true }
    );
  };

  return (
    <Fragment>
      <PageBox>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 3 }}>
          <Typography variant="h4" component="h1">
            Property Capture Form
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Capture new properties with owner details, site coordinates, media uploads, and location confirmation.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid xs={12}>
            <SectionCard>
              <SectionHeader variant="h6">Property Capture</SectionHeader>
              <SectionSubtitle variant="body2">
                Enter the key details for the new property. Property ID is automatically generated.
              </SectionSubtitle>

              <Grid container spacing={3}>
                <Grid xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Property ID"
                    value={generatedPropertyId}
                    disabled
                    helperText="Auto-generated identifier"
                  />
                </Grid>

                <Grid xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Owner Name"
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                  />
                </Grid>

                <Grid xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Owner Email"
                    value={ownerEmail}
                    onChange={(e) => setOwnerEmail(e.target.value)}
                  />
                </Grid>

                <Grid xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel>Property Type</InputLabel>
                    <Select
                      value={propertyType}
                      label="Property Type"
                      onChange={(e) => setPropertyType(e.target.value)}
                    >
                      <MenuItem value="Residential">Residential</MenuItem>
                      <MenuItem value="Commercial">Commercial</MenuItem>
                      <MenuItem value="Land">Land</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Owner Phone"
                    value={ownerPhone}
                    onChange={(e) => setOwnerPhone(e.target.value)}
                  />
                </Grid>

                <Grid xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel>Occupancy Status</InputLabel>
                    <Select
                      value={occupancy}
                      label="Occupancy Status"
                      onChange={(e) => setOccupancy(e.target.value)}
                    >
                      <MenuItem value="Occupied">Occupied</MenuItem>
                      <MenuItem value="Vacant">Vacant</MenuItem>
                      <MenuItem value="Under Construction">Under Construction</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid xs={12} md={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    multiline
                    rows={2}
                  />
                </Grid>

                <Grid xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Northing / GPS Latitude"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    placeholder="Latitude"
                  />
                </Grid>

                <Grid xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Easting / GPS Longitude"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                    placeholder="Longitude"
                  />
                </Grid>

                <Grid xs={12} md={4}>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<MyLocationIcon />}
                    onClick={detectLocation}
                  >
                    Auto GPS Detection
                  </Button>
                </Grid>

                <Grid xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Land Size / Stand Number"
                    value={landSize}
                    onChange={(e) => setLandSize(e.target.value)}
                    placeholder="e.g. 1500 sqm or Stand 234"
                  />
                </Grid>

                <Grid xs={12} md={8}>
                  <FormGroup row>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={utilities.water}
                          onChange={handleUtilityChange}
                          name="water"
                        />
                      }
                      label="Water"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={utilities.electricity}
                          onChange={handleUtilityChange}
                          name="electricity"
                        />
                      }
                      label="Electricity"
                    />
                  </FormGroup>
                </Grid>
              </Grid>
            </SectionCard>
          </Grid>

          <Grid xs={12} md={6}>
            <SectionCard>
              <SectionHeader variant="h6">Media Upload</SectionHeader>
              <SectionSubtitle variant="body2">
                Add photos and documents to support the property record. Camera capture and geo-tagged uploads are included.
              </SectionSubtitle>

              <Grid container spacing={3}>
                <Grid xs={12}>
                  <Button
                    variant="contained"
                    startIcon={<PhotoCameraIcon />}
                    fullWidth
                    sx={{ py: 1.5, textTransform: "none" }}
                  >
                    Capture Photos
                  </Button>
                </Grid>

                <Grid xs={12}>
                  <Box display="flex" flexDirection="column" gap={2}>
                    <Button
                      variant="outlined"
                      component="label"
                      startIcon={<CloudUploadIcon />}
                      sx={{ justifyContent: "flex-start", textTransform: "none" }}
                    >
                      Upload Title Deeds
                      <input hidden accept=".pdf,.doc,.docx" type="file" />
                    </Button>
                    <Button
                      variant="outlined"
                      component="label"
                      startIcon={<CloudUploadIcon />}
                      sx={{ justifyContent: "flex-start", textTransform: "none" }}
                    >
                      Upload Agreements
                      <input hidden accept=".pdf,.doc,.docx" type="file" />
                    </Button>
                  </Box>
                </Grid>

                <Grid xs={12}>
                  <Divider sx={{ my: 1.5 }} />
                  <Typography variant="subtitle2" color="text.secondary">
                    Uploaded media will be tied to the property record and geo-tagged where available.
                  </Typography>
                </Grid>
              </Grid>
            </SectionCard>
          </Grid>

          <Grid xs={12} md={6}>
            <SectionCard>
              <SectionHeader variant="h6">Location Confirmation</SectionHeader>
              <SectionSubtitle variant="body2">
                Review the detected site coordinates and adjust them manually if needed.
              </SectionSubtitle>

              <Grid container spacing={3}>
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Latitude"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Longitude"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                  />
                </Grid>
                <Grid xs={12}>
                  <Box
                    sx={{
                      height: 240,
                      borderRadius: 2,
                      border: 1,
                      borderColor: "divider",
                      bgcolor: "background.default",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      px: 2
                    }}
                  >
                    <MapIcon sx={{ fontSize: 40, mb: 1, color: "text.secondary" }} />
                    <Typography variant="subtitle1">Map preview</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Live preview of the selected coordinates will be shown here.
                    </Typography>
                  </Box>
                </Grid>
                <Grid xs={12}>
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<AddPhotoAlternateIcon />}
                    sx={{ textTransform: "none" }}
                  >
                    Confirm Location
                  </Button>
                </Grid>
              </Grid>
            </SectionCard>
          </Grid>

          <Grid xs={12}>
            <SectionCard>
              <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
                <Box>
                  <Typography variant="h6">Ready to save?</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Review all fields before saving the property capture record.
                  </Typography>
                </Box>
                <Button variant="contained" size="large">
                  Save Property Record
                </Button>
              </Box>
            </SectionCard>
          </Grid>
        </Grid>
      </PageBox>
    </Fragment>
  );
}
