import React, { Component, PropTypes } from 'react';
import { playSong } from '../actions/PlayerActions';
import { getImageUrl } from '../utils/SongUtils';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  player: PropTypes.object.isRequired,
  playlists: PropTypes.object.isRequired,
  songs: PropTypes.object.isRequired,
};

class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state = { shownPlaylistIndex: null };
  }

  componentWillUnmount() {
    this.setState({ shownPlaylistIndex: null });
  }

  getShownPlaylistIndex() {
    const { selectedPlaylists } = this.props.player;
    const { shownPlaylistIndex } = this.state;
    const lastPlaylistIndex = selectedPlaylists.length - 1;
    if (shownPlaylistIndex === null) {
      return lastPlaylistIndex;
    }

    return shownPlaylistIndex;
  }

  getShownPlaylist(shownPlaylistIndex) {
    const { selectedPlaylists } = this.props.player;
    return selectedPlaylists[shownPlaylistIndex];
  }

  isActiveSong(currentPlaylist, currentSongIndex, i, shownPlaylist) {
    return currentPlaylist === shownPlaylist && i === currentSongIndex;
  }

  playSong(shownPlaylist, i) {
    const { dispatch } = this.props;
    dispatch(playSong(shownPlaylist, i));
    this.setState({ shownPlaylistIndex: null });
  }

  removeSongFromPlaylist(shownPlaylist, i){
    const { playlists } = this.props;

    let newArr = playlists[shownPlaylist].items.filter(function (item,j) {
          return j !== i;
    })

    playlists[shownPlaylist].items = newArr;

  }

  moveSongUpwards(shownPlaylist, i){

    const { playlists } = this.props;

    if(i!=0){
      let temp = playlists[shownPlaylist].items[i];
      playlists[shownPlaylist].items[i] =  playlists[shownPlaylist].items[i-1];
      playlists[shownPlaylist].items[i-1] = temp;
    }
  }

  moveSongDownwards(shownPlaylist, i){

    const { playlists } = this.props;

    if(i < playlists[shownPlaylist].items.length-1){
      let temp = playlists[shownPlaylist].items[i];
      playlists[shownPlaylist].items[i] =  playlists[shownPlaylist].items[i+1];
      playlists[shownPlaylist].items[i+1] = temp;
    }
  }

  render() {
    const { playlists, player, songs } = this.props;
    const { currentSongIndex, selectedPlaylists } = player;
    const currentPlaylist = selectedPlaylists[selectedPlaylists.length - 1];
    const shownPlaylistIndex = this.getShownPlaylistIndex();
    const shownPlaylist = this.getShownPlaylist(shownPlaylistIndex);
    const stopPropagationFunc = e => { e.stopPropagation(); };
    //console.log("playlists,shownPlaylist,playlists[shownPlaylist]",playlists,shownPlaylist,playlists[shownPlaylist]);

    const items = playlists[shownPlaylist].items.map((songId, i) => {
      const song = songs[songId];
      const isActiveSong = this.isActiveSong(currentPlaylist, currentSongIndex, i, shownPlaylist);
      const playSongFunc = this.playSong.bind(this, shownPlaylist, i);
      const removeSongFunc = this.removeSongFromPlaylist.bind(this,shownPlaylist,i);
      const takeEmUp = this.moveSongUpwards.bind(this,shownPlaylist,i);
      const takeEmDown = this.moveSongDownwards.bind(this,shownPlaylist,i);
      return (
        <li
          className={`playlist-song ${(isActiveSong ? ' active' : '')}`}
          key={`${song.id}-${i}`}
        >
          <img
            alt="song artwork"
            className="playlist-song-image"
            src={getImageUrl(song.artwork_url)}
            onClick={playSongFunc}
          />
          <div className="playlist-song-title" onClick={playSongFunc}>{song.title}</div>
          <div onClick={removeSongFunc}>X</div>
          <div onClick={takeEmUp}>^</div>
          <div onClick={takeEmDown}>V</div>
        </li>
      );
    });

    return (
      <div
        className="popover-content playlist"
        onClick={stopPropagationFunc}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div className="playlist-header">

          <div className="playlist-header-title">
            {shownPlaylist.split('|')[0]}
          </div>

        </div>
        <div className="playlist-body">
          <ul className="playlist-songs">
            {items}
          </ul>
        </div>
        <div className="playlist-footer">
          {items.length + (items.length === 1 ? ' Song' : ' Songs')}
        </div>
      </div>
    );
  }
}

Playlist.propTypes = propTypes;

export default Playlist;
