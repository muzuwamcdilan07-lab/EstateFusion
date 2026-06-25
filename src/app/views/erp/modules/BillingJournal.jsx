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
import BillingJournalTable from "./billing/BillingJournalTable";

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

function BillingJournalInner() {
  const { state, actions } = useBillingStore();
  const [activeType, setActiveType] = useState("Member");

  const entries = useMemo(() => {
    const all = state.journalEntries || [];
    return all.filter((e) => e.journalType === activeType);
  }, [state.journalEntries, activeType]);

  const createQuick = () => {
    actions.createJournalEntry({
      journalType: activeType,
      memo: `Quick ${activeType} journal ${Date.now()}`,
      lines: [{ account: "Suspense", debit: 0, credit: 0 }],
    });
  };

  const types = ["General", "Member", "Tenant", "Client", "Supplier", "Agent", "Inventory"];

  return (
    <Fragment>
      <PageBox>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 3 }}>
          <Typography variant="h4" component="h1">
            Journals
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Ledger journal entries created automatically by posting billing documents (demo).
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid xs={12} md={12}>
            <SectionCard>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                {types.map((t) => (
                  <Button key={t} variant={activeType === t ? "contained" : "outlined"} onClick={() => setActiveType(t)}>
                    {t}
                  </Button>
                ))}
              </Box>

              <SectionHeader variant="h6">{activeType} Journal</SectionHeader>
              <SectionSubtitle>All posted entries in this category.</SectionSubtitle>

              <Divider sx={{ mb: 2 }} />

              <BillingJournalTable entries={entries} />

              <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
                <Button variant="contained" startIcon={<AddIcon />} sx={{ textTransform: "none" }} onClick={createQuick}>
                  New {activeType} Entry
                </Button>
              </Box>
            </SectionCard>
          </Grid>
        </Grid>
      </PageBox>
    </Fragment>
  );
}

export default function BillingJournal() {
  return (
    <BillingStoreProvider>
      <BillingJournalInner />
    </BillingStoreProvider>
  );
}

