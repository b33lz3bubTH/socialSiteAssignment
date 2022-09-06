import { Router } from "express";
import { celebrate, Joi, Segments } from 'celebrate';
import UserModel from "./../models/Users";
import crypto from "crypto";

const router = Router();



router.post('/update/profile', celebrate({
    [Segments.BODY]: {
        email: Joi.string().required(),
        name: Joi.string().required(),
        profilePictureMedia: Joi.string().required(),
    }
}), async (req, res) => {
    try {

        const userData = await UserModel.findOneAndUpdate({ email: req.body.email }, {
            profilePictureMedia: req.body.profilePictureMedia,
            name: req.body.name,
        });
        console.log("User Data: ", userData);

        if (!userData) {
            throw new Error("Updadtion Failed");
        }

        res.status(200).json({
            api_response_info: {
                status: 200,
                message: "Update Successful"
            }, data: null
        });
    } catch (e) {
        console.log("er: ", e);
        res.status(500).json({
            api_response_info: {
                status: 200,
                message: "Registration Failed"
            }, data: null
        });
    }
});


router.post('/register', celebrate({
    [Segments.BODY]: {
        email: Joi.string().required(),
        name: Joi.string().required(),
        password: Joi.string().required(),
        profilePictureMedia: Joi.string().required(),
    }
}), async (req, res) => {
    try {

        const userData = await UserModel.findOne({ email: req.body.email });
        console.log("User Data: ", userData);

        if (userData) {
            throw new Error("Registration Failed");
        }

        const newUser = UserModel({
            name: req.body.name,
            email: req.body.email,
            password: crypto.createHash('md5').update(req.body.password).digest('hex'),
            profilePictureMedia: req.body.profilePictureMedia,
        });
        await newUser.save();

        res.status(200).json({
            api_response_info: {
                status: 200,
                message: "Registration Successful"
            }, data: null
        });
    } catch (e) {
        console.log("er: ", e);
        res.status(500).json({
            api_response_info: {
                status: 200,
                message: "Registration Failed"
            }, data: null
        });
    }
});


router.post('/friend/add', celebrate({
    [Segments.BODY]: {
        currentUser: Joi.string().required(),
        requestedUser: Joi.string().required(),
    }
}), async (req, res) => {
    try {

        const userData = await UserModel.findOne({ email: req.body.currentUser });
        const toBeFriend = await UserModel.findOne({ email: req.body.requestedUser });

        console.log("User Data: ", userData);
        console.log("toBeFriend Data: ", toBeFriend);

        if (!userData || !toBeFriend) {
            throw new Error("User Doesnot Exsists");
        }

        // check friendship relation exsists
        const friendShipRelation = await UserModel.findOne({
            email: req.body.currentUser,
            friendList: {
                "$in": toBeFriend._id
            }
        });

        if (friendShipRelation) {
            throw new Error("Already Friends")
        }

        userData.friendList.push(toBeFriend);
        await userData.save();

        console.log("friendShipRelation: ", friendShipRelation);


        res.status(200).json({
            api_response_info: {
                status: 200,
                message: "Added Successful"
            }, data: null
        });
    } catch (e) {
        console.log("er: ", e);
        res.status(500).json({
            api_response_info: {
                status: 500,
                message: e?.message
            }, data: null
        });
    }
});


router.post("/login", celebrate({
    [Segments.BODY]: {
        email: Joi.string().required(),
        password: Joi.string().required(),
    }
}), async (req, res) => {

    try {
        const userData = await UserModel.findOne({ email: req.body.email, password: crypto.createHash('md5').update(req.body.password).digest('hex') });
        console.log("User Data: ", userData);

        if (!userData) {
            throw new Error("Login Failed")
        }
        res.status(200).json({
            api_response_info: {
                status: 200,
                message: "Login Successful"
            }, data: {
                email: userData.email,
                friendList: userData.friendList,
                profilePictureMedia: userData.profilePictureMedia,
                name: userData.name
            }
        });

    } catch (e) {
        console.log("er: ", e);
        res.status(500).json({
            api_response_info: {
                status: 500,
                message: e?.message
            }, data: null
        });
    }
});

router.get("/profile/friends", celebrate({
    [Segments.QUERY]: {
        email: Joi.string().required(),
    }
}), async (req, res) => {

    try {
        const userData = await UserModel.findOne({ email: req.query.email }).populate("friendList");
        console.log("User Data: ", userData);

        if (!userData) {
            throw new Error("Login Failed")
        }
        res.status(200).json({
            api_response_info: {
                status: 200,
                message: "Profile Fetched Successful"
            }, data: {
                currentUser: userData.email,
                friendList: userData.friendList
            }
        });

    } catch (e) {
        console.log("er: ", e);
        res.status(500).json({
            api_response_info: {
                status: 500,
                message: e?.message
            }, data: null
        });
    }
});

export default router;