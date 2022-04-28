const list_langues = require('./routes/list_langues');
const list_pays = require('./routes/list_pays');
const list_sources_scrap = require('./routes/list_sources_scrap');
const list_sources = require('./routes/list_sources');
const list_themes = require('./routes/list_themes');
const newsArticles = require('./routes/newsArticles');

const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

app.use('/list_langues', list_langues);
app.use('/list_pays', list_pays);
app.use('/list_sources_scrap', list_sources_scrap);
app.use('/list_themes', list_themes);
app.use('/list_sources', list_sources)
app.use('/newsArticles', newsArticles);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})