/**
 * Created by batty on 11/27/2016.
 */

import React, { Component, PropTypes } from 'react';
import { playSong } from '../actions/PlayerActions';
import { getImageUrl } from '../utils/SongUtils';
import stickify from '../components/Stickify';
import Toolbar from '../components/GenreBar';
import Remove from 'react-icons/lib/ti/times';
import SortUp from 'react-icons/lib/ti/arrow-sorted-up';
import SortDown from 'react-icons/lib/ti/arrow-sorted-down';

const propTypes = {
    dispatch: PropTypes.func.isRequired,
    player: PropTypes.object.isRequired,
    playlists: PropTypes.object.isRequired,
    songs: PropTypes.object.isRequired,
};

class CurrentPlaylist extends Component {
    constructor(props) {
        super(props);
        this.state = {shownPlaylistIndex: null};
    }

    componentWillUnmount() {
        this.setState({shownPlaylistIndex: null});
    }

    getShownPlaylistIndex() {
        const { selectedPlaylists } = this.props.player;
        const { shownPlaylistIndex } = this.state;

        console.log("getShownPlaylistIndex", selectedPlaylists, shownPlaylistIndex);
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
        this.setState({shownPlaylistIndex: null});
    }

    removeSongFromPlaylist(shownPlaylist, i) {
        const { playlists,player,dispatch } = this.props;
        const { currentSongIndex} = player;

        let newArr = playlists[shownPlaylist].items.filter(function (item, j) {
            return j !== i;
        });

        if(i<currentSongIndex) dispatch(playSong(shownPlaylist,currentSongIndex -1 ));

        playlists[shownPlaylist].items = newArr;
        this.setState({playlists:null});
    }

    moveSongUpwards(shownPlaylist, i) {
        const { playlists,player,dispatch } = this.props;
        const { currentSongIndex , selectedPlaylists} = player;
        const currentPlaylist = selectedPlaylists[selectedPlaylists.length - 1];

        let swapper = i-1;
        const isActiveSong = this.isActiveSong(currentPlaylist, currentSongIndex, swapper, shownPlaylist);

        if (i != 0) {
            let temp = playlists[shownPlaylist].items[i];
            playlists[shownPlaylist].items[i] = playlists[shownPlaylist].items[swapper];
            playlists[shownPlaylist].items[swapper] = temp;
        }
        if(isActiveSong) dispatch(playSong(shownPlaylist,currentSongIndex +1 ));
        this.setState({playlists:null});
    }

    moveSongDownwards(shownPlaylist, i) {

        const { playlists,player,dispatch } = this.props;
        const { currentSongIndex , selectedPlaylists} = player;
        const currentPlaylist = selectedPlaylists[selectedPlaylists.length - 1];

        let swapper = i+1;
        const isActiveSong = this.isActiveSong(currentPlaylist, currentSongIndex, swapper, shownPlaylist);

        if (i < playlists[shownPlaylist].items.length - 1) {
            let temp = playlists[shownPlaylist].items[i];
            playlists[shownPlaylist].items[i] = playlists[shownPlaylist].items[swapper];
            playlists[shownPlaylist].items[swapper] = temp;
        }
        if(isActiveSong) dispatch(playSong(shownPlaylist,currentSongIndex -1 ));
        this.setState({playlists:null});
    }

    render() {
        const { playlists,playlist,sticky, player, songs, dispatch ,time} = this.props;
        const { currentSongIndex, selectedPlaylists } = player;
        const currentPlaylist = selectedPlaylists[selectedPlaylists.length - 1];
        const shownPlaylistIndex = this.getShownPlaylistIndex();
        const shownPlaylist = this.getShownPlaylist(shownPlaylistIndex);
        const stopPropagationFunc = e => {
            e.stopPropagation();
        };

        const items = playlists[shownPlaylist].items.map((songId, i) => {
            const song = songs[songId];
            const isActiveSong = this.isActiveSong(currentPlaylist, currentSongIndex, i, shownPlaylist);
            const playSongFunc = this.playSong.bind(this, shownPlaylist, i);
            const removeSongFunc = this.removeSongFromPlaylist.bind(this, shownPlaylist, i);
            const takeEmUp = this.moveSongUpwards.bind(this, shownPlaylist, i);
            const takeEmDown = this.moveSongDownwards.bind(this, shownPlaylist, i);

            let renderedControls = null;

            if (!isActiveSong) {
                renderedControls = (
                    <div className="controls">
                        <div className="remove" onClick={removeSongFunc}>
                            Remove <Remove />
                        </div>
                        <div className="moveup" onClick={takeEmUp}>
                            Move Up<SortUp />
                        </div>
                        <div className="movedown" onClick={takeEmDown}>
                            Move Down<SortDown />
                        </div>
                    </div>
                )
            }

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

                    {renderedControls}

                </li>
            );
        });

        return (
            <div>
                <Toolbar dispatch={dispatch} playlist={playlist} sticky={sticky} time={time}/>
                <div className="fullWidth">
                    <div
                        className="currentPlaylist"
                        onClick={stopPropagationFunc}
                    >
                        <div className="playlist-body">
                            <ul className="playlist-songs">
                                {items}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

CurrentPlaylist.propTypes = propTypes;

export default CurrentPlaylist;

