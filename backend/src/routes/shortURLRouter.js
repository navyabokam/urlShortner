import { Router } from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { redirectFunction, shortUrl } from "../controllers/shortUrlController.js";

const shortURLRouter = Router();

shortURLRouter.post("", protect,shortUrl);
shortURLRouter.get("/:shortcode", redirectFunction)

export default shortURLRouter;
