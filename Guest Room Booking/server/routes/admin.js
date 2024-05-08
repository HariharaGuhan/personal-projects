const express = require("express");
const app = express.Router();
const db = require("../Database/db");

  app.put('/update_user_and_room/:user_id/:room_id', (req, res) => {
    const userId = req.params.user_id;
    const roomId = req.params.room_id;
    const { email, mobile_number, Room_name, floor_size } = req.body;
  
    const updateUserQuery = 'UPDATE mas_user SET email=?, mobile_number=? WHERE user_id=?';
    const updateRoomQuery = 'UPDATE mas_Rooms_Table SET Room_name=?, floor_size=? WHERE room_id=?';
  
    db.query((err) => {
      if (err) {
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
  
      db.query(updateUserQuery, [email, mobile_number, userId], (updateUserErr, updateUserResult) => {
        if (updateUserErr) {
          db.rollback(() => {
            res.status(500).json({ error: 'Internal server error' });
          });
          return;
        }
  
        db.query(updateRoomQuery, [Room_name, floor_size, roomId], (updateRoomErr, updateRoomResult) => {
          if (updateRoomErr) {
            db.rollback(() => {
              res.status(500).json({ error: 'Internal server error' });
            });
            return;
          }
  
          db.commit((commitErr) => {
            if (commitErr) {
              db.rollback(() => {
                res.status(500).json({ error: 'Internal server error' });
              });
            } else {
              res.status(200).json({ message: 'User and room details updated successfully' });
            }
          });
        });
      });
    });
  });

  app.delete('/delete_user_det/:user_id/:room_id', async (req, res) => {
    const userId = req.params.user_id;
    const roomId = req.params.room_id;
  
    try {
      await db.beginTransaction();
  
      const deleteUserQuery = 'DELETE FROM mas_user WHERE user_id=?';
      const deleteRoomQuery = 'DELETE FROM mas_Rooms_Table WHERE room_id=?';
  
      await db.query(deleteUserQuery, [userId]);
      await db.query(deleteRoomQuery, [roomId]);
  
      await db.commit();
      res.status(200).json({ message: 'User and related details deleted successfully' });
    } catch (error) {
      await db.rollback();
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  module.exports=app;

  