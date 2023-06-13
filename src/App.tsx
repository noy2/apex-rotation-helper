import React from "react";
import Data from "./Data";
import emotionReset from "emotion-reset";
import { Global, css } from "@emotion/react";

function App() {
  return (
    <div>
      <Global styles={style} />
      <Data />
    </div>
  );
}

const style = css`
  ${emotionReset}
  body {
    font-family: "SUIT";
  }
`;
export default App;
