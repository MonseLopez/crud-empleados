from flask import render_template, request, redirect, url_for, jsonify
# En routes/empleados.py
from models.empleado import Empleado  # Importación directa desde models

from . import db

# Ruta para mostrar todos los empleados
@empleados_bp.route('/')
def lista_empleados():
    empleados = Empleado.query.all()
    return render_template('empleados/index.html', empleados=empleados)

# Ruta para mostrar el formulario de edición de empleado
@empleados_bp.route('/editar/<int:id>', methods=['GET'])
def editar_empleado(id):
    empleado = Empleado.query.get_or_404(id)
    return render_template('empleados/editar.html', empleado=empleado)

# Ruta para procesar la edición del empleado
@empleados_bp.route('/editar/<int:id>', methods=['POST'])
def actualizar_empleado(id):
    empleado = Empleado.query.get_or_404(id)

    try:
        # Obtener los nuevos valores del formulario
        nombre = request.form.get('nombre')
        rfc = request.form.get('rfc')
        telefono = request.form.get('telefono')
        cp = request.form.get('cp')

        # Validar los campos
        if not nombre or not rfc or not telefono or not cp:
            return jsonify({'success': False, 'error': 'Todos los campos son obligatorios'})

        # Actualizar los datos del empleado
        empleado.nombre = nombre
        empleado.rfc = rfc
        empleado.telefono = telefono
        empleado.cp = cp

        # Guardar los cambios en la base de datos
        db.session.commit()

        return jsonify({'success': True, 'message': 'Empleado actualizado correctamente'})

    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'error': str(e)})


# Ruta para eliminar un empleado
@empleados_bp.route('/eliminar/<int:id>', methods=['POST'])
def eliminar_empleado(id):
    try:
        empleado = Empleado.query.get_or_404(id)  # Obtener el empleado por ID
        db.session.delete(empleado)  # Eliminar el empleado
        db.session.commit()  # Guardar cambios

        return jsonify({'success': True, 'message': 'Empleado eliminado correctamente'})

    except Exception as e:
        db.session.rollback()  # Revertir cambios en caso de error
        return jsonify({'success': False, 'error': str(e)})
