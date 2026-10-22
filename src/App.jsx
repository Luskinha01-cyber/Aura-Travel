import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import DestinationCard from './components/DestinationCard';
import HotelCard from './components/HotelCard';
import WeatherWidget from './components/WeatherWidget';
import InteractiveMap from './components/InteractiveMap';
import BookingModal from './components/BookingModal';
import MyBookingsModal from './components/MyBookingsModal';
import VoucherModal from './components/VoucherModal';
import Footer from './components/Footer';

import { CURATED_DESTINATIONS, generateProceduralHotelsForLocation } from './data/destinations';
import { getStoredReservations } from './services/bookingStorage';
import {
  Compass,
  Sparkles,
  MapPin,
  Calendar,
  Layers,
  ArrowRight,
  Shield,
  Plane,
  Heart,
  Globe,
  Palmtree,
  Wine,
  MountainSnow,
  Building2
} from 'lucide-react';

import './App.css';

const CATEGORIES = [
  { id: 'all', label: 'Todos os Destinos', IconComponent: Globe },
  { id: 'praias', label: 'Praias & Ilhas', IconComponent: Palmtree },
  { id: 'montanhas', label: 'Montanhas & Neve', IconComponent: MountainSnow },
  { id: 'romance', label: 'Refúgios & Romance', IconComponent: Heart },
  { id: 'gastronomia', label: 'Gastronomia & Vinhos', IconComponent: Wine },
  { id: 'metropoles', label: 'Cidades & Cultura', IconComponent: Building2 }
];

export default function App() {
  // Theme state
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('aura_travel_theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('aura_travel_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Reservations from Storage
  const [reservations, setReservations] = useState([]);
  useEffect(() => {
    setReservations(getStoredReservations());
  }, []);

  // Active Destination and Current Hotels
  const [activeDestination, setActiveDestination] = useState(CURATED_DESTINATIONS[0]); // Default: Rio de Janeiro
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredHotelId, setHoveredHotelId] = useState(null);

  // Search parameters
  const [searchDates, setSearchDates] = useState({
    checkIn: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0],
    checkOut: new Date(Date.now() + 86400000 * 12).toISOString().split('T')[0],
    guests: { adults: 2, children: 0, rooms: 1 }
  });

  // Modals state
  const [bookingHotelTarget, setBookingHotelTarget] = useState(null);
  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState(false);
  const [activeVoucherBooking, setActiveVoucherBooking] = useState(null);

  // Filtered curated destinations for the showcase section
  const filteredDestinations = CURATED_DESTINATIONS.filter(dest => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'praias') return dest.popularTags.some(t => t.toLowerCase().includes('praia'));
    if (selectedCategory === 'romance') return dest.popularTags.some(t => t.toLowerCase().includes('romance'));
    if (selectedCategory === 'gastronomia') return dest.popularTags.some(t => t.toLowerCase().includes('gastronomia'));
    if (selectedCategory === 'montanhas') return dest.popularTags.some(t => t.toLowerCase().includes('neve') || t.toLowerCase().includes('patagônia'));
    if (selectedCategory === 'metropoles') return dest.popularTags.some(t => t.toLowerCase().includes('metrópole') || t.toLowerCase().includes('futurismo'));
    return true;
  });

  // Handle Search Execution
  const handleSearch = ({ location, query, checkIn, checkOut, guests }) => {
    if (checkIn && checkOut) {
      setSearchDates({ checkIn, checkOut, guests });
    }

    if (location) {
      if (location.destinationRef) {
        // Destination já curado
        setActiveDestination(location.destinationRef);
      } else {
        // Localização global vinda da API Nominatim
        const proceduralHotels = generateProceduralHotelsForLocation(
          location.name,
          location.country,
          location.lat,
          location.lng
        );

        setActiveDestination({
          id: location.id,
          name: location.name,
          country: location.country,
          region: 'Global',
          description: `Descubra a rica atmosfera de ${location.name}, com hospedagens selecionadas e clima verificado ao vivo.`,
          lat: location.lat,
          lng: location.lng,
          rating: 4.88,
          reviewCount: 310,
          coverImage: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80',
          popularTags: ['Exploração Global', 'Cultura Local', 'Hospedagem Exclusiva'],
          basePrice: proceduralHotels[0]?.pricePerNight || 490,
          hotels: proceduralHotels,
          attractions: [
            { name: `Centro Histórico de ${location.name}`, lat: location.lat + 0.005, lng: location.lng + 0.005, type: 'Cultura' },
            { name: `Mirante Panorâmico de ${location.name}`, lat: location.lat - 0.004, lng: location.lng - 0.004, type: 'Vista' }
          ]
        });
      }

      // Scroll suave até o split view de hospedagens
      document.getElementById('explore-split-section')?.scrollIntoView({ behavior: 'smooth' });
    } else if (query && query.trim()) {
      const match = CURATED_DESTINATIONS.find(d =>
        d.name.toLowerCase().includes(query.trim().toLowerCase()) ||
        d.country.toLowerCase().includes(query.trim().toLowerCase())
      );
      if (match) {
        setActiveDestination(match);
        document.getElementById('explore-split-section')?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleSelectCuratedDest = (destination) => {
    setActiveDestination(destination);
    document.getElementById('explore-split-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenBooking = (hotel) => {
    setBookingHotelTarget(hotel);
  };

  const handleReservationCompleted = (newBooking) => {
    setReservations(prev => [newBooking, ...prev]);
  };

  const handleRefreshReservations = (updatedList) => {
    setReservations(updatedList);
  };

  return (
    <div className="aura-app-layout">
      {/* Header */}
      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenMyBookings={() => setIsMyBookingsOpen(true)}
        bookingCount={reservations.filter(r => r.status === 'CONFIRMED').length}
        onNavigateHome={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onOpenDestinations={() => document.getElementById('curated-catalog-section')?.scrollIntoView({ behavior: 'smooth' })}
        activeView="explore"
      />

      {/* Hero Section with Search */}
      <section className="hero-banner-section">
        <div className="hero-backdrop-glow" />
        <div className="hero-container">
          <div className="hero-badge animate-fade-in">
            <Sparkles size={14} className="sparkle-icon" />
            <span>Viagens Exclusivas & Previsão Meteorológica em Tempo Real</span>
          </div>

          <h1 className="hero-headline animate-fade-in">
            O Mundo Espera Por Você.<br />
            <span className="gradient-text">Viva Momentos Inesquecíveis.</span>
          </h1>

          <p className="hero-subtext animate-fade-in">
            Explore destinos deslumbrantes pelo planeta com previsão meteorológica precisa, mapas interativos em split-view e simulação de reservas com emissão imediata de voucher.
          </p>

          {/* Search Bar Capsule */}
          <div className="hero-search-wrapper animate-fade-in">
            <SearchBar
              onSearch={handleSearch}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              categories={CATEGORIES}
            />
          </div>
        </div>
      </section>

      {/* Main Split-View Section: Hotels & Weather + Interactive Map */}
      <section id="explore-split-section" className="split-explore-section">
        <div className="split-container">
          {/* Section Header */}
          <div className="split-section-header">
            <div className="dest-current-badge">
              <MapPin size={16} />
              <span>Destino Ativo</span>
            </div>
            <h2 className="current-dest-heading">
              {activeDestination.name}, {activeDestination.country}
            </h2>
            <p className="current-dest-sub">
              {activeDestination.description}
            </p>
          </div>

          {/* Split Grid: Left (Weather + Hotels) & Right (Interactive Map) */}
          <div className="split-grid-layout">
            {/* Left Column: Weather + Hotel List */}
            <div className="split-content-column">
              {/* Live Weather Widget */}
              <div className="weather-widget-anchor">
                <WeatherWidget
                  destinationName={activeDestination.name}
                  country={activeDestination.country}
                  lat={activeDestination.lat}
                  lng={activeDestination.lng}
                />
              </div>

              {/* Hotels Section */}
              <div className="hotels-feed-section">
                <div className="feed-header">
                  <div className="feed-title-box">
                    <h3 className="feed-title">Hospedagens Disponíveis</h3>
                    <span className="feed-count">
                      {activeDestination.hotels?.length || 0} opções de luxo encontradas
                    </span>
                  </div>
                  <span className="feed-hint">Passe o mouse para destacar no mapa</span>
                </div>

                <div className="hotels-cards-stack">
                  {activeDestination.hotels?.map(hotel => (
                    <HotelCard
                      key={hotel.id}
                      hotel={hotel}
                      destinationName={activeDestination.name}
                      isSelected={hoveredHotelId === hotel.id}
                      onHover={(id) => setHoveredHotelId(id)}
                      onLeave={() => setHoveredHotelId(null)}
                      onBook={handleOpenBooking}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Sticky Interactive Leaflet Map */}
            <div className="split-map-column">
              <div className="sticky-map-wrapper">
                <InteractiveMap
                  center={[activeDestination.lat, activeDestination.lng]}
                  zoom={12}
                  hotels={activeDestination.hotels || []}
                  attractions={activeDestination.attractions || []}
                  selectedHotelId={hoveredHotelId}
                  onSelectHotel={(id) => setHoveredHotelId(id)}
                  onBookHotel={handleOpenBooking}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curated Catalog Showcase Section */}
      <section id="curated-catalog-section" className="curated-catalog-section">
        <div className="catalog-container">
          <div className="catalog-header">
            <div>
              <span className="section-pre-title">Coleção Aura</span>
              <h2 className="catalog-title">Destinos Mais Cobiçados do Mundo</h2>
              <p className="catalog-sub">Selecione qualquer destino para carregar o clima ao vivo, mapas e hospedagens.</p>
            </div>
          </div>

          <div className="destinations-cards-grid">
            {filteredDestinations.map(dest => (
              <DestinationCard
                key={dest.id}
                destination={dest}
                onSelect={handleSelectCuratedDest}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* MODAL 1: Booking & Checkout Simulation */}
      {bookingHotelTarget && (
        <BookingModal
          hotel={bookingHotelTarget}
          destinationName={activeDestination.name}
          country={activeDestination.country}
          initialCheckIn={searchDates.checkIn}
          initialCheckOut={searchDates.checkOut}
          initialGuests={searchDates.guests}
          onClose={() => setBookingHotelTarget(null)}
          onReservationComplete={handleReservationCompleted}
        />
      )}

      {/* MODAL 2: My Bookings Management */}
      {isMyBookingsOpen && (
        <MyBookingsModal
          reservations={reservations}
          onClose={() => setIsMyBookingsOpen(false)}
          onViewVoucher={(booking) => {
            setActiveVoucherBooking(booking);
          }}
          onRefreshList={handleRefreshReservations}
        />
      )}

      {/* MODAL 3: Standalone Travel Voucher Viewer */}
      {activeVoucherBooking && (
        <VoucherModal
          booking={activeVoucherBooking}
          onClose={() => setActiveVoucherBooking(null)}
        />
      )}
    </div>
  );
}
