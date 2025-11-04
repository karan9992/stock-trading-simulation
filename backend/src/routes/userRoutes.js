const express = require("express")
const app = express();
const User = require('../models/user')
const userController= require('../controller/userController')
// const Stock = require('../models/stock')


const router = express.Router()


router.post("/register", userController.createUser)

router.post("/login", userController.loginUser)

router.post('/trade/buy', userController.buyStock)

router.post('/trade/sell', userController.sellStock)

router.get('/trade/transactions/:id', userController.transaction)

router.get('/trade/portfolio/:id', userController.portfolio)







router.get("/", (req, resp) => {
    resp.send("Welcome to Goa Singham !")
})


router.get("/login/:id", async (req, resp) => {

    console.log("User Data : ", req.params.id);

    const cUser = await User.findById(req.params.id);
    console.log(cUser);
    resp.send(cUser)


})



router.post("/stocks/:id", async (req, resp) => {

    const user = await User.findById(req.params.id)
    if (user) {
        let stockData = req.body;
        console.log(stockData);

        const result = await Stock.create({ ...stockData, uid: req.params.id })
        console.log(result);
        resp.send("Stock added to portfolio ")
    } else {
        console.log("User id incorrect ");
        resp.status(400).send("User id incorrect ")
    }

})

router.delete("/stocks/:id", async (req, resp) => {

    const user = await User.findById(req.params.id)
    if (user) {
        let stockData = req.body;
        console.log(stockData);

        const result = await Stock.create({ ...stockData, uid: req.params.id })
        console.log(result);
        resp.send("Stock added to portfolio ")
    } else {
        console.log("User id incorrect ");
        resp.status(400).send("User id incorrect ")
    }

})







module.exports = router;

