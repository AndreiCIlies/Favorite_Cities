import { useState } from 'react';
import { Box, Text } from "@chakra-ui/react";
import { Button } from "@/components/ui/button"

export default function Search() {
    const [searchCity, setSearchCity] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        if (!searchCity) return;
    
        const apiKey = "cfae5ef01e504e0a8a657b85b1a806d5";
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${searchCity}&key=${apiKey}`;
    
        try {
            const response = await fetch(url);
            const data = await response.json();
    
            if (!data.results || data.results.length === 0) {
                alert("No results found for your search. Please try again!");
                return;
            }
    
            const cities = data.results
                .filter((result) => result.components.city || result.components.town || result.components.village)
                .map((result, index) => ({
                    id: index,
                    name: result.formatted,
                    country: result.components.country,
                    lat: result.geometry.lat,
                    lon: result.geometry.lng,
                }));
    
            if (cities.length === 0) {
                alert("Your search matches a country, not a city. Please enter a city name.");
                return;
            }
    
            setResults(cities);
        } catch (error) {
            console.error("Error fetching data: ", error);
            alert("An unexpected error occurred. Please try again later.");
        }
    };    

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
            <input
                type="text"
                placeholder="Search City"
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                style={{
                    textAlign: "center"
                }}
            />
            <Button
                onClick={handleSearch}
                marginTop="4"
                height="8"
                width="16"
                backgroundColor="#256C95"
                variant="outline"
            >
                <Text
                    fontSize="1xl"
                    fontWeight="bold"
                    color="white"
                    fontFamily="georgia"
                >
                    Search
                </Text>
            </Button>
            <br/><br/>
            <ul>
                {results.length > 0 && (
                <Box
                    backgroundColor="rgba(255, 255, 255, 0.5)"
                    borderRadius="md"
                    padding="4"
                >
                    {results.map((city) => (
                        <li key={city.id}>
                        <a href={`/city/${city.name},${city.country},${city.lat},${city.lon}`}>
                            <Button
                                marginTop="4"
                                height="8"
                                width="auto"
                                padding="4"
                                backgroundColor="#256C95"
                                variant="outline"
                                fontSize="1xl"
                                fontWeight="bold"
                                color="white"
                                fontFamily="georgia"
                            >
                                {city.name}, {city.country}
                            </Button>
                        </a>
                        </li>
                    ))}
                </Box>
            )}
            </ul>
        </Box>
    );
}