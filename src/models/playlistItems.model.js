export default (sequelize, Sequelize) => {
  const PlaylistItems = sequelize.define("playlistItems", {
    playlistNo: {
      type: Sequelize.INTEGER,
    },
    playing: {
      type: Sequelize.BOOLEAN,
    },
  });

  return PlaylistItems;
};
