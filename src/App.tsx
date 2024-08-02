import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import Products from "./pages/Products";
import ProductCreate from "./pages/ProductCreate";
import ProductDetail from "./pages/ProductDetail";
import ProductEdit from "./pages/ProductEdit";
import Users from "./pages/Users";
import NotFound from "./pages/NotFound";
import { useDispatch } from "react-redux";
import { RootState } from "./store";
import { setUser } from "./store/slices/userSlice";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.users.isAuthenticated
  );
  const storedState = localStorage.getItem("userState");

  useEffect(() => {
    const storedState = localStorage.getItem("userState");
    if (storedState) {
      dispatch(setUser(JSON.parse(storedState))); // Update Redux state on app load
    }
  }, [dispatch]);

  console.log(storedState);
  console.log(isAuthenticated);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/products/create"
          element={
            isAuthenticated ? <ProductCreate /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/products/edit/:id"
          element={isAuthenticated ? <ProductEdit /> : <Navigate to="/login" />}
        />
        <Route
          path="/products/:id"
          element={
            isAuthenticated ? <ProductDetail /> : <Navigate to="/login" />
          }
        />
        <Route path="/products" element={<Products />} />
        <Route
          path="/users"
          element={isAuthenticated ? <Users /> : <Navigate to="/login" />}
        />
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/products" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
