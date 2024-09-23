import React from 'react';

export default function ListaComprados({ articulos, onDesmarcar }) {
  return (
    <ul>
      {articulos.map(function(articulo) {
        return (
          <li key={articulo.id}>
            <input
              type="checkbox"
              checked
              onChange={function() {
                onDesmarcar(articulo.id);
              }}
            />
            <span style={{ textDecoration: 'line-through' }}>{articulo.nombre}</span>
          </li>
        );
      })}
    </ul>
  );
}
