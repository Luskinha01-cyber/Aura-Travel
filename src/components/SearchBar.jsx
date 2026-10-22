import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Calendar, Users, ChevronDown, Plus, Minus, Loader2, Sparkles } from 'lucide-react';
import { searchGlobalLocations } from '../services/geocodingService';
import './SearchBar.css';

export default function SearchBar({
  onSearch,
  selectedCategory,
  onSelectCategory,
  categories
}) {
  const [destinationQuery, setDestinationQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoadingGeo, setIsLoadingGeo] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Dates
  const today = new Date().toISOString().split('T')[0];
  const defaultCheckIn = new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0];
  const defaultCheckOut = new Date(Date.now() + 86400000 * 12).toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(defaultCheckIn);
  const [checkOut, setCheckOut] = useState(defaultCheckOut);

  // Guests Popover
  const [showGuestsPopover, setShowGuestsPopover] = useState(false);
  const [guests, setGuests] = useState({ adults: 2, children: 0, rooms: 1 });

  const searchBoxRef = useRef(null);
  const guestsRef = useRef(null);

  // Fechar dropdowns ao clicar fora
  useEffect(() => {
    function handleClickOutside(e) {
      if (searchBoxRef.current && !searchBoxRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
      if (guestsRef.current && !guestsRef.current.contains(e.target)) {
        setShowGuestsPopover(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced geocoding search
  useEffect(() => {
    if (destinationQuery.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoadingGeo(true);
      const res = await searchGlobalLocations(destinationQuery);
      setSuggestions(res);
      setIsLoadingGeo(false);
      setShowSuggestions(true);
    }, 320);

    return () => clearTimeout(timer);
  }, [destinationQuery]);

  const handleSelectSuggestion = (item) => {
    setDestinationQuery(item.name);
    setShowSuggestions(false);
    onSearch({
      location: item,
      checkIn,
      checkOut,
      guests
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSearch({
      query: destinationQuery,
      checkIn,
      checkOut,
      guests
    });
  };

  const updateGuest = (field, delta) => {
    setGuests(prev => {
      const min = field === 'adults' || field === 'rooms' ? 1 : 0;
      const max = field === 'rooms' ? 5 : 10;
      const newVal = Math.max(min, Math.min(max, prev[field] + delta));
      return { ...prev, [field]: newVal };
    });
  };

  const totalGuests = guests.adults + guests.children;

  return (
    <div className="search-section-wrapper">
      <form className="luxury-search-bar" onSubmit={handleFormSubmit}>
        {/* Destination Field */}
        <div className="search-field destination-field" ref={searchBoxRef}>
          <div className="field-icon-box">
            <MapPin size={20} className="field-icon" />
          </div>
          <div className="field-content">
            <label className="field-label" htmlFor="dest-input">Para onde você quer ir?</label>
            <input
              id="dest-input"
              type="text"
              placeholder="Ex: Rio, Paris, Tóquio ou qualquer cidade..."
              value={destinationQuery}
              onChange={(e) => setDestinationQuery(e.target.value)}
              onFocus={() => destinationQuery.length >= 2 && setShowSuggestions(true)}
              autoComplete="off"
            />
          </div>

          {/* Autocomplete Suggestions Box */}
          {showSuggestions && (
            <div className="suggestions-dropdown animate-fade-in">
              {isLoadingGeo && (
                <div className="suggestion-loading">
                  <Loader2 size={18} className="spin-icon" />
                  <span>Buscando cidades no mapa mundial...</span>
                </div>
              )}

              {!isLoadingGeo && suggestions.length === 0 && (
                <div className="suggestion-empty">
                  <span>Nenhum local encontrado para "{destinationQuery}"</span>
                </div>
              )}

              {!isLoadingGeo && suggestions.map(item => (
                <div
                  key={item.id}
                  className="suggestion-item"
                  onClick={() => handleSelectSuggestion(item)}
                >
                  <div className="sugg-icon">
                    <MapPin size={16} />
                  </div>
                  <div className="sugg-info">
                    <div className="sugg-name">
                      {item.name}
                      {item.isCurated && <span className="sugg-badge">Destaque</span>}
                    </div>
                    <div className="sugg-country">{item.country || item.displayName}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="search-divider" />

        {/* Check-in Field */}
        <div className="search-field date-field">
          <div className="field-icon-box">
            <Calendar size={20} className="field-icon" />
          </div>
          <div className="field-content">
            <label className="field-label" htmlFor="checkin-input">Check-in</label>
            <input
              id="checkin-input"
              type="date"
              min={today}
              value={checkIn}
              onChange={(e) => {
                setCheckIn(e.target.value);
                if (e.target.value >= checkOut) {
                  // Ajusta checkOut para o dia seguinte
                  const nextDay = new Date(new Date(e.target.value).getTime() + 86400000).toISOString().split('T')[0];
                  setCheckOut(nextDay);
                }
              }}
            />
          </div>
        </div>

        <div className="search-divider" />

        {/* Check-out Field */}
        <div className="search-field date-field">
          <div className="field-icon-box">
            <Calendar size={20} className="field-icon" />
          </div>
          <div className="field-content">
            <label className="field-label" htmlFor="checkout-input">Check-out</label>
            <input
              id="checkout-input"
              type="date"
              min={checkIn || today}
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
        </div>

        <div className="search-divider" />

        {/* Guests Field */}
        <div className="search-field guests-field" ref={guestsRef}>
          <div className="field-icon-box">
            <Users size={20} className="field-icon" />
          </div>
          <div
            className="field-content clickable-field"
            onClick={() => setShowGuestsPopover(!showGuestsPopover)}
            role="button"
            tabIndex={0}
          >
            <span className="field-label">Quem vai viajar?</span>
            <div className="guests-summary">
              <span>{totalGuests} {totalGuests === 1 ? 'Viajante' : 'Viajantes'}, {guests.rooms} {guests.rooms === 1 ? 'Quarto' : 'Quartos'}</span>
              <ChevronDown size={14} className={`chevron ${showGuestsPopover ? 'rotate' : ''}`} />
            </div>
          </div>

          {/* Guests Popover */}
          {showGuestsPopover && (
            <div className="guests-popover animate-fade-in">
              <div className="guest-row">
                <div className="guest-info">
                  <span className="guest-type">Adultos</span>
                  <span className="guest-desc">A partir de 13 anos</span>
                </div>
                <div className="counter-controls">
                  <button
                    type="button"
                    className="counter-btn"
                    onClick={() => updateGuest('adults', -1)}
                    disabled={guests.adults <= 1}
                  >
                    <Minus size={14} />
                  </button>
                  <span className="counter-value">{guests.adults}</span>
                  <button
                    type="button"
                    className="counter-btn"
                    onClick={() => updateGuest('adults', 1)}
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <div className="guest-row">
                <div className="guest-info">
                  <span className="guest-type">Crianças</span>
                  <span className="guest-desc">Até 12 anos</span>
                </div>
                <div className="counter-controls">
                  <button
                    type="button"
                    className="counter-btn"
                    onClick={() => updateGuest('children', -1)}
                    disabled={guests.children <= 0}
                  >
                    <Minus size={14} />
                  </button>
                  <span className="counter-value">{guests.children}</span>
                  <button
                    type="button"
                    className="counter-btn"
                    onClick={() => updateGuest('children', 1)}
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <div className="guest-row">
                <div className="guest-info">
                  <span className="guest-type">Quartos</span>
                  <span className="guest-desc">Suítes reservadas</span>
                </div>
                <div className="counter-controls">
                  <button
                    type="button"
                    className="counter-btn"
                    onClick={() => updateGuest('rooms', -1)}
                    disabled={guests.rooms <= 1}
                  >
                    <Minus size={14} />
                  </button>
                  <span className="counter-value">{guests.rooms}</span>
                  <button
                    type="button"
                    className="counter-btn"
                    onClick={() => updateGuest('rooms', 1)}
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <div className="guests-popover-footer">
                <button
                  type="button"
                  className="popover-done-btn"
                  onClick={() => setShowGuestsPopover(false)}
                >
                  Concluir
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Submit Search Button */}
        <button type="submit" className="search-submit-btn" aria-label="Pesquisar Destinos e Hospedagens">
          <Search size={20} />
          <span className="search-btn-text">Buscar</span>
        </button>
      </form>

      {/* Categories Luxury Navigation */}
      <nav className="luxury-categories-nav" aria-label="Coleções de viagens">
        {categories.map(cat => {
          const Icon = cat.IconComponent;
          return (
            <button
              key={cat.id}
              type="button"
              className={`cat-nav-item ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => onSelectCategory(cat.id)}
            >
              {Icon && <Icon size={16} strokeWidth={1.8} className="cat-nav-icon" />}
              <span className="cat-nav-label">{cat.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
