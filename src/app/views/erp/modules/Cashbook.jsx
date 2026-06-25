import { Fragment, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";

import { BillingStoreProvider, useBillingStore } from "./billing/BillingStore";
import BillingCashbookTable from "./billing/BillingCashbookTable";

const PageBox = styled(Box)(({ theme }) => ({
  padding: "2rem",
  minHeight: "100vh",
  background: theme.palette.background.default,
  [theme.breakpoints.down("sm")]: { padding: "1rem" },
}));

const SectionCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  background: theme.palette.background.paper,
}));

const SectionHeader = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1.5),
  fontWeight: 700,
  color: theme.palette.text.primary,
}));

const SectionSubtitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

function CashbookInner() {
  const { state, actions } = useBillingStore();

  const [activeBook, setActiveBook] = useState("Home");

  const entries = useMemo(() => {
    const all = state.cashEntries || [];
    return all.filter((e) => e.book === activeBook);
  }, [state.cashEntries, activeBook]);

  const openCreate = () => {
    actions.createCashEntry({
      book: activeBook,
      description: "Cash entry",
      amount: 0,
      currency: "ZAR",
      date: new Date().toISOString().slice(0, 10),
      reference: `CASH-${Date.now()}`,
    });
  };

  return (
    <Fragment>
      <PageBox>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 3 }}>
          <Typography variant="h4" component="h1">
            Cashbook
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Record cash entries by book. For fastest demo, new entries can be added instantly.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid xs={12} md={12}>
            <SectionCard>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                {["Home", "Foreign", "Reconciliation"].map((name) => (
                  <Button key={name} variant={activeBook === name ? "contained" : "outlined"} onClick={() => setActiveBook(name)}>
                    {name}
                  </Button>
                ))}
              </Box>

              <SectionHeader variant="h6">{activeBook} Cashbook</SectionHeader>
              <SectionSubtitle>Manage cash movements and reconciliation references.</SectionSubtitle>

              <Divider sx={{ mb: 2 }} />

              <BillingCashbookTable entries={entries} />

              <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
                <Button variant="contained" startIcon={<AddIcon />} sx={{ textTransform: "none" }} onClick={openCreate}>
                  New {activeBook} Entry
                </Button>
              </Box>
            </SectionCard>
          </Grid>
        </Grid>
      </PageBox>
    </Fragment>
  );
}

export default function Cashbook() {
  return (
    <BillingStoreProvider>
      <CashbookInner />
    </BillingStoreProvider>
  );
}

