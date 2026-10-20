import { Alert, Box, CircularProgress, Typography } from "@mui/material";

export const Loader = () => (
  <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}><CircularProgress /></Box>
);

export const ErrorMessage = ({ message }) => (
  <Alert severity="error" sx={{ my: 2 }}>Could not load data: {message}</Alert>
);

export const Empty = ({ children }) => (
  <Typography color="text.secondary" sx={{ py: 4 }}>{children}</Typography>
);
