const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { findMedicineInPharmacies, findRandomPharmacy} = require('./pharmacyController');
const mongoURI = 'mongodb+srv://eduardorossi:sCGvpF8WYIUFu7a0@cluster0.t5cus.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const JWT_SECRET = 'eduardorossi';

mongoose.
    connect(mongoURI).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log('Error connecting to MongoDB', err);
});

require('./UserDetails');

const User = mongoose.model('UserInfo');

app.post('/signup', async(req, res) => {
    const {name, email, password, birthday} = req.body;
    console.log(req.body)
    const oldUser = await User.findOne({email});

    if(oldUser){
        return res.send({status:"error", data: "Email already exists"});
    }

    const encryptedPassword = await bcrypt.hash(password, 12);

    try{
        await User.create({
            name:name,
            email:email, 
            password:encryptedPassword,
            birthday:birthday
        });

        res.send({status:"ok", data: "User created"});
    }
    catch(err){
        console.log(err)
         res.send({status:"error", data: err});

    }
});

// Rota para buscar uma farmácia aleatória
app.get('/pharmacies/random', findRandomPharmacy);

// Rota para buscar remédios em farmácias
app.get('/pharmacies/:medicine', findMedicineInPharmacies);



app.post("/login-user", async(req, res) => {
    const {email, password} = req.body;

    const user = await User
    .findOne({email:email});

    if(!user){
        return res.send({status:"error", data: "Email does not exist"});
    }

    if(await bcrypt.compare(password, user.password)){
        const token = jwt.sign({email: user.email}, JWT_SECRET);

        if(res.status(200)){
            res.send({status:"ok", data: token});
        }
        else{
            res.send({status:"error", data: "Invalid password"});
        }
    }
}
);

app.post('/userdata',async(req, res) => {
    const {token} = req.body;

    try{
        const user = jwt.verify(token, JWT_SECRET);
        const useremail = await user.email;

        User.findOne({email:useremail}).then((user) => {
            return res.send({status:"ok", data: user});
        });
    }
    catch(err){
         return res.send({status:"error", data: "Invalid token"});
    }
}
);


app.get('/', (req, res) => {
    res.send({status: 'Server is running'});
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});