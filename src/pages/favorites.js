import { useState, useEffect } from 'react';

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
        <div>
            <h1>Favorite Cities</h1>
            <br/>
            {favorites.length === 0 ? (
                <p>You have no favorite cities yet.</p>
            ) : (
                <ul>
                    {displayedFavorites.map((city) => (
                        <li key={`${city.city_name}-${city.country}`}>
                            <h2>{city.city_name}, {city.country}</h2>
                            <button onClick={() => handleRemoveFavorite(city.city_name, city.country)}>
                                Remove from Favorites
                            </button>
                            <br/><br/>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}