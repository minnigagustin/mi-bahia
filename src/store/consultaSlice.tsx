import { AxiosLogged } from "@component/configs/AxiosConfig";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//import { Image, UserResponse } from "../../interfaces/Use-interface";
//import { AxiosRequest } from "../../../helpers/axiosInstance";
//import { Profile } from "../../interfaces/data-interface";
import axios from "axios";

export const checkBeneficiario = createAsyncThunk(
  "user/checkBeneficiario",
  async (data: any, { rejectWithValue }) => {
    try {
      const ben: any = await AxiosLogged.get(
        `ayudas_datos_personales/${data.documento}`
      );
      const grupo: any = await AxiosLogged.get(
        `grupo_familiar/${data.documento}`
      );
      const turnos: any = await AxiosLogged.get(
        `turnos_ayudas_sociales/${data.documento}`
      );
      const servicios: any = await AxiosLogged.get(
        `servicios_publicos/${data.documento}`
      );
      const ayudas: any = await AxiosLogged.get(
        `ayudas/${data.documento}`
      );

      const hacinamiento: any = await AxiosLogged.get(
        `hacinamiento_por_dni/${data.documento}`
      );

      const materiales: any = await AxiosLogged.get(
        `calidad_materiales_casa_por_dni/${data.documento}`
      );

      const instituciones: any = await AxiosLogged.get(
        `instituciones_por_dni/${data.documento}`
      );

      const vivienda: any = await AxiosLogged.get(
        `estado_casa_por_dni/${data.documento}`
      );

      const general = {
        beneficiario: {},
        grupo: [],
        turnos: [],
        servicios: {},
        ayudas: [],
        hacinamiento: {},
        materiales: {},
        instituciones: [],
        vivienda: {},
      };

      general.beneficiario = ben.data[0];
      general.grupo = grupo.data;
      general.turnos = turnos.data;
      general.servicios = servicios.data[0];
      general.ayudas = ayudas.data;
      general.hacinamiento = hacinamiento.data[0];
      general.materiales = materiales.data[0];
      general.instituciones = instituciones.data;
      general.vivienda = vivienda.data[0];

      //@ts-ignore
      //@ts-ignore
      return general;
    } catch (error: any) {
      console.log(error.response.data, "falle aqui");
      return rejectWithValue(error);
    }
  }
);

export const getCalles = createAsyncThunk(
  "user/getCalles",
  async (_, { rejectWithValue }) => {
    try {
      const response: any = await AxiosLogged.get(
        `calles/`
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

export const getUsersDireccion = createAsyncThunk(
  "user/getUsersDireccion",
  async (data: any, { rejectWithValue }) => {
    try {
      const response: any = await AxiosLogged.get(
        `consulta_beneficiario_codigo_calle/${data}`
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

export const getUsersNombre = createAsyncThunk(
  "user/getUsersNombre",
  async (data: any, { rejectWithValue }) => {
    try {
      if (data.nombre !== "" && data.apellido !== "") {
        const response: any = await AxiosLogged.get(
          `consulta_beneficiario_apellido_nombre/an/${data.apellido}/${data.nombre}`
        );
        //@ts-ignore
        //@ts-ignore
        return response.data;
      } else if (data.nombre !== "" && data.apellido === "") {
        const response: any = await AxiosLogged.get(
          `consulta_beneficiario_apellido_nombre/nombre/${data.nombre}`
        );
        //@ts-ignore
        //@ts-ignore
        return response.data;
      } else {
        const response: any = await AxiosLogged.get(
          `consulta_beneficiario_apellido_nombre/apellido/${data.apellido}`
        );
        //@ts-ignore
        //@ts-ignore
        return response.data;
      }
    } catch (error: any) {
      console.log(error.response.data, "falle aqui");
      return rejectWithValue(error);
    }
  }
);

export const atencionMedicaGet = createAsyncThunk(
  "user/atencionMedica",
  async (data: any, { rejectWithValue }) => {
    try {
      const response: any = await AxiosLogged.get(
        `turnos_ayudas_sociales/${data.documento}`
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
  loadingUsers: boolean;
  changeusername: boolean;
  changepassword: boolean;
  user: {
    Nombre: string;
    Apellido: string;
    NumeroDocumento: number;
    Calle: string;
    Altura: number;
    Barrio: string;
  };

  error: {
    status?: number;
    message: string;
    isPinError?: boolean;
  };
  locations?: any;
  grupoFamiliar?: any;
  atencionMedica?: any;
  servicios?: any;
  ayudas?: any;
  hacinamiento?: any;
  materiales?: any;
  instituciones?: any;
  calles?: any;
  vivienda?: any;
  users?: any;
}

const initialState: Pros = {
  loading: false,
  loadingUsers: false,
  changeusername: false,
  changepassword: false,
  user: {
    Nombre: "",
    Apellido: "",
    NumeroDocumento: 0,
    Calle: "",
    Altura: 0,
    Barrio: "",
  },
  error: {
    status: 0,
    message: "",
    isPinError: false,
  },
  locations: [],
  grupoFamiliar: [],
  atencionMedica: [],
  ayudas: [],
  servicios: {},
  hacinamiento: {},
  materiales: {},
  instituciones: [],
  calles: [],
  vivienda: {},
  users: [],
};

const consultaSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(checkBeneficiario.pending, (state) => {
      Object.assign(state, initialState);
      state.loading = true;


    });
    builder.addCase(checkBeneficiario.fulfilled, (state, { payload }) => {
      state.loading = false;
      //@ts-ignore
      state.user = payload.beneficiario;
      state.grupoFamiliar = payload.grupo;
      state.atencionMedica = payload.turnos;
      state.servicios = payload.servicios ? payload.servicios : {};
      state.hacinamiento = payload.hacinamiento ? payload.hacinamiento : {};
      state.materiales = payload.materiales ? payload.materiales : {};
      state.ayudas = payload.ayudas;
      state.instituciones = payload.instituciones;
      state.vivienda = payload.vivienda ? payload.vivienda : {};
      state.error = { message: "" };
    });
    builder.addCase(checkBeneficiario.rejected, (state, action: any) => {
      state.loading = false;
      state.error = {
        message: "Hubo un error",
      };
      console.log(action.error.message);
    });
    builder.addCase(getCalles.pending, (state) => {
    });
    builder.addCase(getCalles.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.calles = payload;
    });
    builder.addCase(getCalles.rejected, (state, action: any) => {
      state.loading = false;
      console.log(action);

      state.error = {
        message: "Hubo un error",
      };
      console.log(action.error.message);
    });
    builder.addCase(getUsersDireccion.pending, (state) => {
      state.loadingUsers = true;
    });
    builder.addCase(getUsersDireccion.fulfilled, (state, { payload }) => {
      state.loadingUsers = false;
      state.users = payload;
    });
    builder.addCase(getUsersDireccion.rejected, (state, action: any) => {
      state.loadingUsers = false;
      console.log(action);

      state.error = {
        message: "Hubo un error",
      };
      console.log(action.error.message);
    });
    builder.addCase(getUsersNombre.pending, (state) => {
      state.loadingUsers = true;
    });
    builder.addCase(getUsersNombre.fulfilled, (state, { payload }) => {
      state.loadingUsers = false;
      state.users = payload;
    });
    builder.addCase(getUsersNombre.rejected, (state, action: any) => {
      state.loadingUsers = false;
      console.log(action);

      state.error = {
        message: "Hubo un error",
      };
      console.log(action.error.message);
    });
    builder.addCase(atencionMedicaGet.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(atencionMedicaGet.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.atencionMedica = payload;
    });
    builder.addCase(atencionMedicaGet.rejected, (state, action: any) => {
      state.loading = false;
      console.log(action);

      state.error = {
        message: "Hubo un error",
      };
      console.log(action.error.message);
    });
  },
});

export default consultaSlice.reducer;
