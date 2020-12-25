import React from "react";
import { useDropzone } from "react-dropzone";

export const DropUpload = ({ setFile }) => {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop: (acceptedFiles) => {
      const image = acceptedFiles[acceptedFiles.length - 1];
      if (image) {
        const path = URL.createObjectURL(image);
        setFile(path);
      }
    },
    accept: "image/jpeg, image/png",
  });

  return (
    <div>
      <div
        {...getRootProps({ className: "dropzone" })}
        style={{
          height: "100px",
          width: "80wv",
          border: "dashed #AAAAAA 2px",
          borderRadius: "6px",
          fontSize: "small",
        }}
      >
        <input {...getInputProps()} />
        {isDragAccept && <p>ここにドロップ！</p>}
        {isDragReject && <p>画像を選択してください</p>}
        {!isDragActive && <p>ここに画像をドラッグアンドドロップ</p>}
      </div>
    </div>
  );
};
