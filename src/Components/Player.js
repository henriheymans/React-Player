import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { playAudio } from '../util.js';
import {
  faPlay,
  faPause,
  faAngleLeft,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';

const Player = ({
  audioRef,
  currentSong,
  isPlaying,
  setIsPlaying,
  songInfos,
  setSongInfos,
  songs,
  setCurrentSong,
  setSongs,
}) => {
  useEffect(() => {
    setSongs(
      songs.map((targetSong) => {
        return {
          ...targetSong,
          active: targetSong.id === currentSong.id,
        };
      }),
    );
  }, [currentSong]);

  // EVENT HANDLERS
  const playSongHandler = () => {
    const currentSong = audioRef.current;
    // Ref
    if (isPlaying) {
      currentSong.pause();
    } else {
      currentSong.play();
    }
    setIsPlaying(!isPlaying);
  };

  const getTime = (time) => {
    return (
      Math.floor(time / 60) +
      ':' +
      ('0' + Math.floor(time % 60)).slice(-2)
    );
  };

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfos({
      ...songInfos,
      currentTime: e.target.value,
    });
  };

  const skipTrackHandler = (direction) => {
    let currentIndex = songs.findIndex(
      (song) => song.id === currentSong.id,
    );
    if (
      direction === 'skip-forward' &&
      currentIndex < songs.length - 1
    ) {
      setCurrentSong(songs[currentIndex + 1]);
    } else if (direction === 'skip-back' && currentIndex > 0) {
      setCurrentSong(songs[currentIndex - 1]);
    }
    playAudio(isPlaying, audioRef);
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfos.currentTime)}</p>
        <input
          min={0}
          max={songInfos.duration || 0}
          value={songInfos.currentTime}
          type="range"
          onChange={dragHandler}
        />
        <p>
          {songInfos.duration ? getTime(songInfos.duration) : '0:00'}
        </p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => skipTrackHandler('skip-back')}
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
        />

        <FontAwesomeIcon
          className="play"
          onClick={playSongHandler}
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          onClick={() => skipTrackHandler('skip-forward')}
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
    </div>
  );
};

export default Player;
