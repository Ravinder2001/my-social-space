import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import styles from "./style.module.scss";
import axios from "axios";
function GifBox() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("webdeveloper");
  const [loading, setLoading] = useState(true);

  const handleGif = () => {
    setLoading(true);
    setData([]);
    axios(
      `https://api.giphy.com/v1/gifs/search?api_key=NqDTwbqeOHkh21oKKuVDiNfsf3UuIaKH&q=${query}&limit=30&offset=0&rating=g&lang=en`
    )
      .then((res) => {
        setData(res.data.data);
        setLoading(false);
      })
      .catch((error) => console.log("Error fetching and parsing data", error))
      .finally(() => console.log(false));
  };
  const handleQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      handleGif();
    }
  };

  useEffect(() => {
    handleGif();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.search_group}>
        <input
          type="text"
          value={query}
          onChange={handleQuery}
          className={styles.input}
          onKeyDown={handleKey}
        />
        <button onClick={handleGif} className={styles.btn}>
          Search
        </button>
      </div>
      <div className={styles.gif_box}>
        {!loading ? (
          <>
            {data.map((gif: any) => (
              <img
                src={gif.images.fixed_height.url}
                alt=""
                className={styles.gif}
              />
            ))}
          </>
        ) : (
          <div>loading</div>
        )}
      </div>
    </div>
  );
}

export default GifBox;
