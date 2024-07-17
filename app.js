//guardar id en el localstorage y convertirlo a string para luego utilizarlo desde la vista
function saveNoteId(id) {
  localStorage.clear();
  let idString = id.toString();//Convertir ID en cadena
  localStorage.setItem('notaId', idString); //ID enviado a localstorage
}

//-----------------------------------------------------------------------------------------------------------------------
let Notas = [];
//Hacer una petición mediante el metodo fetch a la base de datos luego pintarlas en el html por medio del template de js.
template_index = "";
fetch("http://localhost:5219/api/Notas")
  .then((r) => r.json())
  .then((data) => {
    console.log(data);
    if (Array.isArray(data)) {
      data.forEach((element) => {
        template_index += `
            <div class="col-md-3 col-sm-6 col-lg-3">
                <div class="card">
                    <div class="card-header">
                    <h4 class="card-title text-uppercase fw-bold">${element.title}</h4>
                    </div>
                    <div class="card-body">
                        <p class="card-text">${element.content}</p>
                    </div>
                    <div class="card-footer">
                        <p>${element.date}</p>
                    </div>
                    <div class="d-flex justify-content-center gap-2 mt-2">
                        <a href="./Actualizar.html" class="btn btn-primary mb-2">Editar</a>
                        <button class="btn btn-danger mb-2" onclick="eliminarNota(${element.id})">Eliminar</button>
                    </div>
                </div>
            </div>
          `;
      });
    } else {
      console.error("Data is not an array");
    }
    let nota = document.getElementById("notas");
    nota.innerHTML = template_index;
  });

//---------------------------------------------------------------------------------------------------------------------------------------

//Hacer una petición mediante el metodo fetch para crear notas en la base de datos
function crearNota() {
  let Title = document.getElementById("titulo").value;
  let Content = document.getElementById("contenido").value;
  let Date = document.getElementById("fecha").value;

  let nota = {
    title: Title,
    content: Content,
    date: Date
  };
  console.log(nota);
  fetch("http://localhost:5219/api/Notas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nota),
  })
    .then((r) => r.json())
    .then((data) => {
      console.log(data);
      location.href = "";
    })
    .catch((error) => {
      console.error("Error creando nota:", error);
      // Handle error (e.g., display error message to user)
    });
};

//--------------------------------------------------------------------------------------------------------------------------------------

//Hacer una petición mediante el metodo fetch para eliminar notas en la base de datos
function eliminarNota(id) {
  fetch(`http://localhost:5219/api/Notas/${id}`, {
    method: "DELETE",
  })
    .then((r) => r.json())
    .then((data) => {
      console.log(data);
      location.href = "";
    })
    .catch((error) => {
      console.error("Error eliminando nota:", error);
      // Handle error (e.g., display error message to user)
    });
};

//-----------------------------------------------------------------------------------------------------------------------------------------

//Hacer una petición fetch para buscar en la base de datos
/* let searchTerm = document.getElementById("search").value;
fetch(`http://localhost:5219/api/Notas/${searchTerm}`)
.then((r) => r.json())
.then((data) => {
  let resultados = data.filter(nota => nota.title.toLowerCase().includes(searchTerm.toLowerCase()) || nota.content.toLowerCase().includes(searchTerm.toLowerCase()));
  console.log(resultados);
  if (Array.isArray(data)) {
    data.forEach((element) => {
      let title = element.title
      let content = element.content
      let date = element.date
      let id = element.id

      template_index += `
          <div class="col-md-3 col-sm-6 col-lg-3">
              <div class="card">
                  <div class="card-header">
                  <h4 class="card-title text-uppercase fw-bold">${title}</h4>
                  </div>
                  <div class="card-body">
                      <p class="card-text">${content}</p>
                  </div>
                  <div class="card-footer">
                      <p>${date}</p>
                  </div>
                  <div class="d-flex justify-content-center gap-2 mt-2">
                      <a href="./Actualizar.html" class="btn btn-primary mb-2" onclick="saveNoteId(${id})">Editar</a>
                      <button class="btn btn-danger mb-2" onclick="eliminarNota(${id})">Eliminar</button>
                  </div>
              </div>
          </div>
        `;
    });
  }
  let nota = document.getElementById("notas");
  nota.innerHTML = template_index;
})
 */

function MostrarNotas(notas = Notas){
  var contenedorNotas = document.getElementById("notas");
  contenedorNotas.innerHTML = "";

  notas.forEach(nota => {
    let container = document.createElement("div");
    container.className = "col-md-4";
    container.id = `nota-${nota.id}`;
    container.innerHTML = `
    
        <div class="card">
            <div class="card-header">
            <h4 class="card-title text-uppercase fw-bold">${nota.title}</h4>
            </div>
            <div class="card-body">
                <p class="card-text">${nota.content}</p>
            </div>
            <div class="card-footer">
                <p>${nota.date}</p>
            </div>
            <div class="d-flex justify-content-center gap-2 mt-2">
                <a href="./Actualizar.html" class="btn btn-primary mb-2" >Editar</a>
                <button class="btn btn-danger mb-2" onclick="eliminarNota(${nota.id})">Eliminar</button>
            </div>
        </div>
  
  `;
  contenedorNotas.appendChild(container);
  })
}
  

function buscarNota() {
  var buscar = document.getElementById("search").value.toLowerCase();
  console.log("Término de búsqueda:", buscar);
  
  var notasFiltradas = Notas.filter(item => {
    console.log("Título de la nota:", item.title.toLowerCase());
    console.log("Contenido de la nota:", item.content.toLowerCase());
    return item.title.toLowerCase().includes(buscar) || item.content.toLowerCase().includes(buscar);
  });

  console.log("Notas filtradas:", notasFiltradas);
  
  MostrarNotas(notasFiltradas);
}





