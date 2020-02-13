function inicializar() {

    //Aplicamos evento al buscador click y a toda la web para el botón Entrar
    $("#buscador").click(clickBuscador);
    $(document).keyup(function(evt){
        if(evt.keyCode === 13){
            fetchBuscador();
        }
    });

    //Aplicamos evento sobre los botones de las horas y sobre un click en el navigation page
    $("#contenedorPeliculas").on('click', '.btHora', fetchButacas);
    $("#paginationNav").on('click', 'li', fetchBuscador);

    //Lanzamos el fetch inicial
    fetchBuscador();
}

//Cuando damos click en el buscador
function clickBuscador(evt) {
    fetchBuscador();
}

//Variables para controlar la paginación
let limitePases = $("#pasesPorPagina").val();
let pageSeleccionada = 1;
let cantidadTotalPag = 0;

function fetchBuscador() {

    //Seteamos la página seleccionada
    if($(this).attr("id")){
        let pageSeleccionadaTMP = $(this).attr("id");
        if(pageSeleccionadaTMP.endsWith("N")){
            pageSeleccionada = parseInt(pageSeleccionada)+1;
            if(pageSeleccionada > cantidadTotalPag){
                pageSeleccionada = cantidadTotalPag;
            }
        }else if(pageSeleccionadaTMP.endsWith("P")){
            pageSeleccionada = parseInt(pageSeleccionada)-1;
            if(pageSeleccionada < 1){
                pageSeleccionada = 1;
            }
        }else{
            pageSeleccionada = pageSeleccionadaTMP;
        }
    }else{
        pageSeleccionada = 1;
    }
    
    //Vacíamos HTML(películas y navegación) cada vez que ejecutamos el fetch
    $("#contenedorPeliculas").html("");
    $("#paginationNav").html("");
    $("#loading").css("visibility", "visible");

    //Preparamos el valor del buscador y seteamos el límite de pases introducido por el usuario
    let valorBuscador = $("#buscadorText").val();
    let valorBuscadorSplit = valorBuscador.split(" ");
    let valorBuscadorConstruido = valorBuscadorSplit.join("_");
    limitePases = $("#pasesPorPagina").val();

    if(limitePases > 9){
        $("#pasesPorPagina").val(9);
        limitePases = 9;
    }else if(limitePases < 1){
        $("#pasesPorPagina").val(1);
        limitePases = 1;
    }

    fetch("/pases/?buscar="+valorBuscadorConstruido+"&pageSeleccionada="+pageSeleccionada+"&limitePases="+limitePases, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        })
        .then((resp) => {
            if (resp.status == 200) {
                return resp.json();
            } else {
                throw new Error(resp.status);
            }
        })
        .then((json) => {            
            //De esta manera elimino del array json la cantidadTotaldePases y lo asigno a una variable
            let cantidadTotalPases = json.pases[json.pases.length - 1].cantidadTotalPases;
            delete json.pases[json.pases.length - 1]
            json.pases.length = json.pases.length - 1;

            //Cantidad de páginas totales para crear dinámicamente la paginación
            cantidadTotalPag = Math.ceil(cantidadTotalPases / limitePases);

            let buscador = $("#contenedorPeliculas");
            let texto = cardViewPeliculaCompiled({
                pases: json.pases
            });
            buscador.html(texto);
            $("#loading").css("visibility", "hidden");
            $("footer").css("visibility", "visible");
            $("#paginationNav").html(
                paginationTemplateCompiled({
                    cantidadTotalPaginas: cantidadTotalPag
                })
            );
            $("#"+pageSeleccionada).children().attr("class","page-link bg-dark");
        })
        .catch((error) => {
            $("#paginationNav").html(`<p class="text-center">No hay resultados</p>`);
            $("#loading").css("visibility", "hidden");
            console.log(error);
        });
}

//Relaccionado con el modal
let butacasSeleccionadas = [];
let posterSeleccionado;
let cineSeleccionado;
let cine;
let sala;
let hora;

function fetchButacas(evt) {

    let salaCine = $(this).prevUntil('p#salaCine').prev().text();

    butacasSeleccionadas = [];
    $("#loading").css("visibility", "visible");
    $("#modalReservas").html("");
    let salaCineSplit = salaCine.split(" - ");

    cine = salaCineSplit[1];
    sala = salaCineSplit[0].split(" ")[3];
    hora = $(this).text();

    //Atributos seteados para ayudarme a mostrar la alerta
    posterSeleccionado = $(this).prevUntil('h5').parent().siblings('#divPoster').children().attr("src");
    cineSeleccionado = "Sala "+sala+" - "+cine;

    fetch("/butacas/?cine="+cine+"&sala="+sala+"&hora="+hora, {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    }).then((resp) => {
        if (resp.status == 200) {
            console.log(resp);
            return resp.json();
        } else {
            throw new Error(resp.status);
        }
    }).then((json) => {
        $("#modalReservas").html(
            reservaModalCompiled({
                pase: json,
                butacasPorFila: json.butacas / json.filas
            })
        );
        $("#modalReservas").modal("show");
        $("#loading").css("visibility", "hidden");
        $("#tableButacasBody").on('mouseover', '.noReservada', butacasDinamycHover);
        $("#tableButacasBody").on('mouseleave', '.noReservada', butacasDinamycLeave);
        $("#tableButacasBody").on('click', '.noReservada', butacasDinamycClick);
        $("#btnConfirmar").click(fetchConfirmarReserva);
    }).catch((error) => {
        $("#loading").css("visibility", "hidden");
        console.log(error);
    });
}

//Evento Hover sobre las butacas
function butacasDinamycHover(evt) {
    let idButacaActual = $(this).attr("id");

    if (!butacasSeleccionadas.includes(idButacaActual)) {
        $(this).attr("bgcolor", "2525FF");
    }
}

//Evento Leave sobre las butacas
function butacasDinamycLeave(evt) {
    let idButacaActual = $(this).attr("id");

    if (!butacasSeleccionadas.includes(idButacaActual)) {
        $(this).attr("bgcolor", "00FF00");
    }
}

//Evento Click sobre las butacas
function butacasDinamycClick(evt) {
    var butacaActual = $(this).attr("id");

    if (butacasSeleccionadas.includes(butacaActual)) {
        let posButacasArray = butacasSeleccionadas.indexOf(butacaActual);
        butacasSeleccionadas.splice(posButacasArray, 1);
        $(this).attr("bgcolor", "00FF00");
    } else {
        butacasSeleccionadas.push(butacaActual);
        $(this).attr("bgcolor", "FFF825");
    }
    $("#cantidadButacas").text(butacasSeleccionadas.length + " butacas.")
}

function fetchConfirmarReserva(evt) {
    
    $("#modalReservas").modal("hide");
    $("#loading").css("visibility", "visible");

    fetch("/reservas/?cine="+cine+"&sala="+sala+"&hora="+hora, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(butacasSeleccionadas)
    }).then((resp) => {
        $("#loading").css("visibility", "hidden");
        if (resp.status == 200) {

            var reservaConfirmada = {
                cine: cineSeleccionado,
                poster: posterSeleccionado,
                butacas: butacasSeleccionadas,
                hora: hora
            }
            $("#alertReservadaOK").html(alertReservaCompiled({
                paseReservado: reservaConfirmada
            }));            
            alertReservaConfirmadaShow();
            console.log("Reserva de butacas correcta");
        } else {
            throw new Error(resp.status);
        }
    }).catch((error) => {
        console.log(error);
    })
}


//Alerta de reserva confirmada mostrar
function alertReservaConfirmadaShow() {
    $('#alertReservadaOK').fadeIn(1000);
    setTimeout(function () {
        $('#alertReservadaOK').fadeOut(1000);
    }, 5000);
}

$(document).ready(inicializar);