import { combineReducers } from "@reduxjs/toolkit";
import consultaSlice from "./consultaSlice";
import inicioSlice from "./inicioSlice";
import homeSlice from "./homeSlice";
import vencimientosSlice from "./vencimientosSlice";
import hospitalSlice from "./hospitalSlice";
import bibliotecaSlice from "./bibliotecaSlice";

export default combineReducers({
  consulta: consultaSlice,
  inicio: inicioSlice,
  home: homeSlice,
  vencimientos: vencimientosSlice,
  hospital: hospitalSlice,
  biblioteca: bibliotecaSlice
});
