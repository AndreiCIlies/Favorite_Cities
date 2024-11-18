export default function City({ cityData, weatherData }) {
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
                        {weatherData.weather[0].description}, {weatherData.main.temp}°C
                    </span>
                ) : (
                    <span>Found no details about weather</span>
                )}
            </h2>
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
    const weatherData = await weatherResponse.json();

    return {
        props: {
            cityData,
            weatherData,
        },
    };
}