import  { useEffect, useRef, useState } from 'react';

const AudioPlayer = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const fetchData = async () => {

      const byteRanges = [
        'bytes=0-1048575',       // First 1MB
        'bytes=1048576-2097151', // Second 1MB
        'bytes=2097152-3145727', // Third 1MB
      ];
      try {
        // Replace 'http://localhost:3000/stream-audio' with your server URL
        const audioFileUrl = 'http://localhost:9000/stream-audio';
        const response = await fetch(audioFileUrl, {
          headers: {
            'Range': byteRanges,
          },
        });

        // Create a Blob from the response data
        const blob = await response.blob();

        console.log({blob})

        // Create a URL for the Blob
        const audioUrl = URL.createObjectURL(blob);

        // Set the audio source
        audioRef.current.src = audioUrl;

        // Optionally, you can play the audio automatically
        // audioRef.current.play();
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    fetchData();

    // Cleanup function to revoke the Blob URL when the component is unmounted
    return () => {
      URL.revokeObjectURL(audioRef.current.src);
    };
  }, []);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <div>
      <audio ref={audioRef} controls>
        Your browser does not support the audio element.
      </audio>

      <button onClick={handlePlayPause}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  );
};

export default AudioPlayer;
