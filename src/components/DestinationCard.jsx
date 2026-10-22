import React, { useState, useEffect } from 'react';
import { MapPin, Star, ArrowRight, Sun, Sparkles } from 'lucide-react';
import { fetchLiveWeather } from '../services/weatherService';
import './DestinationCard.css';

export default function DestinationCard({ destination, onSelect }) {
  const [quickTemp, setQuickTemp] = useState(null);

  useEffect(() => {
    let isMounted = true;
    fetchLiveWeather(destination.lat, destination.lng).then(data => {
      if (isMounted && data?.current) {
        setQuickTemp(data.current.temp);
      }
    });
    return () => { isMounted = false; };
  }, [destination.lat, destination.lng]);

  return (
    <div className="destination-card" onClick={() => onSelect(destination)}>
      <div className="dest-image-wrapper">
        <img
          src={destination.coverImage}
          alt={destination.name}
          className="dest-cover-img"
          loading="lazy"
        />

        {/* Top Floating Badges */}
        <div className="dest-floating-badges">
          <span className="dest-rating">
            <Star size={12} fill="#f59e0b" color="#f59e0b" />
            <span>{destination.rating}</span>
          </span>

          {quickTemp !== null && (
            <span className="dest-weather-badge">
              <Sun size={12} />
              <span>{quickTemp}°C</span>
            </span>
          )}
        </div>

        <div className="dest-gradient-overlay" />

        <div className="dest-card-bottom-content">
          <span className="dest-region-tag">{destination.region}</span>
          <h3 className="dest-title">{destination.name}</h3>
          <span className="dest-country">{destination.country}</span>
        </div>
      </div>

      <div className="dest-info-footer">
        <p className="dest-desc">{destination.description}</p>

        <div className="dest-tags-row">
          {destination.popularTags.slice(0, 3).map((tag, idx) => (
            <span key={idx} className="dest-mini-tag">{tag}</span>
          ))}
        </div>

        <div className="dest-action-bar">
          <div className="dest-price-box">
            <span className="dest-from-lbl">Hospedagens a partir de</span>
            <span className="dest-price-value">R$ {destination.basePrice.toLocaleString('pt-BR')}<small>/noite</small></span>
          </div>

          <button className="dest-explore-btn" aria-label={`Explorar hotéis em ${destination.name}`}>
            <span>Ver Hotéis & Mapa</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
