import {isEmpty} from "@/utils";
import {useEffect, useReducer} from "react";

function reducer(state, action) {
  switch (action.type) {
    case "pending":
      return {
        ...state,
        loading: true,
      };
      break;
    case "resolved":
      return {
        ...state,
        data: action.data,
        cache: {
          ...state.cache,
          [state.query]: action.data,
        },
        loading: false,
      };
    case "reject":
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case "cache":
      return {
        ...state,
        data: action.data,
      };
    default:
      return {
        ...state,
        query: action,
      };
  }
}

const initialState = {
  loading: false,
  data: null,
  error: null,
  query: "",
  cache: {},
};

export function useSearch(placeholderHolderOfData) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const query = state.query.trim();

  function queryHandler() {
    dispatch({type: "pending"});

    fetch(
      `https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${query}`
    )
      .then(response => response.json())
      .then(
        ([_, data]) => {
          dispatch({type: "resolved", data});
        },
        error => {
          dispatch({type: "reject", error});
        }
      );
  }

  useEffect(() => {
    const cache = Object.entries(state.cache).find(queries =>
      queries[0].includes(isEmpty(query))
    );

    if (cache) {
      dispatch({type: "cache", data: cache[1]});
    } else if (query) {
      return clearTimeout.bind(this, setTimeout(queryHandler, 300));
    } else {
      dispatch({type: "cache", data: placeholderHolderOfData});
    }
  }, [query]);

  return {...state, dispatch};
}

export default useSearch;
