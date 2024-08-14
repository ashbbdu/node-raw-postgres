import express from "express"
import { addAddress, getAllUser, getUser, insertData, updateUser } from "../controllers/User"

const router = express.Router()

router.post("/createUser" , insertData)
router.post("/updateUser" , updateUser)
router.get("/getuser" , getUser)
router.get("/users" , getAllUser)
router.post("/addAddress" , addAddress)

export default router;