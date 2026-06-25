const navigations = [
  {
    name: "Dashboard",
    icon: "home",
    path: "/app/dashboard"
  },

  { label: "Land Management", type: "label" },
  {
    name: "Land Inventory",
    icon: "inventory",
    path: "/app/land-management/action/plot-registration",
    children: [
      { name: "Plot registration", path: "/app/land-management/action/plot-registration" },
      { name: "Stand numbers", path: "/app/land-management/action/stand-numbers" },
      { name: "GIS/map coordinates", path: "/app/land-management/action/gis" },
      { name: "Survey records", path: "/app/land-management/action/survey-records" },
      { name: "Land size measurements", path: "/app/land-management/size" },
      { name: "Zoning classification", path: "/app/zones" },
      { name: "Ownership records", path: "/app/owners" },
      { name: "Deed/document uploads", path: "/app/land-management/action/documents" },
      { name: "Land status tracking", path: "/app/land-management/action/status-tracking" },

      { name: "Installment management", path: "/app/land-management/action/installments" },
      { name: "Payment plans", path: "/app/land-management/action/payment-plans" },

      { name: "Offer letters", path: "/app/land-management/action/offer-letters" },
      { name: "Sale agreements", path: "/app/land-management/action/agreements" },
      { name: "Transfer tracking", path: "/app/land-management/action/transfers" },
      { name: "Buyer management", path: "/app/land-management/action/buyers" }
    ]
  },
  {
    name: "Land Subdivision",
    icon: "domain",
    path: "/app/land-management/action/phase-creation",
    children: [
      { name: "Phase creation", path: "/app/land-management/action/phase-creation" },
      { name: "Block management", path: "/app/land-management/action/block-management" },
      { name: "Stand allocation", path: "/app/land-management/action/stand-allocation" },
      { name: "Infrastructure progress", path: "/app/land-management/action/infrastructure-progress" },
      { name: "Road status", path: "/app/land-management/action/road-status" },
      { name: "Water status", path: "/app/land-management/action/water-status" },
      { name: "Electricity status", path: "/app/land-management/action/electricity-status" },

      { name: "Land Pricing Engine", path: "/app/land-management/action/land-pricing-engine" },
      { name: "Price per square meter", path: "/app/land-management/action/price-per-sqm" },
      { name: "Dynamic pricing", path: "/app/land-management/action/dynamic-pricing" },

      { name: "GIS & Mapping", path: "/app/land-management/action/gis-interactive" },
      { name: "Interactive maps", path: "/app/land-management/action/interactive-maps" },
      { name: "Plot selection", path: "/app/land-management/action/plot-selection" },
      { name: "GPS integration", path: "/app/land-management/action/gps-integration" },
      { name: "Geo-location services", path: "/app/land-management/action/geo-location-services" },

      { name: "Municipal approvals", path: "/app/land-management/action/municipal-approvals" },
      { name: "Compliance checklist", path: "/app/land-management/action/compliance-checklist" },
      { name: "Document expiry alerts", path: "/app/land-management/action/document-expiry-alerts" }
    ]
  },
  {
    name: "Land Type",
    icon: "category",
    path: "/app/land-management/action/stand",
    children: [
      { name: "Stand", path: "/app/land-management/action/stand" },
      { name: "Farm", path: "/app/land-management/action/farm" },
      { name: "Plot", path: "/app/land-management/action/plot" },
      {
        name: "Residential Categories",
        path: "/app/land-management/action/residential-categories",
        children: [
          { name: "High density", path: "/app/land-management/action/residential-high-density" },
          { name: "Medium density", path: "/app/land-management/action/residential-medium-density" },
          { name: "Low density", path: "/app/land-management/action/residential-low-density" }
        ]
      },
      { name: "Commercial", path: "/app/land-management/action/commercial" },
      { name: "Industrial", path: "/app/land-management/action/industrial" }
    ]
  },
  {
    name: "Land Area",
    icon: "terrain",
    path: "/app/land-management/action/harare",
    children: [
      { name: "Harare", path: "/app/land-management/action/harare" },
      { name: "Bulawayo", path: "/app/land-management/action/bulawayo" },
      { name: "Gweru", path: "/app/land-management/action/gweru" }
    ]
  },
  {
    name: "Size",
    icon: "straighten",
    path: "/app/land-management/action/sqm",
    children: [
      { name: "sqm", path: "/app/land-management/action/sqm" },
      { name: "ha", path: "/app/land-management/action/ha" }
    ]
  },
  {
    name: "GIS & Mapping",
    icon: "map",
    path: "/app/land-management/action/gis",
    children: [
      { name: "Interactive maps", path: "/app/land-management/action/interactive-maps" },
      { name: "Plot selection", path: "/app/land-management/action/plot-selection" },
      { name: "GPS integration", path: "/app/land-management/action/gps-integration" },
      { name: "Geo-location services", path: "/app/land-management/action/geo-location-services" }
    ]
  },
  {
    name: "Municipal Approvals",
    icon: "approval",
    path: "/app/land-management/action/municipal-approvals",
    children: [
      { name: "Compliance checklist", path: "/app/land-management/action/compliance-checklist" },
      { name: "Document expiry alerts", path: "/app/land-management/action/document-expiry-alerts" }
    ]
  },

  { label: "Rental Management", type: "label" },
  {
    name: "Property Type",
    icon: "category",
    path: "/app/rental-management/property-type"
  },
  {
    name: "Area",
    icon: "terrain",
    path: "/app/rental-management/area"
  },
  {
    name: "Unit",
    icon: "view_quilt",
    path: "/app/rental-management/unit"
  },
  {
    name: "Sizes",
    icon: "square_foot",
    path: "/app/rental-management/sizes"
  },
  {
    name: "Tenant",
    icon: "people",
    path: "/app/rental-management/tenant"
  },
  {
    name: "Owner",
    icon: "person",
    path: "/app/rental-management/owner"
  },

  { label: "Listing Management", type: "label" },
  {
    name: "Property Type",
    icon: "category",
    path: "/app/listing-management/property-type"
  },
  {
    name: "Specifications",
    icon: "view_list",
    path: "/app/listing-management/specifications"
  },
  {
    name: "Unit",
    icon: "view_quilt",
    path: "/app/listing-management/unit"
  },
  {
    name: "Property Size",
    icon: "square_foot",
    path: "/app/listing-management/size"
  },
  {
    name: "Amenities",
    icon: "chair",
    path: "/app/listing-management/amenities"
  },

  { label: "Agent Management", type: "label" },
  {
    name: "Agent Profiles",
    icon: "people",
    path: "/app/agents/profiles"
  },
  {
    name: "License details",
    icon: "badge",
    path: "/app/agents/license-details"
  },
  {
    name: "Commission Types",
    icon: "percent",
    path: "/app/agents/commission-types"
  },
  {
    name: "Commission Structure",
    icon: "settings",
    path: "/app/agents/commission-structure"
  },

  { label: "Financial Management", type: "label" },
  {
    name: "Chart of Accounts",
    icon: "account_tree",
    path: "/app/financial-management/chart-of-accounts"
  },
  {
    name: "Tax",
    icon: "receipt",
    path: "/app/financial-management/tax"
  },
  {
    name: "Multi-currency",
    icon: "currency_exchange",
    path: "/app/financial-management/multi-currency"
  },
  {
    name: "Accounts Receivable",
    icon: "trending_up",
    path: "/app/financial-management/accounts-receivable"
  },
  {
    name: "Accounts Payable",
    icon: "trending_down",
    path: "/app/financial-management/accounts-payable"
  },
  {
    name: "Journals",
    icon: "description",
    path: "/app/financial-management/journals"
  },
  {
    name: "Fixed Asset",
    icon: "domain",
    path: "/app/financial-management/fixed-asset"
  },

  { label: "Billing management", type: "label" },
  {
    name: "Accounts Receivable",
    icon: "trending_up",
    path: "/app/billing-management/accounts-receivable"
  },
  {
    name: "Accounts Payable",
    icon: "trending_down",
    path: "/app/billing-management/accounts-payable"
  },
  {
    name: "Cashbook",
    icon: "book",
    path: "/app/billing-management/cashbook"
  },
  {
    name: "Journal",
    icon: "description",
    path: "/app/billing-management/journal"
  },

  { label: "Reports", type: "label" },
  {
    name: "General Ledger",
    icon: "book",
    path: "/app/reports/general-ledger"
  },
  {
    name: "Accounts Receivable",
    icon: "trending_up",
    path: "/app/reports/accounts-receivable"
  },
  {
    name: "Accounts Payable",
    icon: "trending_down",
    path: "/app/reports/accounts-payable"
  },
  {
    name: "Fixed Assets",
    icon: "domain",
    path: "/app/reports/fixed-assets"
  },
  {
    name: "Land",
    icon: "terrain",
    path: "/app/reports/land"
  },
  {
    name: "Rental",
    icon: "apartment",
    path: "/app/reports/rental"
  },
  {
    name: "Listing",
    icon: "list_alt",
    path: "/app/reports/listing"
  },
  {
    name: "Agent",
    icon: "person",
    path: "/app/reports/agent"
  },
  {
    name: "Owner",
    icon: "person_outline",
    path: "/app/reports/owner"
  },

  { label: "Administration", type: "label" },
  {
    name: "User Registration",
    icon: "person_add",
    path: "/app/admin/users"
  },
  {
    name: "Roles & Permissions",
    icon: "security",
    path: "/app/admin/roles"
  },
  {
    name: "Settings",
    icon: "settings",
    path: "/app/admin/settings"
  },

  { label: "Data Management", type: "label" },
  {
    name: "Owners",
    icon: "storage",
    path: "/app/owners"
  },
  {
    name: "Tenants",
    icon: "storage",
    path: "/app/tenants"
  },

  { label: "Integration", type: "label" },
  {
    name: "Sync Center",
    icon: "sync",
    path: "/app/sync/center"
  }
];

export default navigations;

