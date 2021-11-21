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
                body += `<img src="./Assets/img/Menus/causa_entrada.jpg" class="img-fluid" style="height: 150px;" />`;
            } else if (lista[i].ID_Categoria == 2) {
                body += `<img src="./Assets/img/Menus/Caldo_sopa.jpg" class="img-fluid" style="height: 150px;" />`;
            } else if (lista[i].ID_Categoria == 3) {
                body += `<img src="./Assets/img/Menus/lomo_fondo.jpg" class="img-fluid" style="height: 150px;" />`;
            } else if (lista[i].ID_Categoria == 4) {
                body += `<img src="./Assets/img/Menus/flan_postre.jpg" class="img-fluid" style="height: 150px;" />`;
            } else {
                body += `<img src="./Assets/img/Menus/limonada_bebida.jpg" class="img-fluid" style="height: 150px;" />`;
            }
            body+=`
                                </div>
                            </div>
                            <button onclick="mostrarCategoria('`+ lista[i].ID_Categoria +`')" class="btn btn-success">Listar</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>`;
        }

    }

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

                body += `<div class="col-lg-6">
            <div class="card mb-4">
                <div class="align-items-center card-header py-3 text-center">
                    <h6 class="m-0 font-weight-bold text-primary">`+ lista[i].Nombre + `</h6>
                </div>
                <div class="card-body">
                    <div class="d-flex justify-content-center row">
                        <div class="col-lg-6 mb-4">

                            <div class="card bg-primary text-white">
                                <div class="card-body text-center">
`;
                if ((lista[i].Foto).length > 20) {
                    body += `<img src="` + JSON.parse(lista[i].Foto).base64 + `" class="img-fluid" style="height: 150px;" />`;
                } else {
                    body += `<img src="./Assets/img/MENU CHU.png" class="img-fluid" style="height: 150px;" />`;
                }
                body += `
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
                body += `<h3>Preparación</h3>
                    <p>`+ lista[i].Preparacion + `</p>
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





