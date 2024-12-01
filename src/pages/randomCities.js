import { useState, useEffect } from 'react';

const getRandomCoordinates = () => {
  const lat = (Math.random() * 180 - 90).toFixed(6);
  const lon = (Math.random() * 360 - 180).toFixed(6);
  return { lat, lon };
};

const getCityData = async (lat, lon, apiKey) => {
  const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${apiKey}`);
  const data = await response.json();
  if (data.results && data.results.length > 0) {
    const city = data.results[0].components.city || data.results[0].components.town || data.results[0].components.village;
    const country = data.results[0].components.country;
    
    if (city && country) {
        return { city, country };
    }
  }
  return null;
};

export default function RandomCities() {
  const [cities, setCities] = useState([]);
  const apiKey = 'cfae5ef01e504e0a8a657b85b1a806d5';

  useEffect(() => {
    const fetchRandomCities = async () => {
      const randomCities = [];
      while (randomCities.length < 5) {
        const { lat, lon } = getRandomCoordinates();
        const cityData = await getCityData(lat, lon, apiKey);
        
        if (cityData && !randomCities.some(city => city.city === cityData.city && city.country === cityData.country)) {
          randomCities.push(cityData);
        }
      }
      setCities(randomCities);
    };

    fetchRandomCities();
  }, [apiKey]);

  if (cities.length === 0) return <p>Loading...</p>;

  return (
    <div>
      <h1>5 Random Cities</h1>
      <br/>
      <ul>
        {cities.map((city, index) => (
          <li key={index}>
            {city.city}, {city.country}
          </li>
        ))}
      </ul>
    </div>
  );
}