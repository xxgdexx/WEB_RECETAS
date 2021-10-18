
DataCategoria();
function DataCategoria() {
    axiosCon('GET', 'Categoria', mostrarCategoria);
}

function mostrarCategoria(r) {
    if (r.data.Resultado === "OK") {
        let str = '';
        let dt = r.data.Lista;
        console.log(dt);
        if (dt.length > 0) {
            for (i = 0; i < dt.length; i++) {
                str += `<option value="` + dt[i].ID_Categoria + `">` + dt[i].Descripcion + `</option>`;
            }
            $("#ID_Categoria").html(str);
        }
    } else {
        Swal.Fire('Error', r.data.Mensaje, 'error');
        //console.log(r.data.Mensaje);
    }
}
