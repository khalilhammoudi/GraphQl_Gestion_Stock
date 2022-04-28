const express = require('express');
const data = require('../Data/newsArticles.json');

const newsArticles = express.Router();

const fs = require('fs')
const list_pays_Data = fs.readFileSync('./Data' + '/newsArticles.json', 'utf8')
const myObject = JSON.parse(list_pays_Data);

newsArticles.get('/', (req, res)=>{

    res.status(200).json({data});
})
newsArticles.post('/add', (req, res)=>{
    const data = req.body
    myObject.unshift(data)
    const newData = JSON.stringify(myObject)
    fs.writeFile('./Data/newsArticles.json', newData, err => {
        // error checking
        if(err) throw err;
            }); 
            res.status(201).json({data})

})
newsArticles.put('/update',(req, res)=>{
    const reqData = req.body;
    
    const updatedData = myObject.map((data)=>{
        console.log(data)
        if(data.id === reqData.id){
          return {...data, ...reqData}
          
        }
      return data;
      });
    //   const newData = 

    console.log(updatedData);
    fs.writeFile('./Data/newsArticles.json', JSON.stringify(updatedData), err=>{
        if(err) throw err;
    })  
    res.status(200).json({reqData})

})
newsArticles.delete('/:id',(req, res)=>{
    const {id} = req.params;

    const remainingData = myObject.filter((info)=>info.id !== id);  
      const delData = myObject.filter((info)=>info.id === id);

    fs.writeFile('./Data/newsArticles.json',JSON.stringify(remainingData), err => {
        // error checking
        if(err) throw err;
        
        console.log("New data added");
    });
    res.status(201).json({delData})

})
module.exports = newsArticles;