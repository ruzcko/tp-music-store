import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { db } from "../utils/firebase";

function MusicDetail() {
  const { id } = useParams();
  const history = useHistory();
  const [song, setSong] = useState();

  useEffect(() => {
    const unsubscribe = db
      .collection("songs")
      .doc(id)
      .onSnapshot((snapshot) => {
        setSong({ id, ...snapshot.data() });
      });

    return unsubscribe;
  }, [id]);

  const handlePlay = async () => {
    let data = await (await db.collection("songs").doc(id).get()).data();
    data.totalPlays = data.totalPlays + 1;
    await db.collection("songs").doc(id).set(data);
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
        <div style={{ display: "flex", alignItems: "center" }}>
          <h2>{song?.name ?? "N/A"}</h2>
          <p>&nbsp; Played {song?.totalPlays ?? "0"} times</p>
        </div>

        <button className="button" onClick={handlePlay}>
          Play
        </button>
      </div>
    </div>
  );
}

export default MusicDetail;
