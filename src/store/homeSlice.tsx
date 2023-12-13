import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//import { Image, UserResponse } from "../../interfaces/Use-interface";
//import { AxiosRequest } from "../../../helpers/axiosInstance";
//import { Profile } from "../../interfaces/data-interface";

import axios from "axios";


export const getVencimientoLicencia = createAsyncThunk(
    "home/licencias",
    async (_, { rejectWithValue }) => {
        try {
            const response: any = await axios.get("http://128.0.204.34:8999/licencias_de_conducir/vencimiento_licencia/38919847/");
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error);
        }
    }
);


export const getReclamos = createAsyncThunk(
    "home/reclamos",
    async (_, { rejectWithValue }) => {
        try {
            const response: any = await axios.get("http://128.0.204.34:8999/cav/reclamos_por_dni/17594127");
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error);
        }
    }
);


interface Pros {
    loading: boolean;
    changeusername: boolean;
    changepassword: boolean;
    reclamos?: any,
    licencia?: {
        tramite: string;
        numero: string;
        clases: string;
        documento: number;
        nombre_apellido: string;
        localidad: string;
        fecha_expedicion: Date;
        fecha_vencimiento: Date;
        estado: string;
        dias: number;
    },
    user: {
        id: number;
        dni: number;
        first_name: string;
        last_name: string;
        email: string;
        kind_of_person: any;
        register_from: any;
    };
    error: {
        status?: number;
        message: string;
        isPinError?: boolean;
    };
    locations?: any;
}

const initialState: Pros = {
    loading: false,
    changeusername: false,
    changepassword: false,
    reclamos: [],
    licencia: {
        tramite: "",
        numero: "",
        clases: "",
        documento: 0,
        nombre_apellido: "",
        localidad: "",
        fecha_expedicion: new Date(),
        fecha_vencimiento: new Date(),
        estado: "",
        dias: 0,
    },
    user: {
        id: 0,
        dni: 0,
        first_name: "",
        last_name: "",
        email: "",
        kind_of_person: {},
        register_from: {},
    },
    error: {
        status: 0,
        message: "",
        isPinError: false,
    },
    locations: [],
};

const homeSlice = createSlice({
    name: "home",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(getVencimientoLicencia.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getVencimientoLicencia.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.licencia = payload
        });
        builder.addCase(getVencimientoLicencia.rejected, (state, action: any) => {
            state.loading = false;
            state.error = {
                status: action.payload.response.status,
                message: action.payload.response.data.detail,
            };
        });
        builder.addCase(getReclamos.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getReclamos.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.reclamos = payload
        });
        builder.addCase(getReclamos.rejected, (state, action: any) => {
            state.loading = false;
            state.error = {
                status: action.payload.response.status,
                message: action.payload.response.data.detail,
            };
        });
    },
});

export default homeSlice.reducer;
