const router = require('express').Router();
const fs = require('fs');
const dataPath = require('../src/data'); 

// util functions
const saveData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync(dataPath, stringifyData)
}
const getData = () => {
    const jsonData = fs.readFileSync(dataPath, 'utf-8');
    return JSON.parse(jsonData);   
}
console.log(getData())

//Create a data entry
router.post('/create', (req, res) => {
 
    const existData = getData();
    const newDataId = existData['id'] + 1
 
    existData[newDataId] = req.body
   
    console.log(existData);
    saveData(existData);
    res.send({success: true, msg: 'data added successfully'})
})

// Read - get all data from the json file
router.get('/read', (req, res) => {
    const allData = getData()
    res.send(allData)
  })

  // Update - using Put method
router.put('/data/:id', (req, res) => {
    var existData = getData()
    fs.readFile(dataPath, 'utf8', (err, data) => {
      const Id = req.params['id'];
      existData[Id] = req.body;
      saveData(existData);
      res.send(`data with id ${Id} has been updated`)
    }, true);
  });

  // delete - using delete method
router.delete('/data/delete/:id', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      var existData = getData()
      const Id = req.params['id'];
      delete existData[Id]; 
      saveData(existData);
      res.send(`data with id ${Id} has been deleted`)
    }, true);
  })

module.exports = router;