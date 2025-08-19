import db from "../connection/db.js"

export const addSchool = async (req, res) => {
    const { name, address, latitude, longitude } = req.body;
    console.log(req.body)
    if (!name || !address || !latitude || !longitude) {
        return res.status(400).json({ error: "All fields are required" })
    }

    try {
        const [result] = await db.query('INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)', [name, address, latitude, longitude]);
        res.status(201).json({ message: "School added successfully", id: result.insertId });
    } catch (error) {
        console.log(err)
        res.status(500).json({error: "database error"})
    }
}


// List Schools Controller
export const getSchools = async (req, res) => {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).json({ error: "Latitude and longitude are required" });
  }

  try {
    const [schools] = await db.query("SELECT * FROM schools");

    // Haversine formula to calculate distance
    function getDistance(lat1, lon1, lat2, lon2) {
      const R = 6371; // radius of Earth in km
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLon = (lon2 - lon1) * Math.PI / 180;
      const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) ** 2;
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    }

    const userLat = parseFloat(latitude);
    const userLon = parseFloat(longitude);

    const sortedSchools = schools
      .map((school) => ({
        ...school,
        distance: getDistance(userLat, userLon, school.latitude, school.longitude)
      }))
      .sort((a, b) => a.distance - b.distance);

    res.status(200).json(sortedSchools);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
};
