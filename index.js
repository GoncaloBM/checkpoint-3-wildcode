const express = require("express");
const app = express();
const fs = require("fs");
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3000;

const rawFile = fs.readFileSync("./playlist.json");
const playlists = JSON.parse(rawFile);

app.get("/playlist", function (req, res) {
  res.send(playlists);
});

app.post("/playlist/:new", (req, res) => {
  const lastPlaylist = playlists[playlists.length - 1];
  const lastId = lastPlaylist.id;

  const newPlaylist = {
    id: lastId + 1,
    name: req.params.new,
  };

  playlists.push(newPlaylist);
  fs.writeFileSync("./playlist.json", JSON.stringify(playlists));
  const jsonModified = fs.readFileSync("./playlist.json");

  const file2 = JSON.parse(jsonModified);
  res.send(file2);
});

app.get("/playlist/:id", (req, res) => {
  for (let j = 0; j < playlists.length; j++) {
    if (playlists[j].id === Number(req.params.id)) {
      res.send(playlists[j]);
    }
  }
});

app.post("/playlist/:playlistId/songs/:newSong", (req, res) => {
  for (let j = 0; j < playlists.length; j++) {
    if (playlists[j].id === Number(req.params.playlistId)) {
      const playlistSongs = playlists[j].songs;
      const song = { name: req.params.newSong };

      playlistSongs.push(song);
      fs.writeFileSync("./playlist.json", JSON.stringify(playlists));
      const jsonModified = fs.readFileSync("./playlist.json");
      const file2 = JSON.parse(jsonModified);
      res.send(file2);

      res.send(lastSongId);
    }
  }
});

app.get("/playlist/:playlistId/songs", (req, res) => {
  for (let j = 0; j < playlists.length; j++) {
    if (playlists[j].id === Number(req.params.playlistId)) {
      const playlistSongs = playlists[j].songs;
      res.send(playlistSongs);
    }
  }
});

app.delete("/playlist/:playlistName", (req, res) => {
  const playlist = playlists.find(
    (target) => target.name === req.params.playlistName
  );
  const index = playlists.indexOf(playlist);
  playlists.splice(index, 1);
  fs.writeFileSync("./playlist.json", JSON.stringify(playlists));
  const jsonModified = fs.readFileSync("./playlist.json");
  const file2 = JSON.parse(jsonModified);
  res.send(file2);
});

app.delete("/playlist/:playlistId/songs/:songName", (req, res) => {
  for (let j = 0; j < playlists.length; j++) {
    if (playlists[j].id === Number(req.params.playlistId)) {
      const playlistSongs = playlists[j].songs;
      const song = playlistSongs.find(
        (target) => target.name === req.params.songName
      );
      const index = playlistSongs.indexOf(song);
      playlistSongs.splice(index, 1);
      fs.writeFileSync("./playlist.json", JSON.stringify(playlists));
      const jsonModified = fs.readFileSync("./playlist.json");
      const file2 = JSON.parse(jsonModified);
      res.send(file2);
    }
  }
});

app.put("/playlist/:playlistId/songs/:songName", (req, res) => {
  for (let j = 0; j < playlists.length; j++) {
    if (playlists[j].id === Number(req.params.playlistId)) {
      const playlistSongs = playlists[j].songs;
      const song = playlistSongs.find(
        (target) => target.name === req.params.songName
      );

      song.name = req.body.newSongName;
      fs.writeFileSync("./playlist.json", JSON.stringify(playlists));
      const jsonModified = fs.readFileSync("./playlist.json");
      const file2 = JSON.parse(jsonModified);
      res.send(file2);
    }
  }
});

app.put("/playlist/:playlistName", (req, res) => {
  const playlist = playlists.find(
    (target) => target.name === req.params.playlistName
  );
  console.log(req.body.newPlaylistName);
  playlist.name = req.body.newPlaylistName;

  fs.writeFileSync("./playlist.json", JSON.stringify(playlists));
  const jsonModified = fs.readFileSync("./playlist.json");
  const file2 = JSON.parse(jsonModified);
  res.send(file2);
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
