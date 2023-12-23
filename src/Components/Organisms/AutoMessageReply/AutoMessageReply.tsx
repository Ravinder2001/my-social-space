import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./style.module.scss";
import GenerateSuggestion from "../../../APIs/GenerateSuggestion";
import { Request_Succesfull } from "../../../Utils/Constant";
import creative from "../../../Assets/Images/creative.png";
type ComponentProps = {
  isGenerate: boolean;
  suggestion: string;
  FetchSuggestion: () => void;
  SuggestClick: () => void;
};
function AutoMessageReply(props: ComponentProps) {
  const { isGenerate, suggestion, FetchSuggestion, SuggestClick } = props;

  return (
    <div className={styles.container}>
      {isGenerate ? (
        <div className={styles.box} onClick={SuggestClick}>
          <div className={styles.text}>{suggestion.length ? suggestion : "Generating..."}</div>
        </div>
      ) : (
        <div className={styles.btn} onClick={FetchSuggestion}>
          <img src={creative} alt="" className={styles.logo} />
          <div className={styles.ques}>Need Reply Suggestion!</div>
        </div>
      )}
    </div>
  );
}

export default AutoMessageReply;
