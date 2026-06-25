import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { BillingStatusChip, BillingGridActions } from "./BillingComponents";

export default function BillingArInvoicesTable({ invoices, onEdit, onPost, onDelete }) {
  return (
    <Box>
      {invoices.length === 0 ? (
        <Typography variant="body2" color="text.secondary">No invoices yet.</Typography>
      ) : (
        <Box>
          {invoices.map((inv) => (
            <Box
              key={inv.id}
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
                <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>{inv.documentNo || "(No)"}</Typography>
                <Typography variant="body2" color="text.secondary">{inv.customerName}</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">{inv.dueDate ? `Due: ${inv.dueDate}` : ""}</Typography>
              <Typography variant="body2" sx={{ fontWeight: 800 }}>{inv.amount} {inv.currency}</Typography>
              <BillingStatusChip status={inv.status} />
              <BillingGridActions>
                <Button size="small" variant="text" onClick={() => onEdit(inv)}>
                  Edit
                </Button>
                <Button size="small" variant="contained" onClick={() => onPost(inv)} disabled={inv.status === "POSTED"}>
                  Post
                </Button>
                <Button size="small" variant="outlined" color="error" onClick={() => onDelete(inv.id)}>
                  Delete
                </Button>
              </BillingGridActions>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}

