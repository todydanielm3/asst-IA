import React from 'react';

interface MonolithLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function MonolithLogo({ className = '', size = 'md' }: MonolithLogoProps) {
  const sizeClasses = {
    sm: 'w-6 h-8',
    md: 'w-8 h-12',
    lg: 'w-12 h-16',
    xl: 'w-16 h-24'
  };

  return (
    <div className={`${sizeClasses[size]} ${className} relative`}>
      {/* Monolito principal */}
      <div className="w-full h-full bg-gradient-to-b from-gray-900 via-gray-800 to-black rounded-sm shadow-2xl relative overflow-hidden">
        {/* Efeito de brilho interno */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent animate-pulse"></div>
        
        {/* Reflexos laterais */}
        <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-gray-600 to-gray-800"></div>
        <div className="absolute right-0 top-0 w-1 h-full bg-gradient-to-b from-gray-700 to-black"></div>
        
        {/* Linhas de energia */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/2 w-0.5 h-2 bg-blue-400/80 transform -translate-x-1/2 animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 w-0.5 h-3 bg-cyan-300/60 transform -translate-x-1/2 animate-pulse delay-300"></div>
          <div className="absolute top-3/4 left-1/2 w-0.5 h-2 bg-blue-400/80 transform -translate-x-1/2 animate-pulse delay-700"></div>
        </div>
        
        {/* Efeito de profundidade no topo */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600"></div>
      </div>
      
      {/* Sombra base */}
      <div className="absolute -bottom-1 left-1/2 w-3/4 h-1 bg-black/30 blur-sm transform -translate-x-1/2 rounded-full"></div>
    </div>
  );
}

interface MaDRIALogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  textSize?: 'sm' | 'md' | 'lg' | 'xl';
}

export function MaDRIALogo({ 
  className = '', 
  size = 'md', 
  showText = true, 
  textSize = 'md' 
}: MaDRIALogoProps) {
  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-4xl'
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <MonolithLogo size={size} />
      {showText && (
        <div className="flex flex-col">
          <span className={`font-bold text-gray-900 tracking-wider ${textSizeClasses[textSize]}`}>
            MaDRIA
          </span>
          <span className="text-xs text-gray-500 tracking-wide">
            Medical AI Digital Assistant
          </span>
        </div>
      )}
    </div>
  );
}
