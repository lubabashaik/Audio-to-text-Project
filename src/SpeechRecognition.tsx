import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

function SpeechText() {
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  const continuouslyListening = () => {
    SpeechRecognition.startListening({
      continuous: true,
    });
  };
  return (
    <div className="container">
      <h1>Audio to Text</h1>
      <div className="micImg">
        <img src="mic.svg" alt="mic" id="micimg" />
      </div>
      <div>
        <p>Microphone{listening ? " on " : " off "}</p>
      </div>
      <div className="buttons">
        <button id="startid" onClick={continuouslyListening}>
          Start
        </button>
        <button id="stopid" onClick={SpeechRecognition.stopListening}>
          Stop
        </button>
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
