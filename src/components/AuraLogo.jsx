import React, { useState } from 'react';
import './AuraLogo.css';
import logoPng from '../assets/images/logo.png';
import logoSvg from '../assets/images/logo.svg';

export default function AuraLogo({
  variant = 'horizontal', // 'horizontal' | 'emblem'
  height = 42,
  className = ''
}) {
  const [useFallback, setUseFallback] = useState(false);

  return (
    <div className={`aura-brand-logo-wrapper ${variant} ${className}`}>
      <img
        src={useFallback ? (logoSvg || '/images/logo.svg') : (logoPng || '/images/logo.png')}
        alt="Aura Travel"
        height={height}
        className="aura-logo-img"
        onError={() => setUseFallback(true)}
      />
    </div>
  );
}

