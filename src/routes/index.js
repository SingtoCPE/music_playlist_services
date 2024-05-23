import swaggerRoutes from "./swagger.route";

import employeeRoutes from "./employee.route";
import contentRoutes from "./content.route";
import fileRoutes from "./file.route";

export default (app) => {
  app.use("/", swaggerRoutes);
  app.use("/employee", employeeRoutes);
  app.use("/upload", fileRoutes);
  app.use("/content", contentRoutes);
};
