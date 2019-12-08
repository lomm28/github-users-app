import { useReducer } from 'react';

const initialState = {
  users: [],
  nextPage: 1,
  error: {
    hasError: false,
    message: '',
  },
  hasMoreUsers: true,
  currentUser: {},
  repos: [],
  modalMode: 'list',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_USERS':
      return {
        ...state,
        users: [...state.users, ...action.users],
        nextPage: action.page,
      };
    case 'SWITCH_PAGE':
      return { ...state, page: action.page };
    case 'FINISH_LOAD':
      return { ...state, hasMoreUsers: false };
    case 'SET_CURRENT_USER':
      return { ...state, currentUser: action.currentUser, modalMode: 'list' };
    case 'SET_SELECTED_REPOS':
      return { ...state, repos: action.repos, modalMode: 'repos' };
    case 'ERROR':
      return {
        ...state,
        error: {
          hasError: true,
          message: action.message,
        },
      };
    default:
      return state;
  }
};

const useLoaderHook = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return { state, dispatch };
};

export default useLoaderHook;
