import db from '../../../lib/db';

export default function handler(req, res) {
    if (req.method === 'GET') {
        const favoriteCities = db.prepare('SELECT * FROM favorites').all();
        return res.status(200).json(favoriteCities);
    }

    return res.status(405).json({ message: 'Method Not Allowed'});
}