const express = require("express");
const mongoDB = require("./mongoConnection.js");
const app = express();

const PUERTO = process.env.PORT || 80;

app.use(express.static("public"));
app.use(express.json());

//Devuelve todos los pases
app.get("/pases", function(req, res, next){

   var filtroBuscador = req.query.buscar;
   var pageSeleccionada = parseInt(req.query.pageSeleccionada);
   var limitePases = parseInt(req.query.limitePases);

   if(!filtroBuscador){
      filtroBuscador = "";
   }
   
   mongoDB.getPases(filtroBuscador,pageSeleccionada,limitePases).then((pasesObtenidos) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200);
      res.json({pases: pasesObtenidos});
   }).catch((err) => {
      res.status(400);
      res.send();
   });
});

//Butacas para pase y reservadas
app.get("/butacas", function(req, res, next){

   var cine = req.query.cine;
   var sala = req.query.sala;
   var hora = req.query.hora;
   
   mongoDB.getButacasPorPase(cine,sala,hora).then((pase) => {
      res.setHeader("Content-Type", "aplication/json"),
      res.status(200);
      res.json(pase);
   }).catch((error) => {
      console.log(error);
      res.status(400);
      res.send();
   })
});

//Reserva de butacas
app.post("/reservas", function(req, res, next){

   var cine = req.query.cine;
   var sala = req.query.sala;
   var hora = req.query.hora;
   var butacasAReservar = req.body;

   mongoDB.reservarButacas(cine,sala,hora,butacasAReservar).then(() => {
      res.status(200);
   }).catch((error) => {
      res.status(400);
   }).finally(() => {
      res.send();
   })
});

app.listen(PUERTO, () => {
   console.log(`App is now listening in port ${PUERTO}`);
});