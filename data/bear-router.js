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

  router.get('/:id', (req, res) => {
    db('bears')
    .where({id:req.params.id})
    .first()
    .then(bear=>{
      if(bear){
      res.status(200).json(bear)
      }else{
        res.status(404).json({message:'the specified bear does not exist'})
      }
    })
    .catch(err =>{
      res.status(500).json(err)
    })
  });

  router.delete('/:id', (req, res) => {
    db('bears')
    .where({id:req.params.id})
    .del()
    .then(count =>{
      if (count>0){
        res.status(200).json({message:`${count} bear was deleted`})
      }else{
        res.status(400).json({message:'the specified bear does not exist'})
      }
    })
    .catch(err =>{
      res.status(500).json(err)
    })
  });



module.exports = router;