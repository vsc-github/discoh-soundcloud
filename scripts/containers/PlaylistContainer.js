/**
 * Created by batty on 11/27/2016.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import  CurrentPlaylist  from '../components/CurrentPlaylist';
import { getPlayingSongId } from '../utils/PlayerUtils';
import Toolbar from '../components/GenreBar'

const propTypes = {
    isMobile: PropTypes.bool,
};

class PlaylistContainer extends Component {
    render() {
        const { isMobile } = this.props;
        const { dispatch, player, playlists, playlist, songs, sticky,time,path } = this.props;

        if (player.selectedPlaylists.length !== 0) {
            if (isMobile) {
                return <CurrentPlaylist {...this.props} />;
            }

            return <CurrentPlaylist
                dispatch={dispatch}
                player={player}
                playlists={playlists}
                playlist={playlist}
                songs={songs}
            />;
        }
        else {
            console.log("No song playing, so no current playlist!");
            return (
                <div>
                    <Toolbar dispatch={dispatch} playlist={playlist} sticky={sticky} time={time} path={path}/>
                    <div className="noSongPlaying">Play a song to first to auto create a playlist.</div>
                </div>
            )
        }

    }
}
PlaylistContainer.propTypes = propTypes;

function mapStateToProps(state) {
    const { entities, environment, navigator, player, playlists } = state;
    const { height, isMobile } = environment;
    const { songs, users } = entities;
    const { query , path } = navigator.route;
    const playingSongId = getPlayingSongId(player, playlists);

    const time = query && query.t ? query.t : null;
    let playlist = query && query.q ? query.q : 'deep';
    if (time) {
        playlist = `${playlist} - ${time}`;
    }

    return {
        height,
        isMobile,
        path,
        player,
        playingSongId,
        playlist,
        playlists,
        songs,
        time,
        users,
    };
}

export default connect(mapStateToProps)(PlaylistContainer);
