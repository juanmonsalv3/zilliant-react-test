import React, { Component} from 'react'
import PropTypes from 'prop-types';

class GitHubStore extends Component {
  static get propTypes() {
    return {
      children: PropTypes.element,
    };
  }

  render() {
    return (
      <React.Fragment>
        {this.props.children}
      </React.Fragment>
    )
  }
}


export default GitHubStore