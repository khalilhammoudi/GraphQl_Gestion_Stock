const express = require('express');
const data = require('../Data/list_themes.json');
const list_themes = express.Router();


const fs = require('fs')
const list_pays_Data = fs.readFileSync('./Data' + '/list_themes.json', 'utf8')
const myObject = JSON.parse(list_pays_Data);

list_themes.get('/', (req, res)=>{

    res.status(200).json({data});
})
list_themes.post('/add', (req, res)=>{

    const data = req.body
    myObject.unshift(data)
    const newData = JSON.stringify(myObject)
    fs.writeFile('./Data/list_themes.json', newData, err => {
        // error checking
        if(err) throw err;
            }); 
            res.status(201).json({data})
})
list_themes.put('/update',(req, res)=>{
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
    fs.writeFile('./Data/list_themes.json', JSON.stringify(updatedData), err=>{
        if(err) throw err;
    })
    res.status(200).json({reqData})

})
list_themes.delete('/:id',(req, res)=>{
    const {id} = req.params;

    const remainingData = myObject.filter((info)=>info.id !== id);  
    const delData = myObject.filter((info)=>info.id === id);

  fs.writeFile('./Data/list_themes.json',JSON.stringify(remainingData), err => {
      // error checking
      if(err) throw err;
      
      console.log("New data added");
  }); 
  res.status(201).json({delData})

})
module.exports = list_themes;