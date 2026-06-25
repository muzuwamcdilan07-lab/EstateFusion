import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { BillingStatusChip, BillingGridActions } from "./BillingComponents";

export default function BillingCashbookTable({ entries }) {
  return (
    <Box>
      {entries.length === 0 ? (
        <Typography variant="body2" color="text.secondary">No cashbook entries yet.</Typography>
      ) : (
        entries.map((e) => (
          <Box
            key={e.id}
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
              <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>{e.description || "(No description)"}</Typography>
              <Typography variant="body2" color="text.secondary">{e.book} {e.reference ? `· Ref: ${e.reference}` : ""}</Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">{e.date || ""}</Typography>
            <Typography variant="body2" sx={{ fontWeight: 800 }}>{e.amount} {e.currency}</Typography>
            <BillingStatusChip status={"RECORDED"} />
            <BillingGridActions>
              <Button size="small" variant="text" disabled>View</Button>
            </BillingGridActions>
          </Box>
        ))
      )}
    </Box>
  );
}

