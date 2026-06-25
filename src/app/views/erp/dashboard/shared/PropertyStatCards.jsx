import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import HomeIcon from "@mui/icons-material/Home";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import GroupIcon from "@mui/icons-material/Group";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ArrowRightAlt from "@mui/icons-material/ArrowRightAlt";
import { Small } from "app/components/Typography";
import { useNavigate } from "react-router-dom";


// STYLED COMPONENTS
const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "24px !important",
  background: theme.palette.background.paper,
  [theme.breakpoints.down("sm")]: { padding: "16px !important" }
}));

const ContentBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  "& small": { color: theme.palette.text.secondary },
  "& .icon": { opacity: 0.6, fontSize: "44px", color: theme.palette.primary.main }
}));

const Heading = styled("h6")(({ theme }) => ({
  margin: 0,
  marginTop: "4px",
  fontSize: "14px",
  fontWeight: "500",
  color: theme.palette.primary.main
}));

export default function PropertyStatCards() {
  const navigate = useNavigate();

  const cardList = [
    // Keep these numbers in sync with the sample table in PropertyOverviewTable
    { name: "Total Properties", amount: "5", Icon: HomeIcon, color: "#1976d2", href: "/app/properties" },
    { name: "Mapped", amount: "2", Icon: LocationOnIcon, color: "#4caf50", href: "/app/mapping/map" },
    { name: "Active Field Agents", amount: "3", Icon: GroupIcon, color: "#ff9800", href: "/app/agents/tasks" },
    { name: "Coverage", amount: "40%", Icon: TrendingUpIcon, color: "#9c27b0", href: "/app/reports" }
  ];

  return (
    <Grid container spacing={3} sx={{ mb: "24px" }}>
      {cardList.map(({ amount, Icon, name, color, href }) => (
        <Grid size={{ md: 6, xs: 12 }} key={name}>
          <StyledCard elevation={6}>
            <ContentBox>
              <Icon className="icon" sx={{ color }} />

              <Box ml="12px">
                <Small>{name}</Small>
                <Heading>{amount}</Heading>
              </Box>
            </ContentBox>

            <Tooltip title={href ? "View Details" : ""} placement="top">
              <IconButton
                onClick={() => {
                  if (href) navigate(href);
                }}
                disabled={!href}
              >
                <ArrowRightAlt />
              </IconButton>
            </Tooltip>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
}

