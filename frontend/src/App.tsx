import { useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";

function App() {
  const defaultText = "予想";
  const defaultImage = "/src/assets/react.svg";
  const [imageData, setImageData] = useState(defaultImage);
  const [text, setText] = useState(defaultText);

  const handleClick = async () => {
    setText("実行中...");

    try {
      const response = await fetch("http://localhost:8000/api/text");
      const data = await response.json();

      setText(data.text);
    } catch (error) {
      console.error("API Error: ", error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImageData(reader.result);
    };
    reader.readAsDataURL(file);
    setText(defaultText);
  };

  const resetImage = () => {
    setImageData(defaultImage);
    setText(defaultText);
  };

  return (
    <>
      <h1>プレビュー</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={imageData}
          className="framework"
          alt="Image"
          height="500px"
          width="auto"
        />
      </div>

      <div>
        <pre>{text}</pre>
      </div>

      <div>
        <button>
          <input
            type="file"
            accept="image/jpeg, image/png"
            onChange={handleFileChange}
          />
        </button>
        <button onClick={resetImage}>リセット</button>
        <button onClick={handleClick}>実行</button>
      </div>
    </>
  );
}

export default App;
