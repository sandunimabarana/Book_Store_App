const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3001; // Define port

app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '*********************',  
  database: 'bookstore',      
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to the database.');
});

// API endpoint to fetch books
app.get('/api/books', (req, res) => {
  const query = 'SELECT * FROM bookdetails';  // Replace with your table name
  db.query(query, (err, result) => {
    if (err) {
      console.error('Error fetching books:', err);
      return res.status(500).send('Error fetching books');
    }
    res.json(result); // Send the books data as a JSON response
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Endpoint to handle cart submission
app.post("/api/cart", (req, res) => {
    const { items } = req.body;
    console.log("Received items:", items);  // Debugging line
  
    if (!items || items.length === 0) {
      return res.status(400).send("Cart is empty.");
    }
  
    const queries = items.map((item) => {
      return new Promise((resolve, reject) => {
        const query = "INSERT INTO cart (bookId, quantity) VALUES (?, ?)";
        db.query(query, [item.bookId, item.quantity], (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    });
  
    Promise.all(queries)
      .then(() => {
        console.log("Cart saved successfully!");  // Debugging line
        res.status(200).send("Cart saved successfully!");
      })
      .catch((error) => {
        console.error("Error saving cart:", error);
        res.status(500).send("Error saving cart.");
      });
  });
  