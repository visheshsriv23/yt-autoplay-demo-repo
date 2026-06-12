import React from 'react';

const VideoCard = ({ video, isActive, onHover, onClick }) => {
  
  // Helper function to turn a standard YouTube watch link into a clean preview link
  const getPreviewUrl = (url) => {
    if (!url) return '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    
    if (match && match[2].length === 11) {
      const videoId = match[2];
      // autoplay=1 starts it, mute=1 lets it run silently, controls=0 hides the seeking trackbar
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3`;
    }
    return url;
  };

  return (
    <div 
      className={`cursor-pointer bg-[#0f0f0f] rounded-xl overflow-hidden text-white font-sans transition-all duration-300 transform ${
        isActive ? 'ring-2 ring-red-600 shadow-2xl z-10' : 'opacity-90'
      }`}
      onMouseEnter={onHover}
      onClick={onClick}
    >
      {/* Dynamic Video Preview Screen */}
<div className="relative w-full aspect-video bg-zinc-900 overflow-hidden">
  {isActive ? (
    /* Live Preview Engine active! */
    <div className="w-full h-full relative">
      <iframe
        src={getPreviewUrl(video.videoUrl)}
        title={`${video.title} Preview`}
        className="w-full h-full scale-[1.35] object-cover pointer-events-none" // Zoomed slightly to crop out top/bottom player headers
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
      
      {/* 🟢 THE INVISIBLE SHIELD: Blocks YouTube interface overlays, pause buttons, and watermarks */}
      <div className="absolute inset-0 bg-transparent z-20 pointer-events-none" />
    </div>
  ) : (
    /* Static Content Thumbnail fallback */
    <img 
      src={video.thumbnailUrl} 
      alt={video.title}
      className="w-full h-full object-cover"
    />
  )}
  
  {/* Hover Overlay Text: Disappears completely (`opacity-0`) when the preview becomes active! */}
  <div className={`absolute inset-0 bg-black/40 flex flex-col items-center justify-center transition-all duration-300 z-30 pointer-events-none ${
    isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'
  }`}>
    <span className="bg-black/80 text-[10px] text-white px-2.5 py-1 rounded-full font-medium tracking-wider uppercase border border-zinc-700 shadow-md">
      Click to Watch Full Screen
    </span>
  </div>
</div>

      {/* Metadata */}
      <div className="p-3 flex gap-3">
        <div 
          className="w-9 h-9 rounded-full bg-zinc-700 bg-cover flex-shrink-0"
          style={{ backgroundImage: `url(${video.channelAvatar})` }}
        />
        <div>
          <h4 className="m-0 text-sm font-semibold line-clamp-2 text-[#f1f1f1] leading-5">
            {video.title}
          </h4>
          <p className="m-0 text-xs text-[#aaa] mt-1">{video.channelName}</p>
          <p className="m-0 text-xs text-[#aaa]">
            {video.views} • {video.uploadedAt}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;