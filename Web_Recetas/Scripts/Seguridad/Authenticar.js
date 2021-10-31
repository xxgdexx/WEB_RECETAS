function axiosCon(t, u, m) {
    var axiosConfig = {
        method: t,
        url: u,
    };
    axios(axiosConfig)
        .then(res => {
            m(res);
        })
        .catch(err => {
            Swal.fire('Error', err.toString(), 'error');
        });
}






txtLogin.onclick = function () {

    console.log("Ingreso");

    let correo = document.getElementById("txtEmail");
    let contrasena = document.getElementById("txtPassword");

    axiosCon("GET", "AuthenticarLogin?correo=" + correo.value + "&clave=" + contrasena.value, rpta);
}




function rpta(r) {
    console.log(r);
    console.log(r.data);
    let x = r.data;

    localStorage.removeItem("Usuario");

    if (x.ID_Usuario==0) {
        Swal.fire('Error', "Correo u/o Clave no encontrada", 'error');
    } else{
        Swal.fire({
            //position: 'top-end',
            icon: 'success',
            title: 'Conectado',
            showConfirmButton: false,
            timer: 2500
        })
        localStorage.setItem("Usuario", JSON.stringify(x));
        setTimeout(() => {   
        window.location.href = '/';
        },2000);
 
    }
}