import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
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

const commissionOptions = [
  { id: "sales", title: "Sales commission", description: "Commission paid on closed sales.", value: 7 },
  { id: "rental", title: "Rental commission", description: "Recurring commission for rental deals.", value: 5 },
  { id: "referral", title: "Referral commission", description: "Award for successful referrals.", value: 3 },
  { id: "bonus", title: "Bonus commission", description: "Extra incentives for exceptional performance.", value: 4 }
];

export default function CommissionTypes() {
  const [selectedType, setSelectedType] = useState(commissionOptions[0].id);
  const [rates, setRates] = useState(
    commissionOptions.reduce((acc, option) => ({ ...acc, [option.id]: option.value }), {})
  );

  const selectedOption = useMemo(
    () => commissionOptions.find((option) => option.id === selectedType) || commissionOptions[0],
    [selectedType]
  );

  return (
    <PageBox>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 3 }}>
        <Typography variant="h4">Commission Types</Typography>
        <Typography color="text.secondary">
          Define and tune commission rates for sales, rental, referral, and bonus programs.
        </Typography>
      </Box>

      <SectionCard sx={{ mb: 3 }}>
        <Grid container spacing={2}>
          {commissionOptions.map((option) => (
            <Grid xs={12} sm={6} md={3} key={option.id}>
              <Card
                onClick={() => setSelectedType(option.id)}
                sx={{
                  p: 2,
                  cursor: 'pointer',
                  border: selectedType === option.id ? '2px solid' : '1px solid',
                  borderColor: selectedType === option.id ? 'primary.main' : 'divider',
                  transition: 'border-color 150ms ease-in-out'
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                  {option.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {option.description}
                </Typography>
                <Typography variant="h6" sx={{ mt: 2, fontWeight: 700 }}>
                  {rates[option.id]}%
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </SectionCard>

      <SectionCard>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
          Configure {selectedOption.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {selectedOption.description}
        </Typography>

        <Box sx={{ display: 'grid', gap: 3 }}>
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>
              Adjust rate
            </Typography>
            <Slider
              value={rates[selectedOption.id]}
              min={1}
              max={20}
              step={1}
              valueLabelDisplay="on"
              onChange={(_, newValue) => setRates((prev) => ({ ...prev, [selectedOption.id]: newValue }))}
            />
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              {`Current ${selectedOption.title.toLowerCase()} rate is ${rates[selectedOption.id]}%.`}
            </Typography>
            <Button variant="contained" size="large">
              Save rate
            </Button>
          </Box>
        </Box>
      </SectionCard>
    </PageBox>
  );
}
