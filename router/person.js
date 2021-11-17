const express = require("express");
const Person = require("../models/Person")

const router = express.Router();

//Database initialization
router.get("/init", async (req, res) => {
    //Create Many Records with model.create()
    await Person.create([{ name: 'Rahma', age:30, favoriteFoods: ["couscous"] },
        { name: 'Asma', age:29, favoriteFoods: ["couscous", "lasagne", "brique"] },
        { name: 'Sami', age:40 }]);
        res.status(200).send({msg: "Initialize Database successfully"});
});

//create new person
router.post("/", async (req, res) => {
    try {
        //create new person
        const person = new Person(req.body);
        //save async method 
        await person.save();
        res.status(200).send({msg: "Add new person successfully", person});
    } catch (error) {
        //If there is an error
        res.status(400).send({msg: "Can not save the person", error});
    }
});

//Using Person.find() to Search the Database
router.get("/", async (req, res) => {
    try {
        //Find all the people having a given name
        const findPerson = await Person.find({name: req.body.name});
        res.status(200).send({msg: "Getting person successfully", findPerson});
    } catch (error) {
        res.status(400).send({msg: "Can not get person", error});
    }
});

//Using Person.findOne() to Return a Single Matching Document from Database
router.get("/food", async (req, res) => {
    try {
        //Find just one person which has a certain food in the person's favorites
        const findOnePerson = await Person.findOne({favoriteFoods: req.body.favoriteFoods});
        res.status(200).send({msg: "Getting one person successfully", findOnePerson});
    } catch (error) {
        res.status(400).send({msg: "Can not get person", error});
    }
});

//Using Person.findById() to Search By _id
router.get("/id", async (req, res) => {
    try {
        //Find the (only!!) person having a given _id
        const findOnePerson = await Person.findById({_id: req.body._id});
        res.status(200).send({msg: "Getting person by id successfully", findOnePerson});
    } catch (error) {
        res.status(400).send({msg: "Can not get person", error});
    }
});


//Classic Updates by Running Find, Edit, then Save
router.put("/classic/:id", async (req, res) => {
    try {
        //Find the (only!!) person having a given _id and edit it
        const findOnePerson = await Person.findById(findOnePerson).update({_id: req.params.id}, {"favoriteFoods": favoriteFoods.push("hamburger")}).save();
        res.status(200).send({msg: "Updated successfully"});
    } catch (error) {
        res.status(400).send({msg: "Can not modify person", error});
    }
})

//Updating using Person.findOneAndUpdate()
router.put("/", async (req, res) => {
    try {
        //Find a person by Name and set the person's age to 20
        const f = await Person.findOneAndUpdate({name: req.body.name}, {$set: { "age":20 }});
        res.status(200).send({msg: "Updated successfully"});
    } catch (error) {
        res.status(400).send({msg: "Can not modify person", error});
    }
});

//Delete One Document using Person.findByIdAndRemove
router.delete("/:id", async (req, res) => {
    try {
        //Delete one person by the person's _id
        await Person.findByIdAndRemove({_id: req.params.id});
        res.status(200).send({msg: "Deleted successfully"});
    } catch (error) {
        res.status(400).send({msg: "Can not delete person", error});
    }
});

//Delete Many Documents with Person.remove()
router.delete("/", async (req, res) => {
    try {
        //Delete all the people whose name is “Mary”
        const d = await Person.remove({ name: "Mary" });
        //testing remove pêople
        if (d.deletedCount) {
            return res.status(200).send({msg: "Deleted successfully"});
        }
        res.status(400).send({msg: "There is no modification"});
    } catch (error) {
        res.status(400).send({msg: "Can not delete person", error});
    }
});

//Chain Search Query Helpers to Narrow Search Results
router.get("/people", async (req, res) => {
    try {
        //Find people who like burritos. 
        //Sort them by name, 
        //limit the results to two documents, 
        //and hide their age. 
        const findPeople = await Person.find({favoriteFoods: "burritos"}).sort({name: "asc"}).limit(2).select("-age").exec();
        res.status(200).send({msg: "Getting people uccessfully", findPeople});
    } catch (error) {
        res.status(400).send({msg: "Can not get people", error});
    }
});



module.exports = router;