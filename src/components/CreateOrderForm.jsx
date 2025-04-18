import { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useData } from "../contexts/DataContext";
import { createOrder } from "../services/orderService";

export const CreateOrderForm = ({ open, handleClose }) => {
  const [orderData, setOrderData] = useState({
    user_id: "",
    items: [{ product_id: "", quantity: 1 }],
  });
  const { products, refreshOrders } = useData();

  const handleAddItem = () => {
    setOrderData({
      ...orderData,
      items: [...orderData.items, { product_id: "", quantity: 1 }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createOrder(orderData);
      refreshOrders();
      handleClose();
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Create New Order</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            label="User ID"
            fullWidth
            required
            margin="normal"
            value={orderData.user_id}
            onChange={(e) =>
              setOrderData({ ...orderData, user_id: e.target.value })
            }
          />

          {orderData.items.map((item, index) => (
            <div
              key={index}
              style={{ display: "flex", gap: "1rem", margin: "1rem 0" }}
            >
              <FormControl fullWidth>
                <InputLabel>Product</InputLabel>
                <Select
                  value={item.product_id}
                  onChange={(e) => {
                    const newItems = [...orderData.items];
                    newItems[index].product_id = e.target.value;
                    setOrderData({ ...orderData, items: newItems });
                  }}
                  required
                >
                  {products.map((product) => (
                    <MenuItem key={product._id} value={product._id}>
                      {product.name} (${product.price})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                label="Quantity"
                type="number"
                slotProps={{
                  input: {
                    min: 1,
                  },
                }}
                value={item.quantity}
                onChange={(e) => {
                  const newItems = [...orderData.items];
                  newItems[index].quantity = parseInt(e.target.value);
                  setOrderData({ ...orderData, items: newItems });
                }}
                required
                style={{ width: "120px" }}
              />
            </div>
          ))}

          <Button
            onClick={handleAddItem}
            variant="outlined"
            style={{ marginTop: "1rem" }}
          >
            Add Item
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            Create Order
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
