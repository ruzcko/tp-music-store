import React, { useState, useEffect } from "react";
import { db } from "../utils/firebase";
import { Link } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  const [topAlbums, setTopAlbums] = useState([]);
  const [topSongs, setTopSongs] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection("albums")
      .orderBy("totalSold", "desc")
      .limit(10)
      .onSnapshot((snapshot) => {
        setTopAlbums(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = db
      .collection("songs")
      .orderBy("totalPlays", "desc")
      .limit(10)
      .onSnapshot((snapshot) => {
        setTopSongs(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      });

    return unsubscribe;
  }, []);

  return (
    <div className="container">
      <h2>Home</h2>
      <div className="home-content">
        <div>
          <h3>Top 10 Best Selling Albums</h3>
          {topAlbums.length > 0 ? (
            topAlbums.map((album, i) => (
              <Link key={album.id} to={`/albums/${album.id}`}>
                <div className="card">
                  <strong>
                    {i + 1} - {album.name}
                  </strong>
                  <s /> by {album.artist}: Sold {album.totalSold} copies
                </div>
              </Link>
            ))
          ) : (
            <div>Loading...</div>
          )}
        </div>

        <div>
          <h3>Top 10 Most Played Songs</h3>
          {topSongs.length > 0 ? (
            topSongs.map((song, i) => (
              <Link to={`/songs/${song.id}`}>
                <div className="card">
                  <strong>
                    {i + 1} - {song.name}
                  </strong>
                  : Played {song.totalPlays} times
                </div>
              </Link>
            ))
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
