import React, { Component } from "react";
import PropTypes from "prop-types";
import { CircularProgress, Snackbar } from "react-md";

import TopBar from "./TopBar";
import Sidebar from "./Sidebar";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  updateUser,
  updateRepos,
  setErrorMsg
} from "../../actions/index";

class Layout extends Component {
  static get propTypes() {
    return {
      user: PropTypes.object,
      children: PropTypes.object,
      lastSuccessfulUserFetch: PropTypes.object,
      isFetchingUser: PropTypes.bool.isRequired,
      errorMsg: PropTypes.string,
      updateUser: PropTypes.func,
      updateRepos: PropTypes.func,
      setErrorMsg: PropTypes.func
    };
  }

  static get defaultProps() {
    return {
      isFetchingUser: true,
      errorMsg: null
    };
  }

  componentDidMount() {
    const now = new Date();
    const { updateUser, lastSuccessfulUserFetch } = this.props;

    if (!lastSuccessfulUserFetch) {
      updateUser();
    } else if ((now - lastSuccessfulUserFetch) / 1000 > 300) {
      updateUser();
    }
  }

  render() {
    const {
      user,
      updateUser,
      updateRepos,
      isFetchingUser,
      children,
      errorMsg
    } = this.props;
    const toasts = errorMsg ? [{ text: errorMsg }] : [];

    return (
      <div>
        {
          isFetchingUser
          ? (<CircularProgress id="main-progress" />)
          : (
            <div>
              <TopBar
                user={user}
                updateUser={updateUser}
                updateRepos={updateRepos}
              />
              <div className="main-container">
                <Sidebar user={this.props.user} />
                {children}
              </div>
            </div>
          )
        }
        <Snackbar
          id="error-snackbar"
          toasts={toasts}
          onDismiss={() => {setErrorMsg(null)}}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    errorMsg: state.errorMsg,
    isFetchingUser: state.isFetchingUser,
    lastSuccessfulUserFetch: state.lastSuccessfulUserFetch
  };
}

const mapActionsToProps = dispatch =>
  bindActionCreators(
    {
      updateUser,
      updateRepos,
      setErrorMsg
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Layout);
