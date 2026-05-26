const express = require("express");
const router = express.Router();
const db = require("../db/connection");
const authMiddleWare = require('../middleware/auth')

router.use(authMiddleWare)



router.get("/applications", (req, res) => {
  db.query("select * from applications where user_id = ?",[req.userId],(err, result) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }
    res.json(result);
  });
});

router.get("/applications/:id", (req, res) => {
  const { id } = req.params;

  db.query("select * from applications where id = ? and user_id = ?", [id, req.userId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }
    if (result.length === 0){
      return res.status(404).json({error:"not found"})
    }
    res.json(result[0]);
  });
});

router.post("/applications", (req, res) => {
  const { company, position, status } = req.body;
  const user_id = req.userId
  if (!company || !position) {
    return res.status(400).json({ error: "missing info" });
  }
  db.query(
    "insert into applications (company, position, status, user_id) values (?,?,?,?)",
    [company, position, status, user_id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: "error to insert" });
      }
      res.json(result);
    },
  );
});

router.patch("/applications/:id", (req, res) => {
  const { id } = req.params;
  const { company, position, status } = req.body;
  let fields = [];
  let values = [];

  if (company) {
    fields.push("company=?");
    values.push(company);
  }
  if (position) {
    fields.push("position=?");
    values.push(position);
  }
  if (status) {
    fields.push("status=?");
    values.push(status);
  }

  if (fields.length === 0) {
    return res.status(400).json({ error: "No fields to Update" });
  }

  values.push(id);

  db.query(
    `update applications set ${fields.join(",")} where id=?`,
    values,
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Update Error" });
      }
      return res.status(200).json(result);
    },
  );
});

router.delete("/applications/:id", (req, res) => {
  const { id } = req.params;
  db.query("delete from applications where id=?", [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Error to Delete" });
    } else if (result.affectedRows === 0) {
      return res.status(400).json({ error: "Not Found" });
    }
    return res.status(200).json({message: "Deleted successfully"});
  });
});

module.exports = router;
