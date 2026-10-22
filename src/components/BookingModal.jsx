import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  X,
  Calendar,
  Users,
  CheckCircle2,
  CreditCard,
  QrCode,
  ShieldCheck,
  Sparkles,
  Printer,
  Download,
  Copy,
  Clock,
  ArrowRight,
  ArrowLeft,
  Bed,
  MapPin,
  Check,
  Tag
} from 'lucide-react';
import { saveNewReservation } from '../services/bookingStorage';
import AuraLogo from './AuraLogo';
import './BookingModal.css';

export default function BookingModal({
  hotel,
  destinationName,
  country,
  initialCheckIn,
  initialCheckOut,
  initialGuests,
  onClose,
  onReservationComplete
}) {
  const [step, setStep] = useState(1); // 1: Quarto & Extras, 2: Viajante, 3: Pagamento, 4: Voucher Concluído

  // Dates & Nights
  const checkIn = initialCheckIn || new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0];
  const checkOut = initialCheckOut || new Date(Date.now() + 86400000 * 12).toISOString().split('T')[0];

  const diffTime = Math.abs(new Date(checkOut) - new Date(checkIn));
  const nightsCount = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  // Selected Room
  const roomTypes = hotel.roomTypes || [
    { id: 'suite-standard', name: 'Suíte Luxo Standard', multiplier: 1.0, desc: 'Cama King, varanda e amenities exclusivos' }
  ];
  const [selectedRoomId, setSelectedRoomId] = useState(roomTypes[0].id);
  const selectedRoom = roomTypes.find(r => r.id === selectedRoomId) || roomTypes[0];

  // Optional Additions
  const [selectedExtras, setSelectedExtras] = useState({
    breakfast: true,
    transfer: false,
    spa: false,
    flexibleCancellation: true
  });

  // Traveler Data
  const [traveler, setTraveler] = useState({
    fullName: '',
    email: '',
    phone: '',
    document: '',
    specialRequests: ''
  });
  const [errors, setErrors] = useState({});

  // Coupon
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponMessage, setCouponMessage] = useState(null);

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState('PIX'); // 'PIX' | 'CARD'
  const [pixCopied, setPixCopied] = useState(false);
  const [pixTimeLeft, setPixTimeLeft] = useState(900); // 15 minutos em segundos

  // Credit Card Simulation
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
    installments: '1'
  });

  // Completed Reservation State
  const [completedBooking, setCompletedBooking] = useState(null);

  // Pix timer countdown
  useEffect(() => {
    if (step === 3 && paymentMethod === 'PIX' && pixTimeLeft > 0) {
      const timer = setInterval(() => setPixTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [step, paymentMethod, pixTimeLeft]);

  // Price Calculation
  const baseRoomPrice = Math.round(hotel.pricePerNight * selectedRoom.multiplier);
  const nightsSubtotal = baseRoomPrice * nightsCount;

  let extrasTotal = 0;
  if (selectedExtras.breakfast) extrasTotal += 85 * nightsCount * (initialGuests?.adults || 2);
  if (selectedExtras.transfer) extrasTotal += 190;
  if (selectedExtras.spa) extrasTotal += 350;
  if (selectedExtras.flexibleCancellation) extrasTotal += 140;

  const preDiscountTotal = nightsSubtotal + extrasTotal;
  const discountAmount = Math.round(preDiscountTotal * (discountPercent / 100));
  const serviceFee = Math.round((preDiscountTotal - discountAmount) * 0.08); // 8% taxa de serviço
  const finalTotal = preDiscountTotal - discountAmount + serviceFee;

  // Coupon validation
  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const clean = couponCode.trim().toUpperCase();
    if (clean === 'AURA10') {
      setDiscountPercent(10);
      setCouponMessage({ type: 'success', text: 'Cupom AURA10 aplicado: 10% de desconto!' });
    } else if (clean === 'VIAJABEM' || clean === 'BEMVINDO') {
      setDiscountPercent(15);
      setCouponMessage({ type: 'success', text: 'Cupom de Boas-Vindas aplicado: 15% de desconto!' });
    } else {
      setDiscountPercent(0);
      setCouponMessage({ type: 'error', text: 'Cupom inválido ou expirado.' });
    }
  };

  // Step 2 validation
  const validateTravelerForm = () => {
    const errs = {};
    if (!traveler.fullName.trim()) errs.fullName = 'Informe o nome completo';
    if (!traveler.email.trim() || !traveler.email.includes('@')) errs.email = 'E-mail válido é obrigatório';
    if (!traveler.phone.trim()) errs.phone = 'Telefone para contato é obrigatório';
    if (!traveler.document.trim()) errs.document = 'Documento (CPF ou Passaporte) é obrigatório';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextToPayment = (e) => {
    e.preventDefault();
    if (validateTravelerForm()) {
      setStep(3);
    }
  };

  // Complete Booking Action
  const handleFinalizeBooking = () => {
    const newReservation = saveNewReservation({
      destinationName,
      country,
      hotelId: hotel.id,
      hotelName: hotel.name,
      hotelImage: hotel.images[0],
      hotelStars: hotel.stars || 5,
      checkIn,
      checkOut,
      nightsCount,
      guests: initialGuests || { adults: 2, children: 0, rooms: 1 },
      roomType: {
        id: selectedRoom.id,
        name: selectedRoom.name,
        pricePerNight: baseRoomPrice
      },
      additions: Object.entries(selectedExtras)
        .filter(([_, active]) => active)
        .map(([key]) => ({
          id: key,
          name: key === 'breakfast' ? 'Café Imperial Diário' :
                key === 'transfer' ? 'Transfer Executivo' :
                key === 'spa' ? 'Pacote Spa Bem-Estar' : 'Cancelamento 100% Flexível'
        })),
      pricing: {
        subtotal: nightsSubtotal,
        extrasTotal,
        serviceFee,
        discount: discountAmount,
        couponCode: discountPercent > 0 ? couponCode : null,
        finalTotal
      },
      traveler,
      paymentMethod
    });

    setCompletedBooking(newReservation);
    setStep(4);

    // Fire Confetti!
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // Ignora erro se confetti não carregar
    }

    if (onReservationComplete) {
      onReservationComplete(newReservation);
    }
  };

  const handleCopyPix = () => {
    const mockPixKey = `00020126580014br.gov.bcb.pix0136aura-travel-${Math.random().toString(36).substring(2, 10)}520400005303986540${finalTotal}.005802BR5913AURA TRAVEL6009SAO PAULO62070503***6304`;
    navigator.clipboard.writeText(mockPixKey);
    setPixCopied(true);
    setTimeout(() => setPixCopied(false), 3000);
  };

  const formatPixTimer = () => {
    const min = Math.floor(pixTimeLeft / 60);
    const sec = pixTimeLeft % 60;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  // Download .ics Calendar File
  const handleDownloadCalendar = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Aura Travel//Reservas//PT
BEGIN:VEVENT
SUMMARY:Viagem para ${destinationName} - ${hotel.name}
DESCRIPTION:Reserva confirmada Aura Travel #${completedBooking?.bookingCode}\\nHospedagem: ${hotel.name}\\nQuarto: ${selectedRoom.name}
LOCATION:${hotel.name}, ${destinationName}, ${country}
DTSTART:${checkIn.replace(/-/g, '')}T140000Z
DTEND:${checkOut.replace(/-/g, '')}T120000Z
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `AuraTravel-${completedBooking?.bookingCode || 'Viagem'}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="modal-backdrop animate-fade-in" onClick={onClose}>
      <div className="booking-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="booking-modal-header no-print">
          <div className="header-badge">
            <Sparkles size={14} />
            <span>Simulação Oficial de Reserva</span>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Fechar">
            <X size={20} />
          </button>
        </div>

        {/* Wizard Stepper (Steps 1, 2, 3) */}
        {step < 4 && (
          <div className="booking-stepper no-print">
            <div className={`step-item ${step >= 1 ? 'active' : ''}`}>
              <span className="step-num">{step > 1 ? <Check size={14} /> : '1'}</span>
              <span className="step-label">Estadia & Suíte</span>
            </div>
            <div className="step-connector" />
            <div className={`step-item ${step >= 2 ? 'active' : ''}`}>
              <span className="step-num">{step > 2 ? <Check size={14} /> : '2'}</span>
              <span className="step-label">Viajante</span>
            </div>
            <div className="step-connector" />
            <div className={`step-item ${step >= 3 ? 'active' : ''}`}>
              <span className="step-num">3</span>
              <span className="step-label">Pagamento</span>
            </div>
          </div>
        )}

        {/* STEP 1: ROOM & EXTRAS */}
        {step === 1 && (
          <div className="modal-body-step animate-fade-in">
            {/* Hotel Summary Bar */}
            <div className="stay-summary-banner">
              <img src={hotel.images[0]} alt={hotel.name} className="summary-thumb" />
              <div className="summary-details">
                <span className="summary-dest">{destinationName}, {country}</span>
                <h3 className="summary-hotel-name">{hotel.name}</h3>
                <div className="summary-dates-chip">
                  <Calendar size={14} />
                  <span>{new Date(checkIn).toLocaleDateString('pt-BR')} — {new Date(checkOut).toLocaleDateString('pt-BR')} ({nightsCount} noites)</span>
                </div>
              </div>
            </div>

            {/* Room Selection */}
            <div className="step-section">
              <h4 className="section-title">
                <Bed size={18} />
                <span>Escolha o seu Tipo de Suíte</span>
              </h4>
              <div className="room-options-grid">
                {roomTypes.map(r => {
                  const rPrice = Math.round(hotel.pricePerNight * r.multiplier);
                  const isCurSelected = selectedRoomId === r.id;
                  return (
                    <div
                      key={r.id}
                      className={`room-option-card ${isCurSelected ? 'selected' : ''}`}
                      onClick={() => setSelectedRoomId(r.id)}
                    >
                      <div className="room-opt-header">
                        <span className="room-opt-name">{r.name}</span>
                        <span className="room-opt-price">R$ {rPrice.toLocaleString('pt-BR')}/noite</span>
                      </div>
                      <p className="room-opt-desc">{r.desc}</p>
                      <div className="room-opt-footer">
                        <span className="room-opt-cap">Até {r.capacity || 2} hóspedes</span>
                        <span className={`select-indicator ${isCurSelected ? 'checked' : ''}`}>
                          {isCurSelected ? 'Selecionado' : 'Selecionar'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Optional Experiences */}
            <div className="step-section">
              <h4 className="section-title">
                <Sparkles size={18} />
                <span>Experiências e Adicionais Exclusivos</span>
              </h4>
              <div className="extras-list">
                <label className="extra-item-row">
                  <input
                    type="checkbox"
                    checked={selectedExtras.breakfast}
                    onChange={(e) => setSelectedExtras(prev => ({ ...prev, breakfast: e.target.checked }))}
                  />
                  <div className="extra-info">
                    <span className="extra-name">Café da Manhã Imperial Gourmet</span>
                    <span className="extra-desc">Buffet completo com frutas tropicais, pâtisserie francesa e espumante</span>
                  </div>
                  <span className="extra-price">+R$ 85/dia por pessoa</span>
                </label>

                <label className="extra-item-row">
                  <input
                    type="checkbox"
                    checked={selectedExtras.transfer}
                    onChange={(e) => setSelectedExtras(prev => ({ ...prev, transfer: e.target.checked }))}
                  />
                  <div className="extra-info">
                    <span className="extra-name">Transfer Executivo Privativo</span>
                    <span className="extra-desc">Recepção no aeroporto com motorista bilíngue e veículo blindado</span>
                  </div>
                  <span className="extra-price">+R$ 190</span>
                </label>

                <label className="extra-item-row">
                  <input
                    type="checkbox"
                    checked={selectedExtras.spa}
                    onChange={(e) => setSelectedExtras(prev => ({ ...prev, spa: e.target.checked }))}
                  />
                  <div className="extra-info">
                    <span className="extra-name">Sessão Relaxante no Spa & Massagem</span>
                    <span className="extra-desc">Massagem com pedras quentes e óleos essenciais para 2 pessoas</span>
                  </div>
                  <span className="extra-price">+R$ 350</span>
                </label>

                <label className="extra-item-row">
                  <input
                    type="checkbox"
                    checked={selectedExtras.flexibleCancellation}
                    onChange={(e) => setSelectedExtras(prev => ({ ...prev, flexibleCancellation: e.target.checked }))}
                  />
                  <div className="extra-info">
                    <span className="extra-name">Garantia de Cancelamento 100% Flexível</span>
                    <span className="extra-desc">Cancele ou altere datas até 24h antes do check-in sem qualquer multa</span>
                  </div>
                  <span className="extra-price">+R$ 140</span>
                </label>
              </div>
            </div>

            {/* Price Preview Footer */}
            <div className="modal-step-footer">
              <div className="footer-price-breakdown">
                <span className="f-total-label">Total estimado ({nightsCount} noites):</span>
                <span className="f-total-val">R$ {finalTotal.toLocaleString('pt-BR')}</span>
              </div>
              <button className="modal-primary-btn" onClick={() => setStep(2)}>
                <span>Continuar para Dados do Viajante</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: TRAVELER INFORMATION */}
        {step === 2 && (
          <form className="modal-body-step animate-fade-in" onSubmit={handleNextToPayment}>
            <div className="step-intro">
              <h4 className="section-title">Dados do Viajante Principal</h4>
              <p className="section-subtitle">As informações serão impressas no voucher oficial da reserva e enviadas para o concierge do hotel.</p>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="fn-input">Nome Completo *</label>
                <input
                  id="fn-input"
                  type="text"
                  placeholder="Ex: Lucas Fernandes Silva"
                  value={traveler.fullName}
                  onChange={(e) => setTraveler({ ...traveler, fullName: e.target.value })}
                  className={errors.fullName ? 'has-error' : ''}
                />
                {errors.fullName && <span className="error-text">{errors.fullName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="em-input">E-mail para Recebimento do Voucher *</label>
                <input
                  id="em-input"
                  type="email"
                  placeholder="Ex: lucas@exemplo.com"
                  value={traveler.email}
                  onChange={(e) => setTraveler({ ...traveler, email: e.target.value })}
                  className={errors.email ? 'has-error' : ''}
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="ph-input">Telefone / WhatsApp *</label>
                <input
                  id="ph-input"
                  type="tel"
                  placeholder="Ex: (11) 98765-4321"
                  value={traveler.phone}
                  onChange={(e) => setTraveler({ ...traveler, phone: e.target.value })}
                  className={errors.phone ? 'has-error' : ''}
                />
                {errors.phone && <span className="error-text">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="doc-input">Documento (CPF ou Passaporte) *</label>
                <input
                  id="doc-input"
                  type="text"
                  placeholder="Ex: 123.456.789-00"
                  value={traveler.document}
                  onChange={(e) => setTraveler({ ...traveler, document: e.target.value })}
                  className={errors.document ? 'has-error' : ''}
                />
                {errors.document && <span className="error-text">{errors.document}</span>}
              </div>

              <div className="form-group full-width">
                <label htmlFor="req-input">Solicitações Especiais ao Hotel (Opcional)</label>
                <textarea
                  id="req-input"
                  rows={2}
                  placeholder="Ex: Andar alto, comemoração de aniversário de casamento, preferência por travesseiro de plumas..."
                  value={traveler.specialRequests}
                  onChange={(e) => setTraveler({ ...traveler, specialRequests: e.target.value })}
                />
              </div>
            </div>

            <div className="modal-step-footer">
              <button type="button" className="modal-secondary-btn" onClick={() => setStep(1)}>
                <ArrowLeft size={18} />
                <span>Voltar</span>
              </button>
              <button type="submit" className="modal-primary-btn">
                <span>Ir para Pagamento</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: PAYMENT SIMULATION */}
        {step === 3 && (
          <div className="modal-body-step animate-fade-in">
            {/* Coupon Code Section */}
            <div className="coupon-bar">
              <form onSubmit={handleApplyCoupon} className="coupon-form">
                <Tag size={16} className="coupon-icon" />
                <input
                  type="text"
                  placeholder="Cupom promocional (Ex: AURA10 ou VIAJABEM)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <button type="submit" className="coupon-apply-btn">Aplicar</button>
              </form>
              {couponMessage && (
                <span className={`coupon-feedback ${couponMessage.type}`}>
                  {couponMessage.text}
                </span>
              )}
            </div>

            {/* Payment Method Selector Tabs */}
            <div className="payment-tabs">
              <button
                type="button"
                className={`pay-tab ${paymentMethod === 'PIX' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('PIX')}
              >
                <QrCode size={18} />
                <span>Pix Instantâneo (Aprovação Imediata)</span>
              </button>
              <button
                type="button"
                className={`pay-tab ${paymentMethod === 'CARD' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('CARD')}
              >
                <CreditCard size={18} />
                <span>Cartão de Crédito (Até 12x)</span>
              </button>
            </div>

            {/* PIX SIMULATION */}
            {paymentMethod === 'PIX' && (
              <div className="pix-payment-box animate-fade-in">
                <div className="pix-instructions">
                  <div className="pix-timer">
                    <Clock size={16} />
                    <span>Este código Pix expira em: <strong>{formatPixTimer()}</strong></span>
                  </div>
                  <p>Escaneie o QR Code abaixo pelo aplicativo do seu banco ou use a chave Copia e Cola:</p>
                </div>

                <div className="pix-qr-area">
                  <div className="qr-box">
                    {/* SVG Realista de QR Code */}
                    <svg viewBox="0 0 100 100" width="160" height="160" className="qr-svg">
                      <rect width="100" height="100" fill="#ffffff" />
                      {/* Cantos de alinhamento */}
                      <rect x="10" y="10" width="25" height="25" fill="#0f172a" />
                      <rect x="15" y="15" width="15" height="15" fill="#ffffff" />
                      <rect x="18" y="18" width="9" height="9" fill="#0284c7" />

                      <rect x="65" y="10" width="25" height="25" fill="#0f172a" />
                      <rect x="70" y="15" width="15" height="15" fill="#ffffff" />
                      <rect x="73" y="18" width="9" height="9" fill="#0284c7" />

                      <rect x="10" y="65" width="25" height="25" fill="#0f172a" />
                      <rect x="15" y="70" width="15" height="15" fill="#ffffff" />
                      <rect x="18" y="73" width="9" height="9" fill="#0284c7" />

                      {/* Padrões centrais mockados */}
                      <rect x="42" y="15" width="6" height="18" fill="#0f172a" />
                      <rect x="52" y="22" width="6" height="12" fill="#0f172a" />
                      <rect x="40" y="42" width="20" height="20" fill="#0284c7" />
                      <rect x="45" y="45" width="10" height="10" fill="#ffffff" />
                      <rect x="15" y="45" width="18" height="6" fill="#0f172a" />
                      <rect x="68" y="45" width="18" height="6" fill="#0f172a" />
                      <rect x="45" y="70" width="6" height="18" fill="#0f172a" />
                      <rect x="68" y="68" width="18" height="18" fill="#0f172a" />
                    </svg>
                  </div>

                  <button type="button" className="copy-pix-btn" onClick={handleCopyPix}>
                    {pixCopied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                    <span>{pixCopied ? 'Chave Copiada com Sucesso!' : 'Copiar Código Pix Copia e Cola'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* CREDIT CARD SIMULATION */}
            {paymentMethod === 'CARD' && (
              <div className="card-payment-box animate-fade-in">
                {/* 3D Visual Card Preview */}
                <div className="virtual-card-preview">
                  <div className="vc-chip" />
                  <div className="vc-brand">AURA LUXURY</div>
                  <div className="vc-number">
                    {cardData.number || '•••• •••• •••• ••••'}
                  </div>
                  <div className="vc-footer">
                    <div className="vc-holder">
                      <span className="vc-label">TITULAR</span>
                      <span className="vc-val">{cardData.name || traveler.fullName || 'SEU NOME AQUI'}</span>
                    </div>
                    <div className="vc-expiry">
                      <span className="vc-label">VALIDADE</span>
                      <span className="vc-val">{cardData.expiry || 'MM/AA'}</span>
                    </div>
                  </div>
                </div>

                <div className="card-inputs-grid">
                  <div className="form-group full-width">
                    <label>Número do Cartão</label>
                    <input
                      type="text"
                      placeholder="0000 0000 0000 0000"
                      maxLength={19}
                      value={cardData.number}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim();
                        setCardData({ ...cardData, number: val });
                      }}
                    />
                  </div>

                  <div className="form-group">
                    <label>Nome Gravado no Cartão</label>
                    <input
                      type="text"
                      placeholder="Como impresso no cartão"
                      value={cardData.name}
                      onChange={(e) => setCardData({ ...cardData, name: e.target.value.toUpperCase() })}
                    />
                  </div>

                  <div className="form-row-duo">
                    <div className="form-group">
                      <label>Validade</label>
                      <input
                        type="text"
                        placeholder="MM/AA"
                        maxLength={5}
                        value={cardData.expiry}
                        onChange={(e) => {
                          let val = e.target.value.replace(/\D/g, '');
                          if (val.length >= 2) val = `${val.slice(0, 2)}/${val.slice(2, 4)}`;
                          setCardData({ ...cardData, expiry: val });
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <label>CVV</label>
                      <input
                        type="password"
                        placeholder="123"
                        maxLength={4}
                        value={cardData.cvv}
                        onChange={(e) => setCardData({ ...cardData, cvv: e.target.value.replace(/\D/g, '') })}
                      />
                    </div>
                  </div>

                  <div className="form-group full-width">
                    <label>Opções de Parcelamento</label>
                    <select
                      value={cardData.installments}
                      onChange={(e) => setCardData({ ...cardData, installments: e.target.value })}
                    >
                      <option value="1">1x de R$ {finalTotal.toLocaleString('pt-BR')} (sem juros)</option>
                      <option value="3">3x de R$ {Math.round(finalTotal / 3).toLocaleString('pt-BR')} (sem juros)</option>
                      <option value="6">6x de R$ {Math.round(finalTotal / 6).toLocaleString('pt-BR')} (sem juros)</option>
                      <option value="10">10x de R$ {Math.round(finalTotal / 10).toLocaleString('pt-BR')} (sem juros)</option>
                      <option value="12">12x de R$ {Math.round(finalTotal / 12).toLocaleString('pt-BR')} (sem juros)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Price Summary Breakdown */}
            <div className="checkout-summary-card">
              <div className="summary-line">
                <span>Diárias ({nightsCount} noites x R$ {baseRoomPrice.toLocaleString('pt-BR')}):</span>
                <span>R$ {nightsSubtotal.toLocaleString('pt-BR')}</span>
              </div>
              {extrasTotal > 0 && (
                <div className="summary-line">
                  <span>Adicionais e Experiências:</span>
                  <span>R$ {extrasTotal.toLocaleString('pt-BR')}</span>
                </div>
              )}
              {discountAmount > 0 && (
                <div className="summary-line discount">
                  <span>Desconto ({discountPercent}% cupom):</span>
                  <span>-R$ {discountAmount.toLocaleString('pt-BR')}</span>
                </div>
              )}
              <div className="summary-line">
                <span>Taxa de Serviço e Turismo:</span>
                <span>R$ {serviceFee.toLocaleString('pt-BR')}</span>
              </div>
              <div className="summary-line total-line">
                <strong>Total Final:</strong>
                <strong className="total-highlight">R$ {finalTotal.toLocaleString('pt-BR')}</strong>
              </div>
            </div>

            <div className="modal-step-footer">
              <button type="button" className="modal-secondary-btn" onClick={() => setStep(2)}>
                <ArrowLeft size={18} />
                <span>Voltar</span>
              </button>
              <button type="button" className="modal-primary-btn confirm-btn" onClick={handleFinalizeBooking}>
                <ShieldCheck size={20} />
                <span>Confirmar Pagamento Simulado</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: OFFICIAL TRAVEL VOUCHER & CONFIRMATION */}
        {step === 4 && completedBooking && (
          <div className="modal-body-step voucher-step animate-fade-in">
            <div className="success-banner no-print">
              <div className="success-icon-badge">
                <CheckCircle2 size={36} color="#10b981" />
              </div>
              <h3 className="success-title">Reserva Confirmada com Sucesso!</h3>
              <p className="success-sub">Seu voucher de viagem foi gerado e salvo em suas viagens. Apresente este documento no check-in do hotel.</p>
            </div>

            {/* Print-Ready Official Voucher Ticket */}
            <div className="official-travel-voucher print-voucher-only">
              {/* Voucher Top Brand */}
              <div className="voucher-header">
                <div className="v-brand">
                  <AuraLogo variant="horizontal" height={32} />
                  <span className="v-sub">VOUCHER OFICIAL DE HOSPEDAGEM & EMBARQUE</span>
                </div>
                <div className="v-locator-box">
                  <span className="v-loc-lbl">CÓDIGO LOCALIZADOR</span>
                  <span className="v-loc-code">{completedBooking.bookingCode}</span>
                </div>
              </div>

              {/* Voucher Main Details Grid */}
              <div className="voucher-grid">
                <div className="v-hotel-col">
                  <img src={completedBooking.hotelImage} alt={completedBooking.hotelName} className="v-hotel-thumb" />
                  <div className="v-hotel-text">
                    <h4 className="v-h-name">{completedBooking.hotelName}</h4>
                    <span className="v-h-dest">{completedBooking.destinationName}, {completedBooking.country}</span>
                    <span className="v-h-room">Acomodação: <strong>{completedBooking.roomType.name}</strong></span>
                  </div>
                </div>

                <div className="v-dates-col">
                  <div className="v-date-block">
                    <span className="v-lbl">CHECK-IN</span>
                    <strong className="v-val">{new Date(completedBooking.checkIn).toLocaleDateString('pt-BR')}</strong>
                    <span className="v-sub">A partir das 14:00</span>
                  </div>
                  <div className="v-nights-badge">{completedBooking.nightsCount} NOITES</div>
                  <div className="v-date-block">
                    <span className="v-lbl">CHECK-OUT</span>
                    <strong className="v-val">{new Date(completedBooking.checkOut).toLocaleDateString('pt-BR')}</strong>
                    <span className="v-sub">Até as 12:00</span>
                  </div>
                </div>
              </div>

              {/* Guest & Payment Summary Bar */}
              <div className="voucher-info-bar">
                <div className="v-info-item">
                  <span className="v-lbl">VIAJANTE PRINCIPAL</span>
                  <strong>{completedBooking.traveler.fullName}</strong>
                  <span>Doc: {completedBooking.traveler.document}</span>
                </div>
                <div className="v-info-item">
                  <span className="v-lbl">CONTATO</span>
                  <strong>{completedBooking.traveler.email}</strong>
                  <span>{completedBooking.traveler.phone}</span>
                </div>
                <div className="v-info-item">
                  <span className="v-lbl">PAGAMENTO</span>
                  <strong className="status-badge-confirmed">PAGO VIA {completedBooking.paymentMethod}</strong>
                  <span>Total: R$ {completedBooking.pricing.finalTotal.toLocaleString('pt-BR')}</span>
                </div>
              </div>

              {/* Voucher Footer with Barcode & QR Code */}
              <div className="voucher-footer">
                <div className="barcode-mock">
                  <div className="bars-graphic" />
                  <span className="barcode-num">{completedBooking.bookingCode}-984120489124</span>
                </div>
                <div className="v-qr-stamp">
                  <QrCode size={52} />
                  <span>Autenticação Digital</span>
                </div>
              </div>
            </div>

            {/* Actions for Voucher */}
            <div className="voucher-actions-row no-print">
              <button type="button" className="v-btn print-btn" onClick={() => window.print()}>
                <Printer size={18} />
                <span>Imprimir / Salvar PDF</span>
              </button>
              <button type="button" className="v-btn calendar-btn" onClick={handleDownloadCalendar}>
                <Download size={18} />
                <span>Adicionar ao Calendário (.ics)</span>
              </button>
              <button type="button" className="v-btn done-btn" onClick={onClose}>
                <span>Concluir e Explorar Mais</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
