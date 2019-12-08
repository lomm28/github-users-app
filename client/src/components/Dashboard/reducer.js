import React, { useReducer } from 'react';

const initialState = {
  users: [],
  nextPage: 1,
  error: '',
  hasMoreUsers: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_USERS': 
      return { ...state, users: [...state.users, ...action.users], nextPage: action.page };
    case 'SWITCH_PAGE': 
      return { ...state, page: action.page };
    case 'FINISH_LOAD':
      return { ...state, hasMoreUsers: false, };
    case 'ERROR': 
      return { ...state, error: action.message };
  };
};

const useLoaderHook = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return { state, dispatch };
}

export default useLoaderHook;