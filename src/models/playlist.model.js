export default (sequelize, Sequelize) => {
  const Playlist = sequelize.define("playlist", {
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    createBy: {
      type: Sequelize.STRING,
    },
    total: {
      type: Sequelize.INTEGER,
    },
    longTerm: {
      type: Sequelize.INTEGER,
    },
    activeFlag: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
  });

  return Playlist;
};
