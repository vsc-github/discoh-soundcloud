import React, { Component, PropTypes } from 'react';
import { Motion, presets, spring } from 'react-motion';
import { GENRES } from '../constants/GenreNames';
import Link from '../components/Linker';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  navigator: PropTypes.object.isRequired,
};

class MobileNav extends Component {
  constructor() {
    super();
    this.toggleGenreMenuOpen = this.toggleGenreMenuOpen.bind(this);
    this.state = {
      isGenreMenuOpen: false
    };
  }

  toggleGenreMenuOpen(e) {
      e.preventDefault();
      this.setState({ isGenreMenuOpen: !this.state.isGenreMenuOpen });
  }

  renderGenreMenu(isGenreMenuOpen, playlist) {
    return (
      <Motion
        style={{ height: spring(isGenreMenuOpen ? (GENRES.length - 1) * 50 : 0, presets.stiff) }}
      >
        {({ height }) =>
          <div
            className="mobile-nav-menu"
            onClick={this.toggleGenreMenuOpen}
            style={{ height }}
          >
            {this.renderGenresTabs(playlist)}
          </div>
        }
      </Motion>
    );
  }

  renderGenresOptions(isGenreMenuOpen, playlist) {
    return (
      <div className="mobile-nav-items">
        <a
          className="mobile-nav-item"
          href="#"
          onClick={this.toggleGenreMenuOpen}
        >
          {playlist}
          <i className={isGenreMenuOpen ? 'ion-chevron-up' : 'ion-chevron-down'} />
        </a>
      </div>
    );
  }

  renderGenresTabs(playlist) {
    return GENRES
      .filter(genre => genre !== playlist)
      .map(genre =>
        <Link
          className="mobile-nav-tab"
          dispatch={this.props.dispatch}
          key={genre}
          route={{ path: ['songs'], query: { q: genre } }}
        >
          {genre}
        </Link>
      );
  }


  renderPlaylist() {
    const { navigator } = this.props;
    const { query } = navigator.route;
    const time = query && query.t ? query.t : null;
    let playlist = query && query.q ? query.q : 'house';
    if (time) {
      playlist = `${playlist} - ${time}`;
    }

    return playlist;
  }

  render() {
    const playlist = this.renderPlaylist();
    const { isGenreMenuOpen} = this.state;
    return (
      <div className="mobile-nav">
        {this.renderGenreMenu(isGenreMenuOpen, playlist)}
        {this.renderGenresOptions(isGenreMenuOpen, playlist)}
      </div>
    );
  }
}

MobileNav.propTypes = propTypes;
export default MobileNav;