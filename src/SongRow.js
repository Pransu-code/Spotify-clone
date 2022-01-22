// import React from "react";
// import "./SongRow.css";

// function SongRow({ track, playSong }) {
//     console.log(track);
//   return (

//   <div className="songRow" onClick={() => playSong(track.id)}>

//       <img className="songRow_album" src={track.album.images[0].url} alt="" />

//       <div className="songRow_info">

//             <h1>{ track.name }</h1>
//             <p>
//                 {track.artists.map((artist) => artist.name).join(", ")} -{" "}
//                 {track.album.name}
//             </p>

//       </div>

//   </div>
//   );
// // }

// export default SongRow;

import React from "react";
import "./SongRow.css";
import Body from "./Body";
import { useDataLayerValue } from "./DataLayer";

function SongRow({ track }) {
  const [{ playlists }, dispatch] = useDataLayerValue();
  console.log(track);

  // Song Duration
  var minutes = Math.floor(track.duration_ms / 60000);
  var seconds = ((track.duration_ms % 60000) / 1000).toFixed(0);
  var trackTime = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;

  return (
    <div className="songRow">
      <img className="songRow__album" src={track.album.images[0].url} alt="" />
      <div className="songRow__info">
        <h1>{track.name}</h1>
        <p className="songRow__artistName">
          {track.artists.map((artist) => artist.name).join(", ")}
        </p>
        <p className="songRow__albumName">{track.album.name}</p>
        <p className="songRow__albumRelease">{track.album.release_date}</p>
        <span className="songRow__infoDuration">{trackTime}</span>
      </div>
    </div>
  );
}

export default SongRow;
