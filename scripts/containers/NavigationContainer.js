import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import MobileNav from '../components/MobiNavigationBar';
import Nav from '../components/NavigationBar';

const propTypes = {
  isMobile: PropTypes.bool,
};

class NavContainer extends Component {
  render() {
    const { isMobile } = this.props;
    if (isMobile) {
      return <MobileNav {...this.props} />;
    }

    return <Nav {...this.props} />;
  }
}

function mapStateToProps(state) {
  const { environment, navigator } = state;
  const { isMobile } = environment;

  return {
    isMobile,
    navigator,
  };
}

NavContainer.propTypes = propTypes;

export default connect(mapStateToProps)(NavContainer);
