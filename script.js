document.addEventListener("DOMContentLoaded", function () {
    const registrosTable = document.getElementById("registrosTable").querySelector("tbody");

    // Cargar registros almacenados en Local Storage al cargar la página
    function cargarRegistros() {
        const registrosGuardados = localStorage.getItem("registros");
        if (registrosGuardados) {
            const registros = JSON.parse(registrosGuardados);
            registros.forEach(registro => agregarRegistro(registro.nombre, registro.watts, registro.dias, registro.total, false));
        }
    }

    // Guardar registros en Local Storage
    function guardarRegistros() {
        const filas = Array.from(registrosTable.querySelectorAll("tr"));
        const registros = filas.map(fila => {
            const columnas = fila.querySelectorAll("td");
            return {
                nombre: columnas[0].textContent,
                watts: parseFloat(columnas[1].textContent),
                dias: parseInt(columnas[2].textContent),
                total: parseFloat(columnas[3].textContent.replace("S/ ", ""))
            };
        });
        localStorage.setItem("registros", JSON.stringify(registros));
    }

    function agregarRegistro(nombre, watts, dias, total, guardar = true) {
        const nuevaFila = document.createElement("tr");

        nuevaFila.innerHTML = `
            <td>${nombre}</td>
            <td>${watts.toFixed(2)}</td>
            <td>${dias}</td>
            <td>S/ ${total.toFixed(2)}</td>
            <td><button class="borrar-btn">Borrar</button></td>
        `;

        const borrarBtn = nuevaFila.querySelector(".borrar-btn");
        borrarBtn.addEventListener("click", function () {
            registrosTable.removeChild(nuevaFila);
            guardarRegistros(); // Actualizar el Local Storage al borrar un registro
        });

        registrosTable.appendChild(nuevaFila);

        if (guardar) {
            guardarRegistros(); // Guardar en Local Storage al agregar un nuevo registro
        }
    }

    function calcularConsumo() {
        const nombreArrendado = document.getElementById("nombreArrendado").value;
        const costoWatts = parseFloat(document.getElementById("costoWatts").value);
        const fechaInicio = new Date(document.getElementById("fechaInicio").value);
        const medidorInicio = parseFloat(document.getElementById("medidorInicio").value);
        const fechaActual = new Date(document.getElementById("fechaActual").value);
        const medidorActual = parseFloat(document.getElementById("medidorActual").value);

        if (!nombreArrendado || isNaN(costoWatts) || isNaN(medidorInicio) || isNaN(medidorActual) || isNaN(fechaInicio) || isNaN(fechaActual)) {
            alert("Por favor, completa todos los campos correctamente.");
            return;
        }

        const diferenciaTiempo = fechaActual - fechaInicio;
        const diasTranscurridos = Math.ceil(diferenciaTiempo / (1000 * 60 * 60 * 24));
        if (diasTranscurridos < 0) {
            alert("La fecha actual no puede ser anterior a la fecha de inicio.");
            return;
        }

        const wattsConsumidos = medidorActual - medidorInicio;
        if (wattsConsumidos < 0) {
            alert("Los datos del medidor actual no pueden ser menores que los del inicio.");
            return;
        }

        const totalPagar = wattsConsumidos * costoWatts;

        document.getElementById("wattsConsumidos").textContent = wattsConsumidos.toFixed(2);
        document.getElementById("diasTranscurridos").textContent = diasTranscurridos;
        document.getElementById("totalPagar").textContent = `S/ ${totalPagar.toFixed(2)}`;

        agregarRegistro(nombreArrendado, wattsConsumidos, diasTranscurridos, totalPagar);
    }

    // Cargar los registros al iniciar
    cargarRegistros();

    // Agregar evento al botón Calcular
    document.querySelector("button").addEventListener("click", calcularConsumo);
});
