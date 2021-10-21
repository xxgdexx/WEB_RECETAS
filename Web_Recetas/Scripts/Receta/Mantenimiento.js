
//DataCategoria();
//function DataCategoria() {
//    axiosCon('GET', 'Categoria', mostrarCategoria);
//}

//Controlador y metodo
GetListas();
function GetListas() {
    GetData("Categoria", listaCategoria);
    GetData("Estilo", listaEstilo);
    GetData("Dificultad", listaDificultad);
    GetData("Ocasion", listaOcasion);
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
