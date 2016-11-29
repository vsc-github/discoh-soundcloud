import React, { Component, PropTypes } from 'react';
import Link from '../components/Linker';
import { formatSongTitle } from '../utils/FormatUtils';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  songId: PropTypes.number,
  title: PropTypes.string.isRequired,
  userId: PropTypes.number,
  username: PropTypes.string.isRequired,
};

class SongDetails extends Component {
  render() {
    const { dispatch, songId, title, userId, username } = this.props;
    return (
      <div className="song-card-details">
        <div className="song-card-title">
          {formatSongTitle(title)}
        </div>
        <div className="song-card-user-username" >
          {username}
        </div>
      </div>
    );
  }
}

SongDetails.propTypes = propTypes;

export default SongDetails;
