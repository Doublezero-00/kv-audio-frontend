import { useState } from "react";
import mediaUpload from "../utils/mediaUpload";

export default function Testing() {
  const [file, setFile] = useState(null);

  function uploadFiles() {
    mediaUpload(file).then((url) => {
      console.log(url);
    }).catch((err) => {
      console.error(err);
    });
  }

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-4">
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={uploadFiles} className="w-[200px] h-[50px] bg-blue-500 text-white rounded">
        Upload
      </button>
    </div>
  );
}
