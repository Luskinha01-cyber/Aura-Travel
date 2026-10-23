import React from 'react';
import { ShieldCheck, Heart, Globe, CloudSun, Map, ExternalLink } from 'lucide-react';
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
        <span>© {new Date().getFullYear()} Aura Travel. Todos os direitos reservados. Feito por Lucas dos Anjos.</span>
        <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <a
            href="https://github.com/Luskinha01-cyber/Aura-Travel"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'inherit', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', opacity: 0.85, fontSize: '0.875rem' }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg> Repositório GitHub
          </a>
          <a
            href="https://aura-travel-one.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'inherit', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', opacity: 0.85, fontSize: '0.875rem' }}
          >
            <ExternalLink size={15} /> Demonstração Vercel
          </a>
        </div>
      </div>
    </footer>
  );
}
