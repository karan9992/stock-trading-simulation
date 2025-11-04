const { default: mongoose } = require('mongoose');
const User = require('../models/user');
const Stock = require('../models/stock');
const Holding = require('../models/holding');

const userController = {
    createUser: async (req, resp) => {
        try {
            let { userName, email, password } = req.body;
            console.log(userName, email, password);

            const result = await User.create({ userName, email, password })
            console.log(result);
            resp.status(201).json({ result, message: "New user created Successfully" })

        } catch (err) {
            console.log("create fn error :", err);
            resp.status(500).json({ error: err, message: "Registration failed" })
        }
    },
    loginUser: async (req, resp) => {
        try {
            let { email, password } = req.body;
            console.log(email, password);

            const userInfo = await User.findOne({ email: email })
            if (userInfo && userInfo.password == password) {
                resp.json({ id: userInfo.id, userName: userInfo.userName, message: "Login Successful" })
                console.log("User :", userInfo);
            }
            else {
                resp.status(401).json({ message: "Login credentials wrong" })
                console.log("User :", userInfo);
            }


        } catch (err) {
            console.log("login fn error :", err);
            resp.status(500).json({ error: err, message: "Login failed" })
        }
    },
    buyStock: async (req, resp) => {
        try {
            let { stockName, nseName, type, qty, price, uid } = req.body
            console.log(req.body);
            let total = qty * price
            console.log(total);

            let userUpdt = await User.findById(uid)
            let prevBalance = userUpdt.balance;
            if (userUpdt) {

                if (prevBalance >= total) {

                    const result = await Stock.create({ stockName, nseName, type, total, qty, price, uid })
                    console.log(result);
                    let currBalance = prevBalance - (total)

                    // const updateInfo = await User.findByIdAndUpdate(uid, { balance: currBalance })

                    userUpdt.balance = currBalance
                    const updateInfo = await userUpdt.save()


                    console.log(updateInfo);
                    req.updateInfo = updateInfo;
                    req.stockResult = result;

                    await userController.holding(req, resp, type) //add stocks to holding


                } else {
                    console.log("Insufficient Balance !");
                    resp.status(400).json({ message: "Insufficient Balance " })
                }

            } else {
                console.log("Wrong uid");
                resp.status(400).json({ message: "wrong uid" })
            }


        } catch (err) {
            console.log("buy stock fn error :", err);
            resp.status(500).json({ error: err, message: "buy stock failed" })
        }
    },

    holding: async (req, resp, type) => {
        try {
            let { stockName, nseName, type, qty, price, uid } = req.body;

            // requierd for holding =>  uid, stockName, nseName,   qty, avgBuyPrice, totalInvestment 
            let avgBuyPrice = price;
            let totalInvestment = qty * price;

            const portfolio = await Holding.find({ uid, nseName })
            console.log("portfolio", portfolio, portfolio.length);

            if (portfolio.length === 0) {

                //if stock doesn't exist 

                const holdings = await Holding.create({ uid, stockName, nseName, qty, avgBuyPrice, totalInvestment })
                resp.status(201).json({
                    holdings,
                    updateInfo: req.updateInfo,
                    message: `Added to holdings: ${stockName} (${type})`
                })

            } else {
                //if stock already exist 
                let oldStock = portfolio.pop()
                let newQty = oldStock.qty + Number(qty);
                let newAvgBuyPrice = ((qty * price) + oldStock.totalInvestment) / newQty
                //newAvgBuyPrice =  newAvgBuyPrice / newQty
                let newTotalInvestment = newAvgBuyPrice * newQty

                console.log(newAvgBuyPrice, newQty, newTotalInvestment);

                const holdings = await Holding.findByIdAndUpdate(oldStock._id,
                    { qty: newQty, avgBuyPrice: newAvgBuyPrice, totalInvestment: newTotalInvestment }, { new: true })

                console.log("HOLINGS :", holdings);

                resp.status(201).json({
                    holdings,
                    updateInfo: req.updateInfo,
                    message: `Added to holdings: ${stockName} (${type})`
                })
            }





        } catch (err) {
            console.log("holding fn error :", err);
            resp.status(500).json({ error: err, message: "Holding record failed" })
        }
    },

    sellStock: async (req, resp) => {
        try {
            let { stockName, nseName, type, qty, price, uid } = req.body
            console.log(req.body);
            let total = qty * price
            console.log(total);

            const userInfo = await User.findById(uid)

            let prevBalance = userInfo.balance;

            if (userInfo) {

                const portfolio = await Holding.find({ uid, nseName })
                console.log("portfolio", portfolio, portfolio.length);

                if (portfolio.length == 0) {
                    resp.status(400).json({ message: "Stock not availale in portfolio " })
                    console.log("Stock not availale in portfolio ");
                } else {

                    let oldStock = portfolio.pop()
                    if (oldStock.qty < qty) {

                        resp.status(400).json({ message: "Stock quantity not sufficent in portfolio " })
                        console.log("Stock quantity not sufficent in portfolio ");

                    } else {

                        const result = await Stock.create({ stockName, nseName, type, total, qty, price, uid })
                        console.log(result);
                        let currBalance = prevBalance + (total)


                        const updateInfo = await User.findByIdAndUpdate(uid, { balance: currBalance })
                        console.log(updateInfo);



                        let newQty = oldStock.qty - Number(qty);

                        if (newQty != 0) {
                            let newTotalInvestment = newQty * oldStock.avgBuyPrice

                            console.log(newQty, newTotalInvestment);

                            const holdings = await Holding.findByIdAndUpdate(oldStock._id,
                                { qty: newQty, totalInvestment: newTotalInvestment }, { new: true })

                            console.log("HOLINGS :", holdings);

                            resp.status(201).json({ holdings, updateInfo, result, message: "Stock added to portfolio" })
                        }
                        else{
                            const deletedDocument = await Holding.findByIdAndDelete(oldStock._id);

                            resp.status(200).json({ deletedDocument, updateInfo, result, message: "Stock added to portfolio" })

                        }


                    }
                }





            } else {
                console.log("Wrong uid");
                resp.status(500).json({ message: "wrong uid" })
            }


        } catch (err) {
            console.log("sell stock fn error :", err);
            resp.status(500).json({ error: err, message: "sell stock failed" })
        }
    },
    transaction: async (req, resp) => {
        try {
            // let { email, password } = req.body;

            console.log(req.params.id);

            const transactionData = await Stock.find({ uid: req.params.id })
            const userInfo = await User.findById(req.params.id)

            if (transactionData) {
                resp.json({ userInfo, transactionData, message: "transactions found Successful" })
                console.log("User :", userInfo);
            }
            else {
                resp.status(401).json({ message: "Uid wrong" })
                console.log("User :", userInfo);
            }

        } catch (err) {
            console.log("transaction fn error :", err);
            resp.status(500).json({ error: err, message: "Transaction record failed" })
        }
    },
    portfolio: async (req, resp) => {
        try {
            console.log(req.params.id);
            const userInfo = await User.findById(req.params.id)
            const portfolioData = await Holding.find({ uid: req.params.id })
            console.log(portfolioData[0].totalInvestment);

            let totalInvestment = portfolioData.reduce((sum, i) => sum + Number(i.totalInvestment), 0)
            console.log(totalInvestment);


            resp.json({ totalInvestment, balance: userInfo.balance, portfolioData })

        } catch (err) {
            console.log("portfolio fn error :", err);
            resp.status(500).json({ error: err, message: "Portfolio record failed" })
        }
    }
}

module.exports = userController