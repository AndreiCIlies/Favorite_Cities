export default function handler(req, res) {
    if (req.method === "POST") {
      const { username, password } = req.body;
  
      const users = [{ username: "admin", password: "12345" }];
  
      const user = users.find(
        (u) => u.username === username && u.password === password
      );
  
      if (user) {
        res.status(200).json({ message: "Login successful" });
      } else {
        res.status(401).json({ message: "Invalid username or password" });
      }
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
} 