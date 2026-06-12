import React, { useState, useEffect, useRef } from 'react';
import VideoCard from './VideoCard';

const MOCK_VIDEOS = [
    {
      id: 1,
      title: "Exploring Oceans - Beautiful Coastline and Marine Life Cinematic",
      channelName: "Oceanic Foundation",
      channelAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=Ocean",
      views: "1.2M views",
      uploadedAt: "2 days ago",
      thumbnailUrl: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?q=80&w=400&auto=format&fit=crop",
      videoUrl: "https://www.youtube.com/embed/Q7AYc2kECDI" // 🟢 Clean Ocean Video 1
    },
    {
      id: 2,
      title: "Deep Sea Marine Exploration - Alternate Segment Video 2",
      channelName: "Oceanic Foundation",
      channelAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=Ocean",
      views: "450K views",
      uploadedAt: "1 week ago",
      thumbnailUrl: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=400&auto=format&fit=crop",
      videoUrl: "https://www.youtube.com/embed/kmy_YNhl0mw" // 🟢 Clean Ocean Video 2
    },
    {
      id: 3,
      title: "Coastal Coral Reef Ecosystems and Preservation Video 3",
      channelName: "Oceanic Foundation",
      channelAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=Ocean",
      views: "890K views",
      uploadedAt: "3 weeks ago",
      thumbnailUrl: "https://images.unsplash.com/photo-1546026423-cc4642628d2b?q=80&w=400&auto=format&fit=crop",
      videoUrl: "https://www.youtube.com/embed/ZBCUegTZF7M" // 🟢 Clean Ocean Video 3
    },
    {
      id: 4,
      title: "Pacific Coastline Surf Drone View Sequence Video 4",
      channelName: "Oceanic Foundation",
      channelAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=Ocean",
      views: "2.3M views",
      uploadedAt: "5 years ago",
      thumbnailUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400&auto=format&fit=crop",
      videoUrl: "https://www.youtube.com/embed/_ivIUCSOZ78" // 🟢 Clean Ocean Video 4
    }
  ];

  const Home = () => {
    const [activeVideoIndex, setActiveVideoIndex] = useState(null);
    const [hasStartedPlaying, setHasStartedPlaying] = useState(false);
    const [selectedVideoIndex, setSelectedVideoIndex] = useState(null);
    
    const playerRef = useRef(null);
    const containerId = "youtube-player-container";
  
    // 1. Background Grid Feed Auto-Cycle Preview Engine
    useEffect(() => {
      if (!hasStartedPlaying || selectedVideoIndex !== null) return;
  
      const interval = setInterval(() => {
        setActiveVideoIndex((prevIndex) => {
          if (prevIndex === null) return 0;
          return prevIndex < MOCK_VIDEOS.length - 1 ? prevIndex + 1 : 0;
        });
      }, 10000);
  
      return () => clearInterval(interval);
    }, [hasStartedPlaying, selectedVideoIndex]);
  
    // 2. YouTube JavaScript SDK Orchestration Layer
    useEffect(() => {
      if (selectedVideoIndex === null) {
        playerRef.current = null;
        return;
      }
  
      const videoId = extractVideoId(MOCK_VIDEOS[selectedVideoIndex].videoUrl);
      if (!videoId) return;
  
      // Initialize or Update YouTube API Player instance
      const initPlayer = () => {
        if (playerRef.current && typeof playerRef.current.loadVideoById === 'function') {
          playerRef.current.loadVideoById({
            videoId: videoId,
            startSeconds: 0
          });
        } else if (window.YT && window.YT.Player) {
          playerRef.current = new window.YT.Player(containerId, {
            videoId: videoId,
            playerVars: {
              autoplay: 1,
              mute: 0, // Muting bypasses structural browser blocks instantly
              controls: 1,
              rel: 0,
              modestbranding: 1
            },
            events: {
              onReady: (event) => {
                event.target.playVideo();
              },
              onStateChange: (event) => {
                // Automatically triggers "Next Video" action when video finishes (state 0 = Ended)
                if (event.data === window.YT.PlayerState.ENDED) {
                  handleNextVideo();
                }
              }
            }
          });
        }
      };
  
      // Lazy load the global script element if missing
      if (!window.YT) {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        window.onYouTubeIframeAPIReady = initPlayer;
      } else {
        // Small delay to let the DOM target element clear out and mount securely
        const timeout = setTimeout(initPlayer, 100);
        return () => clearTimeout(timeout);
      }
    }, [selectedVideoIndex]);
  
    const handleUserHover = (index) => {
      setHasStartedPlaying(true);
      setActiveVideoIndex(index);
    };
  
    const handleNextVideo = () => {
      setSelectedVideoIndex((prevIndex) => {
        if (prevIndex === null) return 0;
        return prevIndex < MOCK_VIDEOS.length - 1 ? prevIndex + 1 : 0;
      });
    };
  
    const extractVideoId = (url) => {
      if (!url) return '';
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      const match = url.match(regExp);
      return (match && match[2].length === 11) ? match[2] : '';
    };
  
    return (
      <div className="bg-[#0f0f0f] min-h-screen p-6 box-border relative">
        {/* Grid Display Feed */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 max-w-[1280px] mx-auto">
          {MOCK_VIDEOS.map((video, index) => (
            <VideoCard
              key={video.id}
              video={video}
              isActive={selectedVideoIndex === null && activeVideoIndex === index}
              onHover={() => handleUserHover(index)}
              onClick={() => setSelectedVideoIndex(index)}
            />
          ))}
        </div>
  
        {/* Full Screen Cinematic Player Overlay */}
        {selectedVideoIndex !== null && (
          <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center p-4">
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
              <button
                onClick={() => {
                  setSelectedVideoIndex(null);
                  playerRef.current = null;
                }}
                className="text-white bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg font-sans text-sm transition-colors"
              >
                × Close Player
              </button>
            </div>
  
            {/* Hard Target Video Container Hook */}
            <div className="w-full max-w-[1100px] aspect-video bg-zinc-900 rounded-xl overflow-hidden shadow-2xl border border-zinc-800">
              <div id={containerId} className="w-full h-full" />
            </div>
  
            {/* Controls Footer */}
            <div className="mt-6 flex flex-col items-center gap-2">
              <button
                onClick={handleNextVideo}
                className="bg-red-600 hover:bg-red-700 text-white font-sans font-medium px-6 py-3 rounded-full flex items-center gap-2 transition-transform active:scale-95 shadow-lg"
              >
                <span>Next Video</span>
                <span className="text-lg">➔</span>
              </button>
              <p className="text-zinc-500 font-sans text-xs mt-1">
                Playing channel: {MOCK_VIDEOS[selectedVideoIndex].channelName}
              </p>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default Home;