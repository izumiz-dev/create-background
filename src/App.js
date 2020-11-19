import React, { useState } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import Slider from "react-input-slider";
import { useFileUpload } from "use-file-upload";
import domtoimage from "dom-to-image";
import { Button, Jumbotron, Container } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [blurVal, setBlurVal] = useState(0.0);
  const [brightVal, setBrightVal] = useState(100);
  const [files, selectFiles] = useFileUpload(null);

  const download = () => {
    domtoimage
      .toJpeg(document.getElementById("download-element"), { quality: 0.90 })
      .then(function(dataUrl) {
        const link = document.createElement("a");
        link.download = `${new Date().valueOf()}.jpg`;
        link.href = dataUrl;
        link.click();
      });
  };

  return (
    <>
      <Jumbotron>
        <Container>
          <h3>Background Creator🛠</h3>
          <p>
            Let's edit blur and brightness of the image to create the
            background.
            <br />
            ぼかしと暗さを編集して背景を作成しよう。
          </p>
        </Container>
      </Jumbotron>
      <div style={{ paddingLeft: "10%" }}>
        <div>
          <Button onClick={() => selectFiles({ accept: "image/*" })} style={{marginBottom: '10px'}}>
            Upload Image
          </Button>
          <h4>Preview</h4>
          <Scrollbars autoHeight>
            {files ? (
              <img
                id="download-element"
                src={files?.source}
                alt="preview"
                style={{
                  filter: `blur(${blurVal}px) brightness(${brightVal}%)`,
                }}
              />
            ) : (
              <div>Upload image before editing.</div>
            )}
          </Scrollbars>
        </div>
        <div>
          <div>
            <h4>Blur</h4>
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
            <h4>Brightness</h4>
            <Slider
              axis="x"
              xmin={0}
              xmax={100}
              x={brightVal}
              onChange={({ x }) => setBrightVal(parseInt(x, 10))}
            />
          </div>
          <Button onClick={() => download()} style={{marginTop: '10px'}}>Download</Button>
        </div>
        <div style={{ position: "absolute", bottom: 1 }}>© 2020 izumiz-dev</div>
      </div>
    </>
  );
}

export default App;
