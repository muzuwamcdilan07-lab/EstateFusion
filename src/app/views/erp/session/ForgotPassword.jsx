import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
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
      <Card sx={{ width: "100%", maxWidth: 440, p: 4, boxShadow: 6 }}>
        <Box sx={{ mb: 3, display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton onClick={() => navigate(-1)} sx={{ p: 0 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5" sx={{ fontWeight: 800 }}>
            Forgot Password
          </Typography>
        </Box>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Enter your email address and we will send you a secure link to reset your password.
        </Typography>

        {submitted ? (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              Reset link sent
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Check your inbox for instructions to reset your password.
            </Typography>
            <Button variant="contained" onClick={() => navigate("/" )}>
              Return to Sign in
            </Button>
          </Box>
        ) : (
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
            />
            <Button
              fullWidth
              variant="contained"
              type="submit"
              sx={{ mt: 2, py: 1.25 }}
            >
              Send reset link
            </Button>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
              Remembered your password?{' '}
              <Link component="button" variant="body2" onClick={() => navigate("/")}>Sign in</Link>
            </Typography>
          </Box>
        )}
      </Card>
    </Box>
  );
}
