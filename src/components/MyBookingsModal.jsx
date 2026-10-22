import React, { useState } from 'react';
import {
  X,
  Calendar,
  MapPin,
  FileText,
  Trash2,
  AlertCircle,
  CheckCircle2,
  Bed,
  Plane,
  Sparkles
} from 'lucide-react';
import { cancelReservation } from '../services/bookingStorage';
import './MyBookingsModal.css';

export default function MyBookingsModal({
  reservations = [],
  onClose,
  onViewVoucher,
  onRefreshList
}) {
  const [filter, setFilter] = useState('ALL'); // 'ALL' | 'CONFIRMED' | 'CANCELLED'
  const [confirmCancelId, setConfirmCancelId] = useState(null);

  const filtered = reservations.filter(r => {
    if (filter === 'CONFIRMED') return r.status === 'CONFIRMED';
    if (filter === 'CANCELLED') return r.status === 'CANCELLED';
    return true;
  });

  const handleExecuteCancel = (id) => {
    const updated = cancelReservation(id);
    setConfirmCancelId(null);
    if (onRefreshList) onRefreshList(updated);
  };

  return (
    <div className="modal-backdrop animate-fade-in" onClick={onClose}>
      <div className="my-bookings-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="mb-header">
          <div className="mb-title-box">
            <h2 className="mb-title">Minhas Viagens & Reservas</h2>
            <p className="mb-sub">Consulte seus bilhetes, comprovantes e histórico de estadias salvas.</p>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Fechar">
            <X size={20} />
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="mb-filters-bar">
          <button
            className={`filter-tab ${filter === 'ALL' ? 'active' : ''}`}
            onClick={() => setFilter('ALL')}
          >
            Todas ({reservations.length})
          </button>
          <button
            className={`filter-tab ${filter === 'CONFIRMED' ? 'active' : ''}`}
            onClick={() => setFilter('CONFIRMED')}
          >
            Confirmadas ({reservations.filter(r => r.status === 'CONFIRMED').length})
          </button>
          <button
            className={`filter-tab ${filter === 'CANCELLED' ? 'active' : ''}`}
            onClick={() => setFilter('CANCELLED')}
          >
            Canceladas ({reservations.filter(r => r.status === 'CANCELLED').length})
          </button>
        </div>

        {/* List of Bookings */}
        <div className="mb-list-body">
          {filtered.length === 0 ? (
            <div className="mb-empty-state">
              <div className="empty-icon-box">
                <Plane size={36} />
              </div>
              <h3>Nenhuma viagem encontrada neste filtro</h3>
              <p>Explore nossos destinos extraordinários e faça sua primeira simulação de viagem!</p>
              <button className="empty-cta-btn" onClick={onClose}>
                Explorar Destinos Agora
              </button>
            </div>
          ) : (
            filtered.map((item) => (
              <div key={item.id} className={`booking-history-card ${item.status === 'CANCELLED' ? 'cancelled' : ''}`}>
                <div className="bhc-left">
                  <img src={item.hotelImage} alt={item.hotelName} className="bhc-thumb" />
                  <div className="bhc-details">
                    <div className="bhc-status-row">
                      <span className={`status-pill ${item.status.toLowerCase()}`}>
                        {item.status === 'CONFIRMED' ? 'Confirmada & Ativa' : 'Cancelada'}
                      </span>
                      <span className="locator-code">Localizador: <strong>#{item.bookingCode}</strong></span>
                    </div>

                    <h4 className="bhc-hotel-name">{item.hotelName}</h4>
                    <span className="bhc-dest">
                      <MapPin size={13} /> {item.destinationName}, {item.country}
                    </span>

                    <div className="bhc-meta-row">
                      <span className="meta-chip">
                        <Calendar size={13} />
                        {new Date(item.checkIn).toLocaleDateString('pt-BR')} — {new Date(item.checkOut).toLocaleDateString('pt-BR')} ({item.nightsCount} noites)
                      </span>
                      <span className="meta-chip">
                        <Bed size={13} />
                        {item.roomType?.name || 'Suíte Padrão'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bhc-right">
                  <div className="bhc-price-box">
                    <span className="price-label">Valor Total Pago</span>
                    <strong className="bhc-price-val">R$ {item.pricing.finalTotal.toLocaleString('pt-BR')}</strong>
                    <span className="payment-type">via {item.paymentMethod}</span>
                  </div>

                  <div className="bhc-actions">
                    <button
                      className="voucher-view-btn"
                      onClick={() => onViewVoucher(item)}
                      title="Ver Voucher Oficial e Imprimir"
                    >
                      <FileText size={15} />
                      <span>Ver Voucher</span>
                    </button>

                    {item.status === 'CONFIRMED' && (
                      confirmCancelId === item.id ? (
                        <div className="confirm-cancel-box">
                          <span>Confirmar cancelamento?</span>
                          <div className="cc-btns">
                            <button
                              className="cc-yes"
                              onClick={() => handleExecuteCancel(item.id)}
                            >
                              Sim
                            </button>
                            <button
                              className="cc-no"
                              onClick={() => setConfirmCancelId(null)}
                            >
                              Não
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          className="cancel-trip-btn"
                          onClick={() => setConfirmCancelId(item.id)}
                          title="Cancelar Reserva e Simular Estorno"
                        >
                          <Trash2 size={15} />
                          <span>Cancelar</span>
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
