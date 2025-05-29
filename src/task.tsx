import { useState } from "react";
import "./App.css";

export default function Task() {
  const [isListening, setIsListening] = useState(false);
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const startListening = () => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new (window as any).webkitSpeechRecognition();

      console.log(":: recognition ::", recognition);

      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onstart = () => {
        setIsListening(true);
        setError("");
      };

      recognition.onerror = (event: any) => {
        setError("Error occurred in recognition: " + event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onresult = (event: any) => {
        console.log(":: event ::", event);
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result) => result.transcript)
          .join("");
        setText(transcript);
      };

      recognition.start();
    } else {
      setError("Speech recognition is not supported in this browser.");
    }
  };

  const stopListening = () => {
    setIsListening(false);
    if ("webkitSpeechRecognition" in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.stop();
    }
  };

  const handleReset = () => {
    setText("");
    setError("");
  };

  return (
    <div className="speech-container">
      <h1>Audio To Text</h1>
      <div className="mic-container">
        <img
          id="img"
          src="mic.svg"
          alt="mic"
          //    1-  false  =>  startListening ---> start (isListening)
          //    2-  true   =>  stopListening ---> stop (isListening)

          onClick={isListening ? stopListening : startListening}
          // style={{
          //   cursor: "pointer",
          //   filter: isListening ? "invert(0.5)" : "none",
          // }}
        />
      </div>
      <p>{isListening ? "Listening..." : "Tap on mic to speak"}</p>

      {error && <div className="error">{error}</div>}
      <div className="text-container">
        <p className="transcript">{text}</p>
        <button
          className="rest"
          onClick={handleReset}
          disabled={!text && !error}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
