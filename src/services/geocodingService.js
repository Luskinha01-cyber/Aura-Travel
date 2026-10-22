// Serviço de Busca e Geocodificação Global via OpenStreetMap Nominatim API
import { CURATED_DESTINATIONS } from '../data/destinations';

const CACHE = new Map();

export async function searchGlobalLocations(query) {
  if (!query || query.trim().length < 2) return [];

  const cleanQuery = query.trim().toLowerCase();

  // 1. Prioriza destinos curados locais instantaneamente
  const localMatches = CURATED_DESTINATIONS.filter(d =>
    d.name.toLowerCase().includes(cleanQuery) ||
    d.country.toLowerCase().includes(cleanQuery) ||
    d.region.toLowerCase().includes(cleanQuery)
  ).map(d => ({
    id: d.id,
    name: d.name,
    country: d.country,
    displayName: `${d.name}, ${d.country}`,
    lat: d.lat,
    lng: d.lng,
    isCurated: true,
    destinationRef: d
  }));

  // Se já tiver cache online para a query
  if (CACHE.has(cleanQuery)) {
    const cached = CACHE.get(cleanQuery);
    return mergeUniqueResults(localMatches, cached);
  }

  try {
    const endpoint = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&addressdetails=1&limit=5`;
    const response = await fetch(endpoint, {
      headers: {
        'Accept-Language': 'pt-BR,pt;q=0.9,en;q=0.8'
      }
    });

    if (!response.ok) return localMatches;

    const results = await response.json();
    const formatted = results.map(item => {
      const address = item.address || {};
      const cityName = address.city || address.town || address.municipality || address.village || address.state || item.display_name.split(',')[0];
      const countryName = address.country || '';

      return {
        id: `osm-${item.place_id}`,
        name: cityName,
        country: countryName,
        displayName: item.display_name,
        lat: parseFloat(item.lat),
        lng: parseFloat(item.lon),
        isCurated: false
      };
    });

    CACHE.set(cleanQuery, formatted);
    return mergeUniqueResults(localMatches, formatted);
  } catch (error) {
    console.warn('Erro ao consultar Nominatim OSM:', error);
    return localMatches;
  }
}

function mergeUniqueResults(curated, online) {
  const seen = new Set();
  const list = [];

  for (const item of [...curated, ...online]) {
    const key = `${item.name.toLowerCase()}-${item.country.toLowerCase()}`;
    if (!seen.has(key)) {
      seen.add(key);
      list.push(item);
    }
  }

  return list.slice(0, 7);
}
