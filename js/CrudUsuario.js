var idDefinida = null;
const BASE_URL = "https://appgizlorecords.herokuapp.com";

const setId = (id) => {
    idDefinida = id
    console.log(`Id: ${idDefinida}`)
}


const setDataFormUser = (id, name, email, password, estado) =>{
    setId(id);
    document.getElementById("edit-nombre").value = name;
    document.getElementById("edit-email").value = email;
    document.getElementById("edit-password").value = password;
    document.getElementById("edit-estado").value = estado;
}

const setEfectChange = ()=>{
    document.getElementById("respuesta").innerHTML = `
    <tr>
        <th colspan="6">
            <div class="container text-center">
                <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
          </div>
            </div>
        </th>
    </tr>
    `;
};

const updateUserById = async() => {
    var nmr_errors = 0;

    const URL = BASE_URL.concat(`/api/es/usuario/v1`);

    const user = JSON.stringify({
        "id": idDefinida,
        "nombreCompleto": document.getElementById("edit-nombre").value,
        "email": document.getElementById("edit-email").value,
        "contrasenia": document.getElementById("edit-password").value,
        "estado": document.getElementById("edit-estado").value
    });

    const options = {
        method: 'PUT',
        body: user,
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    };

    try{
        const response = await fetch(URL, options);
        console.log(response);

        if(response.status ===200){
            const datos = await response.json();
            console.log(datos);
        }

    }catch(error){
        console.log(`Error capturado${error}`)
    }finally{
        idDefinida = null;
        console.log(`[${nmr_errors}] Proceso finalizado`)
        getAllUsers();
    }
}


const deleteUserById = async() => {
    var nmr_errors = 0;
    const URL = BASE_URL.concat(`/api/es/usuario/v1/${idDefinida}`);

    console.log(`URL: ${URL}`);
    const user = JSON.stringify({
       
    });
    
    const options = {
        method: 'DELETE',
        body: user,
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    };

    try{
        const response = await fetch(URL, options);
        console.log(response);

        if(response.status === 200){
            const datos = await response.json();
            console.log(datos);
        }

    }catch(error){
        console.log(`Error capturado: ${error}`)
    }finally{
        idDefinida = null;
        console.log(`[${nmr_errors}] Proceso finalizado`)
        getAllUsers();
    }

}


const getAllUsers = async() =>{

    let respuesta = "";
    var nmr_errors = 0;
    try{
        const URL = BASE_URL.concat("/api/es/usuario/empresa/v1/1");
        const response = await fetch(URL);
        console.log(response);

        if(response.status === 200){
            const datos = await response.json();

            datos.forEach(item => {
                respuesta += `
                    <tr>
                        <th scope="row">${item.id}</th>
                        <td>${item.nombreCompleto}</td>
                        <td>${item.email}</td>
                        <td>${item.contrasenia}</td>
                        <td>${item.estado}</td>
                        <td>

                        <!-- start delete -->
                        <button class="btn btn-danger" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="setId('${item.id}')">
                            <i class="bi bi-trash-fill "></i>
                        </button>

                        <!-- start edit -->
                        <button class="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#form-edit" onclick="setDataFormUser('${item.id}', '${item.nombreCompleto}', '${item.email}', '${item.contrasenia}', '${item.estado}')">
                            <i class="bi bi-pencil-square"></i>
                        </button>

                        </td>
                    </tr>
                    
                    
                `;
                // console.log(item.id)
            });    
        }

        document.querySelector("#respuesta").innerHTML = `${respuesta}`;

    }catch(error){
        nmr_errors +=1;
        console.log(`Error: ${error}`);
    }finally{
        console.log(`[${nmr_errors}] Proceso finalizado`)
    }
};


const createUser = async() =>{
    let nmr_errors = 0;

    const URL = BASE_URL.concat("/api/es/usuario/v1");
    const user = JSON.stringify({
        "nombreCompleto": document.getElementById("crear-name").value,
        "email": document.getElementById("crear-email").value,
        "contrasenia": document.getElementById("crear-password").value,
        "estado": document.getElementById("crear-estado").value
    });

    const options = {
        method: 'POST',
        body: user,
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    };

    try{
        const response = await fetch(URL, options);
        console.log(response);
        
        if(response.status === 200){
            const datos = await response.json();
            console.log(datos);
        }

    }catch(error){
        error += 1;
        console.log(`Error Capturado: ${error}`);
    }finally{
        console.log(`[${nmr_errors}] Proceso finalizado`)
        getAllUsers();
    }
    
};


const getDataFormSeach = () => {
    const id = document.getElementById("busqueda").value;
    console.log(`Id Usuario: ${id}`);

    searchUserById(id);

};


const searchUserById = async(id_usuario) => {
    let respuesta = "";
    var nmr_errors = 0;
    const URL = BASE_URL.concat(`/api/es/usuario/id/v1/${id_usuario}`);
    
    try{
        const response = await fetch(URL);
        console.log(response);

        if(response.status === 200){
            const datos = await response.json();
            respuesta += `
                    <tr>
                    <th scope="row">${datos.id}</th>
                    <td>${datos.nombreCompleto}</td>
                    <td>${datos.email}</td>
                    <td>${datos.contrasenia}</td>
                    <td>${datos.estado}</td>
                    <td>

                    <!-- start delete -->
                    <button class="btn btn-danger" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="setId('${datos.id}')">
                        <i class="bi bi-trash-fill "></i>
                    </button>

                    <!-- start edit -->
                    <button class="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#form-edit" onclick="setDataFormUser('${datos.id}', '${datos.nombreCompleto}', '${datos.email}', '${datos.contrasenia}', '${datos.estado}')">
                        <i class="bi bi-pencil-square"></i>
                    </button>

                    </td>
                    </tr>

                    <tr>
                        <th colspan="6">
                            <div class="container text-center">
                                <button class="btn btn-outline-primary" style="color:black" onclick="getAllUsers()">Ver todos los usuarios</button>
                            </div>
                        </th>
                    </tr>
            `;

            document.querySelector("#respuesta").innerHTML = `${respuesta}`;
        }

    }catch(error){
        nmr_errors += 1;
        console.log(`Error Capturado: ${error}`)
    }finally{
        console.log(`[${nmr_errors}] Proceso Finalizado`)
    }

}

setEfectChange();
getAllUsers();
// setInterval(getAllUsers, 5000)