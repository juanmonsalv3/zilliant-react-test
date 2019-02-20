import React, { Component } from "react";
import { CircularProgress } from "react-md";
import PropTypes from "prop-types";

import RepoList from "./RepoList";
import RepoDetail from "./RepoDetail";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { updateRepos, selectRepo, unselectRepo } from "../../actions/index";

class Repos extends Component {
  static get propTypes() {
    return {
      lastSuccessfulReposFetch: PropTypes.object,
      isFetchingRepos: PropTypes.bool.isRequired,
      repos: PropTypes.array,
      selectedRepo: PropTypes.object,
      updateRepos: PropTypes.func,
      selectRepo: PropTypes.func,
      unselectRepo: PropTypes.func
    };
  }

  static get defaultProps() {
    return {
      isFetchingRepos: true
    };
  }

  componentDidMount() {
    const { updateRepos, lastSuccessfulReposFetch } = this.props;

    const now = new Date();
    if (!lastSuccessfulReposFetch) {
      updateRepos();
    } else if ((now - lastSuccessfulReposFetch) / 1000 > 300) {
      updateRepos();
    }
  }

  render() {
    const {
      isFetchingRepos,
      repos,
      selectedRepo,
      selectRepo,
      unselectRepo
    } = this.props;

    return isFetchingRepos
      ? (<CircularProgress id="repos-progress" />)
      : selectedRepo
        ? (<RepoDetail repo={selectedRepo} unselectRepo={unselectRepo} />)
        : (<RepoList repos={repos} selectRepo={selectRepo} />);
  }
}

function mapStateToProps(state) {
  return {
    isFetchingRepos: state.isFetchingRepos,
    repos: state.repos,
    lastSuccessfulReposFetch: state.lastSuccessfulReposFetch,
    selectedRepo: state.selectedRepo
  };
}

const mapActionsToProps = dispatch =>
  bindActionCreators(
    {
      updateRepos,
      selectRepo,
      unselectRepo
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Repos);
