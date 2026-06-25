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
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PaymentsIcon from "@mui/icons-material/Payments";
import BuildIcon from "@mui/icons-material/Build";

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

const FeatureCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  cursor: "pointer",
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: theme.shadows[4],
    transform: "translateY(-2px)"
  }
}));

const financeModules = [
  { id: "chart-of-accounts", label: "Chart of Accounts", icon: "AccountBalanceIcon" },
  { id: "tax", label: "Tax", icon: "ReceiptIcon" },
  { id: "multi-currency", label: "Multi-currency", icon: "CurrencyExchangeIcon" },
  { id: "accounts-receivable", label: "Accounts Receivable", icon: "PaymentsIcon" },
  { id: "accounts-payable", label: "Accounts Payable", icon: "PaymentsIcon" },
  { id: "journals", label: "Journals", icon: "AssignmentIcon" },
  { id: "fixed-asset", label: "Fixed Asset", icon: "BuildIcon" }
];

const moduleDetails = {
  "chart-of-accounts": {
    title: "Chart of Accounts",
    description: "Define and manage the general ledger structure with account types and transaction categories.",
    features: [
      { name: "General Ledger", desc: "Core GL account structure and hierarchy." },
      { name: "Accounts Type", desc: "Define account types (asset, liability, equity, revenue, expense)." },
      { name: "Transaction Type", desc: "Categorize transaction types for tracking and reporting." },
      { name: "Department", desc: "Allocate accounts to departments for cost center tracking." }
    ],
    subTabs: [
      { id: "accounts", name: "GL Accounts", count: 0 },
      { id: "types", name: "Account Types", count: 0 },
      { id: "transactions", name: "Transaction Types", count: 0 },
      { id: "departments", name: "Departments", count: 0 }
    ],
    sampleData: [
      { code: "1000", account: "Cash", type: "Asset", department: "Treasury" },
      { code: "1200", account: "Accounts Receivable", type: "Asset", department: "Sales" },
      { code: "2000", account: "Accounts Payable", type: "Liability", department: "Procurement" },
      { code: "3000", account: "Capital Stock", type: "Equity", department: "Finance" },
      { code: "4000", account: "Rental Income", type: "Revenue", department: "Operations" }
    ]
  },
  tax: {
    title: "Tax",
    description: "Configure tax types and rates for compliance and reporting.",
    features: [
      { name: "Tax Type", desc: "Define tax types (VAT, Income Tax, Withholding, etc.)." },
      { name: "Tax %", desc: "Set and manage tax rates for each tax type." }
    ],
    subTabs: [
      { id: "tax-types", name: "Tax Types", count: 0 },
      { id: "tax-rates", name: "Tax Rates", count: 0 }
    ],
    sampleData: [
      { type: "VAT", rate: "15%", description: "Value Added Tax" },
      { type: "Income Tax", rate: "25%", description: "Corporate Income Tax" },
      { type: "Withholding", rate: "10%", description: "Withholding Tax" },
      { type: "Capital Gains", rate: "20%", description: "Capital Gains Tax" }
    ]
  },
  "multi-currency": {
    title: "Multi-currency",
    description: "Manage transactions in multiple currencies with daily exchange rates.",
    features: [
      { name: "Home Currency", desc: "Define the primary functional currency (e.g., ZWL)." },
      { name: "Foreign Currency", desc: "Set up foreign currency accounts (USD, EUR, GBP, etc.)." },
      { name: "Daily Rates", desc: "Maintain and update daily exchange rates for conversion." }
    ],
    subTabs: [
      { id: "currencies", name: "Currencies", count: 0 },
      { id: "rates", name: "Exchange Rates", count: 0 }
    ],
    sampleData: [
      { currency: "ZWL", name: "Zimbabwean Dollar", rate: "1.0000", type: "Home" },
      { currency: "USD", name: "US Dollar", rate: "920.50", type: "Foreign" },
      { currency: "EUR", name: "Euro", rate: "1005.75", type: "Foreign" },
      { currency: "GBP", name: "British Pound", rate: "1165.25", type: "Foreign" }
    ]
  },
  "accounts-receivable": {
    title: "Accounts Receivable",
    description: "Track customer receivables with aging and group analysis by customer type and area.",
    features: [
      { name: "Member", desc: "Track receivables from member entities." },
      { name: "Tenant", desc: "Monitor tenant account balances and payment status." },
      { name: "Client", desc: "Manage client receivables and credit limits." },
      { name: "Group", desc: "Group receivables by customer category." },
      { name: "Area", desc: "Analyze receivables by geographic area." },
      { name: "Age Analysis", desc: "Generate aging schedules for collection tracking." }
    ],
    subTabs: [
      { id: "customer-ar", name: "Customer A/R", count: 0 },
      { id: "age-analysis", name: "Age Analysis", count: 0 },
      { id: "outstanding", name: "Outstanding Invoices", count: 0 }
    ],
    arData: [
      { customer: "Member A", type: "Member", balance: "ZWL 45,000", days: "30-60" },
      { customer: "Tenant B", type: "Tenant", balance: "ZWL 22,500", days: "0-30" },
      { customer: "Client C", type: "Client", balance: "ZWL 67,500", days: "60-90" },
      { customer: "Member D", type: "Member", balance: "ZWL 33,750", days: "Over 90" }
    ]
  },
  "accounts-payable": {
    title: "Accounts Payable",
    description: "Manage supplier accounts with aging and group analysis by area.",
    features: [
      { name: "Supplier Account", desc: "Maintain supplier master records and terms." },
      { name: "Group", desc: "Group suppliers by category (materials, services, utilities)." },
      { name: "Area", desc: "Organize payables by supplier location/area." },
      { name: "Age Analysis", desc: "Track payment aging for supplier invoice management." }
    ],
    subTabs: [
      { id: "supplier-ap", name: "Supplier A/P", count: 0 },
      { id: "ap-age", name: "Age Analysis", count: 0 },
      { id: "due-payments", name: "Due Payments", count: 0 }
    ],
    apData: [
      { supplier: "Supplier X", category: "Materials", balance: "ZWL 78,000", days: "0-30" },
      { supplier: "Supplier Y", category: "Services", balance: "ZWL 45,600", days: "30-60" },
      { supplier: "Supplier Z", category: "Utilities", balance: "ZWL 22,500", days: "60-90" },
      { supplier: "Supplier W", category: "Materials", balance: "ZWL 56,250", days: "Over 90" }
    ]
  },
  journals: {
    title: "Journals",
    description: "Record and manage journal entries across general, customer, supplier, and inventory ledgers.",
    features: [
      { name: "General Journal", desc: "Post manual journal entries to the general ledger." },
      { name: "Customer", desc: "Track customer-related journal postings." },
      { name: "Supplier", desc: "Manage supplier transaction journals." },
      { name: "Inventory", desc: "Post inventory movements and valuation adjustments." }
    ],
    subTabs: [
      { id: "general-journal", name: "General Journal", count: 0 },
      { id: "customer-journal", name: "Customer Journal", count: 0 },
      { id: "supplier-journal", name: "Supplier Journal", count: 0 },
      { id: "inventory-journal", name: "Inventory Journal", count: 0 }
    ]
  },
  "fixed-asset": {
    title: "Fixed Asset",
    description: "Manage fixed assets with depreciation, location, and department tracking.",
    features: [
      { name: "Asset Account", desc: "Set up fixed asset GL accounts by category." },
      { name: "Type", desc: "Classify assets (equipment, property, vehicles, etc.)." },
      { name: "Group", desc: "Group assets for management and reporting." },
      { name: "Area", desc: "Track asset location by geographic area." },
      { name: "Department", desc: "Assign assets to departments for accountability." },
      { name: "People", desc: "Assign assets to employee custodians." }
    ],
    subTabs: [
      { id: "asset-register", name: "Asset Register", count: 0 },
      { id: "depreciation", name: "Depreciation", count: 0 },
      { id: "asset-locations", name: "Asset Locations", count: 0 }
    ],
    assetData: [
      { assetCode: "FA-001", description: "Office Equipment", type: "Equipment", netBook: "ZWL 125,000", department: "Finance" },
      { assetCode: "FA-002", description: "Company Vehicle", type: "Vehicle", netBook: "ZWL 450,000", department: "Operations" },
      { assetCode: "FA-003", description: "Land & Building", type: "Property", netBook: "ZWL 2,500,000", department: "Real Estate" },
      { assetCode: "FA-004", description: "IT Infrastructure", type: "Equipment", netBook: "ZWL 275,000", department: "IT" }
    ]
  }
};

export default function FinancialManagement() {
  const [activeModule, setActiveModule] = useState("chart-of-accounts");
  const [activeSubTab, setActiveSubTab] = useState(null);

  const currentModule = useMemo(
    () => moduleDetails[activeModule],
    [activeModule]
  );

  const handleModuleClick = (moduleId) => {
    setActiveModule(moduleId);
    setActiveSubTab(null);
  };

  const handleSubTabChange = (event, newValue) => {
    setActiveSubTab(newValue);
  };

  return (
    <Fragment>
      <PageBox>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 3 }}>
          <Typography variant="h4" component="h1">
            Financial Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Comprehensive finance and accounting system with chart of accounts, tax, multi-currency, receivables, payables, journals, and fixed assets.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* Module Navigation */}
          <Grid xs={12}>
            <SectionCard>
              <SectionHeader variant="h6">Finance Modules</SectionHeader>
              <Grid container spacing={2}>
                {financeModules.map((module) => (
                  <Grid xs={12} sm={6} md={4} lg={3} key={module.id}>
                    <FeatureCard
                      onClick={() => handleModuleClick(module.id)}
                      sx={{
                        border:
                          activeModule === module.id
                            ? "2px solid"
                            : "1px solid",
                        borderColor:
                          activeModule === module.id ? "primary.main" : "divider",
                        backgroundColor:
                          activeModule === module.id
                            ? "primary.50"
                            : "background.paper"
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <AccountBalanceIcon sx={{ fontSize: "2rem", color: "primary.main" }} />
                        <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                            {module.label}
                          </Typography>
                        </Box>
                      </Box>
                    </FeatureCard>
                  </Grid>
                ))}
              </Grid>
            </SectionCard>
          </Grid>

          {/* Active Module Content */}
          <Grid xs={12}>
            <SectionCard>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: 2,
                  flexWrap: "wrap",
                  mb: 2
                }}
              >
                <Box>
                  <SectionHeader variant="h6">{currentModule.title}</SectionHeader>
                  <SectionSubtitle>{currentModule.description}</SectionSubtitle>
                </Box>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  sx={{ textTransform: "none", mt: 1 }}
                >
                  New Entry
                </Button>
              </Box>

              {/* Sub-tabs if available */}
              {currentModule.subTabs && (
                <Box sx={{ mb: 2 }}>
                  <Tabs
                    value={activeSubTab || currentModule.subTabs[0].id}
                    onChange={handleSubTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                  >
                    {currentModule.subTabs.map((tab) => (
                      <Tab
                        key={tab.id}
                        value={tab.id}
                        label={`${tab.name} (${tab.count})`}
                      />
                    ))}
                  </Tabs>
                  <Divider sx={{ my: 2 }} />
                </Box>
              )}

              {/* Sample Data Tables */}
              {(currentModule.sampleData || currentModule.arData || currentModule.apData || currentModule.assetData) && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>
                    Current Records (Sample Data)
                  </Typography>
                  <TableContainer component="div" sx={{ maxHeight: 400, overflow: "auto" }}>
                    {currentModule.sampleData && (
                      <Table size="small">
                        <TableHead>
                          <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                            <TableCell sx={{ fontWeight: 700 }}>Code</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Account</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Type</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Department</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {currentModule.sampleData.map((row, idx) => (
                            <TableRow key={idx} hover>
                              <TableCell>{row.code}</TableCell>
                              <TableCell>{row.account}</TableCell>
                              <TableCell>{row.type}</TableCell>
                              <TableCell>{row.department}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                    {currentModule.arData && (
                      <Table size="small">
                        <TableHead>
                          <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                            <TableCell sx={{ fontWeight: 700 }}>Customer</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Type</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Balance</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Aging</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {currentModule.arData.map((row, idx) => (
                            <TableRow key={idx} hover>
                              <TableCell>{row.customer}</TableCell>
                              <TableCell>{row.type}</TableCell>
                              <TableCell sx={{ fontWeight: 600 }}>{row.balance}</TableCell>
                              <TableCell>{row.days}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                    {currentModule.apData && (
                      <Table size="small">
                        <TableHead>
                          <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                            <TableCell sx={{ fontWeight: 700 }}>Supplier</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Category</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Balance</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Aging</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {currentModule.apData.map((row, idx) => (
                            <TableRow key={idx} hover>
                              <TableCell>{row.supplier}</TableCell>
                              <TableCell>{row.category}</TableCell>
                              <TableCell sx={{ fontWeight: 600 }}>{row.balance}</TableCell>
                              <TableCell>{row.days}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                    {currentModule.assetData && (
                      <Table size="small">
                        <TableHead>
                          <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                            <TableCell sx={{ fontWeight: 700 }}>Code</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Description</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Type</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Net Book</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Department</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {currentModule.assetData.map((row, idx) => (
                            <TableRow key={idx} hover>
                              <TableCell>{row.assetCode}</TableCell>
                              <TableCell>{row.description}</TableCell>
                              <TableCell>{row.type}</TableCell>
                              <TableCell sx={{ fontWeight: 600 }}>{row.netBook}</TableCell>
                              <TableCell>{row.department}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                  </TableContainer>
                </Box>
              )}

              {/* Feature Grid */}
              <Grid container spacing={2}>
                {currentModule.features.map((feature) => (
                  <Grid xs={12} sm={6} md={4} key={feature.name}>
                    <Card sx={{ p: 2, height: "100%", display: "flex", flexDirection: "column" }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                        {feature.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
                        {feature.desc}
                      </Typography>
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{ alignSelf: "flex-start", textTransform: "none" }}
                      >
                        Manage
                      </Button>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </SectionCard>
          </Grid>

          {/* Finance Summary */}
          <Grid xs={12}>
            <SectionCard>
              <SectionHeader variant="h6">Finance System Integration</SectionHeader>
              <Grid container spacing={2}>
                <Grid xs={12} sm={6} md={3}>
                  <Card sx={{ p: 2, textAlign: "center", height: "100%" }}>
                    <Typography variant="body2" sx={{ fontWeight: 700, mb: 1 }}>
                      Chart of Accounts
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      GL structure, account types, transaction types, and department allocation
                    </Typography>
                  </Card>
                </Grid>
                <Grid xs={12} sm={6} md={3}>
                  <Card sx={{ p: 2, textAlign: "center", height: "100%" }}>
                    <Typography variant="body2" sx={{ fontWeight: 700, mb: 1 }}>
                      Tax & Currency
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Tax types/rates and multi-currency with daily exchange rates
                    </Typography>
                  </Card>
                </Grid>
                <Grid xs={12} sm={6} md={3}>
                  <Card sx={{ p: 2, textAlign: "center", height: "100%" }}>
                    <Typography variant="body2" sx={{ fontWeight: 700, mb: 1 }}>
                      Receivables & Payables
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      A/R and A/P tracking with aging and group analysis
                    </Typography>
                  </Card>
                </Grid>
                <Grid xs={12} sm={6} md={3}>
                  <Card sx={{ p: 2, textAlign: "center", height: "100%" }}>
                    <Typography variant="body2" sx={{ fontWeight: 700, mb: 1 }}>
                      Journals & Assets
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      General, customer, supplier, inventory journals and fixed asset tracking
                    </Typography>
                  </Card>
                </Grid>
              </Grid>
            </SectionCard>
          </Grid>
        </Grid>
      </PageBox>
    </Fragment>
  );
}
