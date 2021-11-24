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
    obj["Ingredientes"] = MostrarDetalle();
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
}

function agregarDetalle() {
    let ID_Ingrediente = document.getElementById("ID_Ingrediente");
    let txtNombre = document.getElementById("txtNombre");
    let ID_Tipo_Unidad = document.getElementById("ID_Tipo_Unidad");
    let txtCantidadD = document.getElementById("txtCantidadD");

    let ID_Receta = document.getElementById("ID_Receta");
    if (ID_Receta.value == null || ID_Receta.value == '' || ID_Receta.value  == undefined) {
        ID_Receta.value = 0;
    }
    var textSelect = ID_Tipo_Unidad.options[ID_Tipo_Unidad.selectedIndex].text;

    if (ID_Ingrediente.value == null || ID_Ingrediente.value == '' || ID_Ingrediente == undefined) {
        ID_Ingrediente.value = 0;
    }


    let tbd = document.getElementById("b_detalle");

    var body = ``;

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

function MostrarDetalle() {
    let b_detalle = document.getElementById("b_detalle");
    let obj = [];
    for (i = 0; i < b_detalle.childElementCount; i++) {
        let det = b_detalle.children[i];

        for (f = 0; f < det.childElementCount; f++) {
      
        }
    }
}