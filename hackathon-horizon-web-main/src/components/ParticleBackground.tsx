const ParticleBackground = () => {
  return (
    <div className="particles-bg">
      {/* Animated particles */}
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            width: Math.random() * 3 + 1 + 'px',
            height: Math.random() * 3 + 1 + 'px',
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
            animationDelay: Math.random() * 6 + 's',
            animationDuration: (Math.random() * 4 + 4) + 's'
          }}
        />
      ))}
      
      {/* Network connections */}
      <svg 
        className="absolute inset-0 w-full h-full opacity-20" 
        style={{ zIndex: 1 }}
      >
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(280 100% 70%)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(320 100% 70%)" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        
        {/* Diagonal lines creating network effect */}
        <line x1="10%" y1="20%" x2="90%" y2="80%" stroke="url(#lineGradient)" strokeWidth="1" />
        <line x1="20%" y1="10%" x2="80%" y2="90%" stroke="url(#lineGradient)" strokeWidth="1" />
        <line x1="30%" y1="70%" x2="70%" y2="30%" stroke="url(#lineGradient)" strokeWidth="1" />
        <line x1="40%" y1="15%" x2="60%" y2="85%" stroke="url(#lineGradient)" strokeWidth="1" />
        <line x1="15%" y1="60%" x2="85%" y2="40%" stroke="url(#lineGradient)" strokeWidth="1" />
        
        {/* Circular network nodes */}
        <circle cx="20%" cy="30%" r="2" fill="hsl(280 100% 70%)" opacity="0.4" />
        <circle cx="80%" cy="20%" r="1.5" fill="hsl(320 100% 70%)" opacity="0.3" />
        <circle cx="60%" cy="70%" r="2.5" fill="hsl(280 100% 70%)" opacity="0.5" />
        <circle cx="30%" cy="80%" r="1" fill="hsl(320 100% 70%)" opacity="0.4" />
        <circle cx="70%" cy="40%" r="2" fill="hsl(280 100% 70%)" opacity="0.3" />
      </svg>
    </div>
  );
};

export default ParticleBackground;