import {
  IS_FETCHING_USER,
  IS_FETCHING_REPOS,
  LAST_USER_FETCH,
  LAST_REPOS_FETCH,
  GET_USER,
  GET_REPOS,
  SET_ERROR,
  SELECT_REPO
} from '../actions/types';

export const githubReducer = (state = {}, action) => {
  switch (action.type) {
    case IS_FETCHING_USER:
      return Object.assign({}, state, { isFetchingUser: action.payload });
    case IS_FETCHING_REPOS:
      return Object.assign({}, state, { isFetchingRepos: action.payload });
    case LAST_USER_FETCH:
      return Object.assign({}, state, { lastSuccessfulUserFetch: action.payload });
    case GET_USER:
      return Object.assign({}, state, { user: action.payload });
    case GET_REPOS:
      return Object.assign({}, state, { repos: action.payload });
    case SET_ERROR:
      return Object.assign({}, state, { errorMsg: action.payload });
    case LAST_REPOS_FETCH:
      return Object.assign({}, state, { lastSuccessfulReposFetch: action.payload });
    case SELECT_REPO:
      return Object.assign({}, state, { selectedRepo: action.payload });
    default:
      return state;
  }
};
