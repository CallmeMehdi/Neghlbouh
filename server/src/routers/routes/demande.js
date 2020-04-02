const express = require("express");
const router = express.Router();
const DemandeController = require('../../controllers/demande')
const mongoose = require('mongoose')
const Demande = require('../../models/Demande')
const authenticate = require('../../authenticate');

//add "demande" to database
router.post("/add", (req, res) => {
  DemandeController.addDemande(req, res);
});

// accept demande (state -> 1)
router.put("/state/1",(req,res)=>{

});

router.put("/state/0",(req,res)=>{
  
});

router.route('/:demandId')
.get(authenticate.verifyOrdinaryUser,(req,res,next) => {
  Demande.find({
    '_id': req.params.demandId,
    'cin': req.user.cin
    })
    .then((demand) => {
      if(demand!=null){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(demand);
      }
      else{
        err = new Error('the requested demand not found !!');
        err.status = 404;
        return next(err);
      }
       
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(authenticate.verifyOrdinaryUser,(req, res, next) => {
  
  Demande.update({
    '_id': req.params.demandId,
    'cin': req.user.cin
    }, {
        $set: req.body
    }, { new: true })
    .then((demand) => {
      if(demand!=null){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(demand);
      }
      else{
        err = new Error('the requested demand not found!!');
        err.status = 404;
        return next(err);
      }
    }, (err) => next(err))
    .catch((err) => next(err));
})

.delete(authenticate.verifyOrdinaryUser,(req, res, next) => {
  Demande.remove({
    '_id': req.params.demandId,
    'cin': req.user.cin
    })
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});
module.exports = router;
