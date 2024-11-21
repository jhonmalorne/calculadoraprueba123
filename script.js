function calcularConsumo() {
    console.log("Función calcularConsumo ejecutada");
    // Lógica de la función aquí
}
    // Obtener los valores de los inputs
    const nombreArrendado = document.getElementById("nombreArrendado").value;
    const costoWatts = parseFloat(document.getElementById("costoWatts").value);
    const fechaInicio = new Date(document.getElementById("fechaInicio").value);
    const medidorInicio = parseFloat(document.getElementById("medidorInicio").value);
    const fechaActual = new Date(document.getElementById("fechaActual").value);
    const medidorActual = parseFloat(document.getElementById("medidorActual").value);

    // Validar que todos los campos estén llenos y sean válidos
    if (!nombreArrendado || isNaN(costoWatts) || isNaN(medidorInicio) || isNaN(medidorActual) || isNaN(fechaInicio) || isNaN(fechaActual)) {
        alert("Por favor, completa todos los campos correctamente.");
        return;
    }

    // Calcular los días transcurridos
    const diferenciaTiempo = fechaActual - fechaInicio;
    const diasTranscurridos = Math.ceil(diferenciaTiempo / (1000 * 60 * 60 * 24)); // Convertir de milisegundos a días

    if (diasTranscurridos < 0) {
        alert("La fecha actual no puede ser anterior a la fecha de inicio.");
        return;
    }

    // Calcular el consumo y el total a pagar
    const wattsConsumidos = medidorActual - medidorInicio;
    if (wattsConsumidos < 0) {
        alert("Los datos del medidor actual no pueden ser menores que los del inicio.");
        return;
    }

    const totalPagar = wattsConsumidos * costoWatts;

    // Mostrar los resultados en la tabla
    document.getElementById("wattsConsumidos").textContent = wattsConsumidos.toFixed(2);
    document.getElementById("diasTranscurridos").textContent = diasTranscurridos;
    document.getElementById("totalPagar").textContent = `S/ ${totalPagar.toFixed(2)}`;
}
