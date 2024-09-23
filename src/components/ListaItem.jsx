import React, { useState } from 'react';

export default function ListaItem({
  id,
  nombre,
  onAlternarCompra,
  cantidadInicial = 1,
  maxCantidad = 20,
  onEliminar,
  notificarPadre = null,
  onActualizarNombreArticulo,
}) {
  const [cantidad, setCantidad] = useState(cantidadInicial);
  const [edicion, setEdicion] = useState(false);
  const [valorEdicion, setValorEdicion] = useState(nombre);

  function incrementar(e) {
    e.preventDefault();
    if (cantidad < maxCantidad) {
      const nuevaCantidad = cantidad + 1;
      setCantidad(nuevaCantidad);
      notificarPadre(id, nuevaCantidad);
    }
  }

  function disminuir(e) {
    e.preventDefault();
    if (cantidad > 0) {
      const nuevaCantidad = cantidad - 1;
      setCantidad(nuevaCantidad);
      notificarPadre(id, nuevaCantidad);
    }
  }

  function editar() {
    setEdicion(true);
  }

  function guardar() {
    setEdicion(false);
    onActualizarNombreArticulo(id, valorEdicion);
  }

  function CambioEdicion(e) {
    setValorEdicion(e.target.value);
  }

  return (
    <li className="list-item">
      {edicion ? (
        <>
          <input
            type="text"
            value={valorEdicion}
            onChange={CambioEdicion}
          />
          <button onClick={guardar}>Guardar</button>
        </>
      ) : (
        <>
          <label>{valorEdicion}</label>
          <button disabled={cantidad === 1} onClick={disminuir}>-</button>
          <input type="number" value={cantidad} readOnly />
          <button disabled={cantidad >= maxCantidad} onClick={incrementar}>+</button>
          <button onClick={editar}>Editar</button>
          <button onClick={onEliminar}>Eliminar</button>
          <input type="checkbox" checked={false} onChange={onAlternarCompra} />
        </>
      )}
    </li>
  );
}
