
import authRoutes from "./auth.route.js";
import adminRoutes from "./admin.route.js";

const routes = (app) => {
    app.use('/', authRoutes);
    app.use('/', adminRoutes);
}
export default routes;