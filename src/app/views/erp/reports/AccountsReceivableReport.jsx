import { Fragment, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";
import DownloadIcon from "@mui/icons-material/Download";

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

const categories = [
  {
    key: "member",
    name: "Member",
    items: ["Statement", "Age analysis"]
  },
  {
    key: "tenant",
    name: "Tenant",
    items: ["Statement", "Age analysis"]
  },
  {
    key: "client",
    name: "Client",
    items: ["Statement", "Age analysis"]
  }
];

export default function AccountsReceivableReport() {
  const [activeCategory, setActiveCategory] = useState(categories[0].key);
  const [selectedItem, setSelectedItem] = useState(categories[0].items[0]);

  const currentCategory = useMemo(
    () => categories.find((c) => c.key === activeCategory) || categories[0],
    [activeCategory]
  );

  return (
    <Fragment>
      <PageBox>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 3 }}>
          <Typography variant="h4" component="h1">
            Accounts Receivable Reports
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Access member, tenant, and client receivables statements and age analyses.
          </Typography>
        </Box>

        <SectionCard>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
            {categories.map((category) => (
              <Button
                key={category.key}
                variant={activeCategory === category.key ? "contained" : "outlined"}
                onClick={() => {
                  setActiveCategory(category.key);
                  setSelectedItem(category.items[0]);
                }}
              >
                {category.name}
              </Button>
            ))}
          </Box>

          <SectionHeader variant="h6">{currentCategory.name} Receivables</SectionHeader>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {`Generate statements and age analyses for ${currentCategory.name.toLowerCase()} accounts receivable.`}
          </Typography>

          <Grid container spacing={2}>
            {currentCategory.items.map((item) => (
              <Grid xs={12} sm={6} key={item}>
                <Card sx={{ p: 2, height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                      {item}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {`${item} report for ${currentCategory.name.toLowerCase()} receivables.`}
                    </Typography>
                  </Box>
                  <Button
                    variant={selectedItem === item ? "contained" : "outlined"}
                    size="small"
                    startIcon={<DownloadIcon />}
                    sx={{ mt: 2, textTransform: "none" }}
                    onClick={() => setSelectedItem(item)}
                  >
                    View {item}
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>
        </SectionCard>
      </PageBox>
    </Fragment>
  );
}
