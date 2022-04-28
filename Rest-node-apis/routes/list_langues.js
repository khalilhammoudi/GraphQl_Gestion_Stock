const express = require('express');
const data = require('../Data/list_langues.json');
const fs = require("fs");

const list_langues = express.Router();

const languesData = fs.readFileSync('./Data' + '/list_langues.json', 'utf8')
const myObject = JSON.parse(languesData);


list_langues.get('/', (req, res)=>{

    res.status(200).json({data});
})
list_langues.post('/add', (req, res)=>{
    
    const data = req.body
    myObject.unshift(data)
    const newData = JSON.stringify(myObject)
    fs.writeFile('./Data/list_langues.json', newData, err => {
        // error checking
        if(err) throw err;
    });
    res.status(201).json({data})

})
list_langues.put('/update',(req, res)=>{
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
    fs.writeFile('./Data/list_langues.json', JSON.stringify(updatedData), err=>{
        if(err) throw err;
        console.log('Data Updated')
    })
    res.status(200).json({reqData})

})
list_langues.delete('/:id',(req, res)=>{
    const {id} = req.params;

    const remainingData = myObject.filter((info)=>info.id !== String(id));  
      const delData = myObject.filter((info)=>info.id === id);

    fs.writeFile('./Data/list_langues.json',JSON.stringify(remainingData), err => {
        // error checking
        if(err) throw err;
                console.log("New data added");
    });
    res.status(201).json({delData})

    // res.status(201).send({delData});
})
module.exports = list_langues;