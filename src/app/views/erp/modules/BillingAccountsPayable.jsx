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
import BillingApBillsTable from "./billing/BillingApBillsTable";

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

function BillingAccountsPayableInner() {
  const { state, actions } = useBillingStore();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const bills = useMemo(() => state.apBills || [], [state.apBills]);

  const handlePost = (bill) => {
    actions.updateApBill(bill.id, { status: "POSTED", postedAt: new Date().toISOString() });
    actions.createJournalEntry({
      journalType: "Supplier",
      memo: `Post AP Bill ${bill.documentNo}`,
      lines: [
        { account: "Purchases / Expenses", debit: bill.amount, credit: 0 },
        { account: "Accounts Payable", debit: 0, credit: bill.amount },
      ],
    });
  };

  const handleDelete = (id) => actions.deleteApBill(id);

  const openCreate = () => {
    // fastest: create a draft bill with minimal fields
    actions.createApBill({ supplierName: "New Supplier", documentNo: `BILL-${Date.now()}`, amount: 0, currency: "ZAR", dueDate: "" });
  };

  return (
    <Fragment>
      <PageBox>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 3 }}>
          <Typography variant="h4" component="h1">
            Accounts Payable
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Create and post AP bills. Posting generates journal entries.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid xs={12} md={12}>
            <SectionCard>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: 2,
                  flexWrap: "wrap",
                  mb: 2,
                }}
              >
                <Box>
                  <SectionHeader variant="h6">AP Bills</SectionHeader>
                  <SectionSubtitle>Draft → Post to generate ledger lines.</SectionSubtitle>
                </Box>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  sx={{ textTransform: "none", mt: 1 }}
                  onClick={openCreate}
                >
                  New Bill
                </Button>
              </Box>

              <Divider sx={{ mb: 2 }} />

              <BillingApBillsTable bills={bills} onEdit={() => {}} onPost={handlePost} onDelete={handleDelete} />
            </SectionCard>
          </Grid>
        </Grid>
      </PageBox>
    </Fragment>
  );
}

export default function BillingAccountsPayable() {
  return (
    <BillingStoreProvider>
      <BillingAccountsPayableInner />
    </BillingStoreProvider>
  );
}

