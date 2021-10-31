var titulo = 'ID_Receta,Nombre,Descripcion';
var bdy = 'ID_Receta,Nombre,Descripcion';

//DataCategoria();
//function DataCategoria() {
//    axiosCon('GET', 'Categoria', mostrarCategoria);
//}

//Controlador y metodo
var img64 = "";

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
}

function listaReceta(res) {
    console.log(res);
    data = res.data.Lista;
    llenarTable(data, "ID_Receta");
}

Foto.onchange = function (evt) {
    var img = document.getElementById("ImagenRef");
    var tgt = evt.target || window.event.srcElement,
        files = tgt.files;
    if (FileReader && files && files.length) {
        var fr = new FileReader();
        fr.onload = function () {
            img64 = fr.result;
            img.src = img64;
        };

        if (files[0].size <= 200000) {
            fr.readAsDataURL(files[0]);
        } else {
            Swal.fire("Error", "La imagen no puede pesar mas de 200 kb", "error");
            img64 = "";
            img.src = "../Assets/img/MENU CHU.png";
        }
       


    }
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
            console.log("Ingreso a cancelar");
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
                if (img64 != "") {
                    let objImagen = {
                        fileName: "imagen",
                        base64: img64
                    };
                    obj[$(this).data("field")] = JSON.stringify(objImagen);
                }
                else {
                    obj[$(this).data("field")] = "";
                }
                break;
            default:
        }

    });
    console.log(obj);
    obj["ID_Usuario"] = JSON.parse(localStorage.getItem("Usuario")).ID_Usuario;
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
                    img64 = JSON.parse(obj[$(this).data("field")]).base64;
                    $(this).attr("src", img64);
                }
                break;
            default:
        }
    });
}
