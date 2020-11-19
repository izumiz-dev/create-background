import React, { Fragment, useState } from "react";
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
      .toJpeg(document.getElementById("target-component"), { quality: 1.0 })
      .then(function (dataUrl) {
        var link = document.createElement("a");
        link.download = `${new Date().valueOf()}.png`;
        link.href = dataUrl;
        link.click();
      });
  };

  // console.log('files', files)

  return (
    <Fragment>
      <Jumbotron>
        <Container>
          <h1>Background Creator</h1>
          <p>
            Let's edit the blur and brightness of the image to create the
            background.
          </p>
        </Container>
      </Jumbotron>
      <div style={{paddingLeft: '10%'}}>
      <div>
        <Button onClick={() => selectFiles({ accept: "image/*" })}>
          Upload Image
      </Button>
        <Scrollbars autoHeight>
          {files ? (
            <img
              id="target-component"
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
            onChange={({ x }) => setBlurVal(parseFloat(x, 10))}
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
        <Button onClick={() => download()}>Download</Button>
      </div>
      </div>
    </Fragment>
  );
}

export default App;