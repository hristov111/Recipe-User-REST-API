import Router from "express";
import { getUserByIdController,
    getUsersController,
    createUserController,
    deleteUserController} 
from "../controllers/user.controller";


const router = Router();


router.get('/', getUsersController);
router.get('/:id', getUserByIdController);
router.delete("/:id", deleteUserController);
router.post('/',createUserController);

export default router;