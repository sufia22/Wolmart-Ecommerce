import { createSlice } from "@reduxjs/toolkit";
import {
  createPermission,
  createRole,
  deletePermission,
  deleteRole,
  deleteUser,
  getAllPermission,
  getAllRoles,
  getAllUsers,
  updatePermission,
  updatePermissionStatusData,
  updateRole,
  updateRoleStatusData,
  updateUser,
  userCreate,
} from "./userApiSlice";

// create user slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    permission: null,
    role: null,
    user: null,
    message: null,
    error: null,
  },
  reducers: {
    setMessageEmpty: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPermission.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getAllPermission.fulfilled, (state, action) => {
        state.permission = action.payload;
      })
      .addCase(createPermission.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(createPermission.fulfilled, (state, action) => {
        state.permission = state.permission ?? [];
        state.permission.push(action.payload.permission);
        state.message = action.payload.message;
      })
      .addCase(deletePermission.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deletePermission.fulfilled, (state, action) => {
        state.permission = state.permission.filter(
          (data) => data._id != action.payload.permission._id
        );
        state.message = action.payload.message;
      })
      .addCase(updatePermission.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updatePermission.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.permission[
          state.permission.findIndex(
            (data) => data._id == action.payload.permission._id
          )
        ] = action.payload.permission;
      })
      .addCase(updatePermissionStatusData.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updatePermissionStatusData.fulfilled, (state, action) => {
        state.permission[
          state.permission.findIndex(
            (data) => data._id == action.payload.permission._id
          )
        ] = action.payload.permission;
        state.message = action.payload.message;
      })
      .addCase(getAllRoles.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getAllRoles.fulfilled, (state, action) => {
        state.role = action.payload;
      })
      .addCase(createRole.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(createRole.fulfilled, (state, action) => {
        state.role = state.role ?? [];
        state.message = action.payload.message;
        state.role.push(action.payload.role);
      })
      .addCase(updateRole.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.role[
          state.role.findIndex((data) => data._id == action.payload.role._id)
        ] = action.payload.role;
      })
      .addCase(deleteRole.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteRole.fulfilled, (state, action) => {
        state.role = state.role.filter(
          (data) => data._id != action.payload.role._id
        );
        state.message = action.payload.message;
      })
      .addCase(updateRoleStatusData.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateRoleStatusData.fulfilled, (state, action) => {
        state.role[
          state.role.findIndex((data) => data._id == action.payload.role._id)
        ] = action.payload.role;
        state.message = action.payload.message;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(userCreate.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(userCreate.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.user = state.user ?? [];
        state.user.push(action.payload.user);
      })
      .addCase(updateUser.pending, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.user[
          state.user.findIndex((data) => data._id == action.payload.user._id)
        ] = action.payload.user;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.user = state.user.filter(
          (data) => data._id != action.payload.user._id
        );
      });
  },
});

// export selector
export const getAllPermissionData = (state) => state.user;

// export actions
export const { setMessageEmpty } = userSlice.actions;

// export reducer
export default userSlice.reducer;
