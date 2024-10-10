const express = require("express")
const path = require('path');


const app = express()


app.use(express.static(path.join(__dirname, '../dist')));


app.get("/scanModule", (req, res) => {
    try {
        res.send("scan router")
        return
    } catch (error) {

    }
})


// Định tuyến cho mọi yêu cầu đến tệp index.html của React
app.get('*', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../dist', 'index.html'));
    } catch (error) {
        console.log(error);
        res.send("have wrong!!")
        return
    }
});


app.listen(8080, () => {
    console.log("server is running : http://locahost:8080");
})