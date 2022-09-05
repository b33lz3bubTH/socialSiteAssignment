import { Router } from "express";

import multer from "multer";
import Config from "./../config";
import { v4 } from "uuid";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



const router = Router();

var Storage = multer.diskStorage({
    destination:  (req, file, callback) => {
        fs.mkdir('uploads', () => {
            callback(null, 'uploads');
        });
    },
    filename: function (req, file, callback) {
        const fileNameOfImage = req.ui + file.originalname.substring(file.originalname.indexOf('.'), file.originalname.length)
        
        req.fileNameOfImage = fileNameOfImage;
        callback(null, fileNameOfImage);
    }
});

var upload = multer({
    storage: Storage
}).single('pic');
// {pic} -> body of api

//tell express what to do when the route is requested
router.post('/upload', function (req, res, next) {
    req.ui = v4().replace('-', '_');
    upload(req, res, function (e) {
        if (e) {
            console.log("err: ", e);
            return res.status(500).json({
                api_response_info: {
                    status: 500,
                    message: e?.message
                }, data: null
            });
        }
        return res.status(200).json({
            api_response_info: {
                status: 200,
                message: "media uploaded"
            }, data: req.fileNameOfImage
        });
    });
});

export default router;