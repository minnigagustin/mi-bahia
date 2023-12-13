"use client";
import {
    Box,
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    ListItem,
    Select,
    Spinner,
    Text,
    UnorderedList,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useContext, useEffect, useRef, useState } from "react";
import { axiosLoggedInNotif } from "../../utilities/Axios";
import { SpinnerLogin } from "../../components/SpinnerLogin";
import { AppContext } from "@component/context/Context";

export const Declaration = () => {
    const [checked, setChecked] = useState<boolean>(false);
    const [cuit, setCuit] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<any>();
    const [relationType, setRelationType] = useState<number>(1);
    const { errorToast, confirmedToast } = useContext(AppContext);
    const optionRef = useRef<HTMLOptionElement>(null);

    const NOTIFICATION_ENDPOINT = "/notifications/";
    const USER_RELATION_ENDPOINT = "/user_relation/";
    const MY_NOTIFICATIOS_ENDPOINT = "/my_notifications/";

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            // const response = await axiosLoggedInNotif().post(NOTIFICATION_ENDPOINT, {
            //   cuit: cuit,
            //   date_from: null,
            //   date_to: null,
            // });
            // setData(response.data);
            // if (!response.data) {
            //   return errorToast(`Error al recibir los datos #${response.status}`);
            // }
            const options = {
                method: "POST",
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMxNjY5NTg0LCJqdGkiOiJkMmUxZTYxMTcyMGQ0OTk4OTcxM2FkMjBmNjUzYjVmZCIsInVzZXJfZG5pIjozODkxOTg0N30.TTQKoXm0RFWyu6mwmn8jVbc0wE2-Hsl5STU_ZaWK91k`,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    cuit: cuit,
                    date_from: null,
                    date_to: null,
                }),
            };

            fetch("http://128.0.202.248:8050/notifications/", options)
                .then((response) => response.json())
                .then((response) => setData(response))
                .catch((err) => console.error(err));
        } catch (error) {
            errorToast("error");
        } finally {
            setIsLoading(false);
        }
    };

    function validateName(value: string) {
        let error;
        if (!value) {
            error = "se requiere un CUIT";
        }
        return error;
    }

    const options = [
        {
            value: 1,
            label: "Propietario",
        },
        {
            value: 2,
            label: "Representante legal",
        },

        {
            value: 3,
            label: "Socio",
        },
    ];
    const handleUserRelation = async () => {
        try {
            // const response = await axiosLoggedInNotif().post(USER_RELATION_ENDPOINT, {
            //   represented: cuit,
            //   type: relationType,
            // });
            // setData(response.data);
            // if (!response.data) {
            //   return errorToast(`Error al recibir los datos #${response.status}`);
            // }
            const options = {
                method: "POST",
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMxNjY5NTg0LCJqdGkiOiJkMmUxZTYxMTcyMGQ0OTk4OTcxM2FkMjBmNjUzYjVmZCIsInVzZXJfZG5pIjozODkxOTg0N30.TTQKoXm0RFWyu6mwmn8jVbc0wE2-Hsl5STU_ZaWK91k`,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    represented: cuit,
                    type: relationType,
                }),
            };

            fetch("http://128.0.202.248:8050/user_relation/", options)
                .then((response) => {
                    if (response.status !== 200) {
                        return errorToast(response.statusText);
                    }
                })
                .then((response) => response.json())
                .then((response) =>
                    response === "Not found."
                        ? errorToast(response.status)
                        : confirmedToast("usuario relacionado con exito")
                );
        } catch (error) {
            errorToast("errror");
        }
    };

    return (
        <Box bg={"white"} p={10} borderRadius={10} color={""}>
            <Text fontSize={{ base: 10, md: 40 }} color={"black"} fontWeight={600}>
                {" "}
                DECLARACION JURADA
            </Text>
            <Text fontSize={{ base: 12, md: 24 }} maxW={"60ch"}>
                En mi carácter de titular /representante legal /apoderado /responsable
                /administrador /tutor /síndico declaro aceptar en todos sus términos las
                condiciones de la operatoria que se indican a continuación:
            </Text>
            <UnorderedList
                maxW={"60ch"}
                ml={{ base: 0, md: 100 }}
                fontSize={{ base: 12, md: 20 }}
                display={"grid"}
                gap={5}
                mt={10}
            >
                <ListItem>
                    La cuenta en la plataforma Bahía Notifica constituye Domicilio
                    Especial Electrónico para aquellos trámites previsto por el decreto
                    (Número/año).
                </ListItem>
                <ListItem>
                    El Domicilio Especial Electrónico es la sede electrónica del usuario
                    habilitado por la administración para el ejercicio de sus derechos y
                    obligaciones durante la tramitación en el portal Bahía Notifica. La
                    clave de identificación de proveedor y de acceso otorgada es de mi
                    exclusivo conocimiento, constituyéndome en custodio de su
                    confidencialidad y responsable por su uso. Por lo tanto, asumo las
                    consecuencias de su divulgación a terceros, liberando a la
                    MUNICIPALIDAD DE BAHÍA BLANCA de toda responsabilidad que de ello
                    derive.
                </ListItem>
                <ListItem>
                    Queda bajo mi entera responsabilidad atender a la recomendación de
                    ingresar al Portal “bahía Notifica”, disponible en el servicio “web”
                    de la Municipalidad de Bahía Blanca, desde mi computadora personal o
                    laboral, evitando hacerlo desde otras computadoras (ej. Locutorio,
                    cibercafé, etc.).
                </ListItem>
                <ListItem>
                    Asumo la responsabilidad por el uso indebido o inadecuado del servicio
                    “Web”, haciéndome cargo de todos los daños y perjuicios
                    correspondientes, sin que ello obste a la facultad de la MUNICIPALIDAD
                    DE BAHÍA BLANCA a suspender y/o interrumpir dicho servicio.
                </ListItem>
                <ListItem>
                    Las notificaciones realizadas en el domicilio electrónico serán
                    válidas y plenamente eficaces, conforme lo dispuesto en el decreto
                    (número/año).
                </ListItem>
                <Checkbox
                    justifySelf={"flex-end"}
                    onChange={() => setChecked(!checked)}
                    mt={10}
                >
                    Acepto los términos y condiciones
                </Checkbox>
            </UnorderedList>
            {checked && (
                <Box pt={30}>
                    <Text fontSize={24}>Buscar CUIT a representar </Text>
                    <Formik
                        initialValues={{ name: "Sasuke" }}
                        onSubmit={(values, actions) => {
                            handleSubmit();
                            actions.setSubmitting(false);
                        }}
                    >
                        {(props) => (
                            <Form>
                                <Field name="name" validate={validateName}>
                                    {({ field, form }: any) => (
                                        <FormControl
                                            isInvalid={form.errors.cuit && form.touched.cuit}
                                            display={"flex"}
                                            justifyContent={"flex-start"}
                                            alignItems={"center"}
                                            my={2}
                                        >
                                            <Flex flexWrap={"wrap"} alignItems={"center"}>
                                                <FormLabel>
                                                    CUIT:
                                                    <Input
                                                        {...field}
                                                        type="number"
                                                        onChange={(e) => setCuit(e.target.value)}
                                                        value={cuit}
                                                        autoComplete="off"
                                                    />
                                                </FormLabel>
                                                <FormErrorMessage>{form.errors.name}</FormErrorMessage>

                                                <Button
                                                    mt={4}
                                                    isLoading={props.isSubmitting}
                                                    type="submit"
                                                    bg={"muni.celeste"}
                                                    color={"white"}
                                                    disabled={isLoading}
                                                    _hover={{ background: "muni.verde" }}
                                                >
                                                    Buscar
                                                </Button>
                                            </Flex>
                                        </FormControl>
                                    )}
                                </Field>
                            </Form>
                        )}
                    </Formik>
                </Box>
            )}
            {isLoading && <Spinner />}
            {checked &&
                data &&
                (data.detail ? (
                    "No se encontro el CUIT"
                ) : (
                    <Box display={"flex"} flexDirection={"column"}>
                        <Box display={"flex"} gap={2} alignItems={"center"}>
                            <Text>Quiero representar a {data[0]?.user_name}</Text>
                            <Box
                                display={"flex"}
                                gap={2}
                                justifyContent={"center"}
                                alignContent={"center"}
                                alignItems={"center"}
                            >
                                <Text>en carácter de </Text>{" "}
                                <Select
                                    w={300}
                                    onChange={(e) => setRelationType(Number(e.target.value))}
                                >
                                    {options.map((option) => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                            ref={optionRef}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </Select>
                                <Button
                                    type="submit"
                                    bg={"muni.celeste"}
                                    color={"white"}
                                    disabled={isLoading}
                                    _hover={{ background: "muni.verde" }}
                                    onClick={() => handleUserRelation()}
                                >
                                    Enviar
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                ))}
        </Box>
    );
};