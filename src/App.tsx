import './App.css';
import { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';

function App() {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const webcamRef = useRef<Webcam | null>(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot() ?? null;
    setImgSrc(imageSrc);
  }, [webcamRef]);

  const retake = () => {
    setImgSrc(null);
  };

  return (
    <div className="App">
      <div className="container">
        {imgSrc ? (
          <img src={imgSrc} alt="webcam" />
        ) : (
          <Webcam height={600} width={600} ref={webcamRef} />
        )}
        <div className="btn-container">
          {imgSrc ? (
            <button onClick={retake}>Retake photo</button>
          ) : (
            <button onClick={capture}>Capture photo</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
