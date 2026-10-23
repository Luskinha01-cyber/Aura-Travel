import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Compass } from 'lucide-react';
import './InteractiveMap.css';

// Provedor de Tiles Fixo: Ruas & Turismo (Esri World Street Map)
const STREET_TILE_PROVIDER = {
  url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
  maxZoom: 19,
  attribution: 'Tiles &copy; Esri'
};

export default function InteractiveMap({
  hotels = [],
  attractions = [],
  center = [-22.9068, -43.1729],
  zoom = 13,
  selectedHotelId = null,
  onSelectHotel,
  onBookHotel
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const tileLayerRef = useRef(null);
  const markersRef = useRef([]);

  // Inicializa mapa Leaflet
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: center,
        zoom: zoom,
        zoomControl: false,
        attributionControl: false
      });

      // Layer fixo: Ruas & Turismo (Esri World Street Map)
      const tileLayer = L.tileLayer(STREET_TILE_PROVIDER.url, {
        maxZoom: STREET_TILE_PROVIDER.maxZoom,
        attribution: STREET_TILE_PROVIDER.attribution
      }).addTo(map);

      tileLayerRef.current = tileLayer;

      // Adiciona controle de zoom no canto inferior direito
      L.control.zoom({ position: 'bottomright' }).addTo(map);

      mapInstanceRef.current = map;

      // Invalida tamanho para garantir renderização instantânea
      setTimeout(() => {
        map.invalidateSize();
      }, 150);
    }

    return () => {
      // Cleanup no unmount
    };
  }, []);

  // Garante que o mapa se adapte a redimensionamentos da tela
  useEffect(() => {
    const handleResize = () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Atualiza centro quando o destino muda
  useEffect(() => {
    if (mapInstanceRef.current && center && center[0] && center[1]) {
      mapInstanceRef.current.setView(center, zoom, {
        animate: true,
        duration: 1.2
      });
      setTimeout(() => {
        mapInstanceRef.current?.invalidateSize();
      }, 200);
    }
  }, [center[0], center[1], zoom]);

  // Atualiza marcadores de Hotéis e Atrações
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Remove marcadores anteriores
    markersRef.current.forEach(m => map.removeLayer(m));
    markersRef.current = [];

    const newMarkers = [];

    // 1. Marcadores de Atrações Turísticas (Âncoras douradas)
    attractions.forEach(attr => {
      const icon = L.divIcon({
        className: 'custom-map-icon',
        html: `
          <div class="custom-attraction-pin" title="${attr.name} (${attr.type})">
            <span class="pin-dot">★</span>
          </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 28]
      });

      const marker = L.marker([attr.lat, attr.lng], { icon }).addTo(map);
      marker.bindPopup(`
        <div class="map-popup attraction-popup">
          <div class="attr-tag">Ponto Turístico</div>
          <strong class="attr-title">${attr.name}</strong>
          <span class="attr-type">${attr.type}</span>
        </div>
      `);
      newMarkers.push(marker);
    });

    // 2. Marcadores de Hospedagens (Pills de Preço estilo Airbnb Luxe)
    hotels.forEach(hotel => {
      const isSelected = selectedHotelId === hotel.id;
      const icon = L.divIcon({
        className: 'custom-map-icon',
        html: `
          <div class="custom-hotel-price-pill ${isSelected ? 'selected' : ''}">
            <span class="pill-price">R$ ${hotel.pricePerNight}</span>
          </div>
        `,
        iconSize: [80, 32],
        iconAnchor: [40, 16]
      });

      const marker = L.marker([hotel.lat, hotel.lng], { icon }).addTo(map);

      // Conteúdo do Popup com foto e botão direto de reserva
      const popupHtml = document.createElement('div');
      popupHtml.className = 'map-popup hotel-popup';
      popupHtml.innerHTML = `
        <div class="popup-image" style="background-image: url('${hotel.images[0]}')">
          <span class="popup-rating">★ ${hotel.rating}</span>
        </div>
        <div class="popup-body">
          <h4 class="popup-title">${hotel.name}</h4>
          <p class="popup-tagline">${hotel.tagline}</p>
          <div class="popup-footer">
            <div class="popup-price-box">
              <span class="price-val">R$ ${hotel.pricePerNight}</span>
              <span class="price-lbl">/noite</span>
            </div>
            <button class="popup-book-btn" id="book-btn-${hotel.id}">Reservar</button>
          </div>
        </div>
      `;

      // Event listener no botão de reservar dentro do popup
      popupHtml.querySelector(`#book-btn-${hotel.id}`)?.addEventListener('click', (e) => {
        e.stopPropagation();
        if (onBookHotel) onBookHotel(hotel);
      });

      marker.bindPopup(popupHtml, {
        maxWidth: 280,
        className: 'modern-leaflet-popup'
      });

      marker.on('click', () => {
        if (onSelectHotel) onSelectHotel(hotel.id);
      });

      newMarkers.push(marker);
    });

    markersRef.current = newMarkers;

    // Se houver mais de um marcador, ajusta o zoom suavemente para caber todos
    if (hotels.length > 0) {
      const group = L.featureGroup(newMarkers);
      map.fitBounds(group.getBounds().pad(0.18), { animate: true });
    }
  }, [hotels, attractions, selectedHotelId]);

  return (
    <div className="interactive-map-wrapper">
      {/* Overlay com Badge do Mapa */}
      <div className="map-top-controls">
        <div className="map-badge-overlay">
          <Compass size={15} className="compass-icon" />
          <span>Mapa Interativo</span>
        </div>
      </div>

      <div ref={mapContainerRef} className="leaflet-map-canvas" />
    </div>
  );
}
