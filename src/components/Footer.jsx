import React from 'react';
import { ShieldCheck, Heart, Globe, CloudSun, Map } from 'lucide-react';
import AuraLogo from './AuraLogo';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer no-print">
      <div className="footer-top-strip">
        <div className="footer-feature">
          <ShieldCheck size={20} className="feat-icon" />
          <div className="feat-text">
            <strong>Reserva 100% Segura</strong>
            <span>Confirmação instantânea e simulação protegida</span>
          </div>
        </div>

        <div className="footer-feature">
          <CloudSun size={20} className="feat-icon" />
          <div className="feat-text">
            <strong>Clima em Tempo Real</strong>
            <span>Previsões precisas via Open-Meteo API</span>
          </div>
        </div>

        <div className="footer-feature">
          <Map size={20} className="feat-icon" />
          <div className="feat-text">
            <strong>Mapas Globais</strong>
            <span>Geolocalização via OpenStreetMap & Leaflet</span>
          </div>
        </div>
      </div>

      <div className="footer-main-container">
        <div className="footer-brand-col">
          <div className="footer-logo">
            <AuraLogo variant="horizontal" height={36} />
          </div>
          <p className="footer-tagline">
            A plataforma definitiva de reservas de viagens, turismo internacional e experiências inesquecíveis ao redor do mundo.
          </p>
        </div>

        <div className="footer-links-group">
          <div className="footer-col">
            <span className="col-title">Destinos em Alta</span>
            <span className="footer-link">Rio de Janeiro, Brasil</span>
            <span className="footer-link">Paris, França</span>
            <span className="footer-link">Tóquio, Japão</span>
            <span className="footer-link">Santorini, Grécia</span>
          </div>

          <div className="footer-col">
            <span className="col-title">Tecnologias</span>
            <span className="footer-link">Vite + React</span>
            <span className="footer-link">Leaflet Maps</span>
            <span className="footer-link">Open-Meteo Weather</span>
            <span className="footer-link">Nominatim OSM</span>
          </div>

          <div className="footer-col">
            <span className="col-title">Suporte</span>
            <span className="footer-link">Central de Ajuda</span>
            <span className="footer-link">Termos de Reserva</span>
            <span className="footer-link">Cancelamento Flexível</span>
            <span className="footer-link">Políticas de Privacidade</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <span>© {new Date().getFullYear()} Aura Travel. Todos os direitos reservados. Feito com tecnologia moderna de ponta.</span>
      </div>
    </footer>
  );
}
