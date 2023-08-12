import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/user/userSlice";

// create store
const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
  middleware: (getDefeultMiddlewares) => getDefeultMiddlewares(),
  devTools: true,
});

// export
export default store;
