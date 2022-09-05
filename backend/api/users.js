import { Router } from "express";
import { celebrate, Joi, Segments } from 'celebrate';
import UserModel from "./../models/Users";

const router = Router();



router.get('/friend/all', celebrate({
        [Segments.QUERY]: {
            page: Joi.number().default(0),
        }
    }), async (req, res) => {
    try {
        const perPage = 50;
        const page = parseInt(req.query.page);
        const userList = await UserModel.find({}, {}, { skip: (perPage * page), limit: perPage });

        res.status(200).json({
            api_response_info: {
                status: 200,
                message: "User List Fetched Successful"
            }, data: userList
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
