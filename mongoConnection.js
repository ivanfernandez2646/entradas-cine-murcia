const MongoClient = require("mongodb").MongoClient;

var urlMongo = "mongodb+srv://ivan:05y3zIMZIgPXf03E@cluster0-ew7po.gcp.mongodb.net/test?retryWrites=true&w=majority";

/*MongoClient.connect(urlMongo, {useUnifiedTopology: true}, function(err, db) {
    if (err) throw new Error(err);
    console.log("Connected!"); 
    var dbo = db.db("entradas");
});
*/
module.exports.getPases = async function (filtroPalabras, pageSeleccionada, limitePeliculas) {
    var db = await MongoClient.connect(urlMongo, {
        useUnifiedTopology: true
    });
    var dbo = db.db("entradas");
    var pases;
    var totalPases;

    var skipPeliculas;
    if (pageSeleccionada - 1 != 0) {
        skipPeliculas = (pageSeleccionada - 1) * limitePeliculas
    } else {
        skipPeliculas = 0;
    }

    if (filtroPalabras == "") {

        //Aquí obtengo la cantidad total de pases que hay
        totalPases = await dbo.collection("pases").aggregate([{
                $group: {
                    _id: {
                        "titulo": "$titulo",
                        "sala": "$sala",
                        "cine": "$cine"
                    }
                }
            },
            {
                $count: "count"
            }
        ]).toArray();

        //Agrupamos todos los pases por titulo de película, sala y cine
        pases = await dbo.collection("pases").aggregate([{
                $group: {
                    _id: {
                        "titulo": "$titulo",
                        "sala": "$sala",
                        "cine": "$cine"
                    },
                    poster: {
                        $last: "$poster"
                    },
                    horas: {
                        $push: "$hora"
                    },
                    cine: {
                        $last: "$cine"
                    }
                }
            },
            {
                $sort: {
                    "_id.titulo": 1
                }
            },
            {
                $skip: skipPeliculas
            },
            {
                $limit: limitePeliculas
            },
            {
                $project: {
                    _id: 0,
                    titulo: "$_id.titulo",
                    sala: "$_id.sala",
                    poster: 1,
                    horas: 1,
                    cine: 1,
                }
            }
        ]).toArray();
    } else {

        var filtroSpliteado = filtroPalabras.split("_");
        var regex = filtroSpliteado.join("|");

        //Aquí obtengo la cantidad total de pases filtrados que hay
        totalPases = await dbo.collection("pases").aggregate([{
                $match: {
                    $or: [{
                            cine: {
                                "$regex": regex,
                                "$options": "i"
                            }
                        },
                        {
                            titulo: {
                                "$regex": regex,
                                "$options": "i"
                            }
                        }
                    ]
                }
            },
            {
                $group: {
                    _id: {
                        "titulo": "$titulo",
                        "sala": "$sala",
                        "cine": "$cine"
                    }
                }
            },
            {
                $count: "count"
            }
        ]).toArray();

        //Aquí los pases correctamente filtrados        
        pases = await dbo.collection("pases").aggregate([{
                $match: {
                    $or: [{
                            cine: {
                                "$regex": regex,
                                "$options": "i"
                            }
                        },
                        {
                            titulo: {
                                "$regex": regex,
                                "$options": "i"
                            }
                        }
                    ]
                }
            },
            {
                $group: {
                    _id: {
                        "titulo": "$titulo",
                        "sala": "$sala",
                        "cine": "$cine"
                    },
                    poster: {
                        $last: "$poster"
                    },
                    horas: {
                        $push: "$hora"
                    },
                    cine: {
                        $last: "$cine"
                    }
                }
            },
            {
                $sort: {
                    "_id.titulo": 1
                }
            },
            {
                $skip: skipPeliculas
            },
            {
                $limit: limitePeliculas
            },
            {
                $project: {
                    _id: 0,
                    titulo: "$_id.titulo",
                    sala: "$_id.sala",
                    poster: 1,
                    horas: 1,
                    cine: 1
                }
            }
        ]).toArray();
    }
    pases.push({
        cantidadTotalPases: totalPases[0].count
    });
    console.log("getPases correcta");
    db.close();
    return pases;
}

module.exports.getButacasPorPase = async function (cineParam, salaParam, horaParam) {
    var db = await MongoClient.connect(urlMongo, {
        useUnifiedTopology: true
    });
    var dbo = db.db("entradas");
    var pase = await dbo.collection("pases").findOne({
        cine: cineParam,
        sala: salaParam,
        hora: horaParam
    }, {
        projection: {
            _id: 0,
            poster: 0
        }
    });

    var cine = await dbo.collection("cines").aggregate([{
            $match: {
                'salas.sala': salaParam,
                nombre: cineParam
            }
        },
        {
            $project: {
                salas: {
                    $filter: {
                        input: '$salas',
                        as: 'salas',
                        cond: {
                            $eq: ['$$salas.sala', salaParam]
                        }
                    }
                },
                _id: 0
            }
        },
        {
            $project: {
                butacas: "$salas.butacas",
                filas: "$salas.filas",
            }
        }
    ]).toArray();
    cine = cine[0];

    res = {
        cine: pase.cine,
        sala: pase.sala,
        hora: pase.hora,
        titulo: pase.titulo,
        reservadas: pase.reservadas,
        butacas: cine.butacas[0],
        filas: cine.filas[0]
    }
    console.log("getButacasPorPase correcta");
    db.close();
    return res;
}

module.exports.reservarButacas = async function (cineParam, salaParam, horaParam, butacasAReservar) {
    var db = await MongoClient.connect(urlMongo, {
        useUnifiedTopology: true
    });
    var dbo = db.db("entradas");
    var myquery = {
        cine: cineParam,
        sala: salaParam,
        hora: horaParam
    };
    var newvalues = {
        $addToSet: {
            reservadas: {
                $each: butacasAReservar
            }
        }
    };
    await dbo.collection("pases").updateOne(myquery, newvalues);
    db.close();
    console.log("reservarButacas correcta");
}