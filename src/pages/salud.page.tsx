import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@component/styles/Home.module.css";
import {
    Box,
    Button,
    Card,
    CardBody,
    Container,
    Divider,
    Image,
    Flex,
    Grid,
    HStack,
    Icon,
    Progress,
    SimpleGrid,
    Skeleton,
    Stack,
    Stat,
    StatHelpText,
    StatLabel,
    StatNumber,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    VStack,
    useColorModeValue,
    Heading,
    Select,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    ModalBody,
} from "@chakra-ui/react";
import CardDashboard from "@component/components/CardDashboard";
import {
    GruposIcon,
    IntervencionesIcon,
    PersonasIcon,
    PrestacionesIcon,
    ReclamosIcon,
    SaludIcon,
} from "@component/components/Icons";
import CardTable from "@component/components/CardTable";
import dynamic from "next/dynamic";
import CardTableSimple from "@component/components/CardTableSimple";
import { LoadSpinner } from "@component/components/Spinner";
import { LoginCarga } from "@component/components/LoginCarga";
import Header from "@component/components/Header";
import { useAuthStore } from "@component/stores/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useGetDashboard } from "@component/hooks/dashboard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@component/store";
import {
    gruposGet,
    intervencionesGet,
    personasRegistradas,
    prestacionesGet,
} from "@component/store/inicioSlice";
import { getCalles } from "@component/store/consultaSlice";
import { QuestionIcon } from "@chakra-ui/icons";
import moment from "moment";
import { getReclamos, getVencimientoLicencia } from "@component/store/homeSlice";
import { FiSearch } from "react-icons/fi";

const CardChart = dynamic(
    () => {
        return import("@component/components/CardChart");
    },
    { ssr: false }
);

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedReclamo, setSelectedReclamo] = useState(null);
    const [selectedTitle, setSelectedTitle] = useState("");
    const dispatch: AppDispatch = useDispatch();
    //@ts-ignore
    const user = useSelector((state) => state.profile);
    //@ts-ignore
    const { licencia, reclamos } = useSelector((state) => state.home);

    const getUser = async () => {
        //@ts-ignore
        //dispatch(getCurrentProfile());
        console.log('entreee')
        /*  const getUser = await getUserInfo(localStorage.getItem("lgac"));
          dispatch(setUser(getUser.data)); */
    };

    useEffect(() => {
        dispatch(getVencimientoLicencia())
        dispatch(getReclamos());

        getUser();
    }, []);
    const color = useColorModeValue("white", "gray.700");
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    const [reclamosEnRango, setReclamosEnRango] = useState([]);
    // Obtener las categorías y subcategorías únicas
    //@ts-ignore
    const categoriasUnicas = [...new Set(reclamos.map(reclamo => reclamo.categoria))];
    //@ts-ignore
    const subcategoriasUnicas = [...new Set(reclamos.map(reclamo => reclamo.subcategoria))];

    // Estados para los valores seleccionados en los filtros
    const [selectedCategoria, setSelectedCategoria] = useState("");
    const [selectedSubcategoria, setSelectedSubcategoria] = useState("");
    const [selectedEstado, setSelectedEstado] = useState("");


    useEffect(() => {
        //@ts-ignore
        const reclamosFiltrados = reclamos.filter((reclamo) => {
            const fechaReclamo = new Date(reclamo.formatted_fecha);
            const fechaActual = new Date();
            const fechaLimiteSuperior = new Date();
            const fechaLimiteInferior = new Date();

            fechaLimiteSuperior.setDate(fechaActual.getDate() + 10);
            fechaLimiteInferior.setDate(fechaActual.getDate() - 10);

            return fechaReclamo >= fechaLimiteInferior && fechaReclamo <= fechaLimiteSuperior;
        });

        // Ordenar los reclamos por fecha, de la más cercana a la más lejana
        //@ts-ignore
        reclamosFiltrados.sort((a, b) => {
            const fechaA = new Date(a.formatted_fecha);
            const fechaB = new Date(b.formatted_fecha);
            //@ts-ignore
            return fechaA - fechaB;
        });

        setReclamosEnRango(reclamosFiltrados);
    }, [reclamos]);


    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedReclamo(null);
    };
    const handleItemClick = (reclamo) => {
        setSelectedReclamo(reclamo);
        setSelectedTitle(`${reclamo.categoria} - ${reclamo.subcategoria}`);
        setModalOpen(true);
    };

    // Filtrar reclamos según las selecciones en los filtros
    const reclamosFiltrados = reclamos.filter((reclamo) => {
        const categoriaMatch = !selectedCategoria || reclamo.categoria === selectedCategoria;
        const subcategoriaMatch = !selectedSubcategoria || reclamo.subcategoria === selectedSubcategoria;
        const estadoMatch = !selectedEstado || reclamo.estado_text === selectedEstado;

        return categoriaMatch && subcategoriaMatch && estadoMatch;
    });
    return (
        <>
            <Header>
                <Container minHeight="100vh" maxW="full" h={"full"} bg="#EEF1F9">
                    {/* Modal */}
                    <Modal isOpen={isModalOpen} onClose={handleCloseModal} size={"2xl"} isCentered>
                        {/* Contenido del modal */}
                        <ModalOverlay />
                        <ModalContent bg={"transparent"}>
                            {/* Encabezado del modal */}
                            <Box bg={"muni.celeste"} pt={2} h={20} borderTopRadius={14}>
                                <Box w={"100%"} textAlign={"left"} ml={5}>
                                    <Text fontSize={"3xl"} color={"white"} fontWeight={600}>
                                        {selectedTitle}
                                    </Text>
                                </Box>
                            </Box>
                            <ModalCloseButton color={"white"} mt={2} />
                            <ModalBody bg={"white"} borderTopRadius={14} mt={-5} borderBottomRadius={14}>
                                {/* Contenido del modal */}
                                {/* Mostrar los datos específicos del reclamo */}
                                <Text>
                                    <strong>Número:</strong> {selectedReclamo?.numero}
                                </Text>
                                <Text>
                                    <strong>Estado:</strong> {selectedReclamo?.estado_text}
                                </Text>
                                <Text>
                                    <strong>Calle:</strong> {selectedReclamo?.calle_nombre}
                                </Text>
                                <Text>
                                    <strong>Altura:</strong> {selectedReclamo?.altura}
                                </Text>
                                <Text>
                                    <strong>Fecha:</strong> {selectedReclamo?.formatted_fecha}
                                </Text>
                                <Text>
                                    <strong>Categoría:</strong> {selectedReclamo?.categoria}
                                </Text>
                                <Text>
                                    <strong>Subcategoría:</strong> {selectedReclamo?.subcategoria}
                                </Text>

                                {/* Agrega más información según tus necesidades */}
                            </ModalBody>
                        </ModalContent>
                    </Modal>


                    <Box
                        textAlign="center"
                        fontSize="xl"
                        w={"100%"}
                        bg={useColorModeValue("gray.100", "gray.900")}
                    >
                        <Grid p={3}>
                            <VStack spacing={0}>

                                <Stack
                                    direction={{ base: "column", md: "row" }}
                                    justifyContent={"space-between"}
                                    mb={4}
                                    w={"95%"}
                                ><Box>
                                        <Heading>
                                            <Icon as={SaludIcon} mr={4} color={"muni.celeste"} />
                                            Mi Historia Clínica
                                        </Heading>
                                    </Box>
                                    <Stack direction={"row"} spacing={4}>
                                        {/* Filtrar por categoría */}
                                        <Select
                                            bg={"white"}
                                            size={"md"}
                                            onChange={(e) => setSelectedCategoria(e.target.value)}
                                            value={selectedCategoria}
                                        >
                                            <option value="">Filtrar por categoría</option>
                                            {categoriasUnicas.map((categoria, index) => (
                                                <option key={index} value={categoria}>
                                                    {categoria}
                                                </option>
                                            ))}
                                        </Select>
                                        <Select
                                            bg={"white"}
                                            size={"md"}
                                            onChange={(e) => setSelectedSubcategoria(e.target.value)}
                                            value={selectedSubcategoria}
                                        >
                                            <option value="">Filtrar por subcategoría</option>
                                            {subcategoriasUnicas.map((subcategoria, index) => (
                                                <option key={index} value={subcategoria}>
                                                    {subcategoria}
                                                </option>
                                            ))}
                                        </Select>

                                        {/* Filtrar por estado */}
                                        <Select
                                            bg={"white"}
                                            size={"md"}
                                            onChange={(e) => setSelectedEstado(e.target.value)}
                                            value={selectedEstado}
                                        >
                                            <option value="">Filtrar por estado</option>
                                            {/* Ajusta los valores según tus necesidades */}
                                            <option value="en proceso">En Proceso</option>
                                            <option value="finalizado">Finalizado</option>
                                        </Select>
                                    </Stack>
                                </Stack>
                                <Card minH="83px" mt={4} boxShadow={"none"} borderRadius={"2xl"} w={"95%"}>
                                    <CardBody display="flex" flexDirection="column">

                                        {//@ts-ignore
                                            reclamosFiltrados.map((reclamo, index) => (
                                                <div key={index} onClick={() => handleItemClick(reclamo)}>
                                                    <Box flex='1' paddingTop={4} paddingBottom={4}>
                                                        <HStack spacing={{ base: 5, md: 10 }} justify={"space-between"}>
                                                            <Box style={{ flex: 1 }}>
                                                                <Text color={//@ts-ignore
                                                                    reclamosEnRango.includes(reclamo) ? "muni.celeste" : "gray.500"} fontWeight={500} textAlign={"left"} fontSize={{ base: 'lg', md: 'xl' }}>
                                                                    {reclamo.categoria} - {reclamo.subcategoria}
                                                                </Text>
                                                            </Box>
                                                            <Box display={{ base: 'none', md: 'block' }}>
                                                                <Text fontSize={{ base: 'lg', md: 'xl' }}>{moment(reclamo.formatted_fecha).format("DD/MM/YYYY")}
                                                                </Text>
                                                            </Box>
                                                            <Box>
                                                                <Icon as={FiSearch} fontSize={30} color={//@ts-ignore
                                                                    reclamosEnRango.includes(reclamo) ? "muni.celeste" : "gray.500"} mr={2} />
                                                            </Box>
                                                        </HStack>
                                                    </Box>
                                                    <Divider />
                                                </div>
                                            ))}

                                    </CardBody>
                                </Card>

                            </VStack>
                        </Grid>
                    </Box >
                </Container>
            </Header>
        </>
    );
}
