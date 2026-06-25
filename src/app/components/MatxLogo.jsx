import Box from "@mui/material/Box";

export default function MatxLogo({ className }) {
  return (
    <Box
      component="img"
      src="/assets/images/melsoft-logo.jpeg"
      alt="MELSOFT ESTATEFUSION ERP"
      className={className}
      sx={{
        width: 36,
        height: 36,
        borderRadius: "50%",
        objectFit: "cover",
        display: "block",
      }}
    />
  );
}
