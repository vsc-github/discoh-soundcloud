import React, { Component, PropTypes } from 'react';

import { fetchSongsIfNeeded } from '../actions/PlaylistsActions';

import SongCards from '../components/SongCards';
import stickify from '../components/Stickify';
import Toolbar from '../components/GenreBar';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  height: PropTypes.number,
  path: PropTypes.array,
  playingSongId: PropTypes.number,
  playlist: PropTypes.string,
  playlists: PropTypes.object.isRequired,
  sticky: PropTypes.bool,
  songs: PropTypes.object.isRequired,
  time: PropTypes.number,
  users: PropTypes.object.isRequired,
};

class Songs extends Component {
  componentWillMount() {
    const { dispatch, playlist, playlists } = this.props;
    if (!(playlist in playlists) || playlists[playlist].items.length === 0) {
      dispatch(fetchSongsIfNeeded(playlist));
    }
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, playlist, playlists } = this.props;
    if (playlist !== nextProps.playlist) {
      if (!(nextProps.playlist in playlists) || playlists[nextProps.playlist].items.length === 0) {
        dispatch(fetchSongsIfNeeded(nextProps.playlist));
      }
    }
  }

  render() {
    const {
      dispatch,
      height,
      path,
      playingSongId,
      playlist,
      playlists,
      sticky,
      songs,
      time,
      users,
    } = this.props;

    return (
      <div className={`songs ${(sticky ? 'sticky' : '')}`}>
        <Toolbar dispatch={dispatch} playlist={playlist} sticky={sticky} time={time} path={path}/>
        <div className="songs-container">
          <SongCards
            dispatch={dispatch}
            height={height}
            playingSongId={playingSongId}
            playlist={playlist}
            playlists={playlists}
            scrollFunc={fetchSongsIfNeeded.bind(null, playlist)}
            songs={songs}
            users={users}
          />
        </div>
      </div>
    );
  }
}

Songs.propTypes = propTypes;

export default stickify(Songs, 50);
