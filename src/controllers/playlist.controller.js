import db from "~/models";

const Playlist = db.Playlist;
const PlaylistItems = db.PlaylistItems;
const Op = db.Sequelize.Op;

const create = async (req, res) => {
  try {
    const payload = req.body;

    Playlist.create(payload).then((result) => {
      res.send({
        response_code: "200",
        response_status: "SUCCESS",
        data: result,
        message: "Playlist is created",
      });
    });
  } catch (error) {
    res.send({
      response_status: "ERROR",
      message:
        error.message || "Some error occurred while creating the Playlist.",
    });
  }
};

const createPlaylistItem = async (req, res) => {
  try {
    const payload = req.body;

    console.log(123);

    PlaylistItems.create(payload).then((result) => {
      res.send({
        response_code: "200",
        response_status: "SUCCESS",
        data: result,
        message: "Playlist item is created",
      });
    });
  } catch (error) {
    res.send({
      response_status: "ERROR",
      message:
        error.message ||
        "Some error occurred while creating the Playlist item.",
    });
  }
};

const findAll = async (req, res) => {
  try {
    if (Object.keys(req.query).length > 0) {
      const where = {};
      let pagination = {};

      Object.keys(req.query).forEach((key) => {
        if (key.toString() !== "limit" && key.toString() !== "offset") {
          if (key === "lang") {
            lang = req.query[key];
            return;
          }
          where[key] = req.query[key];
        }

        if (key.toString() === "limit") {
          pagination = {
            ...pagination,
            [key]: parseInt(req.query[key]),
          };
        }

        if (key.toString() === "offset") {
          pagination = {
            ...pagination,
            [key]: parseInt(req.query[key]),
          };
        }
      });

      Playlist.findAndCountAll({
        where,
        include: { all: true, nested: true },
        offset: pagination.offset,
        limit: pagination.limit,
        order: [["createdAt", "DESC"]],
      }).then(async (result) => {
        res.send({
          response_code: "200",
          response_status: "SUCCESS",
          pagination: {
            length: result.count,
            size: await calPagination(result.count, 12),
          },
          data: result.rows,
        });
      });
    } else {
      Playlist.findAndCountAll({
        include: { all: true, nested: true },
        order: [["createdAt", "DESC"]],
      }).then(async (result) => {
        res.send({
          response_code: "200",
          response_status: "SUCCESS",
          pagination: {
            length: result.count,
            size: await calPagination(result.count, 12),
          },
          data: result.rows,
        });
      });
    }
  } catch (error) {
    res.send({
      response_status: "ERROR",
      message:
        error.message || "Some error occurred while fetching the Playlist.",
    });
  }
};

const findOne = async (req, res) => {
  try {
    const id = req.params.id;

    Playlist.findOne({
      where: { id },
      include: [
        {
          model: PlaylistItems,
          include: "music",
        },
      ],
    }).then((result) => {
      res.send({
        response_code: "200",
        response_status: "SUCCESS",
        data: result,
      });
    });
  } catch (err) {
    res.send({
      response_status: "ERROR",
      message:
        err.message || "Some error occurred while retrieving the Playlist.",
    });
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.id;

    Playlist.update(req.body, { where: { id } }).then((result) => {
      if (result[0] === 1) {
        res.send({
          response_code: "200",
          response_status: "SUCCESS",
          message: "Playlist is updated",
        });
      } else {
        res.send({
          response_code: "111",
          response_status: "ERROR",
          message: "Update failed",
        });
      }
    });
  } catch (err) {
    res.send({
      response_status: "ERROR",
      message:
        err.message || "Some error occurred while updating the Playlist.",
    });
  }
};

const remove = async (req, res) => {
  try {
    const id = req.params.id;
    Playlist.destroy({ where: { id } }).then((result) => {
      if (result === 1) {
        res.send({
          response_code: "200",
          response_status: "SUCCESS",
          message: "Playlist is deleted",
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
        err.message || "Some error occurred while deleting the Playlist.",
    });
  }
};

const removePlaylistItem = async (req, res) => {
  try {
    const id = req.params.id;
    PlaylistItems.destroy({ where: { id } }).then((result) => {
      if (result === 1) {
        res.send({
          response_code: "200",
          response_status: "SUCCESS",
          message: "Playlist items is deleted",
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
        err.message || "Some error occurred while deleting the Playlist.",
    });
  }
};

const calPagination = async (length, rowPerPage) => {
  return Math.round(length / rowPerPage);
};

export default {
  create,
  findAll,
  update,
  findOne,
  remove,
  createPlaylistItem,
  removePlaylistItem,
};
