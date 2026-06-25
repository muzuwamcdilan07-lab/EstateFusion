import { useMemo, useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";

export default function DemoLogin() {
  const navigate = useNavigate();

  const savedIdentifier = localStorage.getItem("rememberedIdentifier") || "";
  const demoUsers = useMemo(
    () => [
      {
        username: "admin",
        email: "admin@estatefusion.com",
        phone: "08012345678",
        password: "admin123",
        role: "Admin"
      },
      {
        username: "agent1",
        email: "agent1@estatefusion.com",
        phone: "08023456789",
        password: "agent123",
        role: "Field Agent"
      },
      {
        username: "supervisor",
        email: "supervisor@estatefusion.com",
        phone: "08034567890",
        password: "super123",
        role: "Supervisor"
      },
      {
        username: "analyst",
        email: "analyst@estatefusion.com",
        phone: "08045678901",
        password: "analyst123",
        role: "Analyst"
      }
    ],
    []
  );

  const [identifier, setIdentifier] = useState(savedIdentifier || demoUsers[0].email);
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(Boolean(savedIdentifier));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await new Promise((r) => setTimeout(r, 250));
      const normalized = identifier.trim().toLowerCase();
      const user = demoUsers.find(
        (item) =>
          [item.email, item.username, item.phone].includes(normalized) &&
          password === item.password
      );

      if (!user) {
        setError("Invalid login. Please use Username, Email or Phone with the correct password.");
        return;
      }

      localStorage.setItem("demoAuth", "true");
      localStorage.setItem("demoRole", user.role);
      localStorage.setItem("demoUser", user.username);

      if (rememberMe) {
        localStorage.setItem("rememberedIdentifier", identifier);
      } else {
        localStorage.removeItem("rememberedIdentifier");
      }

      const redirectMap = {
        Admin: "/app/dashboard",
        "Field Agent": "/app/dashboard",
        Supervisor: "/app/dashboard",
        Analyst: "/app/dashboard"
      };

      navigate(redirectMap[user.role] || "/app/dashboard", { replace: true });

    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 3
      }}
    >
      <Card sx={{ width: "100%", maxWidth: 420, p: 3 }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 1 }}>
          <Box
            component="img"
            src="/assets/images/melsoft-logo.jpeg"
            alt="MELSOFT ESTATEFUSION ERP"
            sx={{ width: 84, height: 84, borderRadius: "50%", objectFit: "cover", display: "block" }}

          />
          <Typography variant="h5" sx={{ fontWeight: 800, mt: 1, textAlign: "center" }}>
            MELSOFT ESTATEFUSION ERP
          </Typography>
        </Box>

        <Box component="form" onSubmit={onSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Username / Email / Phone"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />


          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
            }
            label="Remember Me"
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 1
            }}
          >
            <Link component={RouterLink} to="/forget-password" variant="body2">
              Forgot password?
            </Link>
          </Box>

          {error ? (
            <Typography color="error" sx={{ mt: 1, fontSize: 13 }}>
              {error}
            </Typography>
          ) : null}

          <Button
            sx={{ mt: 2 }}
            fullWidth
            variant="contained"
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing in…" : "Sign in"}
          </Button>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Don't have an account?{' '}
              <Link component={RouterLink} to="/app/admin/users" underline="hover">
                Sign up
              </Link>
            </Typography>
          </Box>

          <Typography variant="caption" display="block" sx={{ mt: 2, color: "text.secondary" }}>
            Use any of these credentials: admin/admin123, agent1/agent123, supervisor/super123, analyst/analyst123
          </Typography>
        </Box>
      </Card>
    </Box>
  );
}

