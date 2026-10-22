import React from 'react';
import { Sun, Moon, Briefcase } from 'lucide-react';
import AuraLogo from './AuraLogo';
import './Header.css';
import './AuraLogo.css';

export default function Header({
  theme,
  toggleTheme,
  onOpenMyBookings,
  bookingCount,
  onNavigateHome,
  onOpenDestinations,
  activeView
}) {
  return (
    <header className="site-header">
      <div className="header-container">
        {/* Logo Oficial Vetorial AURA TRAVEL */}
        <div className="brand-logo" onClick={onNavigateHome} role="button" tabIndex={0}>
          <AuraLogo variant="horizontal" height={44} />
        </div>

        {/* Navigation Links */}
        <nav className="header-nav">
          <button
            className={`nav-btn ${activeView === 'explore' ? 'active' : ''}`}
            onClick={onNavigateHome}
          >
            Explorar
          </button>
          <button
            className={`nav-btn ${activeView === 'destinations' ? 'active' : ''}`}
            onClick={onOpenDestinations}
          >
            Destinos Exclusivos
          </button>
        </nav>

        {/* Right Action Controls */}
        <div className="header-actions">
          {/* Theme Switcher */}
          <button
            className="action-icon-btn theme-toggle"
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
            aria-label="Alternar tema"
          >
            {theme === 'dark' ? <Sun size={19} className="sun-icon" /> : <Moon size={19} className="moon-icon" />}
          </button>

          {/* Minhas Reservas Button */}
          <button
            className="my-bookings-btn"
            onClick={onOpenMyBookings}
            title="Ver Minhas Viagens e Reservas"
          >
            <Briefcase size={18} />
            <span className="btn-label">Minhas Reservas</span>
            {bookingCount > 0 && (
              <span className="bookings-badge">{bookingCount}</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
