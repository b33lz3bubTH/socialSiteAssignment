import Mongoose from 'mongoose';


const Schema = Mongoose.Schema;

const UserModel = new Schema({
    name: { type: String, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true},
    profilePictureMedia: { type: String, required: true},
    friendList: [{ type: Schema.Types.ObjectId, ref: 'SocialUserModelTable' }]
});


export default Mongoose.model('SocialUserModelTable', UserModel);