import { Fragment } from "react";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";

const StyledTable = styled(Table)(() => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { backgroundColor: "#f3f6f9!important" },
    "& th": { paddingTop: "10px", paddingBottom: "10px" }
  },
  "& tbody": {
    "& tr": { borderBottom: "1px solid #e0e0e0" },
    "& td": { paddingTop: "10px", paddingBottom: "10px" }
  }
}));

const Small = styled("small")(({ align, color }) => ({
  width: "100%",
  height: "100%",
  padding: "5px",
  textAlign: align,
  color,
  backgroundColor: "#fafafa",
  display: "block"
}));

const properties = [
  { id: "P001", name: "Downtown Plaza", location: "Zone A", area: "5,000 sqm", status: "Mapped", agents: 3 },
  { id: "P002", name: "Commercial Hub", location: "Zone B", area: "8,500 sqm", status: "Mapped", agents: 5 },
  { id: "P003", name: "Residential Block", location: "Zone C", area: "3,200 sqm", status: "In Progress", agents: 2 },
  { id: "P004", name: "Industrial Park", location: "Zone D", area: "12,000 sqm", status: "Pending", agents: 0 },
  { id: "P005", name: "Green Space", location: "Zone A", area: "2,500 sqm", status: "Mapped", agents: 1 }
];

const statusColors = {
  "Mapped": "success",
  "In Progress": "warning",
  "Pending": "error"
};

export default function PropertyOverviewTable() {
  return (
    <Fragment>
      <Card sx={{ pt: 0, mb: 3 }}>
        <StyledTable>
          <TableHead>
            <TableRow>
              <TableCell align="left" sx={{ px: 2, py: 2 }}>
                Property ID
              </TableCell>
              <TableCell align="left" sx={{ px: 2, py: 2 }}>
                Property Name
              </TableCell>
              <TableCell align="left" sx={{ px: 2, py: 2 }}>
                Location
              </TableCell>
              <TableCell align="left" sx={{ px: 2, py: 2 }}>
                Area
              </TableCell>
              <TableCell align="left" sx={{ px: 2, py: 2 }}>
                Status
              </TableCell>
              <TableCell align="left" sx={{ px: 2, py: 2 }}>
                Agents
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {properties.map((property) => (
              <TableRow key={property.id}>
                <TableCell align="left" sx={{ px: 2, py: 2 }}>
                  <Small color="inherit">{property.id}</Small>
                </TableCell>
                <TableCell align="left" sx={{ px: 2, py: 2 }}>
                  <Small color="inherit">{property.name}</Small>
                </TableCell>
                <TableCell align="left" sx={{ px: 2, py: 2 }}>
                  <Small color="inherit">{property.location}</Small>
                </TableCell>
                <TableCell align="left" sx={{ px: 2, py: 2 }}>
                  <Small color="inherit">{property.area}</Small>
                </TableCell>
                <TableCell align="left" sx={{ px: 2, py: 2 }}>
                  <Chip
                    label={property.status}
                    color={statusColors[property.status] || "default"}
                    variant="outlined"
                    size="small"
                  />
                </TableCell>
                <TableCell align="left" sx={{ px: 2, py: 2 }}>
                  <Small color="inherit">{property.agents}</Small>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </StyledTable>
      </Card>
    </Fragment>
  );
}
