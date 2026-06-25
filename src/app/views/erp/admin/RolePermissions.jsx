import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";

const PageBox = styled(Box)(({ theme }) => ({
  padding: "2rem",
  minHeight: "100vh",
  [theme.breakpoints.down("sm")]: { padding: "1rem" }
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontWeight: 700
}));

const availableModules = ["Mapping", "Property Capture", "Reports"];
const defaultRoles = [
  {
    id: 1,
    name: "Admin",
    permissions: [...availableModules]
  },
  {
    id: 2,
    name: "Field Agent",
    permissions: ["Mapping", "Property Capture"]
  },
  {
    id: 3,
    name: "Supervisor",
    permissions: ["Property Capture", "Reports"]
  },
  {
    id: 4,
    name: "Analyst",
    permissions: ["Reports"]
  }
];

export default function RolePermissions() {
  const currentRole = localStorage.getItem("demoRole");
  const [roles, setRoles] = useState(defaultRoles);
  const [formValues, setFormValues] = useState({ name: "", permissions: [] });

  const canEdit = currentRole === "Admin";

  const handleInputChange = (field) => (event) => {
    setFormValues((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleTogglePermission = (moduleName) => () => {
    setFormValues((prev) => {
      const permissionSet = prev.permissions.includes(moduleName)
        ? prev.permissions.filter((item) => item !== moduleName)
        : [...prev.permissions, moduleName];
      return { ...prev, permissions: permissionSet };
    });
  };

  const handleCreateRole = (event) => {
    event.preventDefault();
    if (!formValues.name) return;

    setRoles((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        name: formValues.name,
        permissions: formValues.permissions
      }
    ]);

    setFormValues({ name: "", permissions: [] });
  };

  return (
    <PageBox>
      <SectionTitle variant="h4">Role & Permissions</SectionTitle>
      {canEdit ? (
        <>
          <Card sx={{ p: 3, mb: 3 }}>
            <form onSubmit={handleCreateRole}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Role Name"
                    value={formValues.name}
                    fullWidth
                    onChange={handleInputChange("name")}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    {availableModules.map((moduleName) => (
                      <FormControlLabel
                        key={moduleName}
                        control={
                          <Checkbox
                            checked={formValues.permissions.includes(moduleName)}
                            onChange={handleTogglePermission(moduleName)}
                          />
                        }
                        label={moduleName}
                      />
                    ))}
                  </Box>
                </Grid>
              </Grid>

              <Button type="submit" variant="contained" sx={{ mt: 3 }}>
                Create Role
              </Button>
            </form>
          </Card>

          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Role Access Matrix
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Role</TableCell>
                  <TableCell>Allowed Modules</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {roles.map((role) => (
                  <TableRow key={role.id}>
                    <TableCell>{role.name}</TableCell>
                    <TableCell>{role.permissions.join(", ") || "None"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </>
      ) : (
        <Card sx={{ p: 3 }}>
          <Typography variant="h6">Access Denied</Typography>
          <Typography sx={{ mt: 1 }}>
            Only Admin users can manage roles and module permissions.
          </Typography>
        </Card>
      )}
    </PageBox>
  );
}
