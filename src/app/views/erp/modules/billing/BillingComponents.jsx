import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Drawer from "@mui/material/Drawer";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";

import { styled } from "@mui/material/styles";

export const PageBox = styled(Box)(({ theme }) => ({
  padding: "2rem",
  minHeight: "100vh",
  background: theme.palette.background.default,
  [theme.breakpoints.down("sm")]: { padding: "1rem" }
}));

export const SectionCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  background: theme.palette.background.paper
}));

export const SectionHeader = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1.5),
  fontWeight: 700,
  color: theme.palette.text.primary
}));

export const SectionSubtitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  color: theme.palette.text.secondary
}));

export function BillingStatusChip({ status }) {
  const normalized = (status || "").toUpperCase();
  const color =
    normalized === "POSTED"
      ? "success"
      : normalized === "VOID"
        ? "default"
        : "primary";
  return <Chip size="small" label={status} color={color} />;
}

export function BillingDrawer({ open, onClose, title, children, actions }) {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 520, p: 3 }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 800 }}>{title}</Typography>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Box>{children}</Box>
        {actions ? (
          <Box sx={{ mt: 3 }}>
            <Divider sx={{ mb: 2 }} />
            {actions}
          </Box>
        ) : null}
      </Box>
    </Drawer>
  );
}

export function BillingFormField({ label, value, onChange, fullWidth = true, type = "text", placeholder }) {
  return (
    <TextField
      label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      fullWidth={fullWidth}
      type={type}
      placeholder={placeholder}
      size="small"
    />
  );
}

export function BillingSelectField({ label, value, onChange, options }) {
  return (
    <FormControl fullWidth size="small">
      <Typography variant="caption" sx={{ display: "block", color: "text.secondary", mb: 0.5 }}>
        {label}
      </Typography>
      <Select value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export function BillingEmptyState({ title, subtitle }) {
  return (
    <Box sx={{ py: 4, textAlign: "center" }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 0.5 }}>{title}</Typography>
      <Typography variant="body2" color="text.secondary">{subtitle}</Typography>
    </Box>
  );
}

export function BillingPrimaryButton({ children, onClick, disabled }) {
  return (
    <Button variant="contained" onClick={onClick} disabled={disabled} sx={{ textTransform: "none" }}>
      {children}
    </Button>
  );
}

export function BillingSecondaryButton({ children, onClick, disabled }) {
  return (
    <Button variant="outlined" onClick={onClick} disabled={disabled} sx={{ textTransform: "none" }}>
      {children}
    </Button>
  );
}

export function BillingTableHeaderRow({ children }) {
  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "2fr 1.2fr 1fr 1fr 0.8fr", gap: 1, alignItems: "center", fontWeight: 800 }}>
      {children}
    </Box>
  );
}

export function BillingRow({ cells, right }) {
  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "2fr 1.2fr 1fr 1fr 0.8fr", gap: 1, alignItems: "center", py: 1.25, borderBottom: "1px solid", borderColor: "divider" }}>
      {cells}
      {right || null}
    </Box>
  );
}

export function BillingGridActions({ children }) {
  return (
    <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
      {children}
    </Box>
  );
}

export function BillingDocPreviewText({ doc }) {
  if (!doc) return null;
  return (
    <Typography variant="body2" color="text.secondary">
      {doc.customerName ? `Customer: ${doc.customerName} · ` : ""}
      {doc.supplierName ? `Supplier: ${doc.supplierName} · ` : ""}
      {doc.documentNo ? `No: ${doc.documentNo}` : ""}
    </Typography>
  );
}

