import React from 'react';
import { X, Printer, Download, QrCode, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import AuraLogo from './AuraLogo';
import './VoucherModal.css';

export default function VoucherModal({ booking, onClose }) {
  if (!booking) return null;

  const handleDownloadCalendar = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Aura Travel//Reservas//PT
BEGIN:VEVENT
SUMMARY:Viagem para ${booking.destinationName} - ${booking.hotelName}
DESCRIPTION:Reserva #${booking.bookingCode}\\nHospedagem: ${booking.hotelName}\\nQuarto: ${booking.roomType?.name || 'Suíte Luxo'}
LOCATION:${booking.hotelName}, ${booking.destinationName}, ${booking.country}
DTSTART:${booking.checkIn.replace(/-/g, '')}T140000Z
DTEND:${booking.checkOut.replace(/-/g, '')}T120000Z
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `AuraTravel-${booking.bookingCode}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="modal-backdrop animate-fade-in" onClick={onClose}>
      <div className="voucher-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="vm-top-bar no-print">
          <span className="vm-badge">Comprovante de Reserva Emitido</span>
          <button className="modal-close-btn" onClick={onClose} aria-label="Fechar">
            <X size={20} />
          </button>
        </div>

        {/* The Official Ticket */}
        <div className="official-travel-voucher print-voucher-only">
          <div className="voucher-header">
            <div className="v-brand">
              <AuraLogo variant="horizontal" height={32} />
              <span className="v-sub">VOUCHER ELETRÔNICO OFICIAL DE HOSPEDAGEM</span>
            </div>
            <div className="v-locator-box">
              <span className="v-loc-lbl">CÓDIGO LOCALIZADOR</span>
              <span className="v-loc-code">{booking.bookingCode}</span>
            </div>
          </div>

          <div className="voucher-grid">
            <div className="v-hotel-col">
              <img src={booking.hotelImage} alt={booking.hotelName} className="v-hotel-thumb" />
              <div className="v-hotel-text">
                <h4 className="v-h-name">{booking.hotelName}</h4>
                <span className="v-h-dest">{booking.destinationName}, {booking.country}</span>
                <span className="v-h-room">Acomodação: <strong>{booking.roomType?.name || 'Suíte Luxo'}</strong></span>
              </div>
            </div>

            <div className="v-dates-col">
              <div className="v-date-block">
                <span className="v-lbl">CHECK-IN</span>
                <strong className="v-val">{new Date(booking.checkIn).toLocaleDateString('pt-BR')}</strong>
                <span className="v-sub">A partir das 14:00</span>
              </div>
              <div className="v-nights-badge">{booking.nightsCount} NOITES</div>
              <div className="v-date-block">
                <span className="v-lbl">CHECK-OUT</span>
                <strong className="v-val">{new Date(booking.checkOut).toLocaleDateString('pt-BR')}</strong>
                <span className="v-sub">Até as 12:00</span>
              </div>
            </div>
          </div>

          <div className="voucher-info-bar">
            <div className="v-info-item">
              <span className="v-lbl">VIAJANTE PRINCIPAL</span>
              <strong>{booking.traveler.fullName}</strong>
              <span>Doc: {booking.traveler.document}</span>
            </div>
            <div className="v-info-item">
              <span className="v-lbl">E-MAIL & CONTATO</span>
              <strong>{booking.traveler.email}</strong>
              <span>{booking.traveler.phone}</span>
            </div>
            <div className="v-info-item">
              <span className="v-lbl">STATUS DO PAGAMENTO</span>
              <strong className={booking.status === 'CONFIRMED' ? 'status-badge-confirmed' : 'status-badge-cancelled'}>
                {booking.status === 'CONFIRMED' ? `PAGO VIA ${booking.paymentMethod}` : 'RESERVA CANCELADA'}
              </strong>
              <span>Total: R$ {booking.pricing.finalTotal.toLocaleString('pt-BR')}</span>
            </div>
          </div>

          {booking.traveler.specialRequests && (
            <div className="v-requests-box">
              <span className="v-lbl">SOLICITAÇÕES ESPECIAIS AO HOTEL:</span>
              <p className="v-req-txt">"{booking.traveler.specialRequests}"</p>
            </div>
          )}

          <div className="voucher-footer">
            <div className="barcode-mock">
              <div className="bars-graphic" />
              <span className="barcode-num">{booking.bookingCode}-984120489124</span>
            </div>
            <div className="v-qr-stamp">
              <QrCode size={52} />
              <span>Autenticação Digital</span>
            </div>
          </div>
        </div>

        {/* Voucher Action Controls */}
        <div className="voucher-actions-row no-print">
          <button type="button" className="v-btn print-btn" onClick={() => window.print()}>
            <Printer size={18} />
            <span>Imprimir / Salvar PDF</span>
          </button>
          <button type="button" className="v-btn calendar-btn" onClick={handleDownloadCalendar}>
            <Download size={18} />
            <span>Baixar Calendário (.ics)</span>
          </button>
          <button type="button" className="v-btn done-btn" onClick={onClose}>
            <span>Fechar</span>
          </button>
        </div>
      </div>
    </div>
  );
}
