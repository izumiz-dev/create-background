import React, { useState } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import Slider from "react-input-slider";
import { useFileUpload } from "use-file-upload";
import domtoimage from "dom-to-image";
import { Button } from "react-bootstrap";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [blurVal, setBlurVal] = useState(0.0);
  const [brightVal, setBrightVal] = useState(0);
  const [files, selectFiles] = useFileUpload(null);

  const download = () => {
    domtoimage
      .toJpeg(document.getElementById("download-element"), { quality: 0.9 })
      .then(function(dataUrl) {
        const link = document.createElement("a");
        link.download = `${new Date().valueOf()}.jpg`;
        link.href = dataUrl;
        link.click();
      });
  };

  return (
    <>
      <div style={{ paddingLeft: "4%", width: "96%", paddingTop: "2%" }}>
        <h4>Background Creator</h4>
        <p style={{ fontSize: "small" }}>
          ぼかしと暗さを編集して背景を作成しよう。
        </p>
        <div style={{ marginBottom: "10px" }}>
          <div style={{ fontWeight: "bold" }}>プレビュー(原寸)</div>
          {files ? (
            <Scrollbars
              autoHeight
              autoHeightMin={parseInt(window.innerHeight * 0.6, 10)}
            >
              <img
                id="download-element"
                src={files?.source}
                alt="preview"
                style={{
                  filter: `blur(${blurVal}px) brightness(${100 - brightVal}%)`,
                }}
              />
            </Scrollbars>
          ) : (
            <div>右下から画像を選択してね</div>
          )}
        </div>
        <div>
          <div>
            <span style={{ fontWeight: "bold", marginRight: "20px" }}>
              ぼかし
            </span>
            <Slider
              axis="x"
              xstep={0.1}
              xmin={0}
              xmax={20}
              x={blurVal}
              onChange={({ x }) => setBlurVal(parseFloat(x))}
            />
          </div>
          <div>
            <span style={{ fontWeight: "bold", marginRight: "20px" }}>
              暗く　
            </span>
            <Slider
              axis="x"
              xmin={0}
              xmax={100}
              x={brightVal}
              onChange={({ x }) => setBrightVal(parseInt(x, 10))}
            />
          </div>
          <div style={{ position: "absolute", right: "4vw", bottom: "4vh" }}>
            <Button
              onClick={() => selectFiles({ accept: "image/*" })}
              style={{ marginRight: "20px" }}
            >
              画像を選択
            </Button>
            <Button onClick={() => download()}>保存</Button>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 0, right: 1 }}>
          <span>© 2020 izumiz-dev</span>
        </div>
      </div>
    </>
  );
}

export default App;
