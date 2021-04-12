const express = require('express')
const app = express()
const LeagueJs = require('leaguejs')

app.get('/', async (req, res) => {
    res.send({msg: "hello"})
})

app.listen(3001, () => {
    console.log('listening on port 3001');
})