import express from "express";
import morgan from "morgan";

import indexRoutes from "./routes/index.routes.js";
import paisesRoutes from "./routes/paises.routes.js";
import equiposRoutes from "./routes/equipos.routes.js";
import ligasRoutes from "./routes/ligas.routes.js";
import tiposRoutes from "./routes/tipos.routes.js";
import playersRoutes from "./routes/players.routes.js";
import cartasRoutes from "./routes/cartas.routes.js";

const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/", indexRoutes);
app.use("/api", paisesRoutes);
app.use("/api", equiposRoutes);
app.use("/api", ligasRoutes);
app.use("/api", tiposRoutes);
app.use("/api", playersRoutes);
app.use("/api", cartasRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
});

export default app;
