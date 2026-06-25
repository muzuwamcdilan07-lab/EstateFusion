import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { BillingStatusChip, BillingGridActions } from "./BillingComponents";

export default function BillingApBillsTable({ bills, onEdit, onPost, onDelete }) {
  return (
    <Box>
      {bills.length === 0 ? (
        <Typography variant="body2" color="text.secondary">No bills yet.</Typography>
      ) : (
        bills.map((bill) => (
          <Box
            key={bill.id}
            sx={{
              display: "grid",
              gridTemplateColumns: "2fr 1.2fr 1fr 1fr 0.8fr",
              gap: 1,
              alignItems: "center",
              py: 1.25,
              borderBottom: "1px solid",
              borderColor: "divider",
            }}
          >
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>{bill.documentNo || "(No)"}</Typography>
              <Typography variant="body2" color="text.secondary">{bill.supplierName}</Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">{bill.dueDate ? `Due: ${bill.dueDate}` : ""}</Typography>
            <Typography variant="body2" sx={{ fontWeight: 800 }}>{bill.amount} {bill.currency}</Typography>
            <BillingStatusChip status={bill.status} />
            <BillingGridActions>
              <Button size="small" variant="text" onClick={() => onEdit(bill)}>
                Edit
              </Button>
              <Button size="small" variant="contained" onClick={() => onPost(bill)} disabled={bill.status === "POSTED"}>
                Post
              </Button>
              <Button size="small" variant="outlined" color="error" onClick={() => onDelete(bill.id)}>
                Delete
              </Button>
            </BillingGridActions>
          </Box>
        ))
      )}
    </Box>
  );
}

