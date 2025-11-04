import express from "express";
import { toolsController } from "../controllers/toolsController";

const router = express.Router();

router.post("/", toolsController.create);
router.get("/", toolsController.getAll);
router.get("/tools-overview", toolsController.getSome);
router.get("/categories", toolsController.getCategories); 
router.get("/:id", toolsController.getById);
router.put("/:id", toolsController.update);
router.delete("/:id", toolsController.delete);

export default router;
