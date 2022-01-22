import React from "react";
import "./Body.css";
import Header from "./Header";
import { useDataLayerValue } from "./DataLayer";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SongRow from "./SongRow";
//import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DurationIcon from '@mui/icons-material/AccessTimeSharp';
function Body({ spotify }) {

  //track duration
  var dHours = Math.floor(4585515 / 3600)%24;
  var dMinutes = Math.floor(4585515 / 60000)%60;
  var dSeconds = ((4585515 % 60000) / 1000).toFixed(0);
  var dTrackTime = dHours + " hr " + dMinutes + " min ";


  const [{ discover_weekly }, dispatch] = useDataLayerValue();
  
  const playPlaylist = (id) => {
    spotify
      .play({
        context_uri: `spotify:playlist:4GpBODwgLjOwL6JcBunQcr`,
      })
      .then((res) => {
        spotify.getMyCurrentPlayingTrack().then((r) => {
          dispatch({
            type: "SET_ITEM",
            item: r.item,
          });
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
        });
      });
  };

  const playSong = (id) => {
    spotify
      .play({
        uris: [`spotify:track:${id}`],
      })
      .then((res) => {
        spotify.getMyCurrentPlayingTrack().then((r) => {
          dispatch({
            type: "SET_ITEM",
            item: r.item,
          });
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
        });
      });
  };

  
  return (
    <div className="body">
      <Header spotify={spotify} />

      <div className="body_info">
        <img id="discover_profileImage" src={discover_weekly?.images[0].url} alt="" />
        <div className="body_infoText">
          <strong>PLAYLISTS</strong>
          <h2>Discover Weekly</h2>
          <p>{discover_weekly?.description}
              <p></p>
                  <a href="https://open.spotify.com/user/spotify">Spotify </a>
                  &bull;<span> 30 songs, {dTrackTime}</span>
               </p>
        </div>
      </div>

      <div className="body_songs">
        <div className="body_icons">
          <PlayCircleFilledWhiteIcon className="body_shuffle" />
          <FavoriteIcon fontSize="large" />
          <MoreHorizIcon />
        </div>
    
    {/* songs header */}
        <ul className="body_songsHeader">
              <li className="body_songsNumber"><p>#</p></li>
              <li className="body_songsTitle"><p>TITLE</p></li>
              <li className="body_songsAlbum"><p>ALBUM</p></li>
              <li className="body_songsRelease"><p>RELEASE</p></li>
              <li className="body_songsDurationIcon">
                <DurationIcon className="body_duration" />
              </li>
            </ul>

{/* Get Tracks */}

<div className="body_songNumber">
              {discover_weekly?.tracks.items.map((item) => (
                <SongRow track={item.track} duration={item.duration} />
              ))}

              </div>
      </div>
    </div>
  );
}

export default Body;
