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


