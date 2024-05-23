export default (sequelize, Sequelize) => {
  const Playlist = sequelize.define("playlist", {
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.DOUBLE,
    },
    createBy: {
      type: Sequelize.STRING,
    },
    total: {
      type: Sequelize.INTEGER,
    },
    longTerm: {
      type: Sequelize.STRING,
    },
    activeFlag: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
  });

  return Playlist;
};
