import { useEffect, useReducer } from "react";
import axios from "axios";

const INITIAL_STATE = {
  loading: false,
  data: {},
};

const reducer = (state, action) => {
  if (action.type === "REQUEST") {
    return {
      ...state,
      loading: true,
    };
  }

  if (action.type === "SUCCESS") {
    return {
      data: action.data,
      loading: false,
    };
  }
  return state;
};

//injeção de dependência
const init = (baseURL) => {
  const useGet = (resource) => {
    const [data, dispatch] = useReducer(reducer, INITIAL_STATE);
    const load = async () => {
      dispatch({ type: "REQUEST" });
      const response = await axios.get(`${baseURL}${resource}.json`);
      dispatch({ type: "SUCCESS", data: response.data });
    };

    useEffect(() => {
      load();
    }, [resource]);

    return { ...data, refetch: load };
  };

  const usePost = (resource) => {
    const [data, dispatch] = useReducer(reducer, INITIAL_STATE);
    const post = async (data) => {
      dispatch({ type: "REQUEST" });
      const response = await axios.post(`${baseURL}${resource}.json`, data);
      dispatch({ type: "SUCCESS", data: response.data });
    };

    return [data, post];
  };

  const useDelete = () => {
    const [data, dispatch] = useReducer(reducer, INITIAL_STATE);

    const remove = async (resource) => {
      dispatch({ type: "REQUEST" });
      const response = await axios.delete(`${baseURL}${resource}.json`);
      dispatch({ type: "SUCCESS", data: response.data });
    };

    return [data, remove];
  };

  const usePatch = () => {
    const [data, dispatch] = useReducer(reducer, INITIAL_STATE);

    const patch = async (resource, data) => {
      dispatch({ type: "REQUEST" });
      const response = await axios.patch(`${baseURL}${resource}.json`, data);
      dispatch({ type: "SUCCESS", data: response.data });
    };

    return [data, patch];
  };

  return { useGet, usePost, useDelete, usePatch };
};

export default init;
