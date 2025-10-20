import { useState, useEffect, useRef } from 'react';

interface WaveVisualizerProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function WaveVisualizer({
  className = '',
  size = 'md',
}: WaveVisualizerProps) {
  const [waveAnimation, setWaveAnimation] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const sizeClasses = {
    sm: 'h-3 gap-1',
    md: 'h-5 gap-1.5',
    lg: 'h-6 gap-2',
  };

  const barClasses = {
    sm: 'w-0.5',
    md: 'w-0.5',
    lg: 'w-1',
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setWaveAnimation(prev => (prev + 1) % 360);
    }, 80);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div
      className={`flex items-center justify-center ${sizeClasses[size]} ${className}`}
    >
      <div className="flex items-end gap-1.5">
        {Array.from({ length: 8 }).map((_, i) => {
          const height =
            12 + Math.sin(((waveAnimation + i * 45) * Math.PI) / 180) * 8;
          return (
            <div
              key={i}
              className={`${barClasses[size]} bg-gradient-to-t from-stone-400 to-stone-300 transition-all duration-100 ease-out`}
              style={{
                height: `${height}px`,
                minHeight: '4px',
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
