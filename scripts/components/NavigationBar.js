import React, { Component, PropTypes } from 'react';
import Link from '../components/Linker';

const propTypes = {
    dispatch: PropTypes.func.isRequired,
    navigator: PropTypes.object.isRequired,
};

class Nav extends Component {
    constructor(props) {
        super(props);
    }


    renderGithubFork() {
        return (
            <a href="https://github.com/vsc-github/discoh-soundcloud" target="_blank" className="github">
                 <span>Fork on github </span><img src="https://i.imgsafe.org/afd4663170.png" alt=""/>
           </a>
        );
    }

    renderCurrentPlaylistLink() {
        const { dispatch, navigator } = this.props;
        const { route } = navigator;

        return (
            <div className="nav-nav-item">
                <Link
                    className={`nav-nav-user-link ${(route.path[0] === 'playlist' ? 'active' : '')}`}
                    dispatch={dispatch}
                    route={{ path: ['playlist', 'current'] }}
                >
                    <span className="nav-nav-user-link-text">Current Playlist</span>
                </Link>
            </div>
        );
    }

    render() {
        const { dispatch } = this.props;

        return (
            <div className="nav">
                <div className="fullWidth fullHeight clearfix">
                    <div className="nav-logo">
                        <img src="https://i.imgsafe.org/9ed54208c7.png"/>
                    </div>
                    <div className="nav-nav float-left">
                        <div className="nav-nav-item">
                            <Link
                                className="nav-nav-item-link active"
                                dispatch={dispatch}
                                route={{ path: ['songs'] }}
                            >
                                Disc-oh!
                            </Link>
                        </div>
                        {this.renderCurrentPlaylistLink()}
                    </div>
                    <div className="nav-nav float-right">

                        <div className="nav-nav-item">
                            {this.renderGithubFork()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Nav.propTypes = propTypes;

export default Nav;
