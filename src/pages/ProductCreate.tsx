import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../store/slices/productSlice";
import "./styles/ProductCreated.scss";

const ProductCreate: React.FC = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState({} as Record<string, string>);
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors: Record<string, string> = {};
    if (title.trim() === "") validationErrors.title = "Title is required";
    if (price <= 0) validationErrors.price = "Price must be greater than 0";
    if (image.trim() === "") validationErrors.image = "Image URL is required";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newProduct = { title, price, description, category, image };
    dispatch(addProduct(newProduct));

    try {
      const response = await fetch("https://fakestoreapi.com/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });
      const data = await response.json();
      console.log(data);
      alert("Product Created");
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Error creating");
    }
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setErrors({ ...errors, title: "" });
          }}
          required
        />
      </div>
      <div>
        <label>Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => {
            setPrice(Number(e.target.value));
            setErrors({ ...errors, price: "0" });
          }}
          required
        />
      </div>
      <div>
        <label>Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            setErrors({ ...errors, description: "" });
          }}
        />
      </div>
      <div>
        <label>Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        />
      </div>
      <div>
        <label>Image URL</label>
        <input
          type="text"
          value={image}
          onChange={(e) => {
            setImage(e.target.value);
            setErrors({ ...errors, image: "" });
          }}
        />
      </div>
      {errors.title && <span className="error">{errors.title}</span>}
      {errors.price && <span className="error">{errors.price}</span>}
      {errors.image && <span className="error">{errors.image}</span>}

      <button type="submit">Create Product</button>
    </form>
  );
};

export default ProductCreate;
