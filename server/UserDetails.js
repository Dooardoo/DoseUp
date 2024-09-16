const mongoose = require('mongoose');
const UserDetailSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    birthday: {
        type: String,
        required: true

    }
},{
    collection: 'UserInfo'
});

mongoose.model('UserInfo', UserDetailSchema); 