import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { initEnvironment } from '../actions/EnvironmentActions';
import { initNavigator } from '../actions/NavigatorActions';

import NavContainer from '../containers/NavigationContainer';
import PlayerContainer from '../containers/PlayerContainer';
import SongsContainer from '../containers/SongsContainer';
import PlaylistContainer from '../containers/PlaylistContainer'

const propTypes = {
    dispatch: PropTypes.func.isRequired,
    height: PropTypes.number,
    isMobile: PropTypes.bool,
    path: PropTypes.array.isRequired,
    width: PropTypes.number,
};

class App extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(initEnvironment());
        dispatch(initNavigator());
    }

    renderContent() {
        const { path } = this.props;
        switch (path[0]) {
            case 'songs':
                return <SongsContainer />;
            case 'playlist':
                return <PlaylistContainer {...this.props}/>;
            default:
                return null;
        }
    }

    render() {
        const { height, isMobile, width } = this.props;
        if (isMobile) {
            return (
                <div className="mobile" style={{ height: `${height}px`, width: `${width}px` }}>
                    <NavContainer />
                    {this.renderContent()}
                    <PlayerContainer />
                </div>
            );
        }

        return (
            <div>
                <NavContainer />
                {this.renderContent()}
                <PlayerContainer />
            </div>
        );
    }
}

App.propTypes = propTypes;

function mapStateToProps(state) {
    const { environment, navigator } = state;
    const { height, isMobile, width } = environment;
    const { path } = navigator.route;

    return {
        height,
        isMobile,
        path,
        width,
    };
}


export default connect(mapStateToProps)(App);
