const express = require("express")
const path = require('path');


const app = express()


app.use(express.static(path.join(__dirname, '../dist')));

// Định tuyến cho mọi yêu cầu đến tệp index.html của React
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});
console.log(path.join(__dirname, '../dist', 'index.html'));



app.listen(8080, () => {
    console.log("server is running : http://locahost:8080");
})