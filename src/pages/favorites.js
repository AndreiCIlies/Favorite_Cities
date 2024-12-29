import { useState, useEffect } from 'react';
import { Box, Text } from "@chakra-ui/react";
import { Button } from "@/components/ui/button"

export default function Favorites() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await fetch('/api/favorites');
                if (!response.ok) {
                    throw new Error('Failed to fetch favorite cities');
                }
                const data = await response.json();
                setFavorites(data);
            } catch (error) {
                console.error('Error fetching favorites:', error);
            }
        };
        fetchFavorites();
    }, []);

    const handleRemoveFavorite = async (cityName, country) => {
        try {
            const response = await fetch('/api/favorites/toggle', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cityName,
                    country
                })
            });

            const result = await response.json();
            if (response.ok) {
                setFavorites(favorites.filter(city => city.city_name !== cityName || city.country !== country));
            } else {
                alert('There was an error while removing the city from favorites.');
            }
        } catch (error) {
            console.error('Error removing city from favorites:', error);
            alert('An error occurred while removing the city.');
        }
    };

    const displayedFavorites = favorites.slice(0, 5);

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
                Favorites
            </Text>
            <br/>
            {favorites.length === 0 ? (
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
                    You have no favorite cities yet.
                </Text>
            ) : (
                <ul>
                    {displayedFavorites.map((city) => (
                        <li key={`${city.city_name}-${city.country}`}>
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
                                {city.city_name}, {city.country}
                            </Text>
                            <Button
                                onClick={() => handleRemoveFavorite(city.city_name, city.country)}
                                marginTop="4"
                                height="8"
                                width="auto"
                                padding="4"
                                backgroundColor="#256C95"
                                variant="outline"
                            >
                                <Text
                                    fontSize="1xl"
                                    fontWeight="bold"
                                    color="white"
                                    fontFamily="georgia"
                                >
                                    Remove from Favorites
                                </Text>
                            </Button>
                            <br/><br/>
                        </li>
                    ))}
                </ul>
            )}
        </Box>
    );
}