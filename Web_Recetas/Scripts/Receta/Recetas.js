//const { hide } = require("@popperjs/core");

$("#btnListar").click(function () {
    alert("OK");
    debugger;
    let ruta = "https://localhost:44337/api/Receta/GetReceta";


    $.ajax({
        //async: true,
        type: 'GET',
        url: ruta,
        data: {},
        // dataType: 'html', //dataType - html
        dataType: 'JSON',
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            alert("Listo");
        },
        error: function (msg) {
            alert(msg.responseText);
        }
    });

})



ini();

function ini() {
    axiosCon('GET', 'Categoria', showOcasion);
}



function showOcasion(r) {
    console.log(r);

    let rpta = r.data;

    var body = ``;

    if (rpta.Resultado === "OK") {

        let lista = rpta.Lista;

        for (i = 0; i < lista.length; i++) {
            console.log(i);
            body += `<div class="col-lg-6">
            <div class="card mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-primary">`+ lista[i].Descripcion + `</h6>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-lg-6 mb-4">

                            <div class="card bg-primary text-white">
                                <div class="card-body">
                                `;
            if (lista[i].ID_Categoria == 1) {
                body += `<a href="#" onclick="mostrarCategoria(${lista[i].ID_Categoria});"> <img src="./Assets/img/Menus/causa_entrada.jpg" class="img-fluid" style="height: 150px;" />`;
            } else if (lista[i].ID_Categoria == 2) {
                body += `<a href="#" onclick="mostrarCategoria(${lista[i].ID_Categoria});"> <img src="./Assets/img/Menus/Caldo_sopa.jpg" class="img-fluid" style="height: 150px;" onclick="mostrarCategoria(${lista[i].ID_Categoria});"/></a>`;
            } else if (lista[i].ID_Categoria == 3) {
                body += `<a href="#" onclick="mostrarCategoria(${lista[i].ID_Categoria});"><img src="./Assets/img/Menus/lomo_fondo.jpg" class="img-fluid" style="height: 150px;" onclick="mostrarCategoria(${lista[i].ID_Categoria});"/></a>`;
            } else if (lista[i].ID_Categoria == 4) {
                body += `<a href="#" onclick="mostrarCategoria(${lista[i].ID_Categoria});"><img src="./Assets/img/Menus/flan_postre.jpg" class="img-fluid" style="height: 150px;" onclick="mostrarCategoria(${lista[i].ID_Categoria});"/></a>`;
            } else {
                body += `<a href="#" onclick="mostrarCategoria(${lista[i].ID_Categoria});"><img src="./Assets/img/Menus/limonada_bebida.jpg" class="img-fluid" style="height: 150px;" onclick="mostrarCategoria(${lista[i].ID_Categoria});"/></a>`;
            }
            body += `
                                </div>
                            </div>
                            
                        </div>

                    </div>
                </div>
            </div>
        </div>`;
        }

    }
    ///*<button onclick="mostrarCategoria('`+ lista[i].ID_Categoria +`')" class="btn btn-success">Listar</button>*/
    $("#rowOcasion").html(body);

}

function mostrarCategoria(idCat) {
    axiosCon("GET", "Receta/GetxCat?id=" + idCat, listReceta);
}

function listReceta(r) {


    $("#rowOcasion").hide(500);
    $("#rowReceta").show(1000);


    let rpta = r.data;
    console.log(rpta);
    var body = ``;

    if (rpta.Resultado === "OK") {
        let lista = rpta.Lista;
        body += `<div class="col-12 mb-4 text-right">
                      <button class="btn btn-danger col-3" onclick="regresar()">Regresar</button>
                 </div>`;
        if (lista.length > 0) {

            for (i = 0; i < lista.length; i++) {
                console.log(i);

                body += `<div class="col-lg-4">
            <div class="card mb-4">
                <div class="align-items-center card-header py-3 text-center">
                    <h4 class="font-weight-bold m-0 text-primary text-uppercase">`+ lista[i].Nombre + `</h4>
                </div>
                <div class="card-body">
                    <div class="d-flex justify-content-center row">
                        <div class="col-12 mb-4">

                            <div class="card">
                               
`;
                if ((lista[i].Foto).length > 20) {
                    body += `<img src="` + lista[i].Foto + `" class="img-fluid" style="height: 250px;" />`;
                } else {
                    body += `<img src="./Assets/img/MENU CHU.png" class="img-fluid" style="height: 250px;" />`;
                }
                body += `
                            </div>
                        </div>
                    </div>
                    `;
                body += `
                    <button class="btn btn-block btn-warning font-weight-bold text-dark" onclick="traerPreparacion(${lista[i].ID_Receta})">VER PREPARACIÓN</button>
                </div>
            </div>
        </div>`;
            }

        } else {
            body += `<div class="jumbotron jumbotron-fluid col-12">
  <div class="container">
    <h1 class="display-4">Sin recetas</h1>
    <p class="lead">No se ha encontrado ninguna receta para esta Categoria.</p>
  </div>
</div>`;
        }



    }

    $("#rowReceta").html(body);

}

function regresar() {
    $("#rowReceta").hide(500);
    $("#rowOcasion").show(1000);

}


function traerPreparacion(id) {
    axiosCon('GET', 'Receta?id=' + id, mostrarPreparacion);
}


function mostrarPreparacion(r) {
    let dt = r.data;

    var element = document.getElementById("rowPreparacion");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }

    let bdy = ``;
    if (dt.Resultado == "OK") {
        let { Lista } = dt;

        console.log(Lista);

        bdy += `<div class="col-12 text-center">
            <h1 class="display-4 text-uppercase">${Lista[0].Nombre}</h1>
        </div>
        <div class="bg-warning rounded col-12 mb-5 px-5 row text-dark">
            <div class="col-lg-6 py-5">
              <img  src="${Lista[0].Foto}" class="img-fluid" />
            </div>
            <div class="col-lg-6">
                <div class="col-12 text-center">
                <h5 class="font-weight-bold mt-5">Ingregientes</h5>
                </div>
                <ul>`;


        for (i = 0; i < Lista[0].Ingredientes.length; i++) {
            bdy += `<li class="my-1">${Lista[0].Ingredientes[i].Cantidad} ${Lista[0].Ingredientes[i].Descripcion} de ${Lista[0].Ingredientes[i].Nombre}</li>`;
        }

        bdy+= `</ul>
            </div>
            <div class="col-12 mb-3 ml-4">
             <h4 class="font-weight-bold">Preparación</h4>
             <p>${Lista[0].Preparacion}</p>
            </div>
            <div class="col-12 mb-4 text-center">
                <button class="bg-dark btn col-6 font-weight-bolder" style="color: yellow;" onclick="backOne()">REGRESAR</button>
            </div>
        </div>
        `;

        $("#rowReceta").hide(500)
        $("#rowPreparacion").show(1000);

    }
    $("#rowPreparacion").html(bdy);
    console.log(dt);
}

function backOne() {
    $("#rowPreparacion").hide(500);
    $("#rowReceta").show(1000)
}
