import db from "~/models";

const Music = db.Music;
const Op = db.Sequelize.Op;

// const create = async (req, res) => {
//   try {
//     const payload = req.body;

//     Music.create(payload).then((result) => {
//       res.send({
//         response_code: "200",
//         response_status: "SUCCESS",
//         data: result,
//         message: "Music is created",
//       });
//     });
//   } catch (error) {
//     res.send({
//       response_status: "ERROR",
//       message: error.message || "Some error occurred while creating the Music.",
//     });
//   }
// };

const searchMusic = async (req, res) => {
  try {
    const search = req.query.search;

    const where = {
      [Op.or]: [
        { title: { [Op.substring]: search } },
        { artist: { [Op.substring]: search } },
        { album: { [Op.substring]: search } },
      ],
    };

    Music.findAll({
      where,
      order: [["createdAt", "DESC"]],
    }).then(async (result) => {
      res.send({
        response_code: "200",
        response_status: "SUCCESS",
        data: result,
      });
    });
  } catch (error) {
    res.send({
      response_status: "ERROR",
      message: error.message || "Some error occurred while fetching the Music.",
    });
  }
};

// const findOne = async (req, res) => {
//   try {
//     const id = req.params.id;

//     Music.findOne({
//       where: { id },
//       include: { all: true, nested: true },
//     }).then((result) => {
//       res.send({
//         response_code: "200",
//         response_status: "SUCCESS",
//         data: result,
//       });
//     });
//   } catch (err) {
//     res.send({
//       response_status: "ERROR",
//       message: err.message || "Some error occurred while retrieving the Music.",
//     });
//   }
// };

// const update = async (req, res) => {
//   try {
//     const id = req.params.id;

//     Music.update(req.body, { where: { id } }).then((result) => {
//       if (result[0] === 1) {
//         res.send({
//           response_code: "200",
//           response_status: "SUCCESS",
//           message: "Music is updated",
//         });
//       } else {
//         res.send({
//           response_code: "111",
//           response_status: "ERROR",
//           message: "Update failed",
//         });
//       }
//     });
//   } catch (err) {
//     res.send({
//       response_status: "ERROR",
//       message: err.message || "Some error occurred while updating the Music.",
//     });
//   }
// };

const remove = async (req, res) => {
  try {
    const id = req.params.id;
    Music.destroy({ where: { id } }).then((result) => {
      if (result === 1) {
        res.send({
          response_code: "200",
          response_status: "SUCCESS",
          message: "Employee is deleted",
        });
      } else {
        res.send({
          response_code: "111",
          response_status: "ERROR",
          message: "Delete failed",
        });
      }
    });
  } catch (err) {
    res.send({
      response_status: "ERROR",
      message:
        err.message || "Some error occurred while deleting the employee.",
    });
  }
};

export default {
  remove,
  searchMusic,
};
