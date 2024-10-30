import "./App.css";
import { useReducer, useState } from "react";

const type = { suma: "suma", resta: "resta" };

const articulos = [
  {
    foto: "https://atomoconviene.com/atomo-ecommerce/66302-large_default/gaseosas-secco-tonica-2250-cc--.jpg",
    nombre: "Secco Tonica",
    cantidad: 0,
  },
  {
    foto: "https://atomoconviene.com/atomo-ecommerce/65295-home_default/gaseosa-diet-coca-cola-sin-azucar-1500-cc--.jpg",
    nombre: "Coca Cola Sin Azucar 1500ml",
    cantidad: 0,
  },
  {
    foto: "https://atomoconviene.com/atomo-ecommerce/65299-home_default/gaseosa-diet-coca-cola-s-azucar-310-cc--.jpg",
    nombre: "Gaseosa Diet Sin Azucar 330CC",
    cantidad: 0,
  },
  {
    foto: "https://atomoconviene.com/atomo-ecommerce/67007-home_default/gaseosa-diet-pepsi-black-500-cc--.jpg",
    nombre: "Pepsi Black 500cc",
    cantidad: 0,
  },
  {
    foto: "https://atomoconviene.com/atomo-ecommerce/66241-home_default/gaseosas-pepsi---3000-cc--.jpg",
    nombre: "Pepsi 3000CC",
    cantidad: 0,
  },
  {
    foto: "https://atomoconviene.com/atomo-ecommerce/66283-home_default/gaseosa-diet-sprite-zero-2250-cc--.jpg",
    nombre: "Sprite Zero 2250CC",
    cantidad: 0,
  },
  {
    foto: "https://atomoconviene.com/atomo-ecommerce/66288-home_default/gaseosas-fanta-naranja-2250-cc--.jpg",
    nombre: "Fanta Naranja 2250CC",
    cantidad: 0,
  },
];

const reductor = (state, action) => {
  switch (action.type) {
    case type.suma:
      return state.map((art) =>
        art.nombre === action.nombre && art.cantidad >= 0
          ? { ...art, cantidad: art.cantidad + 1 }
          : art
      );
    case type.resta:
      return state.map((art) =>
        art.nombre === action.nombre && art.cantidad > 0
          ? { ...art, cantidad: art.cantidad - 1 }
          : art
      );
    default:
      return state;
  }
};

const Planilla = () => {
  const [mercaderia, dispatch] = useReducer(reductor, articulos);
  const [carrito, setCarrito] = useState([""]);

  const agregarnew = (nombre) => {
    const articulo = mercaderia.find((art) => art.nombre === nombre);

    if (articulo && articulo.cantidad > 0) {
      
      const articuloencarrito = carrito.find(
        (art) => art.nombre === articulo.nombre
      );

      if (articuloencarrito) {
        setCarrito((prev) => {
        return  prev.map((prod) =>
                prod.nombre === articulo.nombre
                       ? { ...prod, cantidad: prod.cantidad + articulo.cantidad }
                       : prod
          );
        });
      } else {
        setCarrito((prev) => [
          ...prev,
          {
            prev,
            foto: articulo.foto,
            nombre: articulo.nombre,
            cantidad: articulo.cantidad,
          },
        ]);
      }
    }
  };

  const quitarlo = (nombre) => {
    setCarrito((prev) =>
      prev.filter((art) => art.nombre !== nombre)
    );
  };
  return (
    <div>
      <div className="menu">
        {mercaderia.map((mer, i) => (
          <div className="card" key={i}>
            <div>
              <img src={mer.foto} style={{ width: "140px", height: "120px" }} />
            </div>
            <h1>{mer.nombre}</h1>
            <h2>{mer.cantidad}</h2>
            <div>
              <button className="verde"onClick={() =>dispatch({ type: type.suma, nombre: mer.nombre })}>
                     + </button>
              <button className="rojo" onClick={()=>dispatch({ type: type.resta, nombre: mer.nombre })
                }> - </button>
              <button onClick={() => agregarnew(mer.nombre)}>Agregar</button>
             
            </div>
          </div>
        ))}
      </div>
      <div>
        <div>
          {carrito.map((art, i) => (
            <div key={i} className="artcarrito">
              <div>
                <img src={art.foto} style={{ width: "50px" }} />
              </div>
              <h1>{art.nombre}</h1>
              <h2>{art.cantidad}</h2>
              <button onClick={()=> quitarlo(art.nombre)}>Quitar</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Planilla;
