import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const tagTech = createAsyncThunk("tag", async (data) => {
  const response = await axios.post(
    "https://fir-646b6-default-rtdb.firebaseio.com/tag.json",
    data
  );
  return response.data;
});

export const getTagTech = createAsyncThunk("tag", async () => {
  const response = await axios.get(
    "https://fir-646b6-default-rtdb.firebaseio.com/tag.json"
  );
  return response.data;
});
