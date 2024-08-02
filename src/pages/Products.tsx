import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../store";
import {
  setProducts,
  setLoading,
  deleteProduct,
} from "../store/slices/productSlice";
import "./styles/Products.scss";

const Products: React.FC = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.products);
  const loading = useSelector((state: RootState) => state.products.loading);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(setLoading(true));
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      dispatch(setProducts(data));
      dispatch(setLoading(false));
    };

    fetchProducts();
  }, [dispatch]);

  const handleDelete = async (id?: number) => {
    if (id === undefined) return;
    dispatch(deleteProduct(id));
    await fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "DELETE",
    });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="products-container">
      <button
        className="button-create"
        onClick={() => navigate("/products/create")}
      >
        Create New Product
      </button>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <Link to={`/products/${product.id}`}>{product.title}</Link>
              </td>
              <td>${product.price}</td>
              <td>
                <Link to={`/products/edit/${product.id}`}>Edit</Link>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
