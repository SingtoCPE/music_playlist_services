import swaggerRoutes from "./swagger.route";

import musicRoutes from "./music.route";
import playlistRoutes from "./playlist.route";

export default (app) => {
  app.use("/", swaggerRoutes);
  app.use("/music", musicRoutes);
  app.use("/playlist", playlistRoutes);
};
