import {
  IS_FETCHING_USER,
  IS_FETCHING_REPOS,
  LAST_USER_FETCH,
  LAST_REPOS_FETCH,
  GET_USER,
  GET_REPOS,
  SET_ERROR,
  SELECT_REPO
} from './types';

import {
  getUser,
  getRepos
} from '../github/requests'

export const setIsFetchingUser = isFetching => dispatch => {
  dispatch({
    type: IS_FETCHING_USER,
    payload: isFetching
  });
};

export const setIsFetchingRepos = isFetching => dispatch => {
  dispatch({
    type: IS_FETCHING_REPOS,
    payload: isFetching
  });
};

export const setLastSuccessfulUserFetch = date => dispatch => {
  dispatch({
    type: LAST_USER_FETCH,
    payload: date
  });
}

export const setLastSuccessfulReposFetch = date => dispatch => {
  dispatch({
    type: LAST_REPOS_FETCH,
    payload: date
  });
}

export const setErrorMsg = errorMsg => dispatch => {
  dispatch({
    type: SET_ERROR,
    payload: errorMsg
  });
}

export const updateUser = () => dispatch => {
  setIsFetchingUser(true)(dispatch);

  getUser
    .then(res => {
      dispatch({
        type: GET_USER,
        payload: res.data
      });
      setLastSuccessfulUserFetch(new Date())(dispatch);
      setIsFetchingUser(false)(dispatch);
    })
    .catch(err => {
      setErrorMsg('Could not fetch User :(')(dispatch);
      setIsFetchingUser(false)(dispatch);
    });
};

export const updateRepos = () => dispatch => {
  setIsFetchingRepos(true)(dispatch);

  getRepos
    .then(res => {
      dispatch({
        type: GET_REPOS,
        payload: res.data
      });
      setLastSuccessfulReposFetch(new Date())(dispatch);
      setIsFetchingRepos(false)(dispatch);
    })
    .catch(err => {
      console.log(err)
      setErrorMsg('Could not fetch Repos :(')(dispatch);
      setIsFetchingRepos(false)(dispatch);
    })
}

export const selectRepo = id => (dispatch, getState) => {
  return () => {
    const {
      repos
    } = getState();

    const selectedRepo = repos.find(repo => {
      return repo.id === id
    })
    if (selectedRepo) {
      dispatch({
        type: SELECT_REPO,
        payload: selectedRepo
      });
    }
  }
}

export const unselectRepo = () => dispatch => {
  dispatch({
    type: SELECT_REPO,
    payload: null
  });
}