import express from "express";
import { UserController } from "../controllers/UserController";

// const { requiresAuth } = require("express-openid-connect");
const router = express.Router();

// router.get("/profile", requiresAuth(), UserController.getProfile);
router.get("/", UserController.showEndpoints);
router.get("/users", UserController.getAllUsers);
router.get("/user/:user_id", UserController.getUserById);
router.get("/user/mongo/:mongoid", UserController.getUserByMongoId);
router.get("/messages/:senderid/:recipientid", UserController.getUserMessages);
router.get("/getallmessages", UserController.getAllMessages);
router.post("/addtrip", UserController.addTrip);
router.get("/trips", UserController.getTrips);
router.get("/trips/:id", UserController.getSingleTrip);
router.get("/trips/usertrips/:id", UserController.getUserTrips);
router.delete("/deletetrip/:id", UserController.deleteSingleTrip);
router.post("/addmessage", UserController.addMessage);
router.put("/trips/join/:tripid", UserController.passengerJoin);
// router.get("/endpoints", UserController.getEndpoints);

export default router;
