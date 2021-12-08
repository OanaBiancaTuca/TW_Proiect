const db = require("../models");
const Note = db.notes;
const Op = db.Sequelize.Op;
//add


// Create and Save a new Note
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Note
  const note = {
    title: req.body.title,
    content: req.body.content,
    published: req.body.published ? req.body.published : false,
  
   
   
  };

  // Save Note in the database
  Note.create(note)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Note."
      });
    });
};

// Retrieve all notes from the database.
// exports.findAll = (req, res) => {
//   //const title = req.query.title;
//   //const userId=req.query.title; //incerc eu
//   //var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
//   //var condition = userId ? { userId: { [Op.like]: `%${userId}%` } } : null; //incerc eu
//   Note.findAll({ where:{userId:11} })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving notes."
//       });
//     });
// };
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  Note.findAll({ where:condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving notes."
      });
    });
};

// Find a single note with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Note.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find note with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving note with id=" + id
      });
    });
};

// Update a note by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Note.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Note was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Note with id=${id}. Maybe note was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Note with id=" + id
      });
    });
};

// Delete a note with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Note.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Note was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Note with id=${id}. Maybe Note was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete note with id=" + id
      });
    });
};

// Delete all notes from the database.
exports.deleteAll = (req, res) => {
   
  Note.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} notes were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all notes."
      });
    });
};

// find all published notes
exports.findAllPublished = (req, res) => {
  Note.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving notes."
      });
    });
};