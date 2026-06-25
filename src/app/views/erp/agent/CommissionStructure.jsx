import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/material/styles";

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

const structureOptions = [
  {
    id: "fixed",
    title: "Fixed percentage",
    summary: "Simple commission model using a fixed payout percentage.",
    details: ["Set a single commission percentage for every eligible transaction.", "Best for transparent sales and rental compensation."]
  },
  {
    id: "tiered",
    title: "Tier-based commission",
    summary: "Rates change based on performance tiers.",
    details: ["Define thresholds for total sales or rental revenue.", "Higher tiers unlock stronger commission payouts."]
  },
  {
    id: "progressive",
    title: "Progressive commission",
    summary: "Commission grows as performance ramps up.",
    details: ["Increment commissions at each milestone.", "Ideal for high-growth target incentives."]
  },
  {
    id: "split",
    title: "Split commission",
    summary: "Split revenues across multiple agents or teams.",
    details: ["Define percentage splits between primary and supporting agents.", "Used for joint listing and referral coordination."]
  },
  {
    id: "custom",
    title: "Custom commission rules",
    summary: "Build flexible rules for specialized deals.",
    details: ["Combine fixed, tiered and split logic in one structure.", "Add exceptions for premium listings or referral bonuses."]
  }
];

export default function CommissionStructure() {
  const [activeStructure, setActiveStructure] = useState(structureOptions[0].id);

  const selectedStructure = useMemo(
    () => structureOptions.find((option) => option.id === activeStructure) || structureOptions[0],
    [activeStructure]
  );

  return (
    <PageBox>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 3 }}>
        <Typography variant="h4">Commission Structure</Typography>
        <Typography color="text.secondary">
          Build modern commission models with fixed, tiered, progressive, split or custom rules.
        </Typography>
      </Box>

      <SectionCard sx={{ mb: 3 }}>
        <Grid container spacing={2}>
          {structureOptions.map((option) => (
            <Grid xs={12} sm={6} md={4} key={option.id}>
              <Card
                onClick={() => setActiveStructure(option.id)}
                sx={{
                  p: 2,
                  cursor: 'pointer',
                  border: activeStructure === option.id ? '2px solid' : '1px solid',
                  borderColor: activeStructure === option.id ? 'primary.main' : 'divider',
                  transition: 'border-color 150ms ease-in-out'
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                  {option.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {option.summary}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </SectionCard>

      <SectionCard>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
          {selectedStructure.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {selectedStructure.summary}
        </Typography>

        <List>
          {selectedStructure.details.map((detail) => (
            <ListItemButton key={detail} sx={{ borderRadius: 1, mb: 1 }}>
              <ListItemText primary={detail} />
            </ListItemButton>
          ))}
        </List>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 3 }}>
          <Button variant="contained">Activate Structure</Button>
          <Button variant="outlined">Preview payout rules</Button>
        </Box>
      </SectionCard>
    </PageBox>
  );
}
