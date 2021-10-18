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


//puedes llamar de esta manera los datos
//const getReceta = () => {
//    axiosCon('GET', 'Receta', mostrar);
//}

//o de esta manera
//function getReceta() {
//    axiosCon('GET', 'Receta', mostrar);
//}

//si quiere agregarle una variable al enviar seria asi
//function getReceta(id) {
//    axiosCon('GET', 'Receta&id='+id, mostrar);
//}
//o tambien de esta menra
//const getReceta = (id) => {
//    axiosCon('GET', 'Receta?id='+id, mostrar);
//}
//mostrar es la funcion siguiente donde se almacenara la respuesta





