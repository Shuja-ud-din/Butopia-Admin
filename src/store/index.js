import { configureStore } from "@reduxjs/toolkit";
import { deleteUserSlice,editUserSlice,getAllBusinessOwnersSlice,getAllAccessoriesSlice } from "./slices";



export const store = configureStore({
  reducer: {
    deleteUser: deleteUserSlice.reducer,
    getBusinessOwners: getAllBusinessOwnersSlice.reducer,
    getVehicleAccessories: getAllAccessoriesSlice.reducer,
    editUser: editUserSlice.reducer,

  },
});
