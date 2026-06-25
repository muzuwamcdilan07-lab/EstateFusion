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

const specs = [
  { label: "Bedrooms", detail: "Number of bedrooms available in the property." },
  { label: "Bathrooms", detail: "Number of bathrooms with fixtures and finishes." },
  { label: "Kitchens", detail: "Kitchen count and configuration details." },
  { label: "Garages", detail: "Garage capacity and type." }
];

export default function ListingSpecifications() {
  const [selectedSpec, setSelectedSpec] = useState(specs[0].label);

  const currentSpec = useMemo(
    () => specs.find((item) => item.label === selectedSpec) || specs[0],
    [selectedSpec]
  );

  return (
    <Fragment>
      <PageBox>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 3 }}>
          <Typography variant="h4" component="h1">
            Property Specifications
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage detailed listing specifications for bedrooms, bathrooms, kitchens, and garages.
          </Typography>
        </Box>

        <SectionCard>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
            {specs.map((item) => (
              <Button
                key={item.label}
                variant={selectedSpec === item.label ? "contained" : "outlined"}
                onClick={() => setSelectedSpec(item.label)}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          <SectionHeader variant="h6">{currentSpec.label}</SectionHeader>
          <SectionSubtitle>{currentSpec.detail}</SectionSubtitle>

          <Grid container spacing={2}>
            {specs.map((item) => (
              <Grid xs={12} sm={6} key={item.label}>
                <Card sx={{ p: 2, height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                      {item.label}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.detail}
                    </Typography>
                  </Box>
                  <Button
                    variant={selectedSpec === item.label ? "contained" : "outlined"}
                    size="small"
                    sx={{ mt: 2, textTransform: "none" }}
                    onClick={() => setSelectedSpec(item.label)}
                  >
                    Select {item.label}
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mt: 4, p: 2, borderRadius: 2, bgcolor: "background.default" }}>
            <SectionHeader variant="h6">Specification Summary</SectionHeader>
            <Typography variant="body2" color="text.secondary">
              {`Manage ${specs.length} core property specification categories for listings.`}
            </Typography>
          </Box>
        </SectionCard>
      </PageBox>
    </Fragment>
  );
}
