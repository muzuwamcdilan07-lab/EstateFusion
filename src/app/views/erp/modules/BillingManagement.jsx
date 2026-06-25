import { Fragment, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";

const PageBox = styled(Box)(({ theme }) => ({
  padding: "2rem",
  minHeight: "100vh",
  background: theme.palette.background.default,
  [theme.breakpoints.down("sm")]: { padding: "1rem" }
}));

const SectionCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  background: theme.palette.background.paper
}));

const SectionHeader = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1.5),
  fontWeight: 700,
  color: theme.palette.text.primary
}));

const SectionSubtitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  color: theme.palette.text.secondary
}));

const groupConfig = [
  {
    key: "receivable",
    title: "Accounts Receivable",
    description: "Process outgoing customer documents for members, tenants, and clients.",
    items: [
      { key: "member", name: "Member", docs: ["Quotation", "Invoice", "Credit Note", "Debit Note"] },
      { key: "tenant", name: "Tenant", docs: ["Quotation", "Invoice", "Credit Note", "Debit Note"] },
      { key: "client", name: "Client", docs: ["Quotation", "Invoice", "Credit Note", "Debit Note"] }
    ]
  },
  {
    key: "payable",
    title: "Accounts Payable",
    description: "Manage supplier purchasing documents and returns.",
    items: [
      { key: "supplier", name: "Supplier", docs: ["Purchase Order", "Goods Received Note", "Credit To Supplier", "Return & Debit"] }
    ]
  },
  {
    key: "cashbook",
    title: "Cashbook",
    description: "Track cash transactions and reconciliation in local and foreign currencies.",
    items: [
      { key: "home", name: "Home", docs: ["Home Cashbook"] },
      { key: "foreign", name: "Foreign", docs: ["Foreign Cashbook"] },
      { key: "reconciliation", name: "Reconciliation", docs: ["Reconciliation"] }
    ]
  },
  {
    key: "journal",
    title: "Journal",
    description: "Record journal entries for general ledger and document-backed transactions.",
    items: [
      { key: "general", name: "General", docs: ["General Journal"] },
      { key: "member", name: "Member", docs: ["Member Journal"] },
      { key: "tenant", name: "Tenant", docs: ["Tenant Journal"] },
      { key: "client", name: "Client", docs: ["Client Journal"] },
      { key: "supplier", name: "Supplier", docs: ["Supplier Journal"] },
      { key: "agent", name: "Agent", docs: ["Agent Journal"] },
      { key: "inventory", name: "Inventory", docs: ["Inventory Journal"] }
    ]
  }
];

export default function BillingManagement() {
  const [activeGroup, setActiveGroup] = useState("receivable");
  const [selectedEntity, setSelectedEntity] = useState("member");

  const currentGroup = useMemo(
    () => groupConfig.find((group) => group.key === activeGroup) || groupConfig[0],
    [activeGroup]
  );

  const currentEntity = useMemo(
    () => currentGroup.items.find((item) => item.key === selectedEntity) || currentGroup.items[0],
    [currentGroup, selectedEntity]
  );

  return (
    <Fragment>
      <PageBox>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" sx={{ mb: 1 }}>
            Billing Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Process billing documents with structured accounts receivable, accounts payable, cashbook, and journal workflows.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid xs={12} md={8}>
            <SectionCard>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
                {groupConfig.map((group) => (
                  <Button
                    key={group.key}
                    variant={activeGroup === group.key ? "contained" : "outlined"}
                    onClick={() => {
                      setActiveGroup(group.key);
                      setSelectedEntity(group.items[0].key);
                    }}
                  >
                    {group.title}
                  </Button>
                ))}
              </Box>

              <SectionHeader variant="h6">{currentGroup.title}</SectionHeader>
              <SectionSubtitle variant="body2">{currentGroup.description}</SectionSubtitle>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                {currentGroup.items.map((item) => (
                  <Chip
                    key={item.key}
                    label={item.name}
                    color={selectedEntity === item.key ? "primary" : "default"}
                    onClick={() => setSelectedEntity(item.key)}
                    clickable
                  />
                ))}
              </Box>

              <Divider sx={{ mb: 2 }} />

              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Available documents for {currentEntity.name}
              </Typography>

              <Grid container spacing={2}>
                {currentEntity.docs.map((doc) => (
                  <Grid xs={12} sm={6} key={doc}>
                    <Card sx={{ p: 2, height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                          {doc}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {`Create, edit, and manage ${doc.toLowerCase()} documents for ${currentEntity.name.toLowerCase()}.`}
                        </Typography>
                      </Box>
                      <Button sx={{ mt: 2 }} variant="outlined" size="small">
                        Open {doc}
                      </Button>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </SectionCard>
          </Grid>

          <Grid xs={12} md={4}>
            <SectionCard sx={{ mb: 3 }}>
              <SectionHeader variant="h6">Billing Summary</SectionHeader>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Quick access to the active billing workflow and key document counts.
              </Typography>
              <Box sx={{ display: "grid", gap: 2 }}>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                    Selected workflow
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {currentGroup.title} • {currentEntity.name}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                    Active documents
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {currentEntity.docs.length} document types available
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                    Next step
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Choose a document type and click Open to proceed.
                  </Typography>
                </Box>
              </Box>
            </SectionCard>

            <SectionCard>
              <SectionHeader variant="h6">Document Guidance</SectionHeader>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Follow these billing flows for efficient processing.
              </Typography>
              <Box component="ul" sx={{ pl: 2, m: 0, color: "text.secondary" }}>
                <li>AR: Issue quotations, invoices, and credit/debit notes to customers.</li>
                <li>AP: Record purchase orders, GRNs, supplier credits, and returns.</li>
                <li>Cashbook: Reconcile home and foreign currency cash flows.</li>
                <li>Journal: Post journal entries for all document-backed transactions.</li>
              </Box>
            </SectionCard>
          </Grid>
        </Grid>
      </PageBox>
    </Fragment>
  );
}
