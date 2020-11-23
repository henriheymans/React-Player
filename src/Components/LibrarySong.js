import React from 'react';
import { playAudio } from '../util.js';

const LibrarySong = ({
  song,
  songs,
  setCurrentSong,
  audioRef,
  isPlaying,
  currentSong,
  setSongs,
}) => {
  const songSelectHandler = () => {
    setCurrentSong(song);
    // Add active state
    setSongs(
      songs.map((targetSong) => {
        return {
          ...targetSong,
          active: targetSong.id === song.id,
        };
      }),
    );
    playAudio(isPlaying, audioRef);
  };

  return (
    <div
      onClick={songSelectHandler}
      className={`library-song library-song-active-${song.active} ${
        isPlaying ? 'song-playing' : ''
      }`}
    >
      <img src={song.cover} alt={song.name} />
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
