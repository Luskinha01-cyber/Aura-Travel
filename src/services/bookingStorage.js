// Gerenciador de Armazenamento de Reservas (LocalStorage)
const STORAGE_KEY = 'aura_travel_bookings_v1';

const INITIAL_DEMO_RESERVATION = {
  id: 'res-demo-001',
  bookingCode: 'AUR-74291',
  createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  destinationId: 'rio-de-janeiro',
  destinationName: 'Rio de Janeiro',
  country: 'Brasil',
  hotelId: 'rio-copacabana-palace',
  hotelName: 'Copacabana Palace Heritage & Spa',
  hotelImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80',
  hotelStars: 5,
  checkIn: new Date(Date.now() + 86400000 * 14).toISOString().split('T')[0],
  checkOut: new Date(Date.now() + 86400000 * 19).toISOString().split('T')[0],
  nightsCount: 5,
  guests: { adults: 2, children: 0, rooms: 1 },
  roomType: {
    id: 'deluxe-ocean',
    name: 'Suíte Deluxe Vista Mar',
    pricePerNight: 1650
  },
  additions: [
    { id: 'breakfast', name: 'Café Imperial Gourmet Incluso', price: 0 },
    { id: 'transfer', name: 'Transfer Executivo Aeroporto GIG', price: 180 }
  ],
  pricing: {
    subtotal: 8250,
    additionsTotal: 180,
    serviceFee: 843,
    discount: 843,
    couponCode: 'BEMVINDO',
    finalTotal: 8430
  },
  traveler: {
    fullName: 'Lucas Fernandes Silva',
    email: 'lucas.viajante@email.com',
    phone: '+55 (11) 98765-4321',
    document: '421.908.112-90',
    specialRequests: 'Andar alto com vista desimpedida para o mar e late check-out se disponível.'
  },
  paymentMethod: 'PIX',
  status: 'CONFIRMED'
};

export function getStoredReservations() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Inicializa com uma reserva de demonstração de boas-vindas
      localStorage.setItem(STORAGE_KEY, JSON.stringify([INITIAL_DEMO_RESERVATION]));
      return [INITIAL_DEMO_RESERVATION];
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Erro ao ler reservas do localStorage:', e);
    return [INITIAL_DEMO_RESERVATION];
  }
}

export function saveNewReservation(reservationData) {
  try {
    const current = getStoredReservations();
    const newRecord = {
      ...reservationData,
      id: `res-${Date.now()}`,
      bookingCode: `AUR-${Math.floor(10000 + Math.random() * 90000)}`,
      createdAt: new Date().toISOString(),
      status: 'CONFIRMED'
    };
    const updated = [newRecord, ...current];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newRecord;
  } catch (e) {
    console.error('Erro ao salvar nova reserva:', e);
    throw e;
  }
}

export function cancelReservation(reservationId) {
  try {
    const current = getStoredReservations();
    const updated = current.map(item => {
      if (item.id === reservationId) {
        return { ...item, status: 'CANCELLED', cancelledAt: new Date().toISOString() };
      }
      return item;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Erro ao cancelar reserva:', e);
    throw e;
  }
}
