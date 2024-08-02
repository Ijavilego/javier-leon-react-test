import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setUser } from "../store/slices/userSlice";

const Users: React.FC = () => {
  const user = useSelector((state: RootState) => state.users);
  const [email, setEmail] = useState(user.email);
  const dispatch = useDispatch();

  const handleUpdateEmail = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setUser({ email, password: "" }));
  };

  return (
    <div>
      <h1>User Profile</h1>
      <form onSubmit={handleUpdateEmail}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update Email</button>
      </form>
    </div>
  );
};

export default Users;
