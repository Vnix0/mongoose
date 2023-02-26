const mongoose = require('mongoose')
const {Schema} = mongoose



const personSchema = new Schema({
    name:{
        type:String , required:true
    },
    age:{
        type:Number
    },
    favoriteFoods: [{type:String}]
})

const Person = mongoose.model('person',personSchema)


const createManyPeople = (arrayOfPeople) => {
    return Person.create(arrayOfPeople)
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  
  module.exports = { Person, createManyPeople };
