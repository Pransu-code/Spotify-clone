import React, { useEffect, useState } from "react";
import "./Footer.css";
import FavoriteIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayArrow";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import RepeatIcon from "@mui/icons-material/Repeat";
import { Grid, Slider } from "@mui/material";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import { useDataLayerValue } from "./DataLayer";
import DevicesSharpIcon from "@mui/icons-material/DevicesSharp";
import SpotifyWebApi from "spotify-web-api-js";
import { Favorite } from "@mui/icons-material";

const spotify = new SpotifyWebApi();
// function Footer() {
//   return (
//       <div className="footer">
//           {/* Current Song Info */}
//           <div className="footer__left">
//               <img 
//               className="footer__albumLogo"
//               src="https://m.media-amazon.com/images/I/71TY56i2SmL._SS500_.jpg" 
//               alt=""
//               />
//               <div className="footer__songInfo">
//                   <a href="">
//                       <h5>Party Rock Anthem</h5>
//                   </a>
//                   <a href=""><p>LMAFO</p></a>
//               </div>
//               <FavoriteIcon className="footer__heartCurrent" />
//           </div>

//           {/* Player Controls */}
//           <div className="footer__center">
//               <ShuffleIcon className="footer__green" />
//               <SkipPreviousIcon className="footer__icon" />
//               <PlayCircleFilledWhiteIcon
//               fontSize="large"
//               className="footer__icon footer__play" 
//               />
//               <SkipNextIcon className="footer__icon" />
//               <RepeatIcon className="footer__green" />
//           </div>
//           <div className="footer__durationContainer">
//             <span>01:20</span>
//             <Slider className="footer__durationBar" />
//             <span>3:34</span>
//           </div>

//           {/* Volume Controls */}
//           <div className="footer__right">
//             <div className="footer__rightContainer">
//               <Grid container spacing={2}>
//                   <Grid item>
//                       <PlaylistPlayIcon className="footer__playlistIcon" />
//                   </Grid>
//                   <Grid item>
//                       <DevicesSharpIcon className="footer__deviceIcon" />
//                   </Grid>
//                   <Grid item>
//                       <VolumeDownIcon className="footer__volumeIcon" />
//                   </Grid>
//                   <Grid item xs>
//                       <Slider className="footer__volumeSlider" />
//                   </Grid>
//               </Grid>
//             </div>
//           </div>

//       </div>
//   )
// }

// export default Footer;

function Footer() {
  const [{ token, item, playing }, dispatch] = useDataLayerValue();

  useEffect(() => {
    spotify.getMyCurrentPlaybackState().then((r) => {
      console.log(r);

      dispatch({
        type: "SET_PLAYING",
        playing: r.is_playing,
      });

      dispatch({
        type: "SET_ITEM",
        item: r.item,
      });
    });
  }, [spotify]);

  const handlePlayPause = () => {
    if (playing) {
      spotify.pause();
      dispatch({
        type: "SET_PLAYING",
        playing: false,
      });
    } else {
      spotify.play();
      dispatch({
        type: "SET_PLAYING",
        playing: true,
      });
    }
  };

  const skipNext = () => {
    spotify.skipToNext();
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
  };

  const skipPrevious = () => {
    spotify.skipToPrevious();
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
  };

  return (
    <div className="footer">
      {/* current song info */}
      <div className="footer_left">
        <img
          className="footer_albumlogo"
          src="https://a10.gaanacdn.com/images/albums/4/4729504/crop_480x480_4729504.jpg"
          alt=""
        />
        <div className="footer_songinfo">
          <a href="">
          <h4> Yeah!</h4>
          </a>
          <a href=""><p>AP Dhillon</p></a>
        </div>
        <FavoriteIcon className="footer__heartCurrent" />
      </div>

{/* Player controls */}

      <div className="footer_center">
        <ShuffleIcon className="footer_green" />
        <SkipPreviousIcon className="footer_icon" />
        <PlayCircleOutlineIcon fontSize="large" className="footer_icon" />
        <SkipPreviousIcon className="footer_icon" />
        <RepeatIcon className="footer_green" />
      </div>

       <div className="footer__durationContainer">
              <span>01:20</span>
              <Slider className="footer__durationBar" />
              <span>3:34</span>
            </div>
 

      <div className="footer_right">
        <Grid container spacing={2}>
          <Grid item>
            <PlaylistPlayIcon />
          </Grid>
          <Grid item>
            <VolumeDownIcon />
          </Grid>
          <Grid item xs>
            <Slider />
          </Grid>
        </Grid>
      </div>
    </div> 

    //  <div className="footer__right">
    //           <div className="footer__rightContainer">
    //             <Grid container spacing={2}>
    //                 <Grid item>
    //                     <PlaylistPlayIcon className="footer__playlistIcon" />
    //                 </Grid>
    //                 <Grid item>
    //                     <DevicesSharpIcon className="footer__deviceIcon" />
    //                 </Grid>
    //                 <Grid item>
    //                     <VolumeDownIcon className="footer__volumeIcon" />
    //                 </Grid>
    //                 <Grid item xs>
    //                     <Slider className="footer__volumeSlider" />
    //                 </Grid>
    //             </Grid>
    //           </div>
    //         </div>

       //  </div>
  );
}

export default Footer;
