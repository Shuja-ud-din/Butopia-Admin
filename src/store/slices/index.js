import { createSlice } from '@reduxjs/toolkit'
import { deleteUser,getAlllBusinessOwners,editUserThunk,getAccessories} from '../thunks';


const deleteUserSlice = createSlice({
    name: "deleteUser",
    initialState: {
        loading: false,
        dataUserDelete:'',
        error: '',
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                state.dataUserDelete = action.payload;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.error
            })
    }
})



const editUserSlice = createSlice({
    name: "editUser",
    initialState: {
        loading: false,
        dataUserEdit:'',
        error: '',
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(editUserThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(editUserThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.dataUserEdit = action.payload;
            })
            .addCase(editUserThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.error
            })
    }
})


const getAllBusinessOwnersSlice = createSlice({
    name: "land",
    initialState: {
        loading: false,
        businessOwners:'',
        error: '',
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAlllBusinessOwners.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAlllBusinessOwners.fulfilled, (state, action) => {
                state.loading = false;
                state.businessOwners = action.payload;
            })
            .addCase(getAlllBusinessOwners.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.error
            })
    }
})






const getAllAccessoriesSlice = createSlice({
    name: "accessories",
    initialState: {
        loading: false,
        vehicleAccessories:'',
        error: '',
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAccessories.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAccessories.fulfilled, (state, action) => {
                state.loading = false;
                state.vehicleAccessories = action.payload;
            })
            .addCase(getAccessories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.error
            })
    }
})


// export const { logout, removeError, hostLoginReset } = deleteUserSlice.actions;

export { deleteUserSlice,getAllBusinessOwnersSlice, editUserSlice, getAllAccessoriesSlice }
