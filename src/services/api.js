import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const GET = (reducer, endpoint) =>
  createAsyncThunk(reducer, async () => {
    const response = await axios
      .get(process.env.REACT_APP_BASE_URL + endpoint)
      .then((res) => res.data);

    return response;
  });

const POST = (reducer, endpoint, body = {}) =>
  createAsyncThunk(reducer, async () => {
    const response = await axios
      .post(process.env.REACT_APP_BASE_URL + endpoint, body)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        return error;
      });
    return response;
  });

const PUT = (reducer, endpoint, body = {}) =>
  createAsyncThunk(reducer, async () => {
    const response = await axios
      .put(process.env.REACT_APP_BASE_URL + endpoint, body)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        return error;
      });
    return response;
  });
const DELETE = (reducer, endpoint) =>
  createAsyncThunk(reducer, async () => {
    const response = await axios
      .delete(process.env.REACT_APP_BASE_URL + endpoint)
      .then((res) => res.data);

    return response;
  });

export { GET, POST, PUT, DELETE };
