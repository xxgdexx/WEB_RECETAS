var titulo = 'ID_Receta,Nombre,Descripcion';
var bdy = 'ID_Receta,Nombre,Descripcion';






init();
function init() {

    axiosCon('GET', 'Receta/GetPendiente', listaReceta);
}



function listaReceta(res) {
    data = res.data.Lista;
    llenarTable(data, "ID_Receta");
}



function llenarTable(dat, rId) {
    let obj = [];
    let d = titulo.split(",");
    let b = bdy.split(",");
    for (i = 0; i < d.length; i++) {
        //console.log(d[i]);
        obj.push({ title: d[i], data: b[i] });
    }
    //console.log(vista);

    obj.push({
        data: null,
        className: "text-center",
        defaultContent: `<button onclick=btnAction(this,"editar") class="bg-info px-1 mx-1 py-0 btn text-white rounded rounded-circle"><i class="far fa-eye"></i></button>` +
                        `<button onclick=btnAction(this,"cancelar") class="bg-danger px-1 mx-1 py-0 btn text-white rounded rounded-circle"><i class="fas fa-ban"></i></button>` +
                        `<button onclick=btnAction(this,"aceptar") class="bg-success px-1 mx-1 py-0 btn text-white rounded rounded-circle"><i class="fas fa-check-circle"></i></button>`,
        orderable: false
    });

    $("#dtp").DataTable({
        destroy: true,
        data: dat,
        rowId: rId,
        columns: obj,
        columnDefs:
            [
                {
                    "targets": 0,
                    "visible": false,
                },
                {
                    "targets": obj.length - 1,
                    "width": "15%"
                }],
        searching: !0,
        bLengthChange: !1,
        destroy: !0,
        info: !1,
        paging: !1,
        responsive: !0,
        footer: false,
        deferRender: !1,
        //"language": {
        //    "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
        //},
        searching: !0,
        bLengthChange: !1,
        destroy: !0,
        info: !1,
        paging: !1,
        responsive: !0,
        footer: false,
        deferRender: !1,
        language: {
            search: "_INPUT_",
            searchPlaceholder: "Buscar..."
        }
    });



};


function btnAction(pt, accion) {

    var id;

    switch (accion) {


        case 'editar':

            id = pt.parentNode.parentNode.id;
            axiosCon('GET', 'Receta?id=' + id, llenarCampos);


            break;

        case 'cancelar':

            id = pt.parentNode.parentNode.id;
            axiosCon('PUT', 'Receta/PutEstado?id=' + id + '&id_estado=2', respuestaObtenida);
        
            break;
        case 'aceptar':

            id = pt.parentNode.parentNode.id;
            axiosCon('PUT', 'Receta/PutEstado?id=' + id + '&id_estado=1', respuestaObtenida);
            break;
    }


}

function llenarCampos(reg) {
    let res = reg.data;
    let bd = ``;
    if (res.Resultado == "OK") {

        let data = res.Lista;
        console.log(data);
        console.log(data[0].Ingredientes);
        bd += `<div class="col-12 row">  
               <div class="col-12 mb-3">
                    <img src="${data[0].Foto}" alt="${data[0].ID_Receta}" class="img-fluid rounded" />
               </div>
               <div class="col-6">
                <h3>Ingredientes</h3>
                <ul>`;
        for (i = 0;i<data[0].Ingredientes.length; i++) {
            bd += `<li>${data[0].Ingredientes[i].Cantidad} ${data[0].Ingredientes[i].Descripcion} ${data[0].Ingredientes[i].Nombre}</li>`;
        }

        bd += `</ul class="pl-3"> </div>
                    <div class="col-6">
                        <h3>Preparación</h3>
                        <p>${data[0].Preparacion}</p>
                    </div>
            </div>`;

    } else {
        Swal.Fire("Error", res.Mensaje, "error");
    }

    console.log(bd);

    $("#body-modal").html(bd);
    

    $("#btn-foto").click();
 
}


function respuestaObtenida(reg) {
    console.log(reg);

    let { data } = reg;
    if (data.Resultado == "OK") {
        Swal.fire("Ok", data.Mensaje, "success");
        init();
    } else {
        Swal.fire("Error", data.Mensaje, "error");
    }
}

function agregarDetalle(Ingredientes) {

    console.log(Ingredientes);

    var body = ``;
    let tbd = document.getElementById("b_detalle");

    if (Ingredientes != undefined) {
        for (i = 0; i < Ingredientes.length; i++) {
            body += `<tr>
         <th scope="row" class="d-none">${Ingredientes[i].ID_Ingrediente}</th>
         <td>${Ingredientes[i].Nombre}</td>
         <td id="${Ingredientes[i].ID_Tipo_Unidad}">${Ingredientes[i].Descripcion}</td>
         <td class="d-none">${Ingredientes[i].ID_Receta}</td>
         <td>${Ingredientes[i].Cantidad}</td>
         <td class="text-center">
        <button class="btn btn-danger px-1 py-0 rounded rounded-circle" onclick="actionDetalle('delete',${Ingredientes[i].ID_Ingrediente},this)"><i class="fa fa-trash-alt"></i></button>
        </td>
        </tr>`;
        }
    } else {
        let ID_Ingrediente = document.getElementById("ID_Ingrediente");
        let txtNombre = document.getElementById("txtNombre");
        let ID_Tipo_Unidad = document.getElementById("ID_Tipo_Unidad");
        let txtCantidadD = document.getElementById("txtCantidadD");
        let ID_Receta = document.getElementById("ID_Receta");
        if (ID_Receta.value == null || ID_Receta.value == '' || ID_Receta.value == undefined) {
            ID_Receta.value = 0;
        }
        var textSelect = ID_Tipo_Unidad.options[ID_Tipo_Unidad.selectedIndex].text;

        if (ID_Ingrediente.value == null || ID_Ingrediente.value == '' || ID_Ingrediente == undefined) {
            ID_Ingrediente.value = 0;
        }
        console.log(tbd.childElementCount);

        if (ID_Ingrediente.value == 0) {
            body += `
        <tr>
         <th scope="row" class="d-none">${ID_Ingrediente.value}</th>
         <td>${txtNombre.value}</td>
         <td id="${ID_Tipo_Unidad.value}">${textSelect}</td>
         <td class="d-none">${ID_Receta.value}</td>
         <td>${txtCantidadD.value}</td>
         <td class="text-center">
        <button class="btn btn-danger px-1 py-0 rounded rounded-circle" onclick="actionDetalle('delete',${ID_Ingrediente.value},this)"><i class="fa fa-trash-alt"></i></button>
        </td>
        </tr>`;
        } else {
            body += `
        <tr>
         <th scope="row" class="d-none">${ID_Ingrediente.value}</th>
         <td>${txtNombre.value}</td>
         <td id="${ID_Tipo_Unidad.value}">${textSelect}</td>
         <td class="d-none">${ID_Receta.value}</td>
         <td>${txtCantidadD.value}</td>
         <td class="text-center">
        <button class="btn btn-danger px-1 py-0 rounded rounded-circle" onclick="actionDetalle('delete',${ID_Ingrediente.value},this)"><i class="fa fa-trash-alt"></i></button>
        </td>
        </tr>`;
        }

        ID_Ingrediente.value = 0;
        txtNombre.value = "";
        txtCantidadD.value = "";
        ID_Tipo_Unidad.value = 0;
    }




    console.log(body);

    tbd.innerHTML += body;
}

function actionDetalle(tipo, id, campo) {



    let valor = (campo.parentElement).parentElement;
    let idRow = valor.children[0].textContent;

    switch (tipo) {
        case 'delete':

            if (id == 0) {
                valor.remove();
            } else {
                axiosCon("DELETE", "Ingrediente?id=" + id, restDelete);
                valor.remove();
            }

            break;
    }

}



