import { useMemo, useState } from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
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

const initialUsers = [
  {
    id: 1,
    fullName: "Amina Johnson",
    role: "Admin",
    email: "admin@estatefusion.com",
    phone: "08012345678",
    region: "Zone A",
    status: "Active"
  },
  {
    id: 2,
    fullName: "Chinedu Okoro",
    role: "Field Agent",
    email: "agent1@estatefusion.com",
    phone: "08023456789",
    region: "Zone B",
    status: "Active"
  }
];

const roleOptions = ["Admin", "Field Agent", "Supervisor", "Analyst"];
const regionOptions = ["Zone A", "Zone B", "Zone C", "Zone D"];

export default function UserRegistration() {
  const currentRole = localStorage.getItem("demoRole");
  const [users, setUsers] = useState(initialUsers);
  const [values, setValues] = useState({
    fullName: "",
    role: "Field Agent",
    email: "",
    phone: "",
    region: "Zone A",
    status: true
  });

  const canEdit = currentRole === "Admin";

  const handleChange = (field) => (event) => {
    const value = field === "status" ? event.target.checked : event.target.value;
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!values.fullName || !values.email || !values.phone) return;

    setUsers((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        fullName: values.fullName,
        role: values.role,
        email: values.email,
        phone: values.phone,
        region: values.region,
        status: values.status ? "Active" : "Inactive"
      }
    ]);

    setValues({
      fullName: "",
      role: "Field Agent",
      email: "",
      phone: "",
      region: "Zone A",
      status: true
    });
  };

  return (
    <PageBox>
      <SectionTitle variant="h4">User Registration</SectionTitle>
      {canEdit ? (
        <>
          <Card sx={{ p: 3, mb: 3 }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Full Name"
                    value={values.fullName}
                    fullWidth
                    onChange={handleChange("fullName")}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Role"
                    select
                    value={values.role}
                    fullWidth
                    onChange={handleChange("role")}
                  >
                    {roleOptions.map((role) => (
                      <MenuItem key={role} value={role}>
                        {role}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Phone"
                    value={values.phone}
                    fullWidth
                    onChange={handleChange("phone")}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Email"
                    type="email"
                    value={values.email}
                    fullWidth
                    onChange={handleChange("email")}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Assign Region"
                    select
                    value={values.region}
                    fullWidth
                    onChange={handleChange("region")}
                  >
                    {regionOptions.map((region) => (
                      <MenuItem key={region} value={region}>
                        {region}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} md={6} sx={{ display: "flex", alignItems: "center" }}>
                  <FormControlLabel
                    label="Active"
                    control={
                      <Switch
                        checked={values.status}
                        onChange={handleChange("status")}
                      />
                    }
                  />
                </Grid>
              </Grid>

              <Button type="submit" variant="contained" sx={{ mt: 3 }}>
                Add User
              </Button>
            </form>
          </Card>

          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Registered Users
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Region</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.fullName}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{user.region}</TableCell>
                    <TableCell>{user.status}</TableCell>
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
            Only Admin users can create and manage registration records.
          </Typography>
        </Card>
      )}
    </PageBox>
  );
}
