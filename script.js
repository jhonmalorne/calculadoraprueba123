document.addEventListener("DOMContentLoaded", function() {
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

    function agregarRegistro(nombre, watts, dias, total) {
        const registrosTable = document.getElementById("registrosTable").querySelector("tbody");
        const nuevaFila = document.createElement("tr");

        nuevaFila.innerHTML = `
            <td>${nombre}</td>
            <td>${watts.toFixed(2)}</td>
            <td>${dias}</td>
            <td>S/ ${total.toFixed(2)}</td>
            <td><button class="borrar-btn">Borrar</button></td>
        `;

        const borrarBtn = nuevaFila.querySelector(".borrar-btn");
        borrarBtn.addEventListener("click", function() {
            registrosTable.removeChild(nuevaFila);
        });

        registrosTable.appendChild(nuevaFila);
    }

    document.querySelector('button').addEventListener("click", calcularConsumo);
});
