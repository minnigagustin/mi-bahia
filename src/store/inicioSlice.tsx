import { AxiosLogged } from "@component/configs/AxiosConfig";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//import { Image, UserResponse } from "../../interfaces/Use-interface";
//import { AxiosRequest } from "../../../helpers/axiosInstance";
//import { Profile } from "../../interfaces/data-interface";
import axios from "axios";

export const personasRegistradas = createAsyncThunk(
  "user/personas/registradas",
  async (data: any, { rejectWithValue }) => {
    try {
      const response: any = await AxiosLogged.get(
        `/ayudas_registradas/${data.mes}&${data.anio}`
      );
      const responseayudas: any = await AxiosLogged.get(
        `ayudas_prestaciones/${data.mes}&${data.anio}`
      );
      const responsegrupos: any = await AxiosLogged.get(
        `cantidad_grupo_familiares`
      );
      const responseintervenciones: any = await AxiosLogged.get(
        `intervenciones_familiares/${data.mes}&${data.anio}`
      );
      //@ts-ignore
      const responsegeneral = {
        ayudas: response.data[0],
        prestaciones: responseayudas.data,
        grupos: responsegrupos.data[0],
        intervenciones: responseintervenciones.data[0]
      }
      console.log(responsegeneral);
      //@ts-ignore
      return responsegeneral;
    } catch (error: any) {
      console.log(error.response.data, "falle aqui");
      return rejectWithValue(error);
    }
  }
);

export const prestacionesGet = createAsyncThunk(
  "user/prestaciones",
  async (data: any, { rejectWithValue }) => {
    try {
      const response: any = await AxiosLogged.get(
        `ayudas_prestaciones/3&2023`
      );
      //@ts-ignore
      //@ts-ignore
      return response.data;
    } catch (error: any) {
      console.log(error.response.data, "falle aqui");
      return rejectWithValue(error);
    }
  }
);

export const gruposGet = createAsyncThunk(
  "user/grupos",
  async (_, { rejectWithValue }) => {
    try {
      const response: any = await AxiosLogged.get(
        `cantidad_grupo_familiares`
      );
      //@ts-ignore
      //@ts-ignore
      return response.data[0];
    } catch (error: any) {
      console.log(error.response.data, "falle aqui");
      return rejectWithValue(error);
    }
  }
);

export const intervencionesGet = createAsyncThunk(
  "user/intervenciones",
  async (_, { rejectWithValue }) => {
    try {
      const response: any = await AxiosLogged.get(
        `intervenciones_familiares/3&2023`
      );
      //@ts-ignore
      //@ts-ignore
      return response.data[0];
    } catch (error: any) {
      console.log(error.response.data, "falle aqui");
      return rejectWithValue(error);
    }
  }
);
/* 
export const changePass = createAsyncThunk(
  "user/changePassword",
  async (data: any, { rejectWithValue }) => {
    try {
      const response: any = await AxiosRequest.put("/api/security/change/password", data);
      //@ts-ignore
      return response.data;
    } catch (error: any) {
      console.log(error.response.data, "falle aqui");
      return rejectWithValue(error.response.data);
    }
  }
);

export const changeProfileImage = createAsyncThunk(
  "user/changeProfileImage",
  async (data: any, { rejectWithValue }) => {
    try {
      const image = `data:image/jpg;base64,${data.base64}`;
      console.log(image);
      const response: any = await AxiosRequest.post("/api/user/profile_picture", { file: image });
      console.log('funciono');
      //@ts-ignore
      return response.data;
    } catch (error: any) {
      console.log(error, "falle aqui");
      return rejectWithValue(error.response.data);
    }
  }
); */

interface Pros {
  loading: boolean;
  personasregistradas: number;
  gruposfamiliares: number;
  intervenciones: number;
  prestacionesregistradas: any;
  error: {
    status?: number;
    message: string;
    isPinError?: boolean;
  };
}

const initialState: Pros = {
  loading: false,
  personasregistradas: 0,
  gruposfamiliares: 0,
  intervenciones: 0,
  prestacionesregistradas: [],
  error: {
    status: 0,
    message: "",
    isPinError: false,
  },
};

const inicioSlice = createSlice({
  name: "inicio",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(personasRegistradas.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(personasRegistradas.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.personasregistradas = payload.ayudas.Cantidad;
      state.intervenciones = payload.intervenciones.Intervisiones;
      state.prestacionesregistradas = payload.prestaciones;
      state.gruposfamiliares = payload.grupos.CGF;


    });
    builder.addCase(personasRegistradas.rejected, (state, action: any) => {
      state.loading = false;
      console.log(action);

      state.error = {
        message: "Hubo un error",
      };
      console.log(action.error.message);
    });
    builder.addCase(intervencionesGet.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(intervencionesGet.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.intervenciones = payload.Intervisiones;
    });
    builder.addCase(intervencionesGet.rejected, (state, action: any) => {
      state.loading = false;
      console.log(action);

      state.error = {
        message: "Hubo un error",
      };
      console.log(action.error.message);
    });
    builder.addCase(prestacionesGet.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(prestacionesGet.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.prestacionesregistradas = payload;
    });
    builder.addCase(prestacionesGet.rejected, (state, action: any) => {
      state.loading = false;
      console.log(action);

      state.error = {
        message: "Hubo un error",
      };
      console.log(action.error.message);
    });
    builder.addCase(gruposGet.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(gruposGet.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.gruposfamiliares = payload.CGF;
    });
    builder.addCase(gruposGet.rejected, (state, action: any) => {
      state.loading = false;
      console.log(action);

      state.error = {
        message: "Hubo un error",
      };
      console.log(action.error.message);
    });
  },
});

export default inicioSlice.reducer;
