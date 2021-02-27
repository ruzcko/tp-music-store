import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { db } from "../utils/firebase";

function AlbumDetail() {
  const { id } = useParams();
  const history = useHistory();
  const [songs, setSongs] = useState([]);
  const [album, setAlbum] = useState();

  useEffect(() => {
    const unsubscribe = db
      .collection("songs")
      .where("albumID", "==", id)
      .onSnapshot((snapshot) => {
        setSongs(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });

    return unsubscribe;
  }, [id]);

  useEffect(() => {
    const unsubscribe = db
      .collection("albums")
      .doc(id)
      .onSnapshot((snapshot) => {
        setAlbum({ ...snapshot.data(), id });
      });

    return unsubscribe;
  }, [id]);

  const handleBuy = async () => {
    let data = await (await db.collection("albums").doc(id).get()).data();
    data.totalSold = data.totalSold + 1;
    await db.collection("albums").doc(id).set(data);
  };

  return (
    <div className="container">
      <div className="back-button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          height={33}
          width={32}
          onClick={() => {
            history.goBack();
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <img
            height={200}
            alt={album?.name ?? "N/A"}
            src={album?.albumCover ?? "N/A"}
            style={{ paddingTop: 40 }}
          />
          <h2>{album?.name ?? "N/A"}</h2>
          <h3>{album?.artist ?? "N/A"}</h3>
          <article>{album?.description ?? "N/A"}</article>
          <p>Sold {album?.totalSold ?? "0"} copies</p>
        </div>

        <button className="button" value="Buy" onClick={handleBuy}>
          Buy
        </button>
      </div>

      <div>
        <h2>Tracklist</h2>
        {songs.length > 0 ? (
          songs.map((song, i) => (
            <div key={song.id}>
              <Link to={`/songs/${song.id}`}>
                <div className="card">
                  {i + 1} - {song.name}
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

export default AlbumDetail;
