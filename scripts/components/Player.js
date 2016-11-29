import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { changeSong, toggleIsPlaying } from '../actions/PlayerActions';
import SongDetails from '../components/SongDetails';
import { CHANGE_TYPES } from '../constants/SongConstants';
import { formatStreamUrl } from '../utils/FormatUtils';
import { getImageUrl } from '../utils/SongUtils';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  player: PropTypes.object.isRequired,
  playingSongId: PropTypes.number,
  playlists: PropTypes.object.isRequired,
  song: PropTypes.object,
  songs: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
};

class Player extends Component {
  constructor(props) {
    super(props);
    this.changeSong = this.changeSong.bind(this);
    this.handleEnded = this.handleEnded.bind(this);
    this.handleLoadedMetadata = this.handleLoadedMetadata.bind(this);
    this.handleLoadStart = this.handleLoadStart.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handlePause = this.handlePause.bind(this);

    this.togglePlay = this.togglePlay.bind(this);

    this.state = {
      activePlaylistIndex: null
    };
  }

  componentDidMount() {

    const audioElement = ReactDOM.findDOMNode(this.refs.audio);
    audioElement.addEventListener('ended', this.handleEnded, false);
    audioElement.addEventListener('loadedmetadata', this.handleLoadedMetadata, false);
    audioElement.addEventListener('loadstart', this.handleLoadStart, false);
    audioElement.addEventListener('pause', this.handlePause, false);
    audioElement.addEventListener('play', this.handlePlay, false);
    audioElement.play();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.playingSongId && prevProps.playingSongId === this.props.playingSongId) {
      return;
    }

    ReactDOM.findDOMNode(this.refs.audio).play();
  }

  componentWillUnmount() {

    const audioElement = ReactDOM.findDOMNode(this.refs.audio);
    audioElement.removeEventListener('ended', this.handleEnded, false);
    audioElement.removeEventListener('loadedmetadata', this.handleLoadedMetadata, false);
    audioElement.removeEventListener('loadstart', this.handleLoadStart, false);
    audioElement.removeEventListener('pause', this.handlePause, false);
    audioElement.removeEventListener('play', this.handlePlay, false);
  }

  changeSong(changeType) {
    const { dispatch } = this.props;
    dispatch(changeSong(changeType));
  }

  handleEnded() {
      this.changeSong(CHANGE_TYPES.NEXT);
  }

  handleLoadedMetadata() {
    const audioElement = ReactDOM.findDOMNode(this.refs.audio);
    this.setState({
      duration: Math.floor(audioElement.duration),
    });
  }

  handleLoadStart() {
    const { dispatch } = this.props;
    this.setState({
      duration: 0,
    });
  }

  handlePause() {
    const { dispatch } = this.props;
    dispatch(toggleIsPlaying(false));
  }

  handlePlay() {
    const { dispatch } = this.props;
    dispatch(toggleIsPlaying(true));
  }

  togglePlay() {
    const { isPlaying } = this.props.player;
    const audioElement = ReactDOM.findDOMNode(this.refs.audio);
    if (isPlaying) {
      audioElement.pause();
    } else {
      audioElement.play();
    }
  }

  render() {
    const { dispatch, isMobile,  player, playingSongId, songs, users } = this.props;
    const { isPlaying } = player;
    const song = songs[playingSongId];
    const user = users[song.user_id];
    const prevFunc = this.changeSong.bind(this, CHANGE_TYPES.PREV);
    const nextFunc = this.changeSong.bind(this, CHANGE_TYPES.NEXT
    );

    return (
      <div className="player">
        <audio id="audio" ref="audio" src={formatStreamUrl(song.stream_url)} />
        <div className={`container-slim ${(isMobile ? 'fullWidth' : '')}`} >
          <div className="player-main">
            <div className="player-section player-info">
              <img
                alt="song artwork"
                className="player-image"
                src={getImageUrl(song.artwork_url)}
              />
              <SongDetails
                dispatch={dispatch}
                songId={song.id}
                title={song.title}
                userId={user.id}
                username={user.username}
              />
            </div>
            <div className="player-section">
              <div
                className="player-button"
                onClick={prevFunc}
              >
                <i className="icon ion-ios-rewind" />
              </div>
              <div
                className="player-button"
                onClick={this.togglePlay}
              >
                <i className={`icon ${(isPlaying ? 'ion-ios-pause' : 'ion-ios-play')}`} />
              </div>
              <div
                className="player-button"
                onClick={nextFunc}
              >
                <i className="icon ion-ios-fastforward" />
              </div>
            </div>
            <div className="player-section">

            </div>
          </div>
        </div>
      </div>
    );
  }
}

Player.propTypes = propTypes;

export default Player;
