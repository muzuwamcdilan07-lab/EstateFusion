import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
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

const agents = [
  {
    id: "A101",
    name: "Nia Harrison",
    title: "Senior Sales Agent",
    region: "Harare",
    deals: 18,
    rating: 4.9,
    status: "Active",
    email: "nia.harrison@example.com"
  },
  {
    id: "A104",
    name: "Samuel Okoro",
    title: "Rental Specialist",
    region: "Bulawayo",
    deals: 12,
    rating: 4.7,
    status: "Active",
    email: "samuel.okoro@example.com"
  },
  {
    id: "A109",
    name: "Leah Mwangi",
    title: "Referral Advisor",
    region: "Gweru",
    deals: 9,
    rating: 4.5,
    status: "Pending",
    email: "leah.mwangi@example.com"
  },
  {
    id: "A113",
    name: "David Moyo",
    title: "Field Agent",
    region: "Mutare",
    deals: 14,
    rating: 4.8,
    status: "Active",
    email: "david.moyo@example.com"
  }
];

export default function AgentProfiles() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeStatus, setActiveStatus] = useState("All");
  const [selectedAgentId, setSelectedAgentId] = useState(agents[0].id);

  const filteredAgents = useMemo(() => {
    return agents.filter((agent) => {
      const matchesQuery =
        agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = activeStatus === "All" || agent.status === activeStatus;
      return matchesQuery && matchesStatus;
    });
  }, [searchQuery, activeStatus]);

  const selectedAgent = useMemo(
    () => agents.find((agent) => agent.id === selectedAgentId) || agents[0],
    [selectedAgentId]
  );

  return (
    <PageBox>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 3 }}>
        <Typography variant="h4">Agent Profiles</Typography>
        <Typography color="text.secondary">
          Search, filter and review active field agents with their current performance metrics.
        </Typography>
      </Box>

      <SectionCard sx={{ mb: 3 }}>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 3 }}>
          <TextField
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search agents by name or role"
            fullWidth
            size="small"
          />
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {['All', 'Active', 'Pending'].map((status) => (
              <Chip
                key={status}
                label={status}
                clickable
                color={activeStatus === status ? 'primary' : 'default'}
                onClick={() => setActiveStatus(status)}
              />
            ))}
          </Box>
        </Box>

        <Grid container spacing={2}>
          {filteredAgents.map((agent) => (
            <Grid xs={12} sm={6} md={3} key={agent.id}>
              <Card
                onClick={() => setSelectedAgentId(agent.id)}
                sx={{
                  p: 2,
                  cursor: 'pointer',
                  border: agent.id === selectedAgentId ? '2px solid' : '1px solid',
                  borderColor: agent.id === selectedAgentId ? 'primary.main' : 'divider',
                  transition: 'border-color 150ms ease-in-out'
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  {agent.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {agent.title}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2">Region: {agent.region}</Typography>
                  <Typography variant="body2">Deals: {agent.deals}</Typography>
                  <Typography variant="body2">Rating: {agent.rating}</Typography>
                  <Typography variant="body2">Status: {agent.status}</Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </SectionCard>

      <SectionCard>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
          Selected Agent Details
        </Typography>
        <Grid container spacing={2}>
          <Grid xs={12} md={8}>
            <Card sx={{ p: 3, minHeight: 200 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                {selectedAgent.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {selectedAgent.title}
              </Typography>
              <Typography variant="body2">Email: {selectedAgent.email}</Typography>
              <Typography variant="body2">Region: {selectedAgent.region}</Typography>
              <Typography variant="body2">Deals this quarter: {selectedAgent.deals}</Typography>
              <Typography variant="body2">Performance rating: {selectedAgent.rating}</Typography>
              <Typography variant="body2">Agent status: {selectedAgent.status}</Typography>
            </Card>
          </Grid>
          <Grid xs={12} md={4}>
            <Card sx={{ p: 3, minHeight: 200, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                  Actions
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Manage licenses, update commission rules, or assign new leads to the selected agent.
                </Typography>
              </Box>
              <Button variant="contained" size="large" fullWidth>
                View full profile
              </Button>
            </Card>
          </Grid>
        </Grid>
      </SectionCard>
    </PageBox>
  );
}
