module.exports = app => {
  const notes = require("../controllers/note.controller");

  var router = require("express").Router();

  // Create a new note
  router.post("/", notes.create);

  // Retrieve all notes
  router.get("/", notes.findAll);

  // Retrieve all published notes
  router.get("/published", notes.findAllPublished);

  // Retrieve a single note with id
  router.get("/:id", notes.findOne);

  // Update a note with id
  router.put("/:id", notes.update);

  // Delete a note with id
  router.delete("/:id", notes.delete);

  // Delete all notes
  router.delete("/", notes.deleteAll);

  app.use('/api/notes', router);
};