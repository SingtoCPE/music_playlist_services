import dbConfig from "~/config/db";
import Sequelize from "sequelize";

import musicModel from "./music.model";
import playlistModel from "./playlist.model";
import playlistItemsModel from "./playlistItems.model";

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,
  // dialectOptions: {
  //   useUTC: false, // for reading from database
  // },
  port: 3306,
  timezone: "+07:00",
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Music = musicModel(sequelize, Sequelize);
db.Playlist = playlistModel(sequelize, Sequelize);
db.PlaylistItems = playlistItemsModel(sequelize, Sequelize);

db.Playlist.hasMany(db.PlaylistItems);
db.PlaylistItems.belongsTo(db.Playlist);

db.Music.hasMany(db.PlaylistItems);

export default db;
