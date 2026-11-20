import { useState } from "react";
import "./App.css";

function App() {
  const defaultText = "画像を選択してください";
  const [imageData, setImageData] = useState(null);
  const [text, setText] = useState(defaultText);
  const [imageFile, setImageFile] = useState(null);
  const [per, setPer] = useState("");

  const handleClick = async () => {
    if (!imageData) {
      return;
    }

    setText("実行中...");
    setPer("");

    const formData = new FormData();

    formData.append("file", imageFile);
    try {
      const response = await fetch("http://localhost:8000/api/text", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log(data);

      setText(data.text);
      setPer("(" + data.per + "%)");
    } catch (error) {
      console.error("API Error: ", error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setImageFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setImageData(reader.result);
    };
    reader.readAsDataURL(file);
    setText("読み込み完了");
    setPer("");
  };

  const resetImage = () => {
    setImageData(null);
    setText(defaultText);
    setPer("");
  };

  return (
    <>
      <h1>App</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <label>
          <img
            className="img"
            src={imageData}
            className="framework"
            alt="Click here!"
            style={{
              width: imageData ? "auto" : "500px",
            }}
          />
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <pre>
            {text} {per}
          </pre>
        </label>
      </div>

      <div>
        <button onClick={resetImage}>リセット</button>
        <button type="button" onClick={handleClick}>
          実行
        </button>
      </div>
    </>
  );
}

export default App;
