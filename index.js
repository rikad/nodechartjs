const express = require('express')
const app = express()
const port = 3000

//serving public folder
app.use(express.static('public'))

app.get('/api/data', function (req, res) { 
    var data = {
        line1 : Math.floor(Math.random() * 100),
        line2 : Math.floor(Math.random() * 100),
        gauge : Math.floor(Math.random() * 100)
    }

    res.send(data) 
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
