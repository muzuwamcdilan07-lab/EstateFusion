import { Fragment, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import TableChartIcon from "@mui/icons-material/TableChart";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AssessmentIcon from "@mui/icons-material/Assessment";

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

const SummaryCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  background: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1]
}));

const SectionBadge = styled(Box)(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  px: theme.spacing(1.5),
  py: theme.spacing(0.75),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  fontSize: "0.75rem",
  fontWeight: 700
}));

const reportSections = [
  { id: "general-ledger", label: "GENERAL LEDGER" },
  { id: "accounts-receivable", label: "ACCOUNTS RECEIVABLE" },
  { id: "accounts-payable", label: "ACCOUNTS PAYABLE" },
  { id: "fixed-assets", label: "FIXED ASSETS" },
  { id: "land", label: "LAND" },
  { id: "rental", label: "RENTAL" },
  { id: "listing", label: "LISTING" },
  { id: "agent", label: "AGENT" },
  { id: "owner", label: "OWNER" }
];

const reportData = {
  "general-ledger": {
    title: "General Ledger",
    description: "Review the core finance backbone with journal transactions, financial statements, and compliance summaries.",
    topics: [
      {
        id: "transactions",
        title: "Transactions",
        description: "Browse ledger postings and transaction histories.",
        elements: [
          { title: "Transaction Register", note: "List and filter all journal postings." },
          { title: "Document Linkage", note: "View source documents for each transaction." },
          { title: "Reconciliation Status", note: "See whether each transaction is reconciled." }
        ]
      },
      {
        id: "tax",
        title: "Tax",
        description: "Track tax reports across all revenue and expense entries.",
        elements: [
          { title: "VAT Summary", note: "Review VAT collected and input credit reports." },
          { title: "Withholding Tax", note: "Track withholding tax by supplier, client, and contract." },
          { title: "Tax Filing", note: "Prepare filed and unfiled returns." }
        ]
      },
      {
        id: "cashbook",
        title: "Cashbook",
        description: "Monitor cash movements and reconcile home and foreign currency books.",
        elements: [
          { title: "Home Cashbook", note: "Recorded cash receipts and payments in local currency." },
          { title: "Foreign Cashbook", note: "Foreign transaction flow and conversion details." },
          { title: "Reconciliation", note: "Match cashbook entries with bank and ledger balances." }
        ]
      },
      {
        id: "projects",
        title: "Projects",
        description: "Analyze financial performance by project or development cost center.",
        elements: [
          { title: "Project Ledger", note: "View project revenue and expenditure summaries." },
          { title: "Budget vs Actual", note: "Compare planned budgets to actual spend." },
          { title: "Cost Allocation", note: "Track cost distribution across project phases." }
        ]
      },
      {
        id: "income-statement",
        title: "Income Statement",
        description: "Deliver profit and loss reporting for the selected period.",
        elements: [
          { title: "Revenue Summary", note: "Total income by source and line item." },
          { title: "Expense Breakdown", note: "Operating and non-operating expense detail." },
          { title: "Net Income", note: "Closing profit or loss position." }
        ]
      },
      {
        id: "balance-sheet",
        title: "Balance Sheet",
        description: "Review financial position across assets, liabilities, and equity.",
        elements: [
          { title: "Assets", note: "Current and fixed asset balances." },
          { title: "Liabilities", note: "Short and long term obligations." },
          { title: "Equity", note: "Owner equity and retained earnings." }
        ]
      },
      {
        id: "trial-balance",
        title: "Trial Balance",
        description: "Confirm debit and credit totals before closing the books.",
        elements: [
          { title: "Trial Balance Report", note: "View and export the trial balance." },
          { title: "Variance Check", note: "Highlight unreconciled balances." }
        ]
      }
    ]
  },
  "accounts-receivable": {
    title: "Accounts Receivable",
    description: "Manage customer receivables for members, tenants, and clients with statements and aging analysis.",
    topics: [
      {
        id: "member",
        title: "Member",
        description: "Member receivables and aging statements.",
        elements: [
          { title: "Statement", note: "Generate member account statements for open invoices." },
          { title: "Age Analysis", note: "View outstanding amounts by aging bucket." }
        ]
      },
      {
        id: "tenant",
        title: "Tenant",
        description: "Tenant invoice history, statements, and aging data.",
        elements: [
          { title: "Statement", note: "Tenant receivables summary and balance history." },
          { title: "Age Analysis", note: "Aging report for overdue tenant balances." }
        ]
      },
      {
        id: "client",
        title: "Client",
        description: "Client receivables management, statements and collection aging.",
        elements: [
          { title: "Statement", note: "Detailed client statements and invoices." },
          { title: "Age Analysis", note: "Calculate overdue support by client." }
        ]
      }
    ]
  },
  "accounts-payable": {
    title: "Accounts Payable",
    description: "Manage supplier payables and purchase documents with statement and aging views.",
    topics: [
      {
        id: "supplier",
        title: "Supplier",
        description: "Supplier payables and outstanding liability analysis.",
        elements: [
          { title: "Statement", note: "Supplier ledger and current balances." },
          { title: "Age Analysis", note: "Invoice aging for supplier payments." }
        ]
      }
    ]
  },
  "fixed-assets": {
    title: "Fixed Assets",
    description: "Track fixed assets, depreciation, and asset details for financial reporting.",
    topics: [
      {
        id: "listing",
        title: "Listing",
        description: "Review the fixed asset register and asset categories.",
        elements: [
          { title: "Asset Register", note: "Active asset list and classification." },
          { title: "Acquisition History", note: "Purchase and capitalization details." }
        ]
      },
      {
        id: "details",
        title: "Details",
        description: "View asset detail records and depreciation schedules.",
        elements: [
          { title: "Asset Detail", note: "Individual asset card view." },
          { title: "Location Summary", note: "Asset locations and operational status." }
        ]
      },
      {
        id: "depreciation",
        title: "Depreciation",
        description: "Monitor depreciation expense and book value movements.",
        elements: [
          { title: "Depreciation Schedule", note: "Depreciation by asset and period." },
          { title: "Net Book Value", note: "Current asset carrying value." }
        ]
      }
    ]
  },
  land: {
    title: "Land",
    description: "Analyze land inventory, subdivisions, and land classification across the portfolio.",
    topics: [
      { id: "inventory", title: "Inventory", description: "Current land asset inventory by category.", elements: [{ title: "Land Stock", note: "Total parcels and available inventory." }, { title: "Ownership", note: "Ownership status and title summary." }] },
      { id: "subdivision", title: "Subdivision", description: "Subdivision reports and land parcel grouping.", elements: [{ title: "Subdivision Plan", note: "Planned and completed subdivisions." }, { title: "Release Status", note: "Status of subdivided parcels." }] },
      { id: "type", title: "Type", description: "Land type classification reports.", elements: [{ title: "Land Types", note: "Residential, commercial, industrial, plots and farms." }] },
      { id: "area", title: "Area", description: "Land area distribution analytics.", elements: [{ title: "Area Summary", note: "Total area by land type." }, { title: "Regional Breakdown", note: "Area by region and zone." }] },
      { id: "size", title: "Size", description: "Land parcel size reporting.", elements: [{ title: "Size Bands", note: "Parcel size categories and counts." }] }
    ]
  },
  rental: {
    title: "Rental",
    description: "Detailed rental reporting by type, area, unit and size.",
    topics: [
      { id: "type", title: "Type", description: "Rental asset type analysis.", elements: [{ title: "Rental Types", note: "Residential, commercial and industrial rental types." }] },
      { id: "area", title: "Area", description: "Rental area distribution.", elements: [{ title: "Rental Area", note: "Area allocation across rental portfolios." }] },
      { id: "unit", title: "Unit", description: "Unit-level rental reporting.", elements: [{ title: "Unit Inventory", note: "Rental unit availability and usage." }] },
      { id: "size", title: "Size", description: "Rental size category analytics.", elements: [{ title: "Size Bands", note: "Rental units by size category." }] }
    ]
  },
  listing: {
    title: "Listing",
    description: "Manage listing analytics for land and property types, specifications, units and amenities.",
    topics: [
      {
        id: "land",
        title: "Land",
        description: "Land listing categories and portfolio structure.",
        elements: [
          { title: "Residential", note: "High, medium and low density land categories." },
          { title: "Commercial", note: "Commercial land categories." },
          { title: "Industrial", note: "Industrial land categories." },
          { title: "Plots", note: "Available plots and pricing bands." },
          { title: "Farms", note: "Agricultural land and farm parcels." }
        ]
      },
      {
        id: "property-type",
        title: "Property Type",
        description: "Property type structured reporting.",
        elements: [
          { title: "Residential", note: "High, medium and low density residential properties." },
          { title: "Commercial", note: "Commercial property types." },
          { title: "Industrial", note: "Industrial property types." }
        ]
      },
      {
        id: "property-specification",
        title: "Property Specification",
        description: "Detailed specs for property features.",
        elements: [
          { title: "Bedrooms", note: "Bedroom counts by listing." },
          { title: "Bathrooms", note: "Bathroom counts and configuration." },
          { title: "Kitchens", note: "Kitchen types and counts." },
          { title: "Garages", note: "Garage availability and capacity." }
        ]
      },
      {
        id: "property-unit",
        title: "Property Unit",
        description: "Unit-level reporting for floor plans and occupancy.",
        elements: [
          { title: "Floors", note: "Number of floors and floor mix." },
          { title: "Rooms", note: "Room count distribution." },
          { title: "Office", note: "Office space inventory and availability." }
        ]
      },
      {
        id: "property-size",
        title: "Property Size",
        description: "Property size reporting in common units.",
        elements: [
          { title: "Square Meters", note: "Size data in sqm." },
          { title: "Hectares", note: "Size data in ha." }
        ]
      },
      {
        id: "amenities",
        title: "Amenities",
        description: "Amenity features across current listings.",
        elements: [
          { title: "Swimming Pool", note: "Listings with pool amenities." },
          { title: "Borehole", note: "Properties with borehole access." },
          { title: "Solar", note: "Listings offering solar power." },
          { title: "Other Amenities", note: "Additional listing amenity categories." }
        ]
      }
    ]
  },
  agent: {
    title: "Agent",
    description: "Commission reporting and structure for active agents.",
    topics: [
      { id: "commission-type", title: "Commission Type", description: "Review commission rate structures and schemes.", elements: [{ title: "Flat Rate", note: "Fixed commission rate for agents." }, { title: "Percentage", note: "Percentage-based commission by deal value." }] },
      { id: "commission-structure", title: "Commission Structure", description: "Agent payout and tiered commission reporting.", elements: [{ title: "Tiered Commissions", note: "Commission tiers based on performance." }, { title: "Incentives", note: "Bonus and incentive structures." }] }
    ]
  },
  owner: {
    title: "Owner",
    description: "Owner reporting with statements and aging analysis.",
    topics: [
      { id: "statement", title: "Statement", description: "Owner account statements and distributions.", elements: [{ title: "Owner Statement", note: "Summarize owner balances and payments." }] },
      { id: "age-analysis", title: "Age Analysis", description: "Owner aging report for outstanding receivables.", elements: [{ title: "Aging Buckets", note: "View owner balances by aging period." }] }
    ]
  }
};

export default function Reports() {
  const [activeSection, setActiveSection] = useState("general-ledger");
  const [activeTopic, setActiveTopic] = useState(reportData["general-ledger"].topics[0].id);
  const [exportFormat, setExportFormat] = useState(null);

  const currentSection = useMemo(() => reportData[activeSection], [activeSection]);
  const currentTopic = useMemo(
    () => currentSection.topics.find((topic) => topic.id === activeTopic) || currentSection.topics[0],
    [currentSection, activeTopic]
  );

  const handleSectionChange = (event, newValue) => {
    setActiveSection(newValue);
    setActiveTopic(reportData[newValue].topics[0].id);
  };

  const handleExport = (format) => {
    setExportFormat(format);
    alert(`Exporting ${currentSection.title} reports as ${format.toUpperCase()}...`);
  };

  const handleViewReport = () => {
    alert(`Opening ${currentTopic.title} report for ${currentSection.title}.`);
  };

  return (
    <Fragment>
      <PageBox>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 3 }}>
          <Typography variant="h4" component="h1">
            Reports & Analytics
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Financial, land, rental and asset analytics designed for professional ERP reporting.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid xs={12}>
            <SectionCard>
              <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", alignItems: "flex-start", gap: 2 }}>
                <Box>
                  <SectionHeader variant="h6">Core reporting workspace</SectionHeader>
                  <SectionSubtitle>
                    Choose the report category, select a topic, then open the report for more detail.
                  </SectionSubtitle>
                </Box>
                <Stack direction="row" spacing={2}>
                  <Button variant="outlined" startIcon={<PictureAsPdfIcon />} onClick={() => handleExport("pdf")} sx={{ textTransform: "none" }}>
                    Export PDF
                  </Button>
                  <Button variant="outlined" startIcon={<TableChartIcon />} onClick={() => handleExport("excel")} sx={{ textTransform: "none" }}>
                    Export Excel
                  </Button>
                </Stack>
              </Box>
            </SectionCard>
          </Grid>

          <Grid xs={12}>
            <SectionCard>
              <Tabs
                value={activeSection}
                onChange={handleSectionChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{ mb: 2 }}
              >
                {reportSections.map((section) => (
                  <Tab key={section.id} value={section.id} label={section.label} />
                ))}
              </Tabs>

              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={3}>
                <Grid xs={12} md={4}>
                  <SectionCard>
                    <SectionHeader>{currentSection.title}</SectionHeader>
                    <SectionSubtitle>{currentSection.description}</SectionSubtitle>
                    <List disablePadding>
                      {currentSection.topics.map((topic) => (
                        <ListItemButton
                          key={topic.id}
                          selected={topic.id === currentTopic.id}
                          onClick={() => setActiveTopic(topic.id)}
                        >
                          <ListItemText
                            primary={topic.title}
                            secondary={topic.description}
                          />
                        </ListItemButton>
                      ))}
                    </List>
                  </SectionCard>
                </Grid>

                <Grid xs={12} md={8}>
                  <SectionCard>
                    <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2, flexWrap: "wrap" }}>
                      <Box>
                        <SectionHeader>{currentTopic.title}</SectionHeader>
                        <SectionSubtitle>{currentTopic.description}</SectionSubtitle>
                      </Box>
                      <Button
                        variant="contained"
                        startIcon={<AssessmentIcon />}
                        onClick={handleViewReport}
                        sx={{ textTransform: "none" }}
                      >
                        View Report
                      </Button>
                    </Box>

                    <Grid container spacing={2} sx={{ mt: 1 }}>
                      {currentTopic.elements.map((item) => (
                        <Grid xs={12} sm={6} key={item.title}>
                          <Card sx={{ p: 2, height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                            <Box>
                              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                                {item.title}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {item.note}
                              </Typography>
                            </Box>
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={() => alert(`Open ${item.title} in ${currentTopic.title}`)}
                              sx={{ mt: 2, alignSelf: "flex-start", textTransform: "none" }}
                            >
                              Open
                            </Button>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </SectionCard>
                </Grid>
              </Grid>
            </SectionCard>
          </Grid>

          <Grid xs={12} md={4}>
            <SummaryCard>
              <SectionHeader variant="h6">Report summary</SectionHeader>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Quick metrics for the selected report category.
              </Typography>
              <Grid container spacing={2}>
                <Grid xs={12} sm={4}>
                  <SummaryCard sx={{ p: 1.5, textAlign: "center" }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: "#1976d2" }}>
                      {currentSection.topics.length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Topics
                    </Typography>
                  </SummaryCard>
                </Grid>
                <Grid xs={12} sm={4}>
                  <SummaryCard sx={{ p: 1.5, textAlign: "center" }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: "#4caf50" }}>
                      {currentTopic.elements.length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Report items
                    </Typography>
                  </SummaryCard>
                </Grid>
                <Grid xs={12} sm={4}>
                  <SummaryCard sx={{ p: 1.5, textAlign: "center" }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: "#ff9800" }}>
                      {exportFormat ? exportFormat.toUpperCase() : "N/A"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Last export
                    </Typography>
                  </SummaryCard>
                </Grid>
              </Grid>
            </SummaryCard>
          </Grid>

          <Grid xs={12} md={8}>
            <SectionCard>
              <SectionHeader variant="h6">Modern report layout</SectionHeader>
              <SectionSubtitle>
                This workspace is built for dynamic report browsing with category-focused data access.
              </SectionSubtitle>
              <Grid container spacing={2}>
                <Grid xs={12} sm={6}>
                  <Box sx={{ p: 2, borderRadius: 2, bgcolor: "background.default" }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                      Financial Coverage
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Access general ledger, AR, AP and fixed asset reports from one consolidated section.
                    </Typography>
                  </Box>
                </Grid>
                <Grid xs={12} sm={6}>
                  <Box sx={{ p: 2, borderRadius: 2, bgcolor: "background.default" }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                      Property Intelligence
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Land, rental, listing, agent and owner reporting for property portfolio management.
                    </Typography>
                  </Box>
                </Grid>
                <Grid xs={12} sm={6}>
                  <Box sx={{ p: 2, borderRadius: 2, bgcolor: "background.default" }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                      Actionable Insights
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Use the report menu to quickly drill into statements, age analysis and reconciliation workflows.
                    </Typography>
                  </Box>
                </Grid>
                <Grid xs={12} sm={6}>
                  <Box sx={{ p: 2, borderRadius: 2, bgcolor: "background.default" }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                      Export Ready
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Export any report instantly as PDF or Excel for accounting review and audit support.
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </SectionCard>
          </Grid>
        </Grid>
      </PageBox>
    </Fragment>
  );
}
