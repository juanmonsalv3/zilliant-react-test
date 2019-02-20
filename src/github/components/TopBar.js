import React from "react";
import PropTypes from "prop-types";
import { Toolbar, Avatar, Button } from "react-md";

const TopBar = ({ user, updateUser, updateRepos }) => {
  const updateAll = () => {
    updateUser();
    updateRepos();
  };

  const avatar = user
    ? (<Avatar key="avt" src={user.avatar_url} />)
    : (<Avatar key="avt" />);

  const name = user ? user.login : "";
  const button = (
    <Button onClick={updateAll} icon>
      replay
    </Button>
  );

  return <Toolbar fixed colored nav={avatar} title={name} actions={button} />;
};

TopBar.propTypes = {
  user: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired,
  updateRepos: PropTypes.func.isRequired
}

export default TopBar;
