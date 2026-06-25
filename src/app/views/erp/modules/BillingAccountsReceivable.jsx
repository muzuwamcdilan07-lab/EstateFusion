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
import BillingArInvoicesTable from "./billing/BillingArInvoicesTable";
import BillingArInvoiceDrawer from "./billing/BillingArInvoiceDrawer";

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

function BillingAccountsReceivableInner() {
  const { state, actions } = useBillingStore();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState("create");
  const [editing, setEditing] = useState(null);

  const invoices = useMemo(() => state.arInvoices || [], [state.arInvoices]);

  const openCreate = () => {
    setDrawerMode("create");
    setEditing(null);
    setDrawerOpen(true);
  };

  const openEdit = (inv) => {
    setDrawerMode("edit");
    setEditing(inv);
    setDrawerOpen(true);
  };

  const handleSave = (payload) => {
    if (drawerMode === "create") {
      actions.createArInvoice(payload);
    } else if (drawerMode === "edit" && editing?.id) {
      actions.updateArInvoice(editing.id, payload);
    }
    setDrawerOpen(false);
  };

  const handlePost = (inv) => {
    // Demo posting: mark invoice POSTED and create a journal entry record.
    actions.updateArInvoice(inv.id, { status: "POSTED", postedAt: new Date().toISOString() });
    actions.createJournalEntry({
      journalType: "Member",
      memo: `Post AR Invoice ${inv.documentNo}`,
      lines: [
        { account: "Accounts Receivable", debit: inv.amount, credit: 0 },
        { account: "Sales Revenue", debit: 0, credit: inv.amount },
      ],
    });
  };

  const handleDelete = (id) => {
    actions.deleteArInvoice(id);
  };

  return (
    <Fragment>
      <PageBox>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 3 }}>
          <Typography variant="h4" component="h1">
            Accounts Receivable
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Create and post AR invoices. Posting generates journal entries.
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
                  <SectionHeader variant="h6">AR Invoices</SectionHeader>
                  <SectionSubtitle>
                    Draft → Post to generate ledger lines.
                  </SectionSubtitle>
                </Box>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  sx={{ textTransform: "none", mt: 1 }}
                  onClick={openCreate}
                >
                  New Invoice
                </Button>
              </Box>

              <Divider sx={{ mb: 2 }} />

              <BillingArInvoicesTable
                invoices={invoices}
                onEdit={openEdit}
                onPost={handlePost}
                onDelete={handleDelete}
              />
            </SectionCard>
          </Grid>
        </Grid>

        <BillingArInvoiceDrawer
          open={drawerOpen}
          mode={drawerMode}
          initial={editing}
          onClose={() => setDrawerOpen(false)}
          onSave={handleSave}
        />
      </PageBox>
    </Fragment>
  );
}

export default function BillingAccountsReceivable() {
  return (
    <BillingStoreProvider>
      <BillingAccountsReceivableInner />
    </BillingStoreProvider>
  );
}

