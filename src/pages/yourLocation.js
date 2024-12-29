import { useState, useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";

export default function YourLocation() {
    const [locationData, setLocationData] = useState(null);
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLocationAndWeather = async () => {
            try {
                const ipInfoResponse = await fetch("https://ipinfo.io/json?token=adaa920aa00dad");
                if (!ipInfoResponse.ok) throw new Error("Failed to fetch location data");

                const ipInfo = await ipInfoResponse.json();
                const [lat, lon] = ipInfo.loc.split(",");

                const locationDetails = {
                    name: ipInfo.city,
                    country: ipInfo.country,
                    lat,
                    lon,
                };
                setLocationData(locationDetails);

                const apiKeyWeather = "9bf610c4f5c774c2fbfa6dc57b3a34cc";
                const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKeyWeather}&units=metric`;

                const weatherResponse = await fetch(weatherUrl);
                if (!weatherResponse.ok) throw new Error("Failed to fetch weather data");

                const weatherInfo = await weatherResponse.json();
                setWeatherData(weatherInfo);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchLocationAndWeather();
    }, []);

    if (error) return <p>Error: {error}</p>;
    if (!locationData)
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
                Your Location
            </Text>
            <br/>
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
                {locationData.name}
            <br />
            <p>Country: {locationData.country}</p>
            <p>Latitude: {locationData.lat}</p>
            <p>Longitude: {locationData.lon}</p>
            <h2>
                Actual Weather:{" "}
                {weatherData ? (
                    <span>
                        {weatherData.weather[0]?.description}, {weatherData.main?.temp}°C
                    </span>
                ) : (
                    <span>Found no details about weather</span>
                )}
            </h2>
            </Text>
        </Box>
    );
}