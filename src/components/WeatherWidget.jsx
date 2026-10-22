import React, { useState, useEffect } from 'react';
import {
  Sun,
  CloudSun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudDrizzle,
  Wind,
  Droplets,
  RefreshCw,
  Luggage,
  Sparkles,
  MapPin
} from 'lucide-react';
import { fetchLiveWeather } from '../services/weatherService';
import './WeatherWidget.css';

export default function WeatherWidget({ destinationName, country, lat, lng }) {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadWeather = async () => {
    if (!lat || !lng) return;
    setLoading(true);
    const data = await fetchLiveWeather(lat, lng);
    setWeatherData(data);
    setLoading(false);
  };

  useEffect(() => {
    loadWeather();
  }, [lat, lng]);

  const renderWeatherIcon = (iconName, size = 28) => {
    switch (iconName) {
      case 'sun':
        return <Sun size={size} className="w-icon sun" />;
      case 'cloud-sun':
        return <CloudSun size={size} className="w-icon cloud-sun" />;
      case 'cloud':
        return <Cloud size={size} className="w-icon cloud" />;
      case 'cloud-rain':
        return <CloudRain size={size} className="w-icon rain" />;
      case 'cloud-drizzle':
        return <CloudDrizzle size={size} className="w-icon drizzle" />;
      case 'cloud-snow':
        return <CloudSnow size={size} className="w-icon snow" />;
      case 'cloud-lightning':
        return <CloudLightning size={size} className="w-icon lightning" />;
      default:
        return <Sun size={size} className="w-icon sun" />;
    }
  };

  if (loading) {
    return (
      <div className="weather-widget-card loading-box">
        <RefreshCw size={24} className="spin-icon" />
        <p>Consultando satélites e clima em tempo real para {destinationName}...</p>
      </div>
    );
  }

  if (!weatherData) return null;

  const current = weatherData.current;

  return (
    <div className="weather-widget-card animate-fade-in">
      {/* Header Info */}
      <div className="weather-card-header">
        <div className="weather-location">
          <div className="loc-badge">
            <MapPin size={14} />
            <span>Clima Ao Vivo</span>
          </div>
          <h3 className="loc-title">{destinationName}, {country}</h3>
        </div>
        <button
          className="refresh-weather-btn"
          onClick={loadWeather}
          title="Atualizar dados meteorológicos"
          aria-label="Atualizar clima"
        >
          <RefreshCw size={15} />
        </button>
      </div>

      {/* Main Temperature & Condition Row */}
      <div className="weather-main-row">
        <div className="temp-display">
          <span className="temp-value">{current.temp}°</span>
          <span className="temp-unit">C</span>
        </div>

        <div className="condition-display">
          <div className="condition-icon-badge">
            {renderWeatherIcon(current.condition.icon, 36)}
          </div>
          <div className="condition-meta">
            <span className="condition-text">{current.condition.label}</span>
            <div className="meta-stats">
              <span className="stat-item" title="Velocidade do Vento">
                <Wind size={13} /> {current.windSpeed} km/h
              </span>
              {weatherData.forecast[0] && (
                <span className="stat-item" title="Chance de Chuva">
                  <Droplets size={13} /> {weatherData.forecast[0].rainProb}% chuva
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 5-Day Forecast Strip */}
      <div className="forecast-strip">
        {weatherData.forecast.map((day, idx) => (
          <div key={idx} className="forecast-col">
            <span className="fc-day">{day.dayName}</span>
            <div className="fc-icon">
              {renderWeatherIcon(day.condition.icon, 20)}
            </div>
            <div className="fc-temps">
              <span className="fc-max">{day.maxTemp}°</span>
              <span className="fc-min">{day.minTemp}°</span>
            </div>
          </div>
        ))}
      </div>

      {/* Smart Luggage Packing Recommendations */}
      <div className="luggage-tips-box">
        <div className="luggage-title">
          <Luggage size={16} />
          <span>Dicas Inteligentes para a sua Mala:</span>
        </div>
        <div className="tips-list">
          {weatherData.packingTips.map((tip, idx) => (
            <div key={idx} className="tip-chip">
              <span className={`tip-tag tag-${tip.tag.toLowerCase()}`}>{tip.tag}</span>
              <span className="tip-text">{tip.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
