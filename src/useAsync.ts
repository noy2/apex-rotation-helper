import { useReducer, useEffect, ReactElement } from "react";

// interface Action<T> {
//   type: string;
//   data?: T;
//   error?: any;
// }

type Action<T> =
  | { type: "LOADING" }
  | { type: "SUCCESS"; data: T }
  | { type: "ERROR"; error: any };

interface StateInterface<T> {
  loading: boolean;
  data: T | null;
  error: any;
}

function reducer<T>(
  state: StateInterface<T>,
  action: Action<T>
): StateInterface<T> {
  switch (action.type) {
    case "LOADING":
      return {
        loading: true,
        data: null,
        error: null,
      };
    case "SUCCESS":
      return {
        loading: false,
        data: action.data,
        error: null,
      };
    case "ERROR":
      return {
        loading: false,
        data: null,
        error: action.error,
      };
    default:
      return state;
  }
}

function useAsync<T, R extends (...props: any[]) => Promise<T>>(
  callback: R,
  deps = []
) {
  const InitialState: StateInterface<T> = {
    loading: false,
    data: null,
    error: false,
  };

  const [state, dispatch] = useReducer(reducer, InitialState);

  const fetchData = async () => {
    dispatch({ type: "LOADING" });
    try {
      const data = await callback();
      dispatch({ type: "SUCCESS", data });
    } catch (e) {
      dispatch({ type: "ERROR", error: e });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const asd: [StateInterface<T>, () => Promise<void>] = [
    state as StateInterface<T>,
    fetchData,
  ];

  return asd;
}

export default useAsync;
