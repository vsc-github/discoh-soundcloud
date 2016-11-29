import React, { Component, PropTypes } from 'react';
import { IMAGE_SIZES } from '../constants/SongConstants';
import { formatSongTitle } from '../utils/FormatUtils';
import { getImageUrl } from '../utils/SongUtils';
import Play from 'react-icons/lib/fa/play';
import Playing from 'react-icons/lib/fa/volume-up';
import Heart from 'react-icons/lib/fa/heart';

class SongCard extends Component {
    constructor() {
        super();
        this.togglePlay = this.togglePlay.bind(this);
    }
    togglePlay() {
        const { isPlaying } = this.props;
        const audioElement = document.getElementById('audio');
        if (!audioElement) {
            return;
        }
        if (isPlaying) {
            audioElement.pause();
        } else {
            audioElement.play();
        }
    }
    renderTogglePlayButton() {
        const { isActive, playSong,isPlaying } = this.props;

        if (isActive) {
            return <div className={`toggle-play-button active ${(isPlaying ? 'is-playing' : '')}`}
                onClick={this.togglePlay}>
                <Playing size={30} color="#ccc"/>
            </div>
        }

        return (
            <div className="toggle-play-button" onClick={playSong}>
                <Play className="toggle-play-button-icon" color="white" size={20} />
            </div>
        );
    }

    render() {
        const { dispatch, isActive, song, user } = this.props;
        const image = getImageUrl(song.artwork_url, IMAGE_SIZES.LARGE);

        return (
            <div className={`card song-card ${(isActive ? ' active' : '')}`}>
                <div className="song-card-image" style={{ backgroundImage: `url(${image})` }}>
                    {this.renderTogglePlayButton()}
                </div>
                <div className="song-card-user clearfix">
                    <img
                        alt="user avatar"
                        className="song-card-user-image"
                        src={getImageUrl(user.avatar_url)}
                    />
                    <div className="song-card-details">

                        <div className="song-card-title">{formatSongTitle(song.title)}</div>
                        <div className="song-card-user-username">{user.username} </div>

                        <div className="song-card-hearts">
                            <Heart size={10} color="#949494" style={{"marginRight":"2px"}}/>
                            {song.likes_count}
                        </div>
                        <div className="song-card-plays">
                            <Play size={10} color="#949494"/>
                            {song.playback_count}
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

SongCard.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isActive: PropTypes.bool.isRequired,
    playSong: PropTypes.func.isRequired,
    song: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
};

export default SongCard;
