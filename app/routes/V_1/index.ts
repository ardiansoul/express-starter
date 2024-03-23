import * as express from "express";
import UserRoutes from "./User";
import RoleRoutes from "./Role";
import { AuthMiddleware } from "../../middlewares/authentication";
const router = express.Router();
const userRoutes = new UserRoutes();
const roleRoutes = new RoleRoutes();
const authMiddleware = new AuthMiddleware();

router.use("/users", authMiddleware.authenticate.bind(authMiddleware), userRoutes.setupRoutes());
router.use("/roles", roleRoutes.setupRoutes());

const V_1 = router;
export default V_1;
