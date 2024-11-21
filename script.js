function calcularConsumo() {
    const costoWatts = parseFloat(document.getElementById('costoWatts').value);
    const fechaInicio = new Date(document.getElementById('fechaInicio').value);
    const medidorInicio = parseFloat(document.getElementById('medidorInicio').value);
    const fechaActual = new Date(document.getElementById('fechaActual').value);
    const medidorActual = parseFloat(document.getElementById('medidorActual').value);

    if (isNaN(costoWatts) || isNaN(medidorInicio) || isNaN(medidorActual) || isNaN(fechaInicio.getTime()) || isNaN(fechaActual.getTime())) {
        alert('Por favor, ingrese todos los datos correctamente.');
        return;
    }

    const wattsConsumidos = medidorActual - medidorInicio;
    const tiempoTranscurrido = Math.round((fechaActual - fechaInicio) / (1000 * 60 * 60 * 24)); // Diferencia en días
    const totalPagar = wattsConsumidos * costoWatts;

    document.getElementById('wattsConsumidos').innerText = wattsConsumidos.toFixed(2);
    document.getElementById('diasTranscurridos').innerText = tiempoTranscurrido;
    document.getElementById('totalPagar').innerText = totalPagar.toFixed(2);
}
