import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  RotateCcw,
  Film,
} from 'lucide-react';
import { FRANKIE_VIDEOS, FrankieVideoItem } from '../data/restaurantData';

const getAssetUrl = (url: string): string => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) return url;
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
  const cleanUrl = url.startsWith('/') ? url : `/${url}`;
  return `${cleanBase}${cleanUrl}`;
};

export const FrankiesVideoSection: React.FC = () => {
  const videoCount = FRANKIE_VIDEOS.length;

  // Refs for each video element and container
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Playback states for each video index
  const [isPlaying, setIsPlaying] = useState<boolean[]>(() =>
    new Array(videoCount).fill(false)
  );
  // Video 1 has sound by default, others muted for seamless browser simultaneous playback
  const [isMuted, setIsMuted] = useState<boolean[]>(() =>
    FRANKIE_VIDEOS.map((_, i) => i !== 0)
  );
  const [currentTimes, setCurrentTimes] = useState<number[]>(() =>
    new Array(videoCount).fill(0)
  );
  const [durations, setDurations] = useState<number[]>(() =>
    new Array(videoCount).fill(0)
  );
  const [isSyncMode, setIsSyncMode] = useState<boolean>(true); // Playing one plays all!
  const [activeAudioIndex, setActiveAudioIndex] = useState<number>(0); // Which video has active unmuted sound

  // Keep state arrays in sync if video count changes
  useEffect(() => {
    setIsPlaying((prev) =>
      prev.length === videoCount ? prev : new Array(videoCount).fill(false)
    );
    setIsMuted((prev) =>
      prev.length === videoCount
        ? prev
        : FRANKIE_VIDEOS.map((_, i) => i !== 0)
    );
    setCurrentTimes((prev) =>
      prev.length === videoCount ? prev : new Array(videoCount).fill(0)
    );
    setDurations((prev) =>
      prev.length === videoCount ? prev : new Array(videoCount).fill(0)
    );
  }, [videoCount]);

  // Check if any video is playing
  const isAnyPlaying = isPlaying.some(Boolean);

  // Safely play a video element
  const playVideoSafe = useCallback(async (index: number, shouldMute: boolean) => {
    const el = videoRefs.current[index];
    if (!el) return;
    try {
      el.muted = shouldMute;
      if (!shouldMute) {
        el.volume = 1.0;
      }
      await el.play();
      setIsPlaying((prev) => {
        const next = [...prev];
        next[index] = true;
        return next;
      });
    } catch (err) {
      console.log(`Playback attempt on video ${index + 1}:`, err);
      try {
        el.muted = true;
        await el.play();
        setIsPlaying((prev) => {
          const next = [...prev];
          next[index] = true;
          return next;
        });
        setIsMuted((prev) => {
          const next = [...prev];
          next[index] = true;
          return next;
        });
      } catch (fallbackErr) {
        console.warn(`Could not start video ${index + 1}:`, fallbackErr);
      }
    }
  }, []);

  // Safely pause a video element
  const pauseVideoSafe = useCallback((index: number) => {
    const el = videoRefs.current[index];
    if (!el) return;
    el.pause();
    setIsPlaying((prev) => {
      const next = [...prev];
      next[index] = false;
      return next;
    });
  }, []);

  // Play all videos simultaneously
  const playAllVideos = useCallback(() => {
    FRANKIE_VIDEOS.forEach((_, idx) => {
      const muteThis = idx !== activeAudioIndex;
      playVideoSafe(idx, muteThis);
    });
  }, [activeAudioIndex, playVideoSafe]);

  // Pause all videos
  const pauseAllVideos = useCallback(() => {
    FRANKIE_VIDEOS.forEach((_, idx) => {
      pauseVideoSafe(idx);
    });
  }, [pauseVideoSafe]);

  // Toggle Play / Pause for all videos
  const togglePlayAll = () => {
    if (isAnyPlaying) {
      pauseAllVideos();
    } else {
      playAllVideos();
    }
  };

  // Restart all videos from beginning
  const restartAllVideos = () => {
    FRANKIE_VIDEOS.forEach((_, idx) => {
      const el = videoRefs.current[idx];
      if (el) {
        el.currentTime = 0;
      }
    });
    playAllVideos();
  };

  // Handle individual video play toggle
  const handleTogglePlaySingle = (index: number) => {
    const el = videoRefs.current[index];
    if (!el) return;

    if (el.paused) {
      // If sync mode is ON, playing one video plays all of them!
      if (isSyncMode) {
        setActiveAudioIndex(index);
        FRANKIE_VIDEOS.forEach((_, idx) => {
          const muteThis = idx !== index;
          setIsMuted((prev) => {
            const next = [...prev];
            next[idx] = muteThis;
            return next;
          });
          playVideoSafe(idx, muteThis);
        });
      } else {
        playVideoSafe(index, false);
      }
    } else {
      if (isSyncMode) {
        pauseAllVideos();
      } else {
        pauseVideoSafe(index);
      }
    }
  };

  // Switch sound focus to a specific video
  const setAudioFocus = (targetIndex: number) => {
    setActiveAudioIndex(targetIndex);
    FRANKIE_VIDEOS.forEach((_, idx) => {
      const el = videoRefs.current[idx];
      if (el) {
        if (idx === targetIndex) {
          el.muted = false;
          el.volume = 1.0;
        } else {
          el.muted = true;
        }
      }
    });
    setIsMuted(FRANKIE_VIDEOS.map((_, i) => i !== targetIndex));
  };

  // Toggle Mute on a specific video
  const toggleMuteSingle = (index: number) => {
    const el = videoRefs.current[index];
    if (!el) return;
    const nextMuted = !el.muted;
    el.muted = nextMuted;
    if (!nextMuted) {
      el.volume = 1.0;
      setActiveAudioIndex(index);
      FRANKIE_VIDEOS.forEach((_, idx) => {
        if (idx !== index && videoRefs.current[idx]) {
          videoRefs.current[idx]!.muted = true;
        }
      });
      setIsMuted((prev) => prev.map((_, i) => i !== index));
    } else {
      setIsMuted((prev) => {
        const next = [...prev];
        next[index] = true;
        return next;
      });
    }
  };

  // Seek video
  const handleSeek = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const targetTime = parseFloat(e.target.value);
    const el = videoRefs.current[index];
    if (el) {
      el.currentTime = targetTime;
    }
    setCurrentTimes((prev) => {
      const next = [...prev];
      next[index] = targetTime;
      return next;
    });
  };

  // Fullscreen container
  const toggleFullscreen = (index: number) => {
    const container = containerRefs.current[index];
    if (!container) return;
    if (!document.fullscreenElement) {
      container.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Listen to custom global event: 'play-all-frankie-videos' (triggered by Watch Videos button)
  useEffect(() => {
    const handleGlobalPlayAll = () => {
      setTimeout(() => {
        playAllVideos();
      }, 300);
    };

    window.addEventListener('play-all-frankie-videos', handleGlobalPlayAll);
    return () => {
      window.removeEventListener('play-all-frankie-videos', handleGlobalPlayAll);
    };
  }, [playAllVideos]);

  return (
    <section
      id="frankies-beach-videos-section"
      aria-label="Frankie's Beach Videos Section"
      className="py-16 sm:py-20 bg-gradient-to-b from-[#0A2647] via-[#0E355E] to-[#0A223E] text-white relative overflow-hidden border-t-4 border-[#ECD87A]"
    >
      {/* Decorative Seaside Ambient Lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#0084FF]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#ECD87A]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-[#ECD87A]/40 text-[#ECD87A] text-xs font-black uppercase tracking-widest mb-3 backdrop-blur-md shadow-lg">
            <Film className="w-3.5 h-3.5" />
            <span>FRANKIE'S BEACH MOMENTS 🎥 • LIVE VIDEOS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-heading tracking-tight uppercase leading-tight">
            FRANKIE'S AT THE BEACH IN ACTION
          </h2>

          <p className="mt-3 text-sm sm:text-base text-[#C2D8F2] max-w-2xl mx-auto leading-relaxed">
            Watch real moments captured live on Ramsgate Sands — feel the sea breeze, sizzle on the grill, and friendly seaside coastal energy!
          </p>
        </div>

        {/* Master Control Bar */}
        <div className="bg-white/10 border-2 border-[#ECD87A]/60 rounded-2xl p-4 sm:p-5 backdrop-blur-md shadow-2xl mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Left: Master Play/Pause & Restart Buttons */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-center md:justify-start">
            <button
              type="button"
              id="btn-play-all-videos"
              onClick={togglePlayAll}
              className="bg-gradient-to-r from-[#ECD87A] via-[#FFD700] to-[#E5A823] hover:brightness-110 active:scale-95 text-black font-heading font-black text-xs sm:text-sm uppercase tracking-wider px-5 sm:px-6 py-3 rounded-xl shadow-[0_4px_16px_rgba(236,216,122,0.4)] flex items-center gap-2.5 transition-all cursor-pointer border border-white"
              title={isAnyPlaying ? 'Click Here to Pause all videos' : 'Click Here to Play all videos simultaneously'}
            >
              {isAnyPlaying ? (
                <>
                  <Pause className="w-4 h-4 fill-black" />
                  <span>PAUSE ALL {FRANKIE_VIDEOS.length} VIDEOS</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-black" />
                  <span>▶ PLAY ALL {FRANKIE_VIDEOS.length} VIDEOS SIMULTANEOUSLY</span>
                </>
              )}
            </button>

            <button
              type="button"
              id="btn-restart-all-videos"
              onClick={restartAllVideos}
              className="bg-white/15 hover:bg-white/25 active:scale-95 text-white font-heading font-extrabold text-xs uppercase tracking-wider px-4 py-3 rounded-xl border border-white/20 flex items-center gap-2 transition-all cursor-pointer"
              title="Restart all videos from 0:00"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restart All</span>
            </button>
          </div>

          {/* Right: Sync Status & Audio Switcher */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full md:w-auto justify-center md:justify-end text-xs">
            {/* Sync Toggle */}
            <label className="flex items-center gap-2 cursor-pointer bg-black/40 px-3 py-1.5 rounded-lg border border-white/20 select-none hover:bg-black/60 transition-colors">
              <input
                type="checkbox"
                checked={isSyncMode}
                onChange={(e) => setIsSyncMode(e.target.checked)}
                className="w-4 h-4 rounded text-amber-500 accent-amber-400 cursor-pointer"
              />
              <span className="font-heading font-bold text-white uppercase text-[11px] sm:text-xs">
                Sync Playback ({isSyncMode ? 'ON' : 'OFF'})
              </span>
            </label>

            {/* Quick Audio Switcher */}
            <div className="flex items-center gap-1 bg-black/40 px-2 py-1 rounded-lg border border-white/20">
              <span className="text-[11px] text-[#ECD87A] font-bold uppercase pl-1 pr-1 flex items-center gap-1">
                <Volume2 className="w-3 h-3" />
                <span>Audio:</span>
              </span>
              {FRANKIE_VIDEOS.map((_, idx) => {
                const isActive = activeAudioIndex === idx && !isMuted[idx];
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setAudioFocus(idx)}
                    className={`px-2 py-0.5 rounded text-[10px] font-heading font-black uppercase transition-all ${
                      isActive
                        ? 'bg-amber-400 text-black shadow-sm'
                        : 'bg-white/10 hover:bg-white/20 text-white/80'
                    }`}
                    title={`Switch sound to Video ${idx + 1}`}
                  >
                    Vid {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Video Showcase Grid (Side-by-Side Live Playback) */}
        <div
          className={
            FRANKIE_VIDEOS.length <= 2
              ? 'grid grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto gap-6 sm:gap-8'
              : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'
          }
        >
          {FRANKIE_VIDEOS.map((video: FrankieVideoItem, index: number) => {
            const videoIsPlaying = isPlaying[index] || false;
            const videoIsMuted = isMuted[index] ?? true;
            const videoCurrentTime = currentTimes[index] || 0;
            const videoDuration = durations[index] || 0;
            const hasAudio = activeAudioIndex === index && !videoIsMuted;

            return (
              <div
                key={video.id}
                id={`card-video-${video.number}`}
                className="bg-gradient-to-b from-[#113A6B] to-[#0A2647] rounded-3xl p-4 sm:p-5 border-2 border-white/20 shadow-2xl flex flex-col justify-between hover:border-[#ECD87A]/80 transition-all group"
              >
                {/* Card Top Title Row */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#ECD87A] text-black text-xs font-heading font-black uppercase px-2.5 py-1 rounded-md shadow-sm">
                      Video {video.number}
                    </span>
                    <span className="bg-white/15 text-[#CBE1F8] text-[11px] font-extrabold uppercase px-2 py-0.5 rounded border border-white/15">
                      {video.tag}
                    </span>
                  </div>

                  {/* Playing Live Status Badge */}
                  <div>
                    {videoIsPlaying ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[10px] font-black uppercase tracking-wider animate-pulse">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span>LIVE</span>
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold uppercase text-white/50 px-2 py-0.5 rounded bg-white/5">
                        Ready
                      </span>
                    )}
                  </div>
                </div>

                {/* Video Player Container */}
                <div
                  ref={(el) => {
                    containerRefs.current[index] = el;
                  }}
                  className="relative rounded-2xl overflow-hidden bg-black aspect-video sm:aspect-[4/3] md:aspect-video border border-white/25 shadow-inner flex flex-col justify-end group/player"
                >
                  {/* High-definition Poster Image Preview - Always visible immediately */}
                  {video.poster && (
                    <img
                      src={getAssetUrl(video.poster)}
                      alt={video.title}
                      className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-300 pointer-events-none ${
                        videoIsPlaying ? 'opacity-0' : 'opacity-100'
                      }`}
                      loading="eager"
                    />
                  )}

                  {/* HTML5 Video Element */}
                  <video
                    ref={(el) => {
                      videoRefs.current[index] = el;
                    }}
                    src={getAssetUrl(video.src)}
                    poster={getAssetUrl(video.poster)}
                    playsInline
                    preload="metadata"
                    loop
                    muted={videoIsMuted}
                    onTimeUpdate={() => {
                      const el = videoRefs.current[index];
                      if (el) {
                        setCurrentTimes((prev) => {
                          const next = [...prev];
                          next[index] = el.currentTime;
                          return next;
                        });
                      }
                    }}
                    onLoadedMetadata={() => {
                      const el = videoRefs.current[index];
                      if (el) {
                        setDurations((prev) => {
                          const next = [...prev];
                          next[index] = el.duration;
                          return next;
                        });
                      }
                    }}
                    onPlay={() => {
                      setIsPlaying((prev) => {
                        const next = [...prev];
                        next[index] = true;
                        return next;
                      });
                    }}
                    onPause={() => {
                      setIsPlaying((prev) => {
                        const next = [...prev];
                        next[index] = false;
                        return next;
                      });
                    }}
                    onError={(e) => {
                      const el = videoRefs.current[index];
                      if (el && !el.dataset.attemptedFallback) {
                        el.dataset.attemptedFallback = '1';
                        // Try fallback source with space or URL encoded
                        el.src = getAssetUrl(video.fallbackSrc);
                        el.load();
                      } else if (el && el.dataset.attemptedFallback === '1') {
                        el.dataset.attemptedFallback = '2';
                        // Try no-dash version e.g. /video4frankie.mp4
                        el.src = getAssetUrl(`/video${video.number}frankie.mp4`);
                        el.load();
                      }
                    }}
                    className="w-full h-full object-cover absolute inset-0 cursor-pointer"
                    onClick={() => handleTogglePlaySingle(index)}
                  >
                    <source src={getAssetUrl(video.src)} type="video/mp4" />
                    <source src={getAssetUrl(video.fallbackSrc)} type="video/mp4" />
                    <source src={getAssetUrl(encodeURI(video.fallbackSrc))} type="video/mp4" />
                    <source src={getAssetUrl(`/video${video.number}frankie.mp4`)} type="video/mp4" />
                    Your browser does not support video playback.
                  </video>

                  {/* Big Center Play Overlay when this video is paused */}
                  {!videoIsPlaying && (
                    <div
                      className="absolute inset-0 bg-black/45 backdrop-blur-[1px] flex flex-col items-center justify-center cursor-pointer transition-opacity z-10 p-3"
                      onClick={() => handleTogglePlaySingle(index)}
                    >
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTogglePlaySingle(index);
                        }}
                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-[#ECD87A] via-[#FFD700] to-[#E5A823] text-black flex items-center justify-center shadow-[0_0_25px_rgba(255,215,0,0.5)] hover:scale-110 active:scale-95 transition-all border-2 border-white cursor-pointer"
                        title={`Click Here to play Video ${video.number}`}
                      >
                        <Play className="w-7 h-7 fill-current translate-x-0.5" />
                      </button>

                      <div className="mt-3 px-3 py-1 rounded-full bg-black/80 border border-white/30 text-white font-heading font-black text-[11px] uppercase tracking-wider shadow-md">
                        {isSyncMode ? `CLICK HERE (ALL ${FRANKIE_VIDEOS.length} PLAY) 🎬` : `CLICK HERE TO PLAY VID ${video.number}`}
                      </div>
                    </div>
                  )}

                  {/* Sound Status Badge on Top-Right */}
                  <div className="absolute top-2.5 right-2.5 z-20 pointer-events-none">
                    {hasAudio ? (
                      <span className="bg-emerald-500/90 text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md">
                        <Volume2 className="w-3 h-3 text-white" />
                        <span>Sound ON</span>
                      </span>
                    ) : (
                      <span className="bg-black/60 text-white/80 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md">
                        <VolumeX className="w-3 h-3 text-white/70" />
                        <span>Muted</span>
                      </span>
                    )}
                  </div>

                  {/* Bottom Video Controls Overlay */}
                  <div className="relative z-20 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-2.5 pt-6">
                    {/* Time Progress Slider */}
                    <div className="w-full flex items-center gap-2 mb-1.5">
                      <input
                        type="range"
                        min={0}
                        max={videoDuration || 100}
                        step={0.1}
                        value={videoCurrentTime}
                        onChange={(e) => handleSeek(index, e)}
                        className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-[#ECD87A]"
                        title="Seek video position"
                      />
                      <span className="text-[10px] font-mono text-white/80 shrink-0">
                        {formatTime(videoCurrentTime)}
                      </span>
                    </div>

                    {/* Bottom Controls Bar */}
                    <div className="flex items-center justify-between gap-1">
                      {/* Left: Play / Pause */}
                      <button
                        type="button"
                        onClick={() => handleTogglePlaySingle(index)}
                        className="px-2.5 py-1 rounded-md bg-amber-400 hover:bg-amber-300 text-black font-heading font-black text-[11px] uppercase tracking-wider transition-all flex items-center gap-1 cursor-pointer active:scale-95"
                        title={videoIsPlaying ? 'Pause Video' : 'Play Video'}
                      >
                        {videoIsPlaying ? (
                          <>
                            <Pause className="w-3 h-3 fill-black" />
                            <span>Pause</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3 h-3 fill-black" />
                            <span>Play</span>
                          </>
                        )}
                      </button>

                      {/* Right: Sound toggle & Fullscreen */}
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => toggleMuteSingle(index)}
                          className={`p-1.5 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                            videoIsMuted
                              ? 'bg-white/10 hover:bg-white/20 text-white/70'
                              : 'bg-emerald-500/80 text-white'
                          }`}
                          title={videoIsMuted ? 'Click to Unmute' : 'Click to Mute'}
                        >
                          {videoIsMuted ? (
                            <VolumeX className="w-3.5 h-3.5" />
                          ) : (
                            <Volume2 className="w-3.5 h-3.5" />
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => toggleFullscreen(index)}
                          className="p-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                          title="Fullscreen"
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Video Info & Click Here Action */}
                <div className="mt-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-heading font-extrabold text-base text-white leading-snug group-hover:text-[#ECD87A] transition-colors">
                      {video.title}
                    </h4>
                    <p className="text-xs text-[#B2CDE8] font-medium mt-0.5">
                      {video.subtitle}
                    </p>
                    <p className="text-xs text-[#8BAECD] mt-2 line-clamp-2 leading-relaxed">
                      {video.description}
                    </p>
                  </div>

                  {/* Card Bottom Click Here Action Button */}
                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[11px] text-white/60">
                      {videoIsPlaying ? 'Playing Now 🔊' : 'Ready'}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleTogglePlaySingle(index)}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#ECD87A] via-[#FFD700] to-[#E5A823] hover:brightness-110 active:scale-95 text-black font-heading font-black text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                      title={`Click Here to play Video ${video.number}`}
                    >
                      <span>CLICK HERE</span>
                      {videoIsPlaying ? (
                        <Pause className="w-3.5 h-3.5 fill-black" />
                      ) : (
                        <Play className="w-3.5 h-3.5 fill-black" />
                      )}
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
