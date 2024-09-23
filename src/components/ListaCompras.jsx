import React, { useState } from 'react';
import ListaItem from './ListaItem';
import ListaComprados from './ListaComprados';

export function ListaCompras() {
  const [valorEntrada, setValorEntrada] = useState('');
  const [articulos, setArticulos] = useState([]);
  const [proxId, setProxId] = useState(1);

  function CambioEntrada(evento) { 
    setValorEntrada(evento.target.value);
  }

  function agregarArticulo() {
    if (valorEntrada.trim() !== '') {
      setArticulos([...articulos, { id: proxId, nombre: valorEntrada, cantidad: 1, comprado: false }]);
      setValorEntrada('');
      setProxId(proxId + 1); 
    } else {
      alert('Por favor, ingrese un artículo.');
    }
  }

  function eliminarArticulo(id) {
    const nuevosArticulos = articulos.filter(function(articulo) {
      return articulo.id !== id;
    });
    setArticulos(nuevosArticulos);
  }

  function alternarCompra(id) {
    const nuevosArticulos = articulos.map(function(articulo) {
      if (articulo.id === id) {
        return { ...articulo, comprado: !articulo.comprado };
      }
      return articulo;
    });

    const compradosAlFinal = nuevosArticulos.sort(function(a, b) {
      return a.comprado - b.comprado;
    });
    setArticulos(compradosAlFinal);
  }

  function notificarPadre(id, nuevaCantidad) {
    const nuevosArticulos = articulos.map(function(articulo) {
      if (articulo.id === id) {
        return { ...articulo, cantidad: nuevaCantidad };
      }
      return articulo;
    });
    setArticulos(nuevosArticulos);
  }

  function actualizarNombreArticulo(id, nuevoNombre) {
    const nuevosArticulos = articulos.map(function(articulo) {
      if (articulo.id === id) {
        return { ...articulo, nombre: nuevoNombre };
      }
      return articulo;
    });
    setArticulos(nuevosArticulos);
  }

  return (
    <div>
      <label>
        Ingrese un artículo:
        <input type="text" value={valorEntrada} onChange={CambioEntrada} />
      </label>
      <button onClick={agregarArticulo}>Agregar</button>

      <ul>
        {articulos.filter(function(articulo) { return !articulo.comprado; }).map(function(articulo) {
          return (
            <ListaItem
              key={articulo.id}
              id={articulo.id}
              nombre={articulo.nombre}
              cantidadInicial={articulo.cantidad}
              notificarPadre={notificarPadre}
              onEliminar={function() { eliminarArticulo(articulo.id); }}
              onAlternarCompra={function() { alternarCompra(articulo.id); }}
              onActualizarNombreArticulo={actualizarNombreArticulo} 
            />
          );
        })}
      </ul>

      <ListaComprados 
        articulos={articulos.filter(function(articulo) { return articulo.comprado; })}
        onDesmarcar={alternarCompra}
      />
    </div>
  );
}
