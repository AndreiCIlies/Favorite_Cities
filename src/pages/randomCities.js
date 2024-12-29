import { useState, useEffect } from 'react';
import { Box, Text } from "@chakra-ui/react";

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

  if (cities.length === 0) 
    return (
      <Box
        backgroundImage="url('/images/3.jpg')"
        backgroundSize="cover"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minH="100vh"
      >
        <Text
          fontSize="3xl"
          fontWeight="bold"
          color="white"
          fontFamily="georgia"
          backgroundColor="#F7CF2F"
          padding="2"
          width="8cm"
          textAlign="center"
          outline="2px solid white"
        >
          Loading...
        </Text>
      </Box>
    )

  return (
    <Box
      backgroundImage="url('/images/3.jpg')"
      backgroundSize="cover"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minH="100vh"
    >
      <Text
        fontSize="3xl"
        fontWeight="bold"
        color="white"
        fontFamily="georgia"
        backgroundColor="#F7CF2F"
        padding="2"
        width="8cm"
        textAlign="center"
        outline="2px solid white"
      >
        5 Random Cities
      </Text>
      <br/>
      <ul>
        {cities.map((city, index) => (
          <li key={index}>
            <Text
               fontSize="1xl"
               fontWeight="bold"
               color="white"
               fontFamily="georgia"
               backgroundColor="limegreen"
               padding="2"
               textAlign="center"
               outline="2px solid white"
            >
              {city.city}, {city.country}
            </Text>
          </li>
        ))}
      </ul>
    </Box>
  );
}