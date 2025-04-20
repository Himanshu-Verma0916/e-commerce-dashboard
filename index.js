const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const express = require('express');
require('./db/config');
const userModel = require('./db/user');
const productModel = require('./db/product');

const jwt = require('jsonwebtoken'); //for creating json web token
const jwtKey = 'e-comm';  //key name is 'e-comm'  ,it should be private (not to share)


const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

app.post('/signUp', async (req, res) => {
    const user = new userModel(req.body);
    // const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // user.password = hashedPassword;

    let result = await user.save();
    result = result.toObject();
    delete result.password;

    jwt.sign({ result }, jwtKey, { expiresIn: '2h' }, (err, token) => {
        if (err) {
            console.log({ result: "something went wrong, please try later" });
        } else {
            res.send({ result, auth: token });
        }
    })
    console.log(result);
    // const data=await userModel.insertMany(req.body);
    // res.send(data);
})


app.post('/login', async (req, res) => {
    // console.log(req.body.email,req.body.password);
    // res.send(req.body);
    if (req.body.email && req.body.password) {
        const userData = await userModel.findOne(req.body).select("-password");
        if (userData) {
            jwt.sign({ userData }, jwtKey, { expiresIn: '2h' }, (err, token) => {
                if (err) {
                    console.log({ result: "something went wrong, please try later" });
                    res.status(500).send({ result: "something went wrong, please try later" });
                } else {
                    res.send({ userData, auth: token });
                }
            });
        } else {
            console.log({ result: "User Not Found" });
            res.status(404).send({ result: "User Not Found" });
        }
        // const userEmail=await userModel.findOne(req.body.email);
        // const isMatch=await bcrypt.compare(req.body.password,userEmail.password);
        // if(isMatch){
        //     res.send(userEmail);
        // }else{
        //     alert("invalid user");
        // }
    } else {
        console.log({ result: "please provide email and password" });
        res.status(400).send({ result: "please provide email and password" });
    }
});


app.post('/addProduct',verifyToken, async (req, res) => {
    let product = new productModel(req.body);
    let result = await product.save();
    res.send(result);
})

app.get('/products',verifyToken, async (req, res) => {
    let products = await productModel.find();

    if (products.length > 0) {
        res.send(products);
    } else {
        res.send({ result: "No Product found" });
    }
})



app.delete('/product/:id',verifyToken, async (req, res) => {
    console.log(req.params);
    const result = await productModel.deleteOne({ _id: req.params.id });
    res.send(result);
});

//for updating product informantion we need to get that product information only with help of id
// so that we can prefill data in input box for updation

app.get('/product/:id',verifyToken, async (req, res) => {
    let result = await productModel.findOne({ _id: req.params.id });
    if (result) {
        res.send(result);
    } else {
        console.log("No product record found for this id");
    }
});

//now after getting data we will update it
app.put('/product/:id',verifyToken, async (req, res) => {
    let result = await productModel.updateOne({ _id: req.params.id }, { $set: req.body });
    if (result) {
        res.send(result);
    } else {
        console.log("No product record found for this id");
    }
});

//search api for seaching product via any key (by name ,category ...)  kuch digit bhi match krega to pura result aayega
app.get('/search/:key',verifyToken, async(req, res) => {
    let result = await productModel.find({
        "$or": [
            { name: { $regex: req.params.key } },
            { category: { $regex: req.params.key } },
            { company: { $regex: req.params.key } }

        ]
    })
    res.send(result);
})

//middleware for verifying token send to api for authenticate user
// function verifyToken(req, res, next) {
//     let token = req.headers['authorization'];
//     if (token) {
//         token = token.split(' ')[1]; // splitting token and Bearer in array and finding 1st index value i.e. token
//         console.warn("middleware", token);
//         jwt.verify(token, jwtKey, (err, valid) => {
//             if (err) {
//                 res.status(401).send({ result: "token is not valid, please provide valid token" });
//             } else {
//                 console.log("token is valid");
//                 next();
//             }
//         });
//     } else {
//         res.status(403).send({ result: "please add token with header" });
//     }
// }

function verifyToken(req, res, next) {
    let token = req.headers['authorization'];
    if (token) {
        token = token.split(' ')[1]; // extract just the token
        console.warn("middleware", token);

        jwt.verify(token, jwtKey, (err, decoded) => {
            if (err) {
                res.status(401).send({ result: "Token is not valid, please provide valid token" });
            } else {
                // ✅ Attach decoded user data to req
                req.userData = decoded.result || decoded.userData; // fallback in case your token was signed differently
                console.log("✅ Token is valid. User:", req.userData);
                next();
            }
        });
    } else {
        res.status(403).send({ result: "Please add token with header" });
    }
}


// Profile API for authenticated user
// app.get('/profile', verifyToken, async (req, res) => {
//     try {
//         const user = req.userData; // Assuming `userData` was added to the request object by verifyToken middleware
//         res.status(200).send({ result: user });
//     } catch (err) {
//         res.status(500).send({ result: "Server error. Please try again later." });
//     }
// });

app.get('/profile', verifyToken, async (req, res) => {
    try {
        console.log("✅ /profile - user:", req.userData);
        const user = req.userData;
        res.status(200).send({ result: user });
    } catch (err) {
        res.status(500).send({ result: "Server error. Please try again later." });
    }
});





const port = process.env.PORT || 5000;
app.listen(port, (err) => {
    if (!err) {
        console.log('server is perfectly running on port:', port);
    }
})