import { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useData } from "../contexts/DataContext";
import { createProduct } from "../services/productService";
import { useNotification } from "../contexts/NotificationContext";

export const CreateProductForm = ({ open, handleClose }) => {
  const { showNotification } = useNotification();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
  });
  const { refreshProducts } = useData();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      try {
        await createProduct({
          ...formData,
          price: parseFloat(formData.price),
        });
        refreshProducts();
        handleClose();
      } catch (error) {
        console.error("Error creating product:", error);
      }
      showNotification("Product created successfully!", "success");
    } catch (error) {
      console.error("Error creating product:", error);
      showNotification("Failed to create product", "error");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create New Product</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Product Name"
            fullWidth
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Price"
            type="number"
            fullWidth
            required
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Description"
            multiline
            rows={3}
            fullWidth
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            Create
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
