// Serviço de Integração com Open-Meteo Weather API (Gratuita, sem chave necessária)

// Mapeamento de códigos WMO para descrição, ícone e classe
const WMO_WEATHER_MAP = {
  0: { label: 'Céu Limpo', icon: 'sun', type: 'sunny' },
  1: { label: 'Principalmente Limpo', icon: 'sun', type: 'sunny' },
  2: { label: 'Parcialmente Nublado', icon: 'cloud-sun', type: 'partly-cloudy' },
  3: { label: 'Nublado', icon: 'cloud', type: 'cloudy' },
  45: { label: 'Nevoeiro', icon: 'cloud-fog', type: 'foggy' },
  48: { label: 'Névoa com Gelo', icon: 'cloud-fog', type: 'foggy' },
  51: { label: 'Garoa Leve', icon: 'cloud-drizzle', type: 'rainy' },
  53: { label: 'Garoa Moderada', icon: 'cloud-drizzle', type: 'rainy' },
  55: { label: 'Garoa Intensa', icon: 'cloud-drizzle', type: 'rainy' },
  61: { label: 'Chuva Leve', icon: 'cloud-rain', type: 'rainy' },
  63: { label: 'Chuva Moderada', icon: 'cloud-rain', type: 'rainy' },
  65: { label: 'Chuva Forte', icon: 'cloud-rain', type: 'rainy' },
  71: { label: 'Neve Fraca', icon: 'cloud-snow', type: 'snowy' },
  73: { label: 'Neve Moderada', icon: 'cloud-snow', type: 'snowy' },
  75: { label: 'Neve Forte', icon: 'cloud-snow', type: 'snowy' },
  77: { label: 'Grãos de Neve', icon: 'cloud-snow', type: 'snowy' },
  80: { label: 'Pancadas Rápidas', icon: 'cloud-rain', type: 'rainy' },
  81: { label: 'Pancadas Moderadas', icon: 'cloud-rain', type: 'rainy' },
  82: { label: 'Pancadas Violentas', icon: 'cloud-lightning', type: 'stormy' },
  95: { label: 'Tempestade de Trovões', icon: 'cloud-lightning', type: 'stormy' },
  96: { label: 'Tempestade com Granizo', icon: 'cloud-lightning', type: 'stormy' },
  99: { label: 'Tempestade Severa', icon: 'cloud-lightning', type: 'stormy' }
};

export function getWeatherCondition(code) {
  return WMO_WEATHER_MAP[code] || { label: 'Tempo Estável', icon: 'sun', type: 'sunny' };
}

// Dicas automáticas de bagagem baseadas na previsão
export function generatePackingTips(currentTemp, maxTemp, minTemp, rainProb) {
  const tips = [];

  if (maxTemp >= 27 || currentTemp >= 26) {
    tips.push({ text: 'Roupas leves, trajes de banho, óculos de sol e protetor solar FPS 50+', tag: 'Calor' });
  } else if (minTemp <= 12 || currentTemp <= 12) {
    tips.push({ text: 'Casacos térmicos, cachecol, luvas e roupas em camadas', tag: 'Frio' });
  } else {
    tips.push({ text: 'Casaco leve estilo corta-vento para as manhãs e noites frescas', tag: 'Ameno' });
  }

  if (rainProb >= 35) {
    tips.push({ text: 'Guarda-chuva compacto ou capa impermeável e calçado resistente à água', tag: 'Chuva' });
  }

  tips.push({ text: 'Tênis confortável para passeios e caminhadas turísticas', tag: 'Conforto' });
  tips.push({ text: 'Adaptador de tomada universal e carregador portátil (powerbank)', tag: 'Essencial' });

  return tips;
}

export async function fetchLiveWeather(lat, lng) {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weathercode&timezone=auto`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Falha ao obter dados meteorológicos');
    
    const data = await res.json();
    const current = data.current_weather;
    const daily = data.daily;
    const condition = getWeatherCondition(current.weathercode);

    const forecast = [];
    if (daily && daily.time) {
      for (let i = 0; i < Math.min(daily.time.length, 6); i++) {
        const dateObj = new Date(daily.time[i] + 'T00:00:00');
        const dayName = i === 0 ? 'Hoje' : dateObj.toLocaleDateString('pt-BR', { weekday: 'short' });
        forecast.push({
          date: daily.time[i],
          dayName: dayName.charAt(0).toUpperCase() + dayName.slice(1),
          maxTemp: Math.round(daily.temperature_2m_max[i]),
          minTemp: Math.round(daily.temperature_2m_min[i]),
          rainProb: daily.precipitation_probability_max ? daily.precipitation_probability_max[i] : 10,
          condition: getWeatherCondition(daily.weathercode[i])
        });
      }
    }

    const maxForecastTemp = forecast.length ? Math.max(...forecast.map(f => f.maxTemp)) : current.temperature;
    const minForecastTemp = forecast.length ? Math.min(...forecast.map(f => f.minTemp)) : current.temperature;
    const maxRainProb = forecast.length ? Math.max(...forecast.map(f => f.rainProb || 0)) : 10;

    return {
      success: true,
      current: {
        temp: Math.round(current.temperature),
        windSpeed: Math.round(current.windspeed),
        weatherCode: current.weathercode,
        condition: condition
      },
      forecast: forecast,
      packingTips: generatePackingTips(current.temperature, maxForecastTemp, minForecastTemp, maxRainProb)
    };
  } catch (err) {
    console.warn('Usando dados de fallback meteorológico:', err);
    return {
      success: false,
      current: {
        temp: 24,
        windSpeed: 12,
        weatherCode: 0,
        condition: { label: 'Agradável e Limpo', icon: 'sun', type: 'sunny' }
      },
      forecast: [
        { dayName: 'Hoje', maxTemp: 26, minTemp: 19, rainProb: 10, condition: { label: 'Ensolarado', icon: 'sun' } },
        { dayName: 'Amanhã', maxTemp: 27, minTemp: 20, rainProb: 15, condition: { label: 'Parcialmente Nublado', icon: 'cloud-sun' } },
        { dayName: 'Seg', maxTemp: 25, minTemp: 18, rainProb: 20, condition: { label: 'Agradável', icon: 'sun' } }
      ],
      packingTips: generatePackingTips(24, 27, 18, 15)
    };
  }
}
