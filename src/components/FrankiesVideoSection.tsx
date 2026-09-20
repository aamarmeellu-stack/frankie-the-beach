import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  RotateCcw,
  Film,
  Upload,
  Radio,
  CheckCircle2,
} from 'lucide-react';
import { FRANKIE_VIDEOS, FrankieVideoItem } from '../data/restaurantData';

const getAssetUrl = (url: string): string => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:') || url.startsWith('blob:')) return url;
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

  // Video connection status (Videos 1, 2, 3 default true, 4, 5, 6 auto-connect upon upload)
  const [videoConnected, setVideoConnected] = useState<boolean[]>(() => [
    true,
    true,
    true,
    false,
    false,
    false,
  ]);
  const [isUploading, setIsUploading] = useState<boolean[]>(() => new Array(videoCount).fill(false));
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

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

  // Check if any video is playing
  const isAnyPlaying = isPlaying.some(Boolean);

  // Poll server every 2 seconds for uploaded video files to auto-connect immediately
  useEffect(() => {
    let isMounted = true;
    const checkServerVideos = async () => {
      try {
        const res = await fetch('/api/check-videos');
        if (!res.ok) return;
        const data = await res.json();
        if (data?.videos && isMounted) {
          setVideoConnected((prev) => {
            const next = [...prev];
            let changed = false;
            for (let i = 1; i <= 6; i++) {
              const available = Boolean(data.videos[i]);
              if (next[i - 1] !== available) {
                next[i - 1] = available;
                changed = true;
                if (available && videoRefs.current[i - 1]) {
                  const el = videoRefs.current[i - 1];
                  if (el) {
                    el.src = getAssetUrl(FRANKIE_VIDEOS[i - 1]?.src || `/video-${i}-frankie.mp4`);
                    el.load();
                  }
                }
              }
            }
            return changed ? next : prev;
          });
        }
      } catch {
        // Dev server or network offline
      }
    };

    checkServerVideos();
    const interval = setInterval(checkServerVideos, 2000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // Handle direct file upload (via card button or drag & drop)
  const handleFileUpload = async (index: number, file: File) => {
    const videoNum = FRANKIE_VIDEOS[index].number;
    setIsUploading((prev) => {
      const next = [...prev];
      next[index] = true;
      return next;
    });

    // Create local object URL for instant instant playback
    const localUrl = URL.createObjectURL(file);
    const el = videoRefs.current[index];
    if (el) {
      el.src = localUrl;
      el.load();
    }
    setVideoConnected((prev) => {
      const next = [...prev];
      next[index] = true;
      return next;
    });

    try {
      await fetch(`/api/upload-video?number=${videoNum}`, {
        method: 'POST',
        body: file,
      });
    } catch (err) {
      console.error(`Upload error for video ${videoNum}:`, err);
    } finally {
      setIsUploading((prev) => {
        const next = [...prev];
        next[index] = false;
        return next;
      });
    }
  };

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

  // Play all connected videos simultaneously
  const playAllVideos = useCallback(() => {
    FRANKIE_VIDEOS.forEach((_, idx) => {
      if (videoConnected[idx]) {
        const muteThis = idx !== activeAudioIndex;
        playVideoSafe(idx, muteThis);
      }
    });
  }, [activeAudioIndex, playVideoSafe, videoConnected]);

  // Pause all videos
  const pauseAllVideos = useCallback(() => {
    FRANKIE_VIDEOS.forEach((_, idx) => {
      if (videoConnected[idx]) {
        pauseVideoSafe(idx);
      }
    });
  }, [pauseVideoSafe, videoConnected]);

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
      if (videoConnected[idx]) {
        const el = videoRefs.current[idx];
        if (el) {
          el.currentTime = 0;
        }
      }
    });
    playAllVideos();
  };

  // Handle individual video play toggle
  const handleTogglePlaySingle = (index: number) => {
    if (!videoConnected[index]) return;
    const el = videoRefs.current[index];
    if (!el) return;

    if (el.paused) {
      // If sync mode is ON, playing one video plays all of them!
      if (isSyncMode) {
        setActiveAudioIndex(index);
        FRANKIE_VIDEOS.forEach((_, idx) => {
          if (videoConnected[idx]) {
            const muteThis = idx !== index;
            setIsMuted((prev) => {
              const next = [...prev];
              next[idx] = muteThis;
              return next;
            });
            playVideoSafe(idx, muteThis);
          }
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
    if (!videoConnected[targetIndex]) return;
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

  // Handle scrubber seek
  const handleSeek = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const el = videoRefs.current[index];
    if (!el) return;
    const newTime = parseFloat(e.target.value);
    el.currentTime = newTime;
    setCurrentTimes((prev) => {
      const next = [...prev];
      next[index] = newTime;
      return next;
    });
  };

  // Fullscreen toggle
  const toggleFullscreen = (index: number) => {
    const container = containerRefs.current[index];
    if (!container) return;
    if (!document.fullscreenElement) {
      container.requestFullscreen().catch((err) => {
        console.error('Error attempting fullscreen:', err);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const connectedCount = videoConnected.filter(Boolean).length;

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

  // Autoplay all videos muted when scrolled into view so the user immediately sees the live videos
  useEffect(() => {
    const section = document.getElementById('frankies-beach-videos-section');
    if (!section) return;

    let hasAutoplayed = false;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAutoplayed) {
            hasAutoplayed = true;
            // Play all connected videos muted for seamless browser compliance
            FRANKIE_VIDEOS.forEach((_, idx) => {
              if (videoConnected[idx]) {
                playVideoSafe(idx, true);
              }
            });
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [playVideoSafe, videoConnected]);

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
                  <span>PAUSE ALL {connectedCount} VIDEOS</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-black" />
                  <span>▶ PLAY ALL {connectedCount} VIDEOS SIMULTANEOUSLY</span>
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
              {FRANKIE_VIDEOS.map((video, idx) => {
                const isConn = videoConnected[idx];
                const isActive = activeAudioIndex === idx && !isMuted[idx];
                return (
                  <button
                    key={video.id}
                    type="button"
                    disabled={!isConn}
                    onClick={() => setAudioFocus(idx)}
                    className={`px-2 py-0.5 rounded text-[10px] font-heading font-black uppercase transition-all ${
                      isActive
                        ? 'bg-amber-400 text-black shadow-sm'
                        : isConn
                        ? 'bg-white/10 hover:bg-white/20 text-white/80'
                        : 'bg-white/5 text-white/30 cursor-not-allowed'
                    }`}
                    title={isConn ? `Switch sound to Video ${video.number}` : `Video ${video.number} waiting for upload`}
                  >
                    Vid {video.number}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Video Showcase Grid (Side-by-Side Live Playback) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {FRANKIE_VIDEOS.map((video: FrankieVideoItem, index: number) => {
            const isConn = videoConnected[index];
            const videoIsPlaying = isPlaying[index] || false;
            const videoIsMuted = isMuted[index] ?? true;
            const videoCurrentTime = currentTimes[index] || 0;
            const videoDuration = durations[index] || 0;
            const hasAudio = activeAudioIndex === index && !videoIsMuted;

            return (
              <div
                key={video.id}
                id={`card-video-${video.number}`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOverIndex(index);
                }}
                onDragLeave={() => setDragOverIndex(null)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOverIndex(null);
                  if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                    handleFileUpload(index, e.dataTransfer.files[0]);
                  }
                }}
                className={`bg-gradient-to-b from-[#113A6B] to-[#0A2647] rounded-3xl p-4 sm:p-5 border-2 shadow-2xl flex flex-col justify-between transition-all group ${
                  dragOverIndex === index
                    ? 'border-[#FFD700] ring-4 ring-[#FFD700]/30 scale-[1.01]'
                    : isConn
                    ? 'border-white/20 hover:border-[#ECD87A]/80'
                    : 'border-amber-400/40 hover:border-amber-400/70'
                }`}
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

                  {/* Playing Live or Auto-Connect Ready Badge */}
                  <div>
                    {isConn ? (
                      videoIsPlaying ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[10px] font-black uppercase tracking-wider animate-pulse">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          <span>LIVE</span>
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold uppercase text-white/70 px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-400/30 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          <span>Connected</span>
                        </span>
                      )
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 text-[10px] font-black uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                        <span>Auto-Connect</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Video Player or Awaiting Upload Frame */}
                {isConn ? (
                  <div
                    ref={(el) => {
                      containerRefs.current[index] = el;
                    }}
                    className="relative rounded-2xl overflow-hidden bg-black aspect-video sm:aspect-[4/3] md:aspect-video border border-white/25 shadow-inner flex flex-col justify-end group/player"
                  >
                    {/* HTML5 Video Element */}
                    <video
                      ref={(el) => {
                        videoRefs.current[index] = el;
                      }}
                      src={getAssetUrl(video.src)}
                      poster={getAssetUrl(video.poster)}
                      playsInline
                      preload="auto"
                      loop
                      muted={videoIsMuted}
                      onCanPlay={() => {
                        setVideoConnected((prev) => {
                          const next = [...prev];
                          next[index] = true;
                          return next;
                        });
                      }}
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
                      onError={() => {
                        const el = videoRefs.current[index];
                        if (!el) return;
                        const attempt = Number(el.dataset.attemptCount || '0');
                        el.dataset.attemptCount = String(attempt + 1);

                        if (attempt === 0) {
                          el.src = getAssetUrl(`/video${video.number}frankie.mp4`);
                          el.load();
                        } else if (attempt === 1) {
                          el.src = getAssetUrl(video.fallbackSrc);
                          el.load();
                        } else if (attempt === 2) {
                          el.src = getAssetUrl(encodeURI(video.fallbackSrc));
                          el.load();
                        }
                      }}
                      className="w-full h-full object-cover absolute inset-0 cursor-pointer"
                      onClick={() => handleTogglePlaySingle(index)}
                    >
                      <source src={getAssetUrl(video.src)} type="video/mp4" />
                      <source src={getAssetUrl(`/video${video.number}frankie.mp4`)} type="video/mp4" />
                      <source src={getAssetUrl(video.fallbackSrc)} type="video/mp4" />
                      <source src={getAssetUrl(encodeURI(video.fallbackSrc))} type="video/mp4" />
                      Your browser does not support video playback.
                    </video>

                    {/* Big Center Play Overlay when paused */}
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
                          {isSyncMode ? `CLICK HERE (ALL PLAY) 🎬` : `CLICK HERE TO PLAY VID ${video.number}`}
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
                ) : (
                  /* Auto-Connect Waiting Frame (Waiting for upload or drop) */
                  <div
                    ref={(el) => {
                      containerRefs.current[index] = el;
                    }}
                    className="relative rounded-2xl overflow-hidden bg-black/60 aspect-video sm:aspect-[4/3] md:aspect-video border-2 border-dashed border-amber-400/50 flex flex-col items-center justify-center p-4 text-center group-hover:border-amber-400 transition-all"
                  >
                    {/* Hidden background video that automatically triggers when file is placed */}
                    <video
                      ref={(el) => {
                        videoRefs.current[index] = el;
                      }}
                      src={getAssetUrl(video.src)}
                      preload="auto"
                      muted
                      className="hidden"
                      onCanPlay={() => {
                        setVideoConnected((prev) => {
                          const next = [...prev];
                          next[index] = true;
                          return next;
                        });
                      }}
                    />

                    <div className="w-12 h-12 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center mb-2 shadow-inner">
                      <Upload className="w-6 h-6 text-[#FFD700] animate-bounce" />
                    </div>

                    <h5 className="font-heading font-black text-white text-sm uppercase tracking-wide">
                      Video {video.number} Ready to Connect
                    </h5>
                    <p className="text-[11px] text-[#C2D8F2] mt-0.5 font-mono">
                      {video.fallbackSrc.replace('/', '')}
                    </p>

                    {/* Direct Upload Button */}
                    <label className="mt-3 cursor-pointer inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#ECD87A] via-[#FFD700] to-[#E5A823] hover:scale-105 active:scale-95 text-black font-heading font-black text-xs uppercase tracking-wider shadow-lg transition-all">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{isUploading[index] ? 'Uploading...' : `Upload Video ${video.number}`}</span>
                      <input
                        type="file"
                        accept="video/*"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleFileUpload(index, e.target.files[0]);
                          }
                        }}
                      />
                    </label>

                    <p className="text-[10px] text-white/50 mt-2">
                      Drop file here or upload to root / public folder — auto-connects!
                    </p>
                  </div>
                )}

                {/* Video Info & Action */}
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

                  {/* Card Bottom Action */}
                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[11px] text-white/60">
                      {isConn ? (videoIsPlaying ? 'Playing Now 🔊' : 'Ready') : 'Waiting for file'}
                    </span>

                    {isConn ? (
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
                    ) : (
                      <label className="cursor-pointer px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-heading font-black text-xs uppercase tracking-wider transition-all flex items-center gap-1 shadow-md">
                        <Upload className="w-3 h-3" />
                        <span>Upload</span>
                        <input
                          type="file"
                          accept="video/*"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              handleFileUpload(index, e.target.files[0]);
                            }
                          }}
                        />
                      </label>
                    )}
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
