export default (sequelize, Sequelize) => {
  const PlaylistItems = sequelize.define("playlistItems", {
    playlistNo: {
      type: Sequelize.INTEGER,
    },
  });

  return PlaylistItems;
};
