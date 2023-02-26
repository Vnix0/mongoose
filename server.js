const mongoose = require('mongoose')
const express = require('express')
const { Person, createManyPeople } = require('./models/person');
const app = express();
mongoose.set('strictQuery', false)
require('dotenv').config();



const MONGO_URI = process.env.MONGO_URI;


async function addPerson(person) {
    const options = { ordered: true };
    await Person.collection.insertOne(person, options);
    console.log('Person added successfully!');
  }


  mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(`MongoDB connection error: ${err}`));


const john = new Person({
    name:'john',
    age:30,
    favoriteFoods:['pizza', 'spaghetti'],
})

const arrayOfPeople = [
    { name: 'John', age: 25, favoriteFoods: ['pizza', 'hamburger'] },
    { name: 'Mary', age: 30, favoriteFoods: ['sushi', 'ramen'] },
    { name: 'Bob', age: 35, favoriteFoods: ['steak', 'potatoes'] }
  ];

  Person.insertMany(arrayOfPeople, (err, docs) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Multiple people have been added to the database');
    }
  });


app.get('/create-people', (req, res) => {
    const arrayOfPeople = [
      { name: 'John', age: 25, favoriteFoods: ['pizza', 'hamburger'] },
      { name: 'Mary', age: 30, favoriteFoods: ['sushi', 'ramen'] }
    ];
    

    createManyPeople(arrayOfPeople)
    .then(() => {
      res.send('People created');
    })
    .catch((err) => {
      res.send('Error creating people');
    });
});


john.save()
.then(()=>console.log('person saved'))
.catch(err => console.error(err))


const port =process.env.PORT || 3000;
app.listen(port , () => console.log(`server started on port ${port}`))