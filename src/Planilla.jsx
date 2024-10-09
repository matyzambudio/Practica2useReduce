import "./App2.css";
import { useState, useReducer } from "react";

const type = {
  suma: "suma",
  resta: "resta",
  eliminar:"eliminar"
};

const valorInicial = [
  { id: 1, nombre: "Mayonesa", cantidad: 1 },
  { id: 2, nombre: "Ketchup", cantidad: 2 },
  { id: 3, nombre: "Savora", cantidad: 15 },
];

const reducer = (state, action) => {
  switch (action.type) {
    case type.suma:
        return state.map((art,index)=> //recorrermos el stado actual
         index === action.payload ? 
         {...art,cantidad: art.cantidad + 1} 
         // si index es igual al (id) que pasamos agregamos al art la cantidadactual + 1
         : art
        )
        case type.resta:
            return state.map((art,index)=>
             index === action.payload 
            ? {...art, cantidad: art.cantidad - 1}
            : art
            )
        case type.eliminar:
            return state.filter((_,index)=>
             index !== action.payload)
        case type.agregar:
          
        return state;
  }
  return state;
};

export default function Planilla() {
  const [unidad, dispatch] = useReducer(reducer, valorInicial);
  const [producto, setProducto] = useState("");
  
  const cambio = (e) => {
    setProducto(e.target.value);
  };

 
  return (
    <div className="container">
      <div className="menu1">
        <label htmlFor="pro">Producto:</label>
        <input id="pro" type="text" value={producto} onChange={cambio} />

        <button className="agre" >Agregar</button>
      </div>
      <div className="hoja">
      
        {unidad.map((art, id) => (
          <div key={art.id} className="unidad">
           
            <h1>{art.nombre}</h1>
            <h3>( Cantidad: {art.cantidad} unidades )</h3>
            <div>
              <button onClick={()=> dispatch({type:type.resta,payload:id})}>-</button>
              <button
                onClick={() => dispatch({ type: type.suma, payload: id })}> + </button>
              <button
              onClick={()=>dispatch({type : type.eliminar , payload:id})}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
