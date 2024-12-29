import { useState, useEffect } from 'react';
import { Box, Text } from "@chakra-ui/react";
import { Button } from "@/components/ui/button"

export default function City({ cityData, weatherData }) {
    const [isSaved, setIsSaved] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkFavorite = async () => {
            try {
                const response = await fetch('/api/favorites');
                if (!response.ok) {
                    throw new Error('Failed to fetch favorite cities');
                }
                const favorites = await response.json();
                const isCityInFavorites = favorites.some(city =>
                    city.city_name === cityData.name && city.country === cityData.country
                );
                setIsSaved(isCityInFavorites);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching favorites:', error);
                setLoading(false);
            }
        };
        checkFavorite();
    }, [cityData]);

    const handleSaveCity = async () => {
        try {
            const response = await fetch('/api/favorites/toggle', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cityName: cityData.name,
                    country: cityData.country,
                    lat: cityData.lat,
                    lon: cityData.lon
                })
            });

            const result = await response.json();

            if (response.ok) {
                setIsSaved(!isSaved);
            } else {
                alert(result.message || 'There was an error while updating the favorites.');
            }
        } catch (error) {
            console.error('Error saving city:', error);
            alert('An error occurred while saving the city.');
        }
    };
    
    if (!cityData)
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
        );

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
                fontSize="1xl"
                fontWeight="bold"
                color="white"
                fontFamily="georgia"
                backgroundColor="limegreen"
                padding="2"
                textAlign="center"
                outline="2px solid white"
            >
                {cityData.name}
                <br/>
                <br/>
                Country: {cityData.country}
                <br/>
                Latitude: {cityData.lat}
                <br/>
                Longitude: {cityData.lon}
                <br/>
                Actual Weather:{" "}
                    {weatherData ? (
                        <span>
                            {weatherData.weather[0]?.description}, {weatherData.main?.temp}°C
                        </span>
                    ) : (
                        <span>Found no details about weather</span>
                    )}
            </Text>

            <br/>
            <Button
                onClick={handleSaveCity}
                marginTop="4"
                height="8"
                width="auto"
                padding="4"
                backgroundColor="#256C95"
                variant="outline"
            >
                {isSaved ? "Remove from Favorites" : "Add to Favorites"}
            </Button>
        </Box>
    )
}

export async function getServerSideProps(context) {
    const { id } = context.params;

    const [name, country, lat, lon] = id.split(',');

    if (!name || !country || !lat || !lon) {
        return { notFound: true };
    }

    const cityData = {
        name,
        country,
        lat,
        lon,
    };

    const apiKeyWeather = "9bf610c4f5c774c2fbfa6dc57b3a34cc";
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKeyWeather}&units=metric`;
    const weatherResponse = await fetch(weatherUrl);
    const weatherData = weatherResponse.ok ? await weatherResponse.json() : null;

    return {
        props: {
            cityData,
            weatherData,
        },
    };
}