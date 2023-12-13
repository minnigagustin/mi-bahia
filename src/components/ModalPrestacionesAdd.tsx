import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    HStack,
    Avatar,
    AvatarBadge,
    IconButton,
    Center,
    Switch,
    Select,
    Checkbox,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { useRef } from "react";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@component/store";
import { AxiosLogged } from "@component/configs/AxiosConfig";

const ModalPrestacionesAdd = ({ product, onClose }: any) => {
    const fileInputRef = useRef(null);
    const [direccion, setDireccion] = useState("");
    const [precio, setPrecio] = useState("");
    const [nombre, setNombre] = useState("");
    const [corto, setCorto] = useState("");
    const [fecha, setFecha] = useState("");

    const [activo, setActivo] = useState(false);

    const [reparto, setReparto] = useState("");
    const [sucursal, setSucursal] = useState("Mitre");
    const [metodo, setMetodo] = useState("efectivo");

    const dispatch: AppDispatch = useDispatch();

    const [file, setFile] = useState(
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
    );

    const [fileimage, setFileImage] = useState(null);

    const handleButtonClick = () => {
        //@ts-ignore
        fileInputRef?.current?.click();
    };

    const handleFileInputChange = (event: any) => {
        const file = event.target.files[0];
        // Aquí puedes realizar acciones con el archivo seleccionado
        console.log("Archivo seleccionado:", file);
        const fileUrl = URL.createObjectURL(file);
        // Asignar la URL al atributo src del Avatar
        console.log(fileUrl);
        setFile(fileUrl);
        setFileImage(file);
    };

    const handleSubmit = () => {
        console.log(sucursal);
        AxiosLogged
            .post("prestaciones/", {
                nombre_beneficio: direccion,
                nombre_corto: precio,
                estado: sucursal,
                fecha: metodo,
            })
            .then((data) => {/* 
                dispatch(DeliveryGet()); */
                console.log(data);
                onClose();
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <Stack
            spacing={4}
            w={"full"}
            maxW={"md"}
            bg={useColorModeValue("white", "gray.700")}
            rounded={"xl"}
            boxShadow={"lg"}
            p={6}
        >
            <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
                Agregar Prestación
            </Heading>

            <FormControl isRequired>
                <FormLabel>Nombre Beneficio</FormLabel>
                <Input
                    placeholder="Nombre Beneficio"
                    _placeholder={{ color: "gray.500" }}
                    type="text"
                    value={nombre}
                    onChange={(event) => setNombre(event.target.value)}
                />
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Nombre Corto</FormLabel>
                <Input
                    placeholder="Nombre Corto"
                    _placeholder={{ color: "gray.500" }}
                    type="text"
                    value={corto}
                    onChange={(event) => setCorto(event.target.value)}
                />
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Fecha Activacion</FormLabel>
                <Input
                    _placeholder={{ color: "gray.500" }}
                    type="date"
                    value={fecha}
                    onChange={(event) => setFecha(event.target.value)}
                />
            </FormControl>

            <FormControl>
                <Checkbox colorScheme='green' onChange={(event) => setActivo(event.target.checked)}>
                    Activo
                </Checkbox>
            </FormControl>

            <Stack spacing={6} direction={["column", "row"]}>
                <Button
                    onClick={onClose}
                    bg={"red.400"}
                    color={"white"}
                    w="full"
                    _hover={{
                        bg: "red.500",
                    }}
                >
                    Cancelar
                </Button>
                <Button
                    bg={"blue.400"}
                    onClick={handleSubmit}
                    color={"white"}
                    w="full"
                    _hover={{
                        bg: "blue.500",
                    }}
                >
                    Agregar
                </Button>
            </Stack>
        </Stack>
    );
};

export default ModalPrestacionesAdd;
