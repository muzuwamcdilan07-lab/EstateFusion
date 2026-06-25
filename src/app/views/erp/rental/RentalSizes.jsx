import { Fragment, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
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

const categories = [
  {
    key: "residential",
    label: "Residential",
    sizes: [
      { label: "sqm", example: "45 - 180" },
      { label: "ha", example: "0.02 - 0.5" }
    ]
  },
  {
    key: "commercial",
    label: "Commercial",
    sizes: [
      { label: "sqm", example: "55 - 360" },
      { label: "ha", example: "0.03 - 1.8" }
    ]
  },
  {
    key: "industrial",
    label: "Industrial",
    sizes: [
      { label: "sqm", example: "120 - 950" },
      { label: "ha", example: "0.5 - 5.2" }
    ]
  }
];

export default function RentalSizes() {
  const [activeCategory, setActiveCategory] = useState(categories[0].key);

  const currentCategory = useMemo(
    () => categories.find((category) => category.key === activeCategory) || categories[0],
    [activeCategory]
  );

  return (
    <Fragment>
      <PageBox>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 3 }}>
          <Typography variant="h4" component="h1">
            Sizes
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage rental size units and sample ranges for residential, commercial, and industrial assets.
          </Typography>
        </Box>

        <SectionCard>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
            {categories.map((category) => (
              <Button
                key={category.key}
                variant={activeCategory === category.key ? "contained" : "outlined"}
                onClick={() => setActiveCategory(category.key)}
              >
                {category.label}
              </Button>
            ))}
          </Box>

          <SectionHeader variant="h6">{currentCategory.label} Size Bands</SectionHeader>
          <SectionSubtitle>
            Track size categories using square meters and hectares for selected rental assets.
          </SectionSubtitle>

          <Grid container spacing={2}>
            {currentCategory.sizes.map((size) => (
              <Grid xs={12} sm={6} key={size.label}>
                <Card sx={{ p: 2, height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                      {size.label}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {size.example} {size.label} range for {currentCategory.label.toLowerCase()} rentals.
                    </Typography>
                  </Box>
                  <Button variant="outlined" size="small" sx={{ mt: 2, textTransform: "none" }}>
                    View {size.label}
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mt: 4, p: 2, borderRadius: 2, bgcolor: "background.default" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <SectionHeader variant="h6">Size Summary</SectionHeader>
              <Button variant="contained" startIcon={<AddIcon />} sx={{ textTransform: "none" }}>
                Add Size Profile
              </Button>
            </Box>
            <Typography variant="body2" color="text.secondary">
              {`Size bands are available in sqm and ha for ${currentCategory.label.toLowerCase()} rentals.`}
            </Typography>
          </Box>
        </SectionCard>
      </PageBox>
    </Fragment>
  );
}
