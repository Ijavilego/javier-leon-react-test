import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  email: string;
  password: string;
  isAuthenticated: boolean;
}

const storedState = localStorage.getItem("userState");
const initialState: UserState = storedState
  ? JSON.parse(storedState)
  : {
      email: "usuario@test.com",
      password: "Contraseña1!",
      isAuthenticated: false,
    };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ email: string; password: string }>
    ) => {
      if (
        action.payload.email === state.email &&
        action.payload.password === state.password
      ) {
        localStorage.setItem(
          "userState",
          JSON.stringify({
            email: "usuario@test.com",
            password: "Contraseña1!",
            isAuthenticated: true,
          })
        );
      } else {
        alert("Invalid email or password");
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      localStorage.removeItem("userState");
    },
    setUser: (
      state,
      action: PayloadAction<{ email: string; password: string }>
    ) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
      localStorage.setItem("userState", JSON.stringify(state));
    },
  },
});

export const { login, logout, setUser } = userSlice.actions;

export default userSlice.reducer;
