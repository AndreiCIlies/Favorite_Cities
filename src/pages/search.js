import { useState } from 'react';

export default function Search() {
    const [searchCity, setSearchCity] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        if (!searchCity) return;

        const apiKey = "cfae5ef01e504e0a8a657b85b1a806d5";
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${searchCity}&key=${apiKey}`;

        try {
            const response = await fetch(url);
            const data =  await response.json();

            const cities = data.results.map((result, index) => ({
                id: index,
                name: result.formatted,
                country: result.components.country,
                lat: result.geometry.lat,
                lon: result.geometry.lng
            }));

            setResults(cities);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search..."
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
            <ul>
                {results.map((city) => (
                    <li key={city.id}>
                        <a href={`/city/${city.name},${city.country},${city.lat},${city.lon}`}>
                            {city.name}, {city.country}
                        </a>
                    </li>
                ))}
            </ul>
       </div>
    );
}