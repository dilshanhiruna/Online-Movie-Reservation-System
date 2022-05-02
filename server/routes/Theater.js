const express = require("express");
const router = express.Router();

const {
    getTheaters,
    getTheater,
    addTheater,
    updateTheater,
    deleteTheater,
  } = require("../controllers/Theater");
  
  router.get("/", getTheaters);
  router.get("/:id", getTheater);
  router.post("/", addTheater);
  router.put("/:id", updateTheater);
  router.delete("/delete/:id", deleteTheater);
  
  module.exports = router;
  


module.exports = router;