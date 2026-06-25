import { Fragment, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";

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

const amenities = [
  "Swimming pool",
  "Borehole",
  "Solar system",
  "Security system",
  "CCTV",
  "Internet",
  "Parking",
  "Garden",
  "Electric fence",
  "Backup power"
];

export default function ListingAmenities() {
  const [selectedAmenity, setSelectedAmenity] = useState(amenities[0]);

  return (
    <Fragment>
      <PageBox>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 3 }}>
          <Typography variant="h4" component="h1">
            Amenities
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage property amenities available in your listing inventory.
          </Typography>
        </Box>

        <SectionCard>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
            {amenities.map((amenity) => (
              <Button
                key={amenity}
                variant={selectedAmenity === amenity ? "contained" : "outlined"}
                onClick={() => setSelectedAmenity(amenity)}
                sx={{ textTransform: "none" }}
              >
                {amenity}
              </Button>
            ))}
          </Box>

          <SectionHeader variant="h6">Selected Amenity</SectionHeader>
          <SectionSubtitle>
            Manage descriptions, availability, and listing inclusion for the selected amenity.
          </SectionSubtitle>

          <Grid container spacing={2}>
            {amenities.map((amenity) => (
              <Grid xs={12} sm={6} md={4} key={amenity}>
                <Card sx={{ p: 2, height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                      {amenity}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {`Configure ${amenity.toLowerCase()} for property listings.`}
                    </Typography>
                  </Box>
                  <Button
                    variant={selectedAmenity === amenity ? "contained" : "outlined"}
                    size="small"
                    sx={{ mt: 2, textTransform: "none" }}
                    onClick={() => setSelectedAmenity(amenity)}
                  >
                    Select {amenity}
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mt: 4, p: 2, borderRadius: 2, bgcolor: "background.default" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <SectionHeader variant="h6">Amenities Summary</SectionHeader>
              <Button variant="contained" startIcon={<AddIcon />} sx={{ textTransform: "none" }}>
                Add Amenity
              </Button>
            </Box>
            <Typography variant="body2" color="text.secondary">
              {`Manage ${amenities.length} property amenities for detailed listing specifications.`}
            </Typography>
          </Box>
        </SectionCard>
      </PageBox>
    </Fragment>
  );
}
