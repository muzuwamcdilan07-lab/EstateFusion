import React, { useMemo, useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";

import { BillingDrawer, BillingFormField, BillingPrimaryButton, BillingSecondaryButton } from "./BillingComponents";

export default function BillingArInvoiceDrawer({
  open,
  mode,
  initial,
  onClose,
  onSave,
}) {
  const [customerName, setCustomerName] = useState(initial?.customerName || "");
  const [documentNo, setDocumentNo] = useState(initial?.documentNo || "");
  const [amount, setAmount] = useState(initial?.amount ?? "");
  const [currency, setCurrency] = useState(initial?.currency || "ZAR");
  const [dueDate, setDueDate] = useState(initial?.dueDate || "");

  const title = useMemo(() => (mode === "edit" ? "Edit AR Invoice" : "New AR Invoice"), [mode]);

  const handleSubmit = () => {
    onSave({ customerName, documentNo, amount, currency, dueDate });
  };

  return (
    <BillingDrawer
      open={open}
      onClose={onClose}
      title={title}
      actions={
        <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
          <BillingSecondaryButton onClick={onClose}>
            Cancel
          </BillingSecondaryButton>
          <BillingPrimaryButton onClick={handleSubmit} disabled={!documentNo || !customerName || Number(amount) <= 0}>
            Save
          </BillingPrimaryButton>
        </Box>
      }
    >
      <Grid container spacing={2}>
        <Grid size={12}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Create an Accounts Receivable invoice. Posting will generate a journal entry.
          </Typography>
        </Grid>

        <Grid size={12}>
          <BillingFormField label="Customer Name" value={customerName} onChange={setCustomerName} />
        </Grid>
        <Grid size={12}>
          <BillingFormField label="Document No" value={documentNo} onChange={setDocumentNo} />
        </Grid>
        <Grid size={6}>
          <BillingFormField label="Amount" value={amount} onChange={setAmount} type="number" />
        </Grid>
        <Grid size={6}>
          <BillingFormField label="Currency" value={currency} onChange={setCurrency} placeholder="ZAR" />
        </Grid>
        <Grid size={12}>
          <BillingFormField label="Due Date" value={dueDate} onChange={setDueDate} type="date" />
        </Grid>

        <Grid size={12}>
          <Divider sx={{ mt: 1, mb: 1 }} />
          <Typography variant="caption" color="text.secondary">
            Draft invoices can be edited until posted.
          </Typography>
        </Grid>
      </Grid>
    </BillingDrawer>
  );
}

