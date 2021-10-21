var BaseUrl = "https://localhost:44337/api/";



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