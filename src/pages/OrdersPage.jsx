import { useState } from "react";
import {
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Chip,
} from "@mui/material";
import { CreateOrderForm } from "../components/CreateOrderForm";
import { useData } from "../contexts/DataContext";

export const OrdersPage = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const { orders, refreshOrders } = useData();

  return (
    <div>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" gutterBottom>
          Orders
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setCreateModalOpen(true)}
        >
          Create Order
        </Button>
      </Box>
      {!orders ? (
        <Typography>Loading orders...</Typography>
      ) : orders.length === 0 ? (
        <Typography>No orders found.</Typography>
      ) : (
        <List>
          {orders.map((order) => (
            <ListItem key={order.id} divider>
              <ListItemText
                primary={`Order #${order.id?.slice(-6) || "N/A"}`}
                secondary={
                  <>
                    <div>User: {order.user_id}</div>
                    <div>Total: ${order.total_price}</div>
                    <Chip
                      label={order.status}
                      color={
                        order.status === "completed"
                          ? "success"
                          : order.status === "cancelled"
                          ? "error"
                          : "info"
                      }
                      size="small"
                      style={{ marginTop: "0.5rem" }}
                    />
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      )}

      <CreateOrderForm
        open={createModalOpen}
        handleClose={() => setCreateModalOpen(false)}
      />
    </div>
  );
};
