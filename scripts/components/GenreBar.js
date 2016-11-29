import React, { Component, PropTypes } from 'react';
import Link from '../components/Linker';
import { GENRES } from '../constants/GenreNames';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  playlist: PropTypes.string.isRequired,
  time: PropTypes.number,
  path: PropTypes.array
};

class Toolbar extends Component {
  renderGenres() {
    const { dispatch, playlist , path} = this.props;
    console.log("Path",path);
    const genre = playlist.split(' - ')[0];

    return GENRES.map(g => {
      const route = {
        path: ['songs'],
        query: {
          q: g
        },
      };

      return (
        <Link
          className={`toolbar-item toolbar-genre ${(g === genre && path!== undefined && path[0] !== 'playlist' ? 'active' : '')}`}
          dispatch={dispatch}
          key={g}
          route={route}
        >
          {g}
        </Link>
      );
    });
  }

  render() {
    return (
      <div className="toolbar">
        <div className="container">
          <div className="select">Select Genre</div>
          <div className="toolbar-items">
            {this.renderGenres()}
          </div>
        </div>
      </div>
    );
  }
}

Toolbar.propTypes = propTypes;

export default Toolbar;
