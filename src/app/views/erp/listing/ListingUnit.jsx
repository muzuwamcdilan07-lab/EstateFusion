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

const units = [
  { label: "Floor", detail: "Track listed floors across properties." },
  { label: "Rooms", detail: "Manage room units by property and floor." },
  { label: "Office", detail: "Organize office units in commercial listings." }
];

export default function ListingUnit() {
  const [selectedUnit, setSelectedUnit] = useState(units[0].label);

  const currentUnit = useMemo(
    () => units.find((item) => item.label === selectedUnit) || units[0],
    [selectedUnit]
  );

  return (
    <Fragment>
      <PageBox>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 3 }}>
          <Typography variant="h4" component="h1">
            Property Unit
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage listing units by floor, room, and office categories.
          </Typography>
        </Box>

        <SectionCard>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
            {units.map((item) => (
              <Button
                key={item.label}
                variant={selectedUnit === item.label ? "contained" : "outlined"}
                onClick={() => setSelectedUnit(item.label)}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          <SectionHeader variant="h6">{currentUnit.label}</SectionHeader>
          <SectionSubtitle>{currentUnit.detail}</SectionSubtitle>

          <Grid container spacing={2}>
            {units.map((item) => (
              <Grid xs={12} sm={4} key={item.label}>
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
                    variant={selectedUnit === item.label ? "contained" : "outlined"}
                    size="small"
                    sx={{ mt: 2, textTransform: "none" }}
                    onClick={() => setSelectedUnit(item.label)}
                  >
                    View {item.label}
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mt: 4, p: 2, borderRadius: 2, bgcolor: "background.default" }}>
            <SectionHeader variant="h6">Unit Summary</SectionHeader>
            <Typography variant="body2" color="text.secondary">
              {`Manage horizontal and vertical listing units for floors, rooms, and offices.`}
            </Typography>
          </Box>
        </SectionCard>
      </PageBox>
    </Fragment>
  );
}
