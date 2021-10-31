var BaseUrl = "https://localhost:44337/api/";

var logout = document.getElementById("logout");

function axiosCon(t, u, m) {
    var axiosConfig = {
        method: t,
        url: BaseUrl + u,
        crossdomain: true,
        //headers: {
        //    "Content-Type": "application/x-www-form-urlencoded",
        //    "Authorization": "Bearer " + localStorage.token
        //}
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            "Access-Control-Allow-Origin": "*",
            //'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
            //'Access-Control-Allow-Origin': '*'
        },
      
    };
    axios(axiosConfig)
        .then(res => {
            m(res);
        })
        .catch(err => {
            Swal.fire('Error', err.toString(), 'error');
        });
}





logout.onclick = () => {
    localStorage.removeItem("Usuario");
    console.log("salir");
}
//const DataGet = (ApiController) => {
//    axiosCon('GET', ApiController, (r) => {
//        console.log(r);
//        return  r.data;
//    });
//}

function GetData(controlador, metodo) {
    axiosCon("GET", controlador, metodo);
}

function Lista(data, combo, obj,select) {
    $("#" + combo + "").html("");
    let str = "";
    str += `<option value="">` + select + `</option>`;
    if (data.length > 0) {
        for (i = 0; i < data.length; i++) {
            str += `<option value="` + data[i][obj[0]] + `">` + data[i][obj[1]] + `</option>`;
        }
    }
    $("#" + combo + "").html(str);
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





