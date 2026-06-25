import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { BillingStatusChip, BillingGridActions } from "./BillingComponents";

export default function BillingJournalTable({ entries }) {
  return (
    <Box>
      {entries.length === 0 ? (
        <Typography variant="body2" color="text.secondary">No journal entries yet.</Typography>
      ) : (
        entries.map((j) => (
          <Box
            key={j.id}
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
              <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>{j.journalType}</Typography>
              <Typography variant="body2" color="text.secondary">{j.memo}</Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">Lines: {j.lines?.length ?? 0}</Typography>
            <Typography variant="body2" sx={{ fontWeight: 800 }}>{""}</Typography>
            <BillingStatusChip status={j.status || "POSTED"} />
            <BillingGridActions>
              <Button size="small" variant="outlined" disabled>Details</Button>
            </BillingGridActions>
          </Box>
        ))
      )}
    </Box>
  );
}

