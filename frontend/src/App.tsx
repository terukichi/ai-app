import { useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";

function App() {
  const defaultText = "画像を選択してください";
  const defaultImage = "/src/assets/react.svg";
  const [imageData, setImageData] = useState(defaultImage);
    const [text, setText] = useState(defaultText);
    const [imageFile, setImageFile] = useState(null);
    const [per, setPer] = useState("");

  const handleClick = async () => {
      if ((!imageData) || (imageData === defaultImage)) {
          return;
      }

      setText("実行中...");
      setPer("");

      const formData = new FormData();

      formData.append("file", imageFile);
    try {
        const response = await fetch(
            "http://localhost:8000/api/text",
            {
                method: "POST",
                body: formData,
            }
        );

        const data = await response.json();
        console.log(data);

        setText(data.text);
        setPer("("+data.per+"%)");
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
      setText(defaultText);
      setPer("");
  };

  const resetImage = () => {
    setImageData(defaultImage);
      setText(defaultText);
      setPer("");
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
          <pre>{text} {per}</pre>
      </div>

      <div>
        <button>
          <input
            type="file"
            accept="image/"
            onChange={handleFileChange}
          />
        </button>
        <button onClick={resetImage}>リセット</button>
        <button type="button" onClick={handleClick}>実行</button>
      </div>
    </>
  );
}

export default App;
