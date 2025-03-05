document.addEventListener('DOMContentLoaded', function () {
    const mensajeDiv = document.getElementById('mensaje');

    // Validación del formulario de creación de empleado
    const formularioCrear = document.getElementById('formEmpleadoCrear');
    if (formularioCrear) {
        formularioCrear.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevenir el envío del formulario

            const nombre = document.getElementById('nombre').value.trim();
            const rfc = document.getElementById('rfc').value.trim();
            const telefono = document.getElementById('telefono').value.trim();
            const cp = document.getElementById('cp').value.trim();
            const genero = document.getElementById('genero').value;
            const areaTrabajo = document.getElementById('areaTrabajo').value;

            // Validar que no haya campos vacíos
            if (!nombre || !rfc || !telefono || !cp || !genero || !areaTrabajo) {
                mensajeDiv.textContent = 'Todos los campos son obligatorios.';
                mensajeDiv.style.color = 'red';
                mensajeDiv.style.display = 'block';
                return;
            }

            // Validación de teléfono: 10 dígitos numéricos
            const telefonoRegex = /^[0-9]{10}$/;
            if (!telefonoRegex.test(telefono)) {
                mensajeDiv.textContent = 'El teléfono debe tener 10 dígitos numéricos.';
                mensajeDiv.style.color = 'red';
                mensajeDiv.style.display = 'block';
                return;
            }

            // Validación de RFC: 12 caracteres
            if (rfc.length !== 12) {
                mensajeDiv.textContent = 'El RFC debe tener 12 caracteres.';
                mensajeDiv.style.color = 'red';
                mensajeDiv.style.display = 'block';
                return;
            }

            // Validación de código postal: 5 dígitos
            const cpRegex = /^[0-9]{5}$/;
            if (!cpRegex.test(cp)) {
                mensajeDiv.textContent = 'El Código Postal debe tener 5 dígitos.';
                mensajeDiv.style.color = 'red';
                mensajeDiv.style.display = 'block';
                return;
            }

            // Si todas las validaciones pasan, enviar el formulario
            const formData = new FormData(formularioCrear);
            fetch('/empleados/crear', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    mensajeDiv.textContent = 'Empleado creado correctamente';
                    mensajeDiv.style.color = 'green';
                    mensajeDiv.style.display = 'block';
                } else {
                    mensajeDiv.textContent = 'Error al crear el empleado: ' + data.error;
                    mensajeDiv.style.color = 'red';
                    mensajeDiv.style.display = 'block';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                mensajeDiv.textContent = 'Ocurrió un error al intentar crear el empleado';
                mensajeDiv.style.color = 'red';
                mensajeDiv.style.display = 'block';
            });
        });
    }

    // Función de validación para edición de empleados
    const formularioEditar = document.getElementById('formEmpleado');
    if (formularioEditar) {
        formularioEditar.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevenir el envío del formulario

            const nombre = document.getElementById('nombre').value.trim();
            const rfc = document.getElementById('rfc').value.trim();
            const telefono = document.getElementById('telefono').value.trim();
            const cp = document.getElementById('cp').value.trim();

            // Validar que no haya campos vacíos
            if (!nombre || !rfc || !telefono || !cp) {
                mensajeDiv.textContent = 'Todos los campos son obligatorios.';
                mensajeDiv.style.color = 'red';
                mensajeDiv.style.display = 'block';
                return;
            }

            // Validación de teléfono: 10 dígitos numéricos
            const telefonoRegex = /^[0-9]{10}$/;
            if (!telefonoRegex.test(telefono)) {
                mensajeDiv.textContent = 'El teléfono debe tener 10 dígitos numéricos.';
                mensajeDiv.style.color = 'red';
                mensajeDiv.style.display = 'block';
                return;
            }

            // Validación de RFC: 12 caracteres
            if (rfc.length !== 12) {
                mensajeDiv.textContent = 'El RFC debe tener 12 caracteres.';
                mensajeDiv.style.color = 'red';
                mensajeDiv.style.display = 'block';
                return;
            }

            // Validación de código postal: 5 dígitos
            const cpRegex = /^[0-9]{5}$/;
            if (!cpRegex.test(cp)) {
                mensajeDiv.textContent = 'El Código Postal debe tener 5 dígitos.';
                mensajeDiv.style.color = 'red';
                mensajeDiv.style.display = 'block';
                return;
            }

            // Si todas las validaciones pasan, enviar el formulario
            const formData = new FormData(formularioEditar);
            fetch(`/empleados/editar/${formularioEditar.querySelector('input[name="id"]').value}`, {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    mensajeDiv.textContent = 'Empleado actualizado correctamente';
                    mensajeDiv.style.color = 'green';
                    mensajeDiv.style.display = 'block';
                } else {
                    mensajeDiv.textContent = 'Error al actualizar el empleado: ' + data.error;
                    mensajeDiv.style.color = 'red';
                    mensajeDiv.style.display = 'block';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                mensajeDiv.textContent = 'Ocurrió un error al intentar actualizar el empleado';
                mensajeDiv.style.color = 'red';
                mensajeDiv.style.display = 'block';
            });
        });
    }
});
