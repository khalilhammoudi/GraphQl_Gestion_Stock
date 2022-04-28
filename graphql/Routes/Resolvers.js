const Users = require('../Data/users.json');
const Products = require('../Data/products.json')
const fs = require("fs");
const { UserInputError } = require('apollo-server');
// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const usersData = fs.readFileSync('./Data' + '/users.json', 'utf8')
const usersObject = JSON.parse(usersData);

const productsData = fs.readFileSync('./Data' + '/products.json', 'utf8')
const productsObject = JSON.parse(productsData);

 const resolvers = {
    Query: {
        
        users: () => Users,
        products:()=> Products,
        delUser:(_, {nom})=>{
          const remainingData = usersObject.filter((info)=>info.nom !== nom);  
          const delData = usersObject.filter((info)=>info.nom === nom);
    
        fs.writeFile('./Data/users.json',JSON.stringify(remainingData), err => {
            // error checking
            if(err) throw err;
            
        });
        return {...delData[0]}

        },
        delProduct:(_, {reference})=>{
          const remainingData = productsObject.filter((info)=>info.reference !== reference);  
          const delData = productsObject.filter((info)=>info.reference === reference);
    
        fs.writeFile('./Data/products.json',JSON.stringify(remainingData), err => {
            // error checking
            if(err) throw err;
            
        });
        return {...delData[0]}

         
        }

    },
    Mutation:{
      addUser:(_, {user})=>{
 
        const userName = usersObject.filter((info)=>info.nom === user.nom);
        const userSurName = usersObject.filter((info)=>info.prenom === user.prenom);
       if(userName.length === 0 || userSurName.length === 0){
       
        usersObject.unshift(user)
        const newData = JSON.stringify(usersObject)
        fs.writeFile('./Data/users.json', newData, err => {
            // error checking
            if(err) throw err;
        });
        return user
         
       }
       else{
         throw new UserInputError("username or surname already exists")
       }
        console.log(user)
      },
      updateUser:(_,{user})=>{
        const updatedData = usersObject.map((data)=>{
          console.log(data)
          if(data.user === user.nom){
            return {...data, ...user}
            
          }
        return data;
        });
      //   const newData = 
  
      console.log(updatedData);
      fs.writeFile('./Data/users.json', JSON.stringify(updatedData), err=>{
          if(err) throw err;
      })
      const updatedValue = updatedData.filter((data)=>user.nom === user.nom);
      return {...updatedValue[0]}
      },
      addProduct:(_, {product})=>{
 
        const productRef = productsObject.filter((info)=>info.reference === product.reference);
       if(productRef.length === 0 && product.price > 0 && product.description !== ''){
       
        productsObject.unshift(product)
        const newData = JSON.stringify(productsObject)
        fs.writeFile('./Data/products.json', newData, err => {
            // error checking
            if(err) throw err;
        });
        return product
         
       }
       else{
         throw new UserInputError("product reference already exists or price is less than 0 or description is empty")
       }
      },
      updateProduct:(_,{product})=>{
        const updatedData = productsObject.map((data)=>{
          console.log(data)
          if(data.reference === product.reference){
            return {...data, ...product}
            
          }
        return data;
        });
      //   const newData = 
  
      console.log(updatedData);
      fs.writeFile('./Data/products.json', JSON.stringify(updatedData), err=>{
          if(err) throw err;
      })
      const updatedValue = updatedData.filter((data)=>data.reference === product.reference);
      return {...updatedValue[0]}
      }
    }
  };

  module.exports = resolvers