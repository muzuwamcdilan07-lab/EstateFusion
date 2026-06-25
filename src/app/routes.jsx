import { lazy } from "react";
import DemoAuthGuard from "app/auth/DemoAuthGuard";
import MatxLayout from "app/components/MatxLayout/MatxLayout";

const DemoLogin = lazy(() => import("app/views/erp/session/DemoLogin"));
const ForgotPassword = lazy(() => import("app/views/erp/session/ForgotPassword"));

const ExecutiveDashboard = lazy(() => import("app/views/erp/ExecutiveDashboard"));


const MapView = lazy(() => import("app/views/erp/MapView"));
const PropertyCapture = lazy(() => import("app/views/erp/property/PropertyCapture"));
const Properties = lazy(() => import("app/views/erp/property/Properties"));
const ListingPropertyType = lazy(() => import("app/views/erp/listing/ListingPropertyType"));
const ListingSpecifications = lazy(() => import("app/views/erp/listing/ListingSpecifications"));
const ListingUnit = lazy(() => import("app/views/erp/listing/ListingUnit"));
const ListingSize = lazy(() => import("app/views/erp/listing/ListingSize"));
const ListingAmenities = lazy(() => import("app/views/erp/listing/ListingAmenities"));
const RentalPropertyType = lazy(() => import("app/views/erp/rental/RentalPropertyType"));
const RentalArea = lazy(() => import("app/views/erp/rental/RentalArea"));
const RentalUnit = lazy(() => import("app/views/erp/rental/RentalUnit"));
const RentalSizes = lazy(() => import("app/views/erp/rental/RentalSizes"));
const RentalTenant = lazy(() => import("app/views/erp/rental/RentalTenant"));
const RentalOwner = lazy(() => import("app/views/erp/rental/RentalOwner"));
const Zones = lazy(() => import("app/views/erp/land/Zones"));
const LandInventory = lazy(() => import("app/views/erp/land/LandInventory"));
const LandSubdivision = lazy(() => import("app/views/erp/land/LandSubdivision"));
const LandType = lazy(() => import("app/views/erp/land/LandType"));
const LandArea = lazy(() => import("app/views/erp/land/LandArea"));
const LandSize = lazy(() => import("app/views/erp/land/LandSize"));
const GISMapping = lazy(() => import("app/views/erp/land/GISMapping"));
const MunicipalApprovals = lazy(() => import("app/views/erp/land/MunicipalApprovals"));
const LandFeaturePage = lazy(() => import("app/views/erp/land/LandFeaturePage"));
const LandActionWrapper = lazy(() => import("app/views/erp/land/LandActionWrapper"));
const Tasks = lazy(() => import("app/views/erp/operations/Tasks"));
const SyncCenter = lazy(() => import("app/views/erp/Sync/SyncCenter"));
const Reports = lazy(() => import("app/views/erp/reports/Reports"));
const Settings = lazy(() => import("app/views/erp/admin/Settings"));
const UserRegistration = lazy(() => import("app/views/erp/admin/UserRegistration"));
const RolePermissions = lazy(() => import("app/views/erp/admin/RolePermissions"));
const BillingManagement = lazy(() => import("app/views/erp/modules/BillingManagement"));
const BillingAccountsReceivable = lazy(() => import("app/views/erp/modules/BillingAccountsReceivable"));
const BillingAccountsPayable = lazy(() => import("app/views/erp/modules/BillingAccountsPayable"));
const Cashbook = lazy(() => import("app/views/erp/modules/Cashbook"));
const BillingJournal = lazy(() => import("app/views/erp/modules/BillingJournal"));
const FinancialManagement = lazy(() => import("app/views/erp/financial/FinancialManagement"));
const ChartOfAccounts = lazy(() => import("app/views/erp/financial/ChartOfAccounts"));
const Tax = lazy(() => import("app/views/erp/financial/Tax"));
const MultiCurrency = lazy(() => import("app/views/erp/financial/MultiCurrency"));
const AccountsReceivable = lazy(() => import("app/views/erp/financial/AccountsReceivable"));
const AccountsPayable = lazy(() => import("app/views/erp/financial/AccountsPayable"));
const Journals = lazy(() => import("app/views/erp/financial/Journals"));
const FixedAsset = lazy(() => import("app/views/erp/financial/FixedAsset"));

// Report modules
const GeneralLedgerReport = lazy(() => import("app/views/erp/reports/GeneralLedgerReport"));
const AccountsReceivableReport = lazy(() => import("app/views/erp/reports/AccountsReceivableReport"));
const AccountsPayableReport = lazy(() => import("app/views/erp/reports/AccountsPayableReport"));
const FixedAssetsReport = lazy(() => import("app/views/erp/reports/FixedAssetsReport"));
const LandReport = lazy(() => import("app/views/erp/reports/LandReport"));
const RentalReport = lazy(() => import("app/views/erp/reports/RentalReport"));
const ListingReport = lazy(() => import("app/views/erp/reports/ListingReport"));
const AgentReport = lazy(() => import("app/views/erp/reports/AgentReport"));
const OwnerReport = lazy(() => import("app/views/erp/reports/OwnerReport"));

const OwnerProfile = lazy(() => import("app/views/erp/profile/OwnerProfile"));
const TenantProfile = lazy(() => import("app/views/erp/profile/TenantProfile"));
const AgentProfiles = lazy(() => import("app/views/erp/agent/AgentProfiles"));
const LicenseDetails = lazy(() => import("app/views/erp/agent/LicenseDetails"));
const CommissionTypes = lazy(() => import("app/views/erp/agent/CommissionTypes"));
const CommissionStructure = lazy(() => import("app/views/erp/agent/CommissionStructure"));


const NotFound = lazy(() => import("app/views/sessions/NotFound"));

const routes = [
  { path: "/", element: <DemoLogin /> },
  { path: "/forget-password", element: <ForgotPassword /> },
  { path: "/app/auth/login", element: <DemoLogin /> },
  {
    path: "/app",
    element: (
      <DemoAuthGuard>
        <MatxLayout />
      </DemoAuthGuard>
    ),
    children: [
      { index: true, element: <ExecutiveDashboard /> },

      // Dashboard
      { path: "dashboard", element: <ExecutiveDashboard /> },

      // Mapping / GIS
      { path: "mapping/map", element: <MapView /> },

      // Property capture & management
      { path: "capture/property", element: <PropertyCapture /> },
      { path: "properties", element: <Properties /> },

      // Listing Management modules
      { path: "listing-management/property-type", element: <ListingPropertyType /> },
      { path: "listing-management/specifications", element: <ListingSpecifications /> },
      { path: "listing-management/unit", element: <ListingUnit /> },
      { path: "listing-management/size", element: <ListingSize /> },
      { path: "listing-management/amenities", element: <ListingAmenities /> },

      // Rental Management modules
      { path: "rental-management/property-type", element: <RentalPropertyType /> },
      { path: "rental-management/area", element: <RentalArea /> },
      { path: "rental-management/unit", element: <RentalUnit /> },
      { path: "rental-management/sizes", element: <RentalSizes /> },
      { path: "rental-management/tenant", element: <RentalTenant /> },
      { path: "rental-management/owner", element: <RentalOwner /> },

      // Zoning & areas
      { path: "zones", element: <Zones /> },

      // Land Management modules
      { path: "land-management/inventory", element: <LandInventory /> },

      // Land Inventory sub-features (sidebar dropdown routes)
      { path: "land-management/action/:feature", element: <LandActionWrapper /> },

      // Modern plot registration form (new)
      { path: "land-management/action/plot-registration", element: <LandFeaturePage /> },

      { path: "land-management/subdivision", element: <LandSubdivision /> },
      { path: "land-management/type", element: <LandType /> },
      { path: "land-management/area", element: <LandArea /> },
      { path: "land-management/size", element: <LandSize /> },
      { path: "land-management/gis", element: <GISMapping /> },
      { path: "land-management/compliance", element: <MunicipalApprovals /> },

      // Field operations
      { path: "agents/tasks", element: <Tasks /> },
      { path: "agents/profiles", element: <AgentProfiles /> },
      { path: "agents/license-details", element: <LicenseDetails /> },
      { path: "agents/commission-types", element: <CommissionTypes /> },
      { path: "agents/commission-structure", element: <CommissionStructure /> },

      // Sync
      { path: "sync/center", element: <SyncCenter /> },

      // Reports & analytics
      { path: "reports/general-ledger", element: <GeneralLedgerReport /> },
      { path: "reports/accounts-receivable", element: <AccountsReceivableReport /> },
      { path: "reports/accounts-payable", element: <AccountsPayableReport /> },
      { path: "reports/fixed-assets", element: <FixedAssetsReport /> },
      { path: "reports/land", element: <LandReport /> },
      { path: "reports/rental", element: <RentalReport /> },
      { path: "reports/listing", element: <ListingReport /> },
      { path: "reports/agent", element: <AgentReport /> },
      { path: "reports/owner", element: <OwnerReport /> },
      { path: "billing-management", element: <BillingManagement /> },
      { path: "billing-management/accounts-receivable", element: <BillingAccountsReceivable /> },
      { path: "billing-management/accounts-payable", element: <BillingAccountsPayable /> },
      { path: "billing-management/cashbook", element: <Cashbook /> },
      { path: "billing-management/journal", element: <BillingJournal /> },

      // Financial Management modules
      { path: "financial-management/chart-of-accounts", element: <ChartOfAccounts /> },
      { path: "financial-management/tax", element: <Tax /> },
      { path: "financial-management/multi-currency", element: <MultiCurrency /> },
      { path: "financial-management/accounts-receivable", element: <AccountsReceivable /> },
      { path: "financial-management/accounts-payable", element: <AccountsPayable /> },
      { path: "financial-management/journals", element: <Journals /> },
      { path: "financial-management/fixed-asset", element: <FixedAsset /> },

      // Owner/Tenant profiles
      { path: "owners", element: <OwnerProfile /> },
      { path: "tenants", element: <TenantProfile /> },

      // Admin
      { path: "admin/users", element: <UserRegistration /> },
      { path: "admin/roles", element: <RolePermissions /> },
      { path: "admin/settings", element: <Settings /> }
    ]
  },


  { path: "*", element: <NotFound /> }
];

export default routes;


