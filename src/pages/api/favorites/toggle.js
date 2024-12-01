import db from '../../../lib/db';

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { cityName, country, lat, lon } = req.body;
        
        const existingCity = db.prepare('SELECT * FROM favorites WHERE city_name = ? AND country = ?').get(cityName, country);

        if (existingCity) {
            db.prepare('DELETE FROM favorites WHERE city_name = ? AND country = ?').run(cityName, country);
            return res.status(200).json({ message: 'City removed from favorites' });
        }

        db.prepare('INSERT INTO favorites (city_name, country, lat, lon) VALUES (?, ?, ?, ?)').run(cityName, country, lat, lon);
        return res.status(200).json({ message: 'City added to favorites' });
    }

    return res.status(405).json({ message: 'Method Not Allowed'});
}