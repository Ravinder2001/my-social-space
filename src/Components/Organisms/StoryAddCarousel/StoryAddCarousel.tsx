import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import Header from "./Header/Header";
import LucideIcons from "../../../Utils/Icons/LucideIcons";
import StoryAddMusic from "../StoryAddMusic/StoryAddMusic";
import SongTrimmer from "./SongTrimmer/SongTrimmer";
import { timeFrame } from "../../../Utils/Constant";

type props = {
  images?: FileList;
};
function StoryAddCarousel(props: props) {
  const { images } = props;
  const [isMusic, setIsMusic] = useState<{ status: boolean; index: number }>({
    status: false,
    index: -1,
  });
  const [values, setValues] = useState<{ index: number; img: File; start: number; end: number; link: string; x: number }[]>([]);
  const [page, setPage] = useState<number>(0);

  const handleIsMusic = (index: number) => {
    setIsMusic({ status: !isMusic.status, index: index });
  };

  const handlePage = (type: string) => {
    switch (type) {
      case "Prev":
        return page > 0 && setPage(page - 1);
      case "Next":
        return page < values.length - 1 && setPage(page + 1);

      default:
        return setPage(0);
    }
  };

  const StoreIntialValues = () => {
    if (images) {
      Array.from(images).map((item, index) => {
        setValues((prev) => [
          ...prev,
          {
            index,
            img: item,
            start: 0,
            end: timeFrame,
            link: "",
            x: 0,
          },
        ]);
      });
    }
  };

  useEffect(() => {
    if (images?.length) {
      StoreIntialValues();
    }
  }, [images]);
  return (
    <div className={styles.container}>
      {!isMusic.status ? (
        <div className={styles.sub_con}>
          <Header handlePage={handlePage} isPrev={page != 0} isNext={values.length > 1 && page != values.length - 1} />
          {values.map((item) =>
            page == item.index ? (
              <div className={styles.main_container}>
                <div className={styles.left_box}>
                  <img src={URL.createObjectURL(item.img)} alt="" className={styles.img} />
                  {item.link.length && (
                    <SongTrimmer index={item.index} link={item.link} startTime={item.start} endTime={item.end} setValues={setValues} x={item.x} />
                  )}
                </div>
                <div className={styles.right_box}>
                  <div
                    className={styles.box}
                    onClick={() => {
                      handleIsMusic(item.index);
                    }}
                  >
                    <div>
                      <LucideIcons name="Music" color="#ba36f7" />
                    </div>
                    <div>Music</div>
                  </div>
                  <div className={styles.box}>Delete</div>
                </div>
              </div>
            ) : null
          )}
        </div>
      ) : (
        <StoryAddMusic handleIsMusic={handleIsMusic} setValues={setValues} isMusic={isMusic} />
      )}
    </div>
  );
}

export default StoryAddCarousel;
