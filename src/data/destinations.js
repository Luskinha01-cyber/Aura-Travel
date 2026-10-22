// Catálogo Curado de Destinos e Hospedagens de Alto Padrão
export const CURATED_DESTINATIONS = [
  {
    id: 'rio-de-janeiro',
    name: 'Rio de Janeiro',
    country: 'Brasil',
    region: 'América do Sul',
    description: 'A Cidade Maravilhosa, com praias douradas icônicas, montanhas dramáticas e o calor acolhedor da cultura carioca.',
    lat: -22.9068,
    lng: -43.1729,
    rating: 4.9,
    reviewCount: 1420,
    coverImage: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1200&q=80',
    popularTags: ['Praias', 'Natureza', 'Gastronomia', 'Vida Noturna'],
    basePrice: 580,
    hotels: [
      {
        id: 'rio-copacabana-palace',
        name: 'Copacabana Palace Heritage & Spa',
        tagline: 'O luxo tradicional em frente à praia mais famosa do mundo',
        stars: 5,
        rating: 4.95,
        reviewCount: 520,
        lat: -22.9672,
        lng: -43.1789,
        pricePerNight: 1650,
        images: [
          'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80'
        ],
        amenities: ['Piscina Semiolímpica', 'Spa de Classe Mundial', 'Frente ao Mar', 'Café Imperial Incluso', 'Wi-Fi 6', 'Serviço de Mordomo'],
        roomTypes: [
          { id: 'deluxe-ocean', name: 'Suíte Deluxe Vista Mar', multiplier: 1.0, capacity: 2, desc: 'Cama King, varanda privativa de mármore e vista infinita para o Atlântico' },
          { id: 'master-terrace', name: 'Master Suite com Terraço', multiplier: 1.45, capacity: 3, desc: 'Amplo terraço particular com jacuzzi e salão privativo' },
          { id: 'presidential-suite', name: 'Suíte Presidencial Copacabana', multiplier: 2.2, capacity: 4, desc: 'A experiência definitiva com 150m², adega e mordomo 24h' }
        ]
      },
      {
        id: 'rio-ipanema-boutique',
        name: 'Fasano Panoramic Ipanema',
        tagline: 'Design contemporâneo assinado e o pôr do sol mais espetacular',
        stars: 5,
        rating: 4.88,
        reviewCount: 380,
        lat: -22.9868,
        lng: -43.2004,
        pricePerNight: 1280,
        images: [
          'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80'
        ],
        amenities: ['Rooftop Infinity Pool', 'Restaurante Michelin', 'Acesso Privativo à Praia', 'Concierge VIP', 'Academia de Alta Performance'],
        roomTypes: [
          { id: 'superior-courtyard', name: 'Apartamento Superior Designer', multiplier: 1.0, capacity: 2, desc: 'Decoração dos anos 50/60, varanda e amenities exclusivos' },
          { id: 'ocean-front-suite', name: 'Suíte Frente Mar Ipanema', multiplier: 1.35, capacity: 2, desc: 'Vista deslumbrante do Morro Dois Irmãos e mar de Ipanema' }
        ]
      },
      {
        id: 'rio-santa-teresa-retreat',
        name: 'Santa Teresa Eco-Loft & Boutique',
        tagline: 'Refúgio bucólico no coração boêmio e artístico com vista para a baía',
        stars: 4,
        rating: 4.79,
        reviewCount: 290,
        lat: -22.9190,
        lng: -43.1880,
        pricePerNight: 640,
        images: [
          'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1000&q=80'
        ],
        amenities: ['Jardim Tropical', 'Piscina com Deck de Madeira', 'Restaurante Orgânico', 'Adegas Selecionadas', 'Pet Friendly'],
        roomTypes: [
          { id: 'loft-garden', name: 'Loft Tropical Garden', multiplier: 1.0, capacity: 2, desc: 'Integrado à vegetação exuberante de Santa Teresa com ducha externa' },
          { id: 'suite-panoramica', name: 'Suíte Panorâmica Baía de Guanabara', multiplier: 1.3, capacity: 3, desc: 'Vista panorâmica do Centro e da Baía com banheira de imersão' }
        ]
      }
    ],
    attractions: [
      { name: 'Cristo Redentor', lat: -22.9519, lng: -43.2105, type: 'Monumento' },
      { name: 'Pão de Açúcar', lat: -22.9492, lng: -43.1545, type: 'Mirante' },
      { name: 'Praia de Copacabana', lat: -22.9698, lng: -43.1800, type: 'Praia' },
      { name: 'Jardim Botânico', lat: -22.9676, lng: -43.2241, type: 'Parque' }
    ]
  },
  {
    id: 'paris',
    name: 'Paris',
    country: 'França',
    region: 'Europa',
    description: 'A Cidade Luz, berço da arte, alta gastronomia, moda e romance à beira do Rio Sena.',
    lat: 48.8566,
    lng: 2.3522,
    rating: 4.92,
    reviewCount: 2310,
    coverImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
    popularTags: ['Romance', 'Arte & Museus', 'Alta Gastronomia', 'Arquitetura'],
    basePrice: 950,
    hotels: [
      {
        id: 'paris-ritz',
        name: 'Le Grand Ritz Place Vendôme',
        tagline: 'Elegância atemporal e sofisticação parisiense desde 1898',
        stars: 5,
        rating: 4.98,
        reviewCount: 780,
        lat: 48.8675,
        lng: 2.3294,
        pricePerNight: 2850,
        images: [
          'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1000&q=80'
        ],
        amenities: ['Chanel Spa Exclusivo', 'Bar Hemingway', 'Restaurante 3 Estrelas Michelin', 'Piscina Interior em Mármore', 'Serviço de Limusine'],
        roomTypes: [
          { id: 'prestige-room', name: 'Chambre Prestige Vendôme', multiplier: 1.0, capacity: 2, desc: 'Decoração nobre neoclássica com detalhes em folha de ouro' },
          { id: 'suite-coco-chanel', name: 'Suíte Histórica Coco', multiplier: 1.8, capacity: 2, desc: 'Homenagem à icônica designer com vista para a Place Vendôme' }
        ]
      },
      {
        id: 'paris-eiffel-view',
        name: 'Hôtel Plaza Athénée & Montaigne',
        tagline: 'Varandas com gerânios vermelhos e vista inesquecível para a Torre Eiffel',
        stars: 5,
        rating: 4.91,
        reviewCount: 460,
        lat: 48.8661,
        lng: 2.3045,
        pricePerNight: 2100,
        images: [
          'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1000&q=80'
        ],
        amenities: ['Vista Direta Torre Eiffel', 'Dior Spa Haute Couture', 'Pátio de Inverno com Patinação', 'Café da Manhã Gourmet'],
        roomTypes: [
          { id: 'deluxe-eiffel', name: 'Suíte com Vista Torre Eiffel', multiplier: 1.0, capacity: 2, desc: 'Acorde com o monumento mais famoso do mundo na sua janela' },
          { id: 'royal-suite', name: 'Suíte Real Montaigne', multiplier: 1.7, capacity: 4, desc: 'O ápice da alta costura em hospitalidade de luxo' }
        ]
      }
    ],
    attractions: [
      { name: 'Torre Eiffel', lat: 48.8584, lng: 2.2945, type: 'Monumento' },
      { name: 'Museu do Louvre', lat: 48.8606, lng: 2.3376, type: 'Museu' },
      { name: 'Catedral de Notre-Dame', lat: 48.8530, lng: 2.3499, type: 'Histórico' },
      { name: 'Arco do Triunfo', lat: 48.8738, lng: 2.2950, type: 'Monumento' }
    ]
  },
  {
    id: 'tokyo',
    name: 'Tóquio',
    country: 'Japão',
    region: 'Ásia',
    description: 'A metrópole do futuro onde templos milenares convivem com luzes de neon e culinária lendária.',
    lat: 35.6762,
    lng: 139.6503,
    rating: 4.96,
    reviewCount: 1890,
    coverImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
    popularTags: ['Futurismo', 'Gastronomia', 'Cultura', 'Segurança'],
    basePrice: 820,
    hotels: [
      {
        id: 'tokyo-aman',
        name: 'Aman Sanctuary Tokyo',
        tagline: 'Minimalismo zen japonês flutuando acima da agitação de Otemachi',
        stars: 5,
        rating: 4.97,
        reviewCount: 420,
        lat: 35.6865,
        lng: 139.7645,
        pricePerNight: 2350,
        images: [
          'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=80'
        ],
        amenities: ['Onsen Tradicional Interior', 'Vista Monte Fuji em dias claros', 'Cerimônia do Chá', 'Piscina Panorâmica Suspensa'],
        roomTypes: [
          { id: 'deluxe-room-city', name: 'Suíte Deluxe Otemachi', multiplier: 1.0, capacity: 2, desc: 'Madeira Washi, pedras basálticas e banheiro com ofurô tradicional' },
          { id: 'fuji-suite', name: 'Suíte Panorâmica Fuji', multiplier: 1.5, capacity: 3, desc: 'Ângulo de 180 graus para a linha do horizonte de Tóquio' }
        ]
      },
      {
        id: 'tokyo-shinjuku-park',
        name: 'Park Hyatt Shinjuku Skyline',
        tagline: 'O clássico de Shinjuku com vistas hipnotizantes da cidade infinita',
        stars: 5,
        rating: 4.89,
        reviewCount: 650,
        lat: 35.6853,
        lng: 139.6912,
        pricePerNight: 1450,
        images: [
          'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1000&q=80'
        ],
        amenities: ['New York Bar com Jazz ao Vivo', 'Piscina sob Teto de Vidro', 'Academia Panorâmica', 'Conexão Direta ao Metrô'],
        roomTypes: [
          { id: 'park-view-king', name: 'Quarto Park View King', multiplier: 1.0, capacity: 2, desc: 'Janelas do chão ao teto acima do 45º andar' },
          { id: 'diplomat-suite', name: 'Suíte Diplomata', multiplier: 1.6, capacity: 3, desc: 'Salão executivo e banheira de mármore com vista noturna' }
        ]
      }
    ],
    attractions: [
      { name: 'Cruce de Shibuya', lat: 35.6595, lng: 139.7005, type: 'Ponto Turístico' },
      { name: 'Templo Senso-ji', lat: 35.7148, lng: 139.7967, type: 'Templo' },
      { name: 'Tokyo Skytree', lat: 35.7101, lng: 139.8107, type: 'Mirante' },
      { name: 'Parque Ueno', lat: 35.7140, lng: 139.7741, type: 'Parque' }
    ]
  },
  {
    id: 'bali',
    name: 'Bali (Ubud & Praias)',
    country: 'Indonésia',
    region: 'Ásia',
    description: 'A Ilha dos Deuses: terraços de arroz verde-esmeralda, templos sagrados, bem-estar e ondas perfeitas.',
    lat: -8.4095,
    lng: 115.1889,
    rating: 4.93,
    reviewCount: 1650,
    coverImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
    popularTags: ['Espiritualidade', 'Resorts na Selva', 'Praias Paradisíacas', 'Yoga & Spa'],
    basePrice: 420,
    hotels: [
      {
        id: 'bali-hanging-gardens',
        name: 'Hanging Gardens Jungle Reserve',
        tagline: 'As piscinas de borda infinita em níveis sobre a selva tropical de Ubud',
        stars: 5,
        rating: 4.96,
        reviewCount: 890,
        lat: -8.4121,
        lng: 115.2345,
        pricePerNight: 1150,
        images: [
          'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1000&q=80'
        ],
        amenities: ['Piscina Cascata Suspensa', 'Spa Balinês Ayurvédico', 'Café da Manhã Flutuante', 'Yoga ao Nascer do Sol', 'Funicular na Selva'],
        roomTypes: [
          { id: 'riverside-pool-villa', name: 'Villa Riverside com Piscina Privada', multiplier: 1.0, capacity: 2, desc: 'Piscina aquecida particular sobre o rio sagrado Ayung' },
          { id: 'panoramic-villa', name: 'Villa Panorâmica Reserva da Selva', multiplier: 1.4, capacity: 4, desc: 'Dois quartos e deck de contemplação com orquídeas nativas' }
        ]
      }
    ],
    attractions: [
      { name: 'Terraços de Arroz Tegallalang', lat: -8.4312, lng: 115.2789, type: 'Natureza' },
      { name: 'Floresta dos Macacos de Ubud', lat: -8.5194, lng: 115.2585, type: 'Natureza' },
      { name: 'Templo Uluwatu', lat: -8.8291, lng: 115.0849, type: 'Templo' }
    ]
  },
  {
    id: 'rome',
    name: 'Roma',
    country: 'Itália',
    region: 'Europa',
    description: 'A Cidade Eterna: um museu a céu aberto repleto de história clássica, praças charmosas e dolce vita.',
    lat: 41.9028,
    lng: 12.4964,
    rating: 4.88,
    reviewCount: 1780,
    coverImage: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80',
    popularTags: ['História Milenar', 'Gastronomia Italiana', 'Cultura', 'Caminhadas'],
    basePrice: 650,
    hotels: [
      {
        id: 'rome-de-russie',
        name: 'Hotel de Russie & Secret Garden',
        tagline: 'Oásis clássico próximo à Piazza del Popolo com jardins escalonados',
        stars: 5,
        rating: 4.92,
        reviewCount: 510,
        lat: 41.9098,
        lng: 12.4764,
        pricePerNight: 1720,
        images: [
          'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80'
        ],
        amenities: ['Jardim Secreto Histórico', 'Spa com Águas Termais Salgadas', 'Jantar ao Ar Livre', 'Concierge de Arte'],
        roomTypes: [
          { id: 'classic-garden', name: 'Quarto Clássico com Vista Jardim', multiplier: 1.0, capacity: 2, desc: 'Cores suaves inspiradas na Roma Imperial e mármore de Carrara' },
          { id: 'popolo-suite', name: 'Suíte Popolo com Terraço', multiplier: 1.55, capacity: 3, desc: 'Terraço privativo mobiliado com vista para o Pincio' }
        ]
      }
    ],
    attractions: [
      { name: 'Coliseu Romano', lat: 41.8902, lng: 12.4922, type: 'Histórico' },
      { name: 'Fontana di Trevi', lat: 41.9009, lng: 12.4833, type: 'Monumento' },
      { name: 'Panteão de Roma', lat: 41.8986, lng: 12.4769, type: 'Histórico' }
    ]
  },
  {
    id: 'santorini',
    name: 'Santorini (Oia & Thira)',
    country: 'Grécia',
    region: 'Europa',
    description: 'Casas brancas caiadas, cúpulas azuis e o pôr do sol mais aclamado do Mar Egeu sobre a falésia vulcânica.',
    lat: 36.3932,
    lng: 25.4615,
    rating: 4.97,
    reviewCount: 1410,
    coverImage: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80',
    popularTags: ['Pôr do Sol Mágico', 'Ilhas Gregas', 'Casais & Romance', 'Vistas Vulcânicas'],
    basePrice: 890,
    hotels: [
      {
        id: 'santorini-canaves-oia',
        name: 'Canaves Oia Caldera Suites',
        tagline: 'Suítes esculpidas na rocha branca com piscina de borda infinita debruçada no Egeu',
        stars: 5,
        rating: 4.99,
        reviewCount: 620,
        lat: 36.4628,
        lng: 25.3753,
        pricePerNight: 2400,
        images: [
          'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1000&q=80'
        ],
        amenities: ['Piscina Privada na Caverna', 'Cruzeiro Privativo ao Entardecer', 'Degustação de Vinhos Vulcânicos', 'Café com Champanhe'],
        roomTypes: [
          { id: 'infinity-cave-suite', name: 'Suíte Cave com Piscina Infinita', multiplier: 1.0, capacity: 2, desc: 'Arquitetura das Cíclades esculpida na rocha e hidro privativa' },
          { id: 'honeymoon-villa', name: 'Villa Presidencial Honeymoon', multiplier: 1.6, capacity: 2, desc: 'Privacidade total com terraço panorâmico de 100m²' }
        ]
      }
    ],
    attractions: [
      { name: 'Castelo de Oia (Pôr do Sol)', lat: 36.4619, lng: 25.3725, type: 'Mirante' },
      { name: 'Praia Vermelha (Red Beach)', lat: 36.3481, lng: 25.3948, type: 'Praia' }
    ]
  },
  {
    id: 'new-york',
    name: 'Nova York',
    country: 'Estados Unidos',
    region: 'América do Norte',
    description: 'A metrópole vibrante que nunca dorme: espetáculos da Broadway, arranha-céus icônicos e energia sem igual.',
    lat: 40.7128,
    lng: -74.0060,
    rating: 4.89,
    reviewCount: 2950,
    coverImage: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=80',
    popularTags: ['Metrópole', 'Broadway', 'Compras', 'Gastronomia Mundial'],
    basePrice: 990,
    hotels: [
      {
        id: 'ny-the-mark',
        name: 'The Mark Upper East Side',
        tagline: 'O ápice da elegância nova-iorquina a passos do Central Park',
        stars: 5,
        rating: 4.93,
        reviewCount: 680,
        lat: 40.7735,
        lng: -73.9634,
        pricePerNight: 2600,
        images: [
          'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80'
        ],
        amenities: ['Culinária por Jean-Georges', 'Passeio de Veleiro Privado', 'Bicicletas Personalizadas', 'Acesso VIP a Museus'],
        roomTypes: [
          { id: 'madison-king', name: 'Quarto Madison King', multiplier: 1.0, capacity: 2, desc: 'Conforto acústico impecável com banheiros de mármore italiano' },
          { id: 'central-park-suite', name: 'Suíte Central Park High Floor', multiplier: 1.5, capacity: 3, desc: 'Vistas panorâmicas para as copas das árvores do Central Park' }
        ]
      }
    ],
    attractions: [
      { name: 'Central Park', lat: 40.7829, lng: -73.9654, type: 'Parque' },
      { name: 'Empire State Building', lat: 40.7484, lng: -73.9857, type: 'Mirante' },
      { name: 'Times Square', lat: 40.7580, lng: -73.9855, type: 'Ponto Turístico' }
    ]
  },
  {
    id: 'bariloche',
    name: 'San Carlos de Bariloche',
    country: 'Argentina',
    region: 'América do Sul',
    description: 'A Suíça argentina na Patagônia: lagos cristalinos glaciais, florestas andinas, chocolates artesanais e neve no inverno.',
    lat: -41.1335,
    lng: -71.3103,
    rating: 4.87,
    reviewCount: 920,
    coverImage: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
    popularTags: ['Patagônia', 'Montanhas & Neve', 'Chocolates', 'Ecoturismo'],
    basePrice: 520,
    hotels: [
      {
        id: 'bariloche-llao-llao',
        name: 'Llao Llao Hotel & Resort Golf-Spa',
        tagline: 'O resort lendário patagônico com vista para os picos andinos e o Lago Nahuel Huapi',
        stars: 5,
        rating: 4.94,
        reviewCount: 710,
        lat: -41.0531,
        lng: -71.5332,
        pricePerNight: 1390,
        images: [
          'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80'
        ],
        amenities: ['Campo de Golfe 18 Buracos', 'Piscina Térmica In/Out Panorâmica', 'Lareira de Pedra', 'Esqui & Snowboard no Inverno', 'Chá da Tarde Tradicional'],
        roomTypes: [
          { id: 'lake-view-studio', name: 'Studio com Vista para o Lago', multiplier: 1.0, capacity: 2, desc: 'Acorde com as águas cristalinas do Lago Moreno e montanhas nevadas' },
          { id: 'alawen-royal-suite', name: 'Suíte Royal Ala Moreno', multiplier: 1.4, capacity: 4, desc: 'Banheira de hidromassagem com vista para os Andes e lareira' }
        ]
      }
    ],
    attractions: [
      { name: 'Cerro Campanario (Melhor Vista)', lat: -41.0664, lng: -71.4497, type: 'Mirante' },
      { name: 'Circuito Chico', lat: -41.0583, lng: -71.5167, type: 'Natureza' },
      { name: 'Cerro Catedral (Centro de Esqui)', lat: -41.1719, lng: -71.4422, type: 'Aventura' }
    ]
  }
];

// Gerador de dados de hotéis procedurais caso o usuário busque qualquer outra cidade no mundo
export function generateProceduralHotelsForLocation(cityName, countryName, lat, lng) {
  const basePrice = Math.floor(450 + Math.random() * 400);
  return [
    {
      id: `proc-hotel-1-${cityName.toLowerCase().replace(/[^a-z0-9]/g, '')}`,
      name: `Grand Palace & Spa ${cityName}`,
      tagline: `A melhor hospitalidade no coração de ${cityName}`,
      stars: 5,
      rating: 4.9,
      reviewCount: 310,
      lat: lat + (Math.random() - 0.5) * 0.02,
      lng: lng + (Math.random() - 0.5) * 0.02,
      pricePerNight: basePrice + 380,
      images: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80'
      ],
      amenities: ['Piscina Climatizada', 'Spa & Sauna', 'Café da Manhã Incluso', 'Wi-Fi de Alta Velocidade', 'Transfer do Aeroporto'],
      roomTypes: [
        { id: 'suite-deluxe', name: 'Suíte Deluxe Executiva', multiplier: 1.0, capacity: 2, desc: `Vista privilegiada de ${cityName} com cama king size e frigobar premium` },
        { id: 'suite-presidential', name: 'Suíte Presidencial Panorâmica', multiplier: 1.5, capacity: 4, desc: 'Amplo espaço com varanda, sala de estar e hidro privativa' }
      ]
    },
    {
      id: `proc-hotel-2-${cityName.toLowerCase().replace(/[^a-z0-9]/g, '')}`,
      name: `${cityName} Boutique Eco-Resort`,
      tagline: `Conexão autêntica com a cultura e charme local`,
      stars: 4,
      rating: 4.82,
      reviewCount: 185,
      lat: lat + (Math.random() - 0.5) * 0.02,
      lng: lng + (Math.random() - 0.5) * 0.02,
      pricePerNight: basePrice,
      images: [
        'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80'
      ],
      amenities: ['Jardim Relaxante', 'Restaurante Típico', 'Aluguel de Bikes', 'Pet Friendly'],
      roomTypes: [
        { id: 'standard-double', name: 'Quarto Charmoso Duplo', multiplier: 1.0, capacity: 2, desc: 'Ambiente aconchegante com decoração contemporânea e varanda' }
      ]
    }
  ];
}
