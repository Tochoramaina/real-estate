import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    avatar : {
        type : String,
        default : `https://www.bing.com/ck/a?!&&p=0548d8115900c7d4ca16a070877ab3c372a67e04b163cb0924f151fa1d209d42JmltdHM9MTc0MDYxNDQwMA&ptn=3&ver=2&hsh=4&fclid=37c4cac1-32d4-6db0-019c-df4c33286c67&u=a1L2ltYWdlcy9zZWFyY2g_cT1kdW1teSUyMHByb2ZpbGUlMjBwaWMmRk9STT1JUUZSQkEmaWQ9RDU0OTFCNzQ0M0I5RDBENEUzODgyRTg2QUI0RTJDMEU2Rjg5MzNGRA&ntb=1`
    },

}, {timestamps : true});

const User = mongoose.model('User', userSchema)

export default User;