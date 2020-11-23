import React, { useState, useRef } from 'react';
import './styles/app.scss';
import Player from './Components/Player';
import Song from './Components/Song';
import Library from './Components/Library';
import Nav from './Components/Nav';
// Import utils
import data from './data';

function App() {
  //Ref
  const audioRef = useRef(null);
  // State
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[2]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfos, setSongInfos] = useState({
    currentTime: 0,
    duration: 0,
  });
  const [libraryExpanded, setLibraryExpanded] = useState(false);

  const timeUpdateHandler = (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfos({
      ...songInfos,
      currentTime,
      duration,
    });
  };

  return (
    <div className={`App ${libraryExpanded ? 'library-opened' : ''}`}>
      <div className="player-container">
        <Nav
          libraryExpanded={libraryExpanded}
          setLibraryExpanded={setLibraryExpanded}
        />
        <Song isPlaying={isPlaying} currentSong={currentSong} />
        <Player
          songs={songs}
          audioRef={audioRef}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          currentSong={currentSong}
          setSongInfos={setSongInfos}
          songInfos={songInfos}
          setCurrentSong={setCurrentSong}
          setSongs={setSongs}
        />
      </div>
      <Library
        audioRef={audioRef}
        songs={songs}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        currentSong={currentSong}
        setSongs={setSongs}
      />
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
      ></audio>
    </div>
  );
}

export default App;
