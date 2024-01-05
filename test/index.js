const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('khatarnatk World!')
})

app.listen(5000, () => {
  console.log(`Example app listening on port ${port}`)
})