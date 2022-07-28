const validarSession = async () => {
    let nmr_errors = 0;
    const user_email = document.getElementById("login-email").value;
    const user_pass = document.getElementById("login-password").value;
    const URL = `http://10.35.3.16:9898/api/es/usuario/v1/${user_email}/${user_pass}`;

    try{
        const response = await fetch(URL);
        console.log(response);
        
        if(response.status === 200){
            const datos = await response.json();
            console.log(datos);
            // window.location.replace("/html/home.html");

            if(datos.estado === "ACTIVO"){
                window.location.replace("/html/home.html");

            }
            
        }

    }catch(error){
        nmr_errors += 1;
        console.log(`Error Capturado: ${error}`);
    }finally{
        console.log(`[${nmr_errors}] Proceso finalizado`);
    }

};