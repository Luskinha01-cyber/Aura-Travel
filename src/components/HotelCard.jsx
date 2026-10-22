import React, { useState } from 'react';
import { Star, MapPin, Check, ChevronLeft, ChevronRight, Sparkles, ShieldCheck } from 'lucide-react';
import './HotelCard.css';

export default function HotelCard({
  hotel,
  destinationName,
  isSelected,
  onHover,
  onLeave,
  onBook
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = hotel.images && hotel.images.length > 0 ? hotel.images : [
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80'
  ];

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div
      className={`luxury-hotel-card ${isSelected ? 'is-selected' : ''}`}
      onMouseEnter={() => onHover && onHover(hotel.id)}
      onMouseLeave={() => onLeave && onLeave()}
      onClick={() => onBook && onBook(hotel)}
    >
      {/* Media Carousel */}
      <div className="card-media-wrapper">
        <img
          src={images[currentImageIndex]}
          alt={hotel.name}
          className="hotel-main-img"
          loading="lazy"
        />

        {/* Floating Badges */}
        <div className="media-overlay-top">
          <span className="rating-pill">
            <Star size={13} fill="#f59e0b" color="#f59e0b" />
            <span className="rating-num">{hotel.rating}</span>
            <span className="review-num">({hotel.reviewCount})</span>
          </span>

          <span className="category-pill-badge">
            <Sparkles size={12} />
            <span>Luxo 5★</span>
          </span>
        </div>

        {/* Carousel Arrows if > 1 image */}
        {images.length > 1 && (
          <div className="carousel-nav-arrows">
            <button
              className="carousel-arrow left"
              onClick={handlePrevImage}
              aria-label="Foto anterior"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              className="carousel-arrow right"
              onClick={handleNextImage}
              aria-label="Próxima foto"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* Carousel Dots */}
        {images.length > 1 && (
          <div className="carousel-dots">
            {images.map((_, idx) => (
              <span
                key={idx}
                className={`dot ${idx === currentImageIndex ? 'active' : ''}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Hotel Content */}
      <div className="hotel-card-body">
        <div className="hotel-header-meta">
          <div className="hotel-loc">
            <MapPin size={14} className="pin-icon" />
            <span>{destinationName}</span>
          </div>
          <span className="stars-icons">
            {'★'.repeat(hotel.stars || 5)}
          </span>
        </div>

        <h3 className="hotel-name">{hotel.name}</h3>
        <p className="hotel-tagline">{hotel.tagline}</p>

        {/* Amenities Highlights */}
        <div className="amenities-row">
          {hotel.amenities.slice(0, 3).map((amenity, idx) => (
            <span key={idx} className="amenity-tag">
              <Check size={12} className="check-icon" />
              <span>{amenity}</span>
            </span>
          ))}
          {hotel.amenities.length > 3 && (
            <span className="amenity-tag more">+{hotel.amenities.length - 3}</span>
          )}
        </div>

        {/* Footer & Booking Action */}
        <div className="hotel-card-footer">
          <div className="pricing-container">
            <span className="price-label">A partir de</span>
            <div className="price-value-row">
              <span className="price-currency">R$</span>
              <span className="price-amount">{hotel.pricePerNight.toLocaleString('pt-BR')}</span>
              <span className="price-period">/noite</span>
            </div>
            <span className="price-note">Taxas e impostos inclusos</span>
          </div>

          <button
            className="book-cta-btn"
            onClick={(e) => {
              e.stopPropagation();
              onBook(hotel);
            }}
          >
            <span>Reservar</span>
          </button>
        </div>
      </div>
    </div>
  );
}
