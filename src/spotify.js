export const authEndpoint = "https://accounts.spotify.com/authorize/";

const redirectUri = "http://localhost:3000";

const clientId = "c3a33a1dafde4672ae224ef5edbfe503";

const scopes = [
  "user-read-playback-position",
  "user-read-email",
  "user-library-modify",
  "playlist-modify-public",
  "ugc-image-upload",
  "user-follow-modify",
  "user-modify-playback-state",
  "user-read-recently-played",
  "user-read-private",
  "user-library-read",
  "user-top-read",
  "playlist-modify-private",
  "user-follow-read",
  "user-read-playback-state",
  "user-read-currently-playing",
  "playlist-read-private",
  "playlist-read-collaborative",
];

export const getTokenFromResponse = () => {
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      // #accessToken = mysupersecretkey&name=pransu
      let parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]); //go into the accesstoken and decode the mysupersecretkey

      return initial;
    }, {});
};

export const accessUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;
