const express = require("express");
const app = express.Router();
const db = require("../Database/db");
const multer = require("multer");
const path = require("path");
app.post('/Create_user', (request, response) => {
  let { user_id, email, mobile_number, create_password, confirm_password, role1 } = request.body;
  let sql = 'INSERT INTO mas_user(user_id, email, mobile_number, create_password, confirm_password, role1) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [user_id, email, mobile_number, create_password, confirm_password, role1], (error, result) => {
    if (error) {
      response.status(500).send(error);
    } else {
      response.status(201).send(result); 
    }
  });
});



app.post('/login', (req, res) => {
  const { email, confirm_password } = req.body;

  const checkUserQuery = 'SELECT * FROM mas_user WHERE email = ? AND confirm_password = ?';
  const checkUserValues = [email, confirm_password];

  db.query(checkUserQuery, checkUserValues, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Internal server error' });
    } else {
      if (results.length > 0) {
        res.status(200).json({ message: 'Login successful', user_id: results[0].user_id });
      } else {
        res.status(401).json({ error: 'Invalid email or password' });
      }
    }
  });
});

app.get('/get_user', (req, res) => {
  const getUserQuery = 'SELECT * FROM mas_user';

  db.query(getUserQuery, (err, results) => {
    if (err) {
      console.error('Database error:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      if (results && results.length > 0) {
        res.status(200).json({ users: results });
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    }
  });
});


app.put('/update_user/:user_id', (req, res) => {
  const userId = req.params.user_id;
  const { email, mobile_number } = req.body;

  const updateUserQuery = 'UPDATE mas_user SET email=?, mobile_number=? WHERE user_id=?';
  const updateValues = [email, mobile_number, userId];

  db.query(updateUserQuery, updateValues, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Internal server error' });
    } else {
      if (result.affectedRows > 0) {
        res.status(200).json({ message: 'User updated successfully' });
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    }
  });
});

app.delete('/delete_user/:user_id', (req, res) => {
  const userId = req.params.user_id;

  const deleteUserQuery = 'DELETE FROM mas_user WHERE user_id=?';

  db.query(deleteUserQuery, [userId], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Internal server error' });
    } else {
      if (result.affectedRows > 0) {
        res.status(200).json({ message: 'User deleted successfully' });
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    }
  });
});

app.post('/insert_room_details/:user_id', (req, res) => {
  const userId = req.params.user_id;

  const {
    room_id,
    Room_name,
    floor_size,
    number_of_beds,
    min_booking_period,
    max_booking_period,
    number_of_member_to_stay
  } = req.body;

  const checkUserQuery = 'SELECT * FROM mas_user WHERE user_id = ?';
  db.query(checkUserQuery, [userId], (error, results) => {
    if (error) {
      console.error('Error checking user_id:', error);
      res.status(500).send('Internal Server Error');
      return;
    }

    if (results.length === 0) {
      res.status(400).send('User with the specified user_id does not exist.');
      return;
    }

    const rent_amount_per_day = 250;

    
    const rent_amount_total = rent_amount_per_day * max_booking_period;

    const insertRoomQuery = `
      INSERT INTO mas_Rooms_Table (
        user_id,
        room_id,
        Room_name,
        floor_size,
        number_of_beds,
        min_booking_period,
        max_booking_period,
        number_of_member_to_stay,
        rent_amount_per_day,
        rent_amount_total
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?)
    `;

    db.query(
      insertRoomQuery,
      [
        userId,
        room_id,
        Room_name,
        floor_size,
        number_of_beds,
        min_booking_period,
        max_booking_period,
        number_of_member_to_stay,
        rent_amount_per_day,
        rent_amount_total,
      ],
      (Error, result) => {
        if (Error) {
          console.error('Error inserting data:', Error);
          res.status(500).send('Internal Server Error');
          return;
        }

        res.status(201).json({
          message: "User address added successfully",
          insertId: result.insertId,
        });
      }
    );
  });
});
app.post('/amenities/:user_id/:room_id', (req, res) => {
  const roomId = req.params.room_id;
  const userId = req.params.user_id;
  console.log('Request Payload:', req.body);

  const { room_amenities } = req.body;

  // Check if the room_id exists in mas_Rooms_Table
  const checkRoomQuery = 'SELECT * FROM mas_Rooms_Table WHERE room_id = ?';

  db.query(checkRoomQuery, [roomId], (error, results) => {
    if (error) {
      console.error('Error checking room_id:', error);
      res.status(500).send('Internal Server Error');
      return;
    }
  
    console.log('Results of checking room_id:', results);
  
    const insertAmenityQuery = 'INSERT INTO mas_amenities (room_id, room_amenities) VALUES (?, ?)';
  
    db.query(insertAmenityQuery, [roomId, room_amenities], (insertError, result) => {
      if (insertError) {
        console.error('Error inserting amenity:', insertError);
        res.status(500).send('Internal Server Error');
        return;
      }
  
      console.log('Insert result:', result);
  
      res.status(201).json({
        message: 'Amenity added successfully',
        insertId: result.insertId,
      });
    });
  });
});



const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/images");
  },
  filename: (req, file, callback) => {
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

app.post("/storePhoto/:user_id/:room_id", upload.single("image"), (req, res) => {
  const user_id = req.params.user_id;
  const room_id = req.params.room_id;

  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const imageUrl = `/images/${req.file.filename}`;

  // Check if the user_id exists in the mas_user table
  db.query(
    "SELECT * FROM mas_user WHERE user_id = ?",
    [user_id],
    (userErr, userResults) => {
      if (userErr) {
        console.error("Error checking user ID:", userErr);
        return res.status(500).send("Internal Server Error");
      }

      if (userResults.length === 0) {
        return res.status(404).send("User ID not found.");
      }

      // User exists, proceed to insert data into mas_RoomPhotos_Table
      db.query(
        "INSERT INTO mas_RoomPhotos_Table (room_id, photo_url) VALUES (?, ?)",
        [room_id, imageUrl],
        (photoErr, photoResult) => {
          if (photoErr) {
            console.error("Error adding room photo:", photoErr);
            return res.status(500).send("Internal Server Error");
          }

          res.status(201).json({
            message: "Room photo added successfully",
            room_id,
            photo_url: imageUrl,
            photo_id: photoResult.insertId,
          });
        }
      );
    }
  );
});

app.post('/bookings/:user_id/:room_id', (req, res) => {
  const user_id = req.params.user_id;
  const room_id = req.params.room_id;
  const {  check_in_date, check_out_date, booking_status } = req.body;

  // Check if room_id exists
  const roomCheckQuery = 'SELECT * FROM mas_Rooms_Table WHERE room_id = ?';
  db.query(roomCheckQuery, [room_id], (roomErr, roomResults) => {
    if (roomErr) {
      console.error(roomErr);
      res.status(500).send('Internal Server Error');
      return;
    }

    if (roomResults.length === 0) {
      res.status(400).json({ message: 'Invalid room_id. Room not found.' });
      return;
    }

    // Check if user_id exists
    const userCheckQuery = 'SELECT * FROM mas_user WHERE user_id = ?';
    db.query(userCheckQuery, [user_id], (userErr, userResults) => {
      if (userErr) {
        console.error(userErr);
        res.status(500).send('Internal Server Error');
        return;
      }

      if (userResults.length === 0) {
        res.status(400).json({ message: 'Invalid user_id. User not found.' });
        return;
      }

      // If both room_id and user_id exist, proceed to insert booking
      const insertQuery = 'INSERT INTO Bookings (room_id, user_id, check_in_date, check_out_date, booking_status) VALUES (?, ?, ?, ?, ?)';
      const values = [room_id, user_id, check_in_date, check_out_date, booking_status];

      db.query(insertQuery, values, (insertErr, result) => {
        if (insertErr) {
          console.error(insertErr);
          res.status(500).send('Internal Server Error');
          return;
        }

        res.status(201).json({ booking_id: result.insertId, message: 'Booking created successfully' });
      });
    });
  });
});



module.exports = app;