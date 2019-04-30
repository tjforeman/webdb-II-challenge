const knex=require('knex');
const router = require('express').Router();

const knexConfig={
client:'sqlite3',
connection:{
filename:'./data/lambda.sqlite3'
},
useNullAsDefault:true,
}

const db =knex(knexConfig);

router.post('/', (req, res) => {
    if (!req.body.name){
        res.status(400).json({message:'A name is required to add a Bear'})
    }else{
    db('bears')
    .insert(req.body,'id')
    .then(results =>{
      res.status(200).json(results)
    })
    .catch(err=>{
      res.status(500).json(err)
    })
}
  });

router.get('/', (req, res) => {
    db('bears')
    .then(bears=>{
      res.status(200).json(bears)
    }).catch(err =>{
      console.log(err)
    })
  });

module.exports = router;