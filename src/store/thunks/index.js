import axios from "axios";
import request from "../../utils/request";
import { createAsyncThunk } from "@reduxjs/toolkit";

const token = localStorage.getItem("token");

const deleteUser = createAsyncThunk(
  "deleteUser/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
 
      const { data } = await request.delete(`admin/deleteUser/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);


const editUserThunk = createAsyncThunk(
  "edituser/edituser",
  async (cred, { rejectWithValue }) => {
    try {

      console.log("cred inside" , cred )

 
      const { data } = await request.patch(`admin/updateUser/${cred.id}`, cred, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("edited datea", data)

      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const getAlllBusinessOwners = createAsyncThunk(
  "businsessOwner/businsessOwner",
  async (loginCredentials, { rejectWithValue }) => {
    try {
      const { data } = await request.get(`admin/getAllBusinessOwners`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("data",data)
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);



const getAccessories = createAsyncThunk(
  "accessories/getAccessories",
  async ({ rejectWithValue }) => {
    console.log('enter')
    try {
      const { data } = await axios.get(`https://api.agerlink.it/api/v1/vehicleAccessories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("data",data)
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);




export { deleteUser,getAlllBusinessOwners,editUserThunk,getAccessories };



