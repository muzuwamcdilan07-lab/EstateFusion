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

const sizes = [
  { label: "sqm", example: "45 - 1,200" },
  { label: "ha", example: "0.02 - 4.5" }
];

export default function ListingSize() {
  const [selectedSize, setSelectedSize] = useState(sizes[0].label);

  const currentSize = useMemo(
    () => sizes.find((item) => item.label === selectedSize) || sizes[0],
    [selectedSize]
  );

  return (
    <Fragment>
      <PageBox>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 3 }}>
          <Typography variant="h4" component="h1">
            Property Size
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage listing size units in square meters and hectares.
          </Typography>
        </Box>

        <SectionCard>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
            {sizes.map((item) => (
              <Button
                key={item.label}
                variant={selectedSize === item.label ? "contained" : "outlined"}
                onClick={() => setSelectedSize(item.label)}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          <SectionHeader variant="h6">{currentSize.label}</SectionHeader>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {`Example size range: ${currentSize.example} ${currentSize.label}.`}
          </Typography>

          <Grid container spacing={2}>
            {sizes.map((item) => (
              <Grid xs={12} sm={6} key={item.label}>
                <Card sx={{ p: 2, height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                      {item.label}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {`Range: ${item.example} ${item.label}.`}
                    </Typography>
                  </Box>
                  <Button
                    variant={selectedSize === item.label ? "contained" : "outlined"}
                    size="small"
                    sx={{ mt: 2, textTransform: "none" }}
                    onClick={() => setSelectedSize(item.label)}
                  >
                    View {item.label}
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mt: 4, p: 2, borderRadius: 2, bgcolor: "background.default" }}>
            <SectionHeader variant="h6">Size Summary</SectionHeader>
            <Typography variant="body2" color="text.secondary">
              {`Manage property size information for listing inventory using sqm and ha.`}
            </Typography>
          </Box>
        </SectionCard>
      </PageBox>
    </Fragment>
  );
}
