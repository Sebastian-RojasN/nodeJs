$(document).ready(function() {
    const tablaDatos = $('#tablaDatos');
    const filtroForm = $('#filtroForm');

    // Función para obtener los datos desde la API y crear las filas de la tabla
    const obtenerDatos = () => {
        $.ajax({
            url: 'http://localhost:3000/',
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                // Vaciar la tabla antes de agregar nuevos datos
                tablaDatos.find('tbody').empty();

                // Filtrar los datos si se han ingresado valores en los filtros
                const filtroNombre = filtroForm.find('#filtroNombre').val().trim().toLowerCase();
                const filtroGroupName = filtroForm.find('#filtroGroupName').val().trim().toLowerCase();
                const filtroStartDate = filtroForm.find('#filtroStartDate').val().trim();
                const filtroEndDate = filtroForm.find('#filtroEndDate').val().trim();
                let datosFiltrados = data;

                if (filtroNombre !== '') {
                    datosFiltrados = datosFiltrados.filter(item => {
                        return item.name.toLowerCase().includes(filtroNombre);
                    });
                }

                if (filtroGroupName !== '') {
                    datosFiltrados = datosFiltrados.filter(item => {
                        return item.groupname.toLowerCase().includes(filtroGroupName);
                    });
                }

                if (filtroStartDate !== '') {
                    datosFiltrados = datosFiltrados.filter(item => {
                        return item.startdate.includes(filtroStartDate);
                    });
                }

                if (filtroEndDate !== '') {
                    datosFiltrados = datosFiltrados.filter(item => {
                        return item.enddate ? item.enddate.includes(filtroEndDate) : false;
                    });
                }

                // Limitar la cantidad de filas a mostrar (para que no se quede pegado)
                const filasAMostrar = 1000000;
                datosFiltrados = datosFiltrados.slice(0, filasAMostrar);

                // Agregar las filas a la tabla con los datos filtrados de la API
                datosFiltrados.forEach(item => {
                    const fila = $('<tr></tr>');
                    fila.append(`<td>${item.departmentid}</td>`);
                    fila.append(`<td>${item.name}</td>`);
                    fila.append(`<td>${item.groupname}</td>`);
                    fila.append(`<td>${item.startdate}</td>`);
                    fila.append(`<td>${item.businessentityid}</td>`);
                    //MOSTRAR EN CASO DE SER NECESARIO
                    // fila.append(`<td>${item.enddate || 'N/A'}</td>`);

                    tablaDatos.find('tbody').append(fila);
                });
            },
            error: function(xhr, status, error) {
                console.error('Error al obtener los datos:', error);
            }
        });
    };

    // Llama a la función para obtener y mostrar los datos al cargar la página
    obtenerDatos();

    // Agrega un evento al formulario para detectar cambios en los filtros
    filtroForm.on('submit', function(e) {
        e.preventDefault();
        obtenerDatos();
    });
});
