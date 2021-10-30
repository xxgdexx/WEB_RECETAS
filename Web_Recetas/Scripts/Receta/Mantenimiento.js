
//DataCategoria();
//function DataCategoria() {
//    axiosCon('GET', 'Categoria', mostrarCategoria);
//}

//Controlador y metodo
var img64 = "";

var Foto = document.getElementById("Foto");
GetListas();
function GetListas() {
    GetData("Categoria", listaCategoria);
    GetData("Estilo", listaEstilo);
    GetData("Dificultad", listaDificultad);
    GetData("Ocasion", listaOcasion);
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


function btnAction(accion) {

    axios.post(BaseUrl+"Receta", assignValues()).then(res => {
        if (res.data.Resultado === "OK") {
            Swal.fire('OK', res.data.Mensaje, 'success');



            //$("#rowData").hide(500);
            //$("#rowTable").show(1000);
            //listarModelo(res);
        }
        else {
            Swal.fire('Error', res.data.Mensaje, 'error');
        }
    }).catch(err => {
        Swal.fire('Error', err.toString(), 'error');
    });
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

    return obj;
}

