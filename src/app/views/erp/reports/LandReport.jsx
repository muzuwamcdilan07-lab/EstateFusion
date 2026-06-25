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

const items = ["Inventory", "Subdivision", "Type", "Area", "Size"];

export default function LandReport() {
  const [selectedItem, setSelectedItem] = useState(items[0]);

  return (
    <Fragment>
      <PageBox>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 3 }}>
          <Typography variant="h4" component="h1">
            Land Reports
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Access land inventory, subdivision, type, area, and size analyses.
          </Typography>
        </Box>

        <SectionCard>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
            {items.map((item) => (
              <Button
                key={item}
                variant={selectedItem === item ? "contained" : "outlined"}
                onClick={() => setSelectedItem(item)}
                sx={{ textTransform: "none" }}
              >
                {item}
              </Button>
            ))}
          </Box>

          <SectionHeader variant="h6">{selectedItem}</SectionHeader>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {`Generate ${selectedItem.toLowerCase()} reports for land portfolio management.`}
          </Typography>

          <Grid container spacing={2}>
            {items.map((item) => (
              <Grid xs={12} sm={6} md={4} key={item}>
                <Card sx={{ p: 2, height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                      {item}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {`${item} information for land properties.`}
                    </Typography>
                  </Box>
                  <Button
                    variant={selectedItem === item ? "contained" : "outlined"}
                    size="small"
                    startIcon={<DownloadIcon />}
                    sx={{ mt: 2, textTransform: "none" }}
                    onClick={() => setSelectedItem(item)}
                  >
                    View {item}
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
