import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  RotateCcw,
  Sparkles,
  Video,
  Clapperboard,
  Film,
} from 'lucide-react';
import { FRANKIE_VIDEOS, FrankieVideoItem } from '../data/restaurantData';

export const FrankiesVideoSection: React.FC = () => {
  const [activeVideoId, setActiveVideoId] = useState<string>(FRANKIE_VIDEOS[0].id);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [videoErrors, setVideoErrors] = useState<Record<string, boolean>>({});

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerContainerRef = useRef<HTMLDivElement | null>(null);

  const activeVideo =
    FRANKIE_VIDEOS.find((v) => v.id === activeVideoId) || FRANKIE_VIDEOS[0];

  // Sync state when active video changes
  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.load();
    }
  }, [activeVideoId]);

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.log('Playback error or blocked:', err);
          // If blocked with audio, try muted
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current.play().then(() => setIsPlaying(true));
          }
        });
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const restartVideo = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play().then(() => setIsPlaying(true));
  };

  const toggleFullscreen = () => {
    if (!playerContainerRef.current) return;
    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const targetTime = parseFloat(e.target.value);
    videoRef.current.currentTime = targetTime;
    setCurrentTime(targetTime);
  };

  const handleVideoSelect = (video: FrankieVideoItem) => {
    if (activeVideoId === video.id) {
      togglePlay();
    } else {
      setActiveVideoId(video.id);
      setIsPlaying(true);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current
            .play()
            .then(() => setIsPlaying(true))
            .catch(() => {});
        }
      }, 100);
    }
  };

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
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-[#ECD87A]/40 text-[#ECD87A] text-xs font-black uppercase tracking-widest mb-3 backdrop-blur-md shadow-lg">
            <Film className="w-3.5 h-3.5" />
            <span>FRANKIE'S BEACH MOMENTS 🎥</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-heading tracking-tight uppercase leading-tight">
            FRANKIE'S AT THE BEACH IN ACTION
          </h2>

          <p className="mt-3 text-sm sm:text-base text-[#C2D8F2] max-w-2xl mx-auto leading-relaxed">
            Watch real moments captured live on Ramsgate Sands — feel the sea breeze, seaside atmosphere, and friendly coastal energy.
          </p>
        </div>

        {/* 3 Video Quick Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 mb-8">
          {FRANKIE_VIDEOS.map((video) => {
            const isActive = video.id === activeVideoId;
            return (
              <button
                key={video.id}
                id={`btn-tab-${video.id}`}
                onClick={() => handleVideoSelect(video)}
                className={`flex items-center gap-2.5 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-heading font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-gradient-to-r from-[#ECD87A] via-[#FFD700] to-[#E5A823] text-black border-white shadow-[0_4px_18px_rgba(236,216,122,0.35)] scale-102'
                    : 'bg-white/10 hover:bg-white/20 text-white/90 border-white/20 hover:border-white/40'
                }`}
                title={`Click Here to watch Video ${video.number}`}
              >
                <Clapperboard
                  className={`w-4 h-4 ${isActive ? 'text-black' : 'text-[#ECD87A]'}`}
                />
                <span>Video {video.number}</span>
                {isActive && isPlaying && (
                  <span className="flex h-2 w-2 relative">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 animate-ping opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600" />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Cinema Video Player Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Stage Cinema Player (8 Cols on Desktop) */}
          <div className="lg:col-span-8">
            <div
              ref={playerContainerRef}
              className="relative rounded-3xl overflow-hidden bg-black shadow-2xl border-2 border-white/20 aspect-video flex flex-col justify-end group"
            >
              {/* Video Element */}
              <video
                ref={videoRef}
                key={activeVideo.src}
                playsInline
                preload="metadata"
                loop
                muted={isMuted}
                onTimeUpdate={() => {
                  if (videoRef.current) {
                    setCurrentTime(videoRef.current.currentTime);
                  }
                }}
                onLoadedMetadata={() => {
                  if (videoRef.current) {
                    setDuration(videoRef.current.duration);
                  }
                }}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onError={() => {
                  // If safe URL fails, try space-encoded fallback
                  if (videoRef.current && videoRef.current.src !== activeVideo.fallbackSrc) {
                    videoRef.current.src = activeVideo.fallbackSrc;
                    videoRef.current.load();
                  } else {
                    setVideoErrors((prev) => ({ ...prev, [activeVideo.id]: true }));
                  }
                }}
                className="w-full h-full object-cover object-center absolute inset-0 cursor-pointer"
                onClick={togglePlay}
              >
                <source src={activeVideo.src} type="video/mp4" />
                <source src={activeVideo.fallbackSrc} type="video/mp4" />
                Your browser does not support HTML5 video.
              </video>

              {/* Big Center Play Button Overlay when paused */}
              {!isPlaying && (
                <div
                  className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex flex-col items-center justify-center cursor-pointer transition-opacity z-10"
                  onClick={togglePlay}
                >
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlay();
                    }}
                    id="btn-video-center-play"
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-r from-[#ECD87A] via-[#FFD700] to-[#E5A823] text-black flex items-center justify-center shadow-[0_0_30px_rgba(255,215,0,0.5)] hover:scale-110 active:scale-95 transition-all border-4 border-white cursor-pointer group"
                    title="Click Here to start video"
                    aria-label="Click Here to start video"
                  >
                    <Play className="w-9 h-9 sm:w-11 sm:h-11 fill-current translate-x-1" />
                  </button>

                  <div className="mt-4 px-4 py-1.5 rounded-full bg-black/75 border border-white/30 text-white font-heading font-black text-xs uppercase tracking-wider shadow-lg flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#ECD87A]" />
                    <span>Click Here 🔊</span>
                  </div>
                </div>
              )}

              {/* Top Watermark & Video Title Pill */}
              <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
                <div className="flex items-center gap-2 bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-white text-xs font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{activeVideo.tag}</span>
                </div>

                <div className="bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-[#ECD87A] text-[11px] font-extrabold uppercase tracking-wider">
                  Video {activeVideo.number} of 3
                </div>
              </div>

              {/* Bottom Custom Video Player Bar */}
              <div className="relative z-20 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-3 sm:p-5 pt-10">
                {/* Seek / Progress Slider */}
                <div className="w-full flex items-center gap-2 mb-2">
                  <input
                    type="range"
                    min={0}
                    max={duration || 100}
                    step={0.1}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-1.5 bg-white/30 rounded-lg appearance-none cursor-pointer accent-[#ECD87A]"
                    title="Seek video position"
                  />
                  <span className="text-[11px] font-mono text-white/80 shrink-0">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                {/* Player Controls Row */}
                <div className="flex items-center justify-between gap-2">
                  {/* Left: Play/Pause & Click Here action */}
                  <div className="flex items-center gap-2 sm:gap-3">
                    <button
                      type="button"
                      id="btn-player-play-toggle"
                      onClick={togglePlay}
                      className="px-3.5 sm:px-4 py-1.5 rounded-lg bg-gradient-to-r from-[#ECD87A] via-[#FFD700] to-[#E5A823] hover:brightness-110 active:scale-95 text-black font-heading font-black text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                      title={isPlaying ? 'Click Here to pause' : 'Click Here to play'}
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="w-3.5 h-3.5 fill-black" />
                          <span>Stop Video</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-black" />
                          <span>Click Here 🔊</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      id="btn-player-restart"
                      onClick={restartVideo}
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/90 hover:text-white transition-colors cursor-pointer"
                      title="Restart Video from beginning"
                      aria-label="Restart Video"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Right: Sound Toggle & Fullscreen */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      id="btn-player-mute-toggle"
                      onClick={toggleMute}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
                        isMuted
                          ? 'bg-red-500/20 text-red-300 border-red-400/40 hover:bg-red-500/30'
                          : 'bg-white/15 text-white border-white/20 hover:bg-white/25'
                      }`}
                      title={isMuted ? 'Click to Unmute' : 'Click to Mute'}
                    >
                      {isMuted ? (
                        <>
                          <VolumeX className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Unmute</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="hidden sm:inline">Sound On</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      id="btn-player-fullscreen"
                      onClick={toggleFullscreen}
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                      title="Toggle Fullscreen"
                      aria-label="Toggle Fullscreen"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Video Info Banner */}
            <div className="mt-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-heading font-extrabold text-base sm:text-lg text-white">
                  {activeVideo.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#B6D0ED] mt-0.5">
                  {activeVideo.subtitle}
                </p>
              </div>

              <button
                type="button"
                onClick={togglePlay}
                id="btn-video-hero-action"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#ECD87A] via-[#FFD700] to-[#E5A823] text-black font-heading font-extrabold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-md flex items-center gap-2 cursor-pointer shrink-0"
                title="Click Here"
              >
                <Video className="w-4 h-4 text-black" />
                <span>Click Here</span>
              </button>
            </div>
          </div>

          {/* Right Column: 3 Video Playlist Cards (4 Cols on Desktop) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="flex items-center justify-between pb-1 border-b border-white/10">
              <span className="font-heading font-extrabold text-sm uppercase tracking-wider text-[#ECD87A] flex items-center gap-1.5">
                <Film className="w-4 h-4" />
                <span>All 3 Videos</span>
              </span>
              <span className="text-xs text-white/70">Tap card to play</span>
            </div>

            {FRANKIE_VIDEOS.map((video) => {
              const isActive = video.id === activeVideoId;

              return (
                <div
                  key={video.id}
                  id={`card-video-${video.number}`}
                  onClick={() => handleVideoSelect(video)}
                  className={`p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between group ${
                    isActive
                      ? 'bg-[#0048B8]/40 border-[#ECD87A] shadow-[0_8px_24px_rgba(0,112,224,0.3)] ring-1 ring-[#ECD87A]/50'
                      : 'bg-white/5 hover:bg-white/10 border-white/15 hover:border-white/30'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    {/* Video Badge / Thumbnail Icon */}
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border transition-transform group-hover:scale-105 ${
                        isActive
                          ? 'bg-gradient-to-br from-[#ECD87A] to-[#D1A03F] text-black border-white shadow-md'
                          : 'bg-white/10 text-[#ECD87A] border-white/20'
                      }`}
                    >
                      {isActive && isPlaying ? (
                        <Pause className="w-5 h-5 fill-current" />
                      ) : (
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      )}
                    </div>

                    {/* Meta info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[11px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-white/10 text-[#ECD87A]">
                          {video.tag}
                        </span>
                        <span className="text-[11px] font-mono text-white/60">
                          Video #{video.number}
                        </span>
                      </div>

                      <h4 className="font-heading font-bold text-sm text-white mt-1.5 leading-snug group-hover:text-[#ECD87A] transition-colors truncate">
                        {video.title}
                      </h4>

                      <p className="text-xs text-[#A9C7E8] mt-0.5 line-clamp-2 leading-relaxed">
                        {video.description}
                      </p>
                    </div>
                  </div>

                  {/* Card Action Row */}
                  <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[11px] text-white/70">
                      {isActive && isPlaying ? 'Now Playing 🔊' : 'Ready to watch'}
                    </span>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleVideoSelect(video);
                      }}
                      className={`px-3 py-1 rounded-lg text-xs font-heading font-black uppercase tracking-wider transition-all flex items-center gap-1 cursor-pointer ${
                        isActive
                          ? 'bg-[#ECD87A] text-black hover:bg-[#ffe680]'
                          : 'bg-white/15 hover:bg-white/25 text-white'
                      }`}
                      title={`Click Here to watch Video ${video.number}`}
                    >
                      <span>Click Here</span>
                      <Play className="w-3 h-3 fill-current" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
