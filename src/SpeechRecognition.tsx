import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import {  FaMicrophoneAlt, FaMicrophoneAltSlash } from "react-icons/fa";

function SpeechText() {
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  const continuouslyListening = () => {
    SpeechRecognition.startListening({
      continuous: true,
    });
  };
  console.log(
    "SpeechRecognition.startListening",
    SpeechRecognition.startListening
  );
  return (
    <div className="container">
      <h1>Audio to Text</h1>
      <div className="buttons">
        
        <div
          style={{ background: `${listening ? "red" : "#d9dbf4aa"}` }}
          className="micImg"
          onClick={continuouslyListening}
        >
          <FaMicrophoneAlt size={28} />
        </div>
        <div
          style={{ background: `${listening ? "#d9dbf4aa" : "red"}` }}
          className="micImg"
          onClick={SpeechRecognition.stopListening}
        >
          <FaMicrophoneAltSlash size={28} />
        </div>
      </div>
      <div>
        <p>{listening ? "listening... " : `Stop  `}</p>
      </div>
      <div className="">
        <p id="p-text">{transcript}</p>
        <button id="resetid" onClick={resetTranscript}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default SpeechText;
