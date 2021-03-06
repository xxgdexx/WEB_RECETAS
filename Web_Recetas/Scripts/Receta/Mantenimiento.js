var titulo = 'ID_Receta,Nombre,Descripcion';
var bdy = 'ID_Receta,Nombre,Descripcion';



var imagen = document.querySelector('#ImagenRef');
var btnfoto = document.querySelector("#btn-foto");

var widget_cloudinary = cloudinary.createUploadWidget({
    cloudName: 'turo-sac',
    uploadPreset: 'e2xsl1ax'
}, (err, result) => {

    if (!err && result & result.event === 'success') {
        imagen.src = result.info.files[0].uploadInfo.url;
    }
    if (result.info.files != undefined) {
        imagen.src = result.info.files[0].uploadInfo.url;

    }
});

btnfoto.addEventListener('click', () => {
    widget_cloudinary.open();
}, false);






var Foto = document.getElementById("Foto");

GetListas();
init();

function init() {

    axiosCon('GET', 'Receta', listaReceta);
}

function GetListas() {
    GetData("Categoria", listaCategoria);
    GetData("Estilo", listaEstilo);
    GetData("Dificultad", listaDificultad);
    GetData("Ocasion", listaOcasion);
    GetData("TipoUnidad", listaUnidad);
}

function listaReceta(res) {
    data = res.data.Lista;
    llenarTable(data, "ID_Receta");
}

function listaEstilo(r) {
    if (r.data.Resultado === "OK") {
        let dt = r.data.Lista;
        obj = ["ID_Estilo", "Descripcion"];
        Lista(dt, "ID_Estilo", obj,'Estilo');
    } else {
        Swal.Fire('Error', r.data.Mensaje, 'error');
    }
}

function listaCategoria(r) {
    if (r.data.Resultado === "OK") {
        let dt = r.data.Lista;
        obj = ["ID_Categoria", "Descripcion"];
        Lista(dt, "ID_Categoria", obj,'Categoria');
    } else {
        Swal.Fire('Error', r.data.Mensaje, 'error');
    }
}

function listaDificultad(r) {
    if (r.data.Resultado === "OK") {
        let dt = r.data.Lista;
        obj = ["ID_Dificultad", "Descripcion"];
        Lista(dt, "ID_Dificultad", obj,'Dificultad');
    } else {
        Swal.Fire('Error', r.data.Mensaje, 'error');
    }
}

function listaOcasion(r) {
    if (r.data.Resultado === "OK") {
        let dt = r.data.Lista;
        obj = ["ID_Ocasion", "Descripcion"];
        Lista(dt, "ID_Ocasion", obj,'Ocasion');
    } else {
        Swal.Fire('Error', r.data.Mensaje, 'error');
    }
}

function listaUnidad(r) {
    if (r.data.Resultado === "OK") {
        let dt = r.data.Lista;
        obj = ["ID_Tipo_Unidad", "Descripcion"];
        Lista(dt, "ID_Tipo_Unidad", obj, 'Seleccione');
    } else {
        Swal.Fire('Error', r.data.Mensaje, 'error');
    }
}

function btnAction(pt,accion) {

    var id;
    if (accion != 'nuevo' || accion != 'cancelar') {
        id = pt.parentNode.parentNode.id;
    }

    switch (accion) {

        case 'registrar':
            axios.post(BaseUrl + "Receta", assignValues()).then(res => {
                if (res.data.Resultado === "OK") {
                    Swal.fire('OK', res.data.Mensaje, 'success');
                    LimpiarCampos();
                    var element = document.getElementById("b_detalle");
                    while (element.firstChild) {
                        element.removeChild(element.firstChild);
                    }
                    $("#rowData").hide(500);
                    $("#rowTable").show(1000);
                }
                else {
                    Swal.fire('Error', res.data.Mensaje, 'error');
                }
            }).catch(err => {
                Swal.fire('Error', err.toString(), 'error');
            });
            break;

        case 'editar':
            LimpiarCampos();
            //$("#TittleModel").html("Editar Modelo");
            $("#rowTable").hide(500);
            $("#rowData").show(1000);



            axiosCon('GET', 'Receta?id=' + id, llenarCampos);


            break;

        case 'cancelar':
            $("#rowData").hide(500);
            $("#rowTable").show(1000);
            break;
        case 'nuevo':
            LimpiarCampos();
            var element = document.getElementById("b_detalle");
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
            $("#rowTable").hide(500);
            $("#rowData").show(1000);
            break;
    }


}

function assignValues() {
    //Objeto retorno
    var obj = {};
    $(".cf").each(function (index) {

        switch ($(this)[0].localName) {
            case "select":
                obj[$(this).data("field")] = $(this).val();
                break;
            case "input": case "textarea":
                obj[$(this).data("field")] = $(this).val();
                break;
            case "img":
                obj[$(this).data("field")] = $(this).attr("src");
                break;
            default:
        }

    });
    console.log(obj);
    obj["ID_Usuario"] = JSON.parse(localStorage.getItem("Usuario")).ID_Usuario;
    obj["ID_Estado"] = 1;
    obj["Ingredientes"] = ArrIngredientes();
    return obj;
}

function LimpiarCampos() {
    $(".cf").each(function (index) {

        switch ($(this)[0].localName) {
            case "select":
                $(this)[0].value = "";
                break;
            case "input": case "textarea":
                $(this)[0].value = "";
                break;
            case "img":
                img64 = "";
                $(this)[0].src = "";


                break;
            default:
        }

    });
}

function llenarCampos(reg) {
    console.log(reg.data);
    var obj = reg.data.Lista[0];
    $(".cf").each(function (index) {
        switch ($(this)[0].localName) {
            case "select":
                $(this).val(obj[$(this).data("field")]);
                break;
            case "input": case "textarea":
                $(this).val(obj[$(this).data("field")]);
                break;
            case "img":
                if (obj[$(this).data("field")] === "") {
                    $(this).attr("src", "./Assets/img/MENU CHU.png");
                }
                else {
                    $(this).attr("src", obj[$(this).data("field")]);
                }
                break;
            default:
        }
    });

    let { Ingredientes } = obj;
    agregarDetalle(Ingredientes);
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

function actionDetalle(tipo, id,campo) {



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

function restDelete(r) {
    console.log(r);
}

function ArrIngredientes() {
    let b_detalle = document.getElementById("b_detalle");

    let obj = [];
    if (b_detalle.childElementCount>0) {
        for (i = 0; i < b_detalle.childElementCount; i++) {
            let det = b_detalle.children[i];
            let dt = {
                ID_Ingrediente: det.children[0].textContent,
                Nombre: det.children[1].textContent,
                Descripcion: det.children[2].textContent,
                ID_Tipo_Unidad: det.children[2].id,
                ID_Receta: det.children[3].textContent,
                Cantidad: det.children[4].textContent,
            }
            obj.push(dt);
        }
    }
   


    return obj;
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
        defaultContent: `<button onclick=btnAction(this,"editar") class="bg-warning px-1 py-0 btn text-white rounded rounded-circle"><i class="fa fa-pencil-alt"></i></button>`,
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
                    "width": "10%"
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


