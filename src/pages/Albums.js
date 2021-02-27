import React, { useState, useEffect } from "react";
import { db } from "../utils/firebase";
import { Link } from "react-router-dom";

function Albums() {
  const [albums, setAlbums] = useState([]);
  useEffect(() => {
    //logic
    const unsubscribe = db
      .collection("albums")
      .orderBy("name")
      .onSnapshot((snapshot) => {
        setAlbums(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      });

    //cleanup
    return () => {
      console.log("Cleaning up /albums");
      return unsubscribe;
    };
  }, []);

  return (
    <div className="container">
      <h2>Albums</h2>
      <div>
        {albums.length > 0 ? (
          albums.map((album) => (
            <div key={album.id}>
              <img
                height={100}
                alt={album?.name ?? "N/A"}
                src={album?.albumCover ?? "N/A"}
              />
              <Link to={`/albums/${album.id}`}>
                <div className="card">
                  {album.name} by {album.artist}
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}

export default Albums;
