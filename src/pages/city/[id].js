import { useState, useEffect } from 'react';

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
    
    if (!cityData) return <p>Loading...</p>;

    return (
        <div>
            <h1>{cityData.name}</h1>
            <br/>
            <p>Country: {cityData.country}</p>
            <p>Latitude: {cityData.lat}</p>
            <p>Longitude: {cityData.lon}</p>
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

            <br/>
            <button onClick={handleSaveCity}>
                {isSaved ? "Remove from Favorites" : "Add to Favorites"}
            </button>
        </div>
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