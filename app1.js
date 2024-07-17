//llamar el id del localstorage y convertirlo a int
id = localStorage.getItem("notaId");
console.log(id);

//------------------------------------------------------------------------------------------

//función para llenar la nota con la información que se va a modificar
fetch(`http://localhost:5219/api/Notas/${id}`)
    .then((r) => r.json())
    .then((data) => {
        console.log(data);
        console.log(id);
        document.getElementById("titulo_edit").value = data.title;
        document.getElementById("contenido_edit").value = data.content;
        document.getElementById("fecha_edit").value = data.date;
        document.getElementById("id_edit").value = data.id;
    })
    .catch((error) => {
        console.error("Error llenando nota:", error);
        // Handle error (e.g., display error message to user)
    });

//--------------------------------------------------------------------------------------------

//Hacer una petición mediante el metodo fetch para actualizar notas en la base de datos
function actualizarNota() {
    let Title = document.getElementById("titulo_edit").value;
    let Content = document.getElementById("contenido_edit").value;
    let Date = document.getElementById("fecha_edit").value;

    let nota = {
        title: Title,
        content: Content,
        date: Date
    };
    console.log(nota);
    fetch(`http://localhost:5219/api/Notas/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(nota),
    })
        .then((r) => r.json())
        .then((data) => {
            console.log(data);
            location.href = "./Index.html";
        })
        .catch((error) => {
            console.error("Error actualizando nota:", error);
            // Handle error (e.g., display error message to user)
        });
}