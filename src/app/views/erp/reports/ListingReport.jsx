import { Fragment, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import DownloadIcon from "@mui/icons-material/Download";

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

const categories = [
  {
    key: "property",
    name: "Property Type",
    subcategories: ["Residential", "Commercial", "Industrial", "Land"]
  },
  {
    key: "specs",
    name: "Specifications",
    subcategories: ["Bedrooms", "Bathrooms", "Kitchens", "Garages"]
  },
  {
    key: "unit",
    name: "Unit",
    subcategories: ["Floor", "Rooms", "Office"]
  },
  {
    key: "size",
    name: "Size",
    subcategories: ["Square Meters", "Hectares"]
  },
  {
    key: "amenities",
    name: "Amenities",
    subcategories: ["Swimming pool", "Borehole", "Solar system", "Security system", "CCTV", "Internet", "Parking", "Garden"]
  }
];

export default function ListingReport() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0].key);
  const [selectedSubcategory, setSelectedSubcategory] = useState(categories[0].subcategories[0]);

  const currentCategory = useMemo(
    () => categories.find((c) => c.key === selectedCategory) || categories[0],
    [selectedCategory]
  );

  return (
    <Fragment>
      <PageBox>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 3 }}>
          <Typography variant="h4" component="h1">
            Listing Reports
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Access listing property types, specifications, units, sizes, and amenities analyses.
          </Typography>
        </Box>

        <SectionCard>
          <SectionHeader variant="h6" sx={{ mb: 2 }}>Categories</SectionHeader>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
            {categories.map((category) => (
              <Button
                key={category.key}
                variant={selectedCategory === category.key ? "contained" : "outlined"}
                onClick={() => {
                  setSelectedCategory(category.key);
                  setSelectedSubcategory(category.subcategories[0]);
                }}
              >
                {category.name}
              </Button>
            ))}
          </Box>

          <SectionHeader variant="h6">Details for {currentCategory.name}</SectionHeader>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
            {currentCategory.subcategories.map((subcategory) => (
              <Button
                key={subcategory}
                variant={selectedSubcategory === subcategory ? "contained" : "outlined"}
                size="small"
                onClick={() => setSelectedSubcategory(subcategory)}
              >
                {subcategory}
              </Button>
            ))}
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {`Generate ${selectedSubcategory.toLowerCase()} reports for listing inventory.`}
          </Typography>

          <Grid container spacing={2}>
            {currentCategory.subcategories.map((subcategory) => (
              <Grid xs={12} sm={6} key={subcategory}>
                <Card sx={{ p: 2, height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                      {subcategory}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {`${subcategory} report for ${currentCategory.name.toLowerCase()}.`}
                    </Typography>
                  </Box>
                  <Button
                    variant={selectedSubcategory === subcategory ? "contained" : "outlined"}
                    size="small"
                    startIcon={<DownloadIcon />}
                    sx={{ mt: 2, textTransform: "none" }}
                    onClick={() => setSelectedSubcategory(subcategory)}
                  >
                    View {subcategory}
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>
        </SectionCard>
      </PageBox>
    </Fragment>
  );
}
