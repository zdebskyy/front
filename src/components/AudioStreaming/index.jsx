import { useRef, useState, useEffect } from 'react';

const AudioStreaming = () => {
  const [audioFiles, setAudioFiles] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRefs = useRef([]);

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;

    if (selectedFiles.length > 0) {
      setAudioFiles([...audioFiles, ...selectedFiles]);
    }
  };

  const handlePlayPause = (index) => {
    const audioRef = audioRefs.current[index];

    if (audioRef.paused) {
      audioRef.play().catch((error) => {
        console.error('Error playing audio:', error);
      });
    } else {
      audioRef.pause();
    }
  };

  const handlePlayAll = () => {
    audioRefs.current.forEach((audioRef) => {
      if (audioRef && audioRef.paused) {
        audioRef.play().catch((error) => {
          console.error('Error playing audio:', error);
        });
      }
    });
  };

  const handlePauseAll = () => {
    audioRefs.current.forEach((audioRef) => {
      if (audioRef && !audioRef.paused) {
        audioRef.pause();
      }
    });
  };

  const handleScrubberChange = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);

    audioRefs.current.forEach((audioRef) => {
      if (audioRef) {
        audioRef.currentTime = newTime;
      }
    });
  };

  const handleTimeUpdate = (e, index) => {
    const audioRef = audioRefs.current[index];
    if (audioRef) {
      setCurrentTime(audioRef.currentTime);
    }
  };

  useEffect(() => {
    audioFiles.forEach((audioFile, index) => {
      const audioRef = audioRefs.current[index];
      if (audioRef) {
        audioRef.src = URL.createObjectURL(audioFile);
      }
    });
  }, [audioFiles]);

  return (
    <div>
      <input type="file" accept="audio/*" onChange={handleFileChange} multiple />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
        <div style={{ marginTop: '10px', textAlign: 'center' }}>
          <button onClick={handlePlayAll}>Play All</button>
          <button onClick={handlePauseAll}>Pause All</button>
        </div>
        <input
          type="range"
          value={currentTime}
          max={Math.max(...audioRefs.current.map((ref) => ref && ref.duration))}
          onChange={handleScrubberChange}
          style={{ width: '100%', marginTop: '10px' }}
        />
        {audioFiles.map((audio, index) => (
          <div key={index} style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center', width: '100%' }}>
            <audio
              ref={(audioRef) => (audioRefs.current[index] = audioRef)}
              controls
              onTimeUpdate={(e) => handleTimeUpdate(e, index)}
              style={{ width: '100%' }}
            >
              Your browser does not support the audio element.
            </audio>
            <div>
              <button onClick={() => handlePlayPause(index)}>
                {audioRefs.current[index] && !audioRefs.current[index].paused ? 'Pause' : 'Play'}
              </button>
            </div>
            <p>{audio.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AudioStreaming;
