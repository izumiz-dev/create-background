import React from "react";
import Dropzone from "react-dropzone";

export const DropUpload = ({ setFile }) => {
  return (
    <Dropzone
      onDrop={(acceptedFiles) => {
        const image = acceptedFiles[acceptedFiles.length - 1];
        if (isImage(image)) {
          const path = URL.createObjectURL(image);
          setFile(path);
          // setShowNotifi(false);
        } else {
          // setShowNotifi(true);
        }
      }}
    >
      {({ getRootProps, getInputProps }) => (
        <section>
          <div
            {...getRootProps()}
            style={{
              height: "100px",
              width: "80wv",
              border: "dashed #AAAAAA 2px",
              borderRadius: "6px",
              fontSize: "small",
            }}
          >
            <input {...getInputProps()} />
            <p>
              クリックで画像ファイルを選択
              <br />
              もしくは、画像をドラッグ＆ドロップ
            </p>
          </div>
        </section>
      )}
    </Dropzone>
  );
};

const isImage = (file) => file.type.includes("image");
