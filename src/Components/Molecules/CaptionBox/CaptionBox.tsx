import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import TextArea from "../../Atoms/TextArea/TextArea";
type captionProps = {
  handleCaption: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};
function CaptionBox(props: captionProps) {
  return (
    <div>
      <div>Caption</div>
      <TextArea handleCaption={props.handleCaption} />
    </div>
  );
}

export default CaptionBox;
