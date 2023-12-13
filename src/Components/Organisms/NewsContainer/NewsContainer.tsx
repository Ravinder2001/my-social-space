import React, { useEffect, useState } from "react";
import { NewsAPI } from "../../../Utils/Constant";
import axios from "axios";
import styles from "./style.module.scss";
import { formatTime } from "../../../Utils/Function";
function NewsContainer() {
  const [news, setNews] = useState<any[]>([]);
  const FetchNews = async () => {
    const res = await axios.get(NewsAPI);
    setNews(res.data.articles);
  };
  useEffect(() => {
    FetchNews();
  }, []);
  return (
    <div className={styles.container}>
      {news.map((item) => (
        <div className={styles.box}>
          <img src={item.urlToImage} alt="" className={styles.img} />
          <div className={styles.right_box}>
            <div className={styles.title}>{item.title}</div>
            <div className={styles.bottom}>
            <div className={styles.author}>{item.author}</div>
            <div className={styles.time}>{formatTime(item.publishedAt)}</div>
            </div>
            
          </div>
        </div>
      ))}
    </div>
  );
}

export default NewsContainer;
