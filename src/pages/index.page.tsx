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
} from "@chakra-ui/react";
import CardDashboard from "@component/components/CardDashboard";
import {
  GruposIcon,
  IntervencionesIcon,
  PersonasIcon,
  PrestacionesIcon,
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
  const { dashboard, isLoading } = useGetDashboard();

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



  return (
    <>
      <Header>
        <Container minHeight="100vh" maxW="full" h={"full"} bg="#EEF1F9">
          <Box
            textAlign="center"
            fontSize="xl"
            w={"100%"}
            bg={useColorModeValue("gray.100", "gray.900")}
          >
            <Grid p={3}>
              <VStack spacing={0}>
                <Box w={"100%"} textAlign={"left"} ml={5}>
                  <Text color={"muni.verde"} textAlign={"left"} fontSize={{ base: '2xl', md: '3xl' }} fontWeight={600}>
                    <Text fontWeight={600} display="inline" color={"muni.celeste"}>{dashboard?.last_name} {dashboard?.first_name}</Text> | NIVEL 1 <QuestionIcon color={"gray.400"} mb={2} fontSize={24} />
                  </Text>
                </Box>
                <SimpleGrid columns={{ sm: 1, md: 2, xl: 2 }} w={"100%"} spacing="24px" paddingBottom={10}>

                  <Card minH="83px" mt={4} boxShadow={"none"} borderRadius={"2xl"}>

                    <CardBody display="flex" flexDirection="column" >
                      <Box flex='1' paddingTop={4} paddingBottom={4}>
                        <VStack align={"left"}>


                          <Text color={"gray.600"} textAlign={"left"}>
                            Completá tu perfil con todos los datos personales, para poder acceder a los servicios de <Text color={"gray.700"} display="inline" fontWeight={600} textAlign={"left"}>Mi Bahía</Text>.
                          </Text>
                          <Text color={"gray.600"} textAlign={"left"} fontWeight={600}>
                            Estado del perfil: <Text color={"muni.verde"} ml={1} display="inline" fontWeight={600} textAlign={"left"}> 40%</Text>
                          </Text>
                          <Progress value={60} colorScheme='verde' />
                        </VStack>

                      </Box>
                      <Button variant={"outline"} colorScheme="afip" w={"100%"} fontWeight={"bold"} fontSize={18} mt="auto">Completar Perfil</Button>
                    </CardBody>
                  </Card><Box mt={4} textAlign="center">
                    <Image src="/tera.png" w={{ base: '100%', md: '80%' }} mx="auto" />
                  </Box>
                </SimpleGrid>

                <SimpleGrid columns={{ sm: 1, md: 2, xl: 2 }} w={"100%"} spacing="24px" paddingBottom={10}>
                  <Box w={"100%"}>
                    <Box bg={"#E9E9E9"} pt={2} display={"block"} borderRadius={"2xl"}>
                      <Box w={"100%"} textAlign={"left"} ml={5}>
                        <Text fontSize={"3xl"} color={"gray.600"} fontWeight={600}>
                          Licencia de conducir</Text>
                      </Box>
                      <Card minH="83px" mt={4} boxShadow={"none"} borderRadius={"2xl"}>
                        <CardBody display="flex" flexDirection="column">
                          <Box flex='1' paddingTop={4} paddingBottom={4}>
                            <VStack align={"left"} spacing={4}>
                              <Box style={{ flex: 1 }}>
                                <Text color={"red"} textAlign={"left"} fontSize={{ base: 'md', md: '2xl' }} fontWeight={600}>
                                  {moment(licencia.fecha_vencimiento).diff(moment(), 'days') < 30 ?
                                    <Text fontWeight={600} display="inline" color={"gray.600"}>Tu licencia se encuentra próxima a vencer ({moment(licencia.fecha_vencimiento).diff(moment(), 'days')} días)</Text> :
                                    <Text fontWeight={600} display="inline" color={"green.600"}>Tu licencia se encuentra vigente</Text>
                                  }
                                </Text>
                              </Box>
                              <Text color={"gray.600"} textAlign={"left"} fontSize={{ base: 'md', md: 'xl' }}>
                                {moment(licencia.fecha_vencimiento).diff(moment(), 'days') < 30 ?
                                  "Te recomendamos solicitar un turno para su renovación. Recordá que pasada su fecha de vencimiento, deberás rendir nuevamente los exámenes teóricos y prácticos." :
                                  "No es necesario renovar en este momento."
                                }
                              </Text>
                            </VStack>
                            <VStack spacing={10} mt={6}>
                              <Box bg={"#E9E9E9"} pt={4} pb={4} borderRadius={"2xl"} w={"100%"}>
                                <Text fontWeight={600} fontSize={"2xl"} display="inline" color={"gray.600"}>Fecha de vencimiento:</Text>
                                <Text fontWeight={600} fontSize={"3xl"} color={moment(licencia.fecha_vencimiento).diff(moment(), 'days') < 30 ? "red" : "green.600"}>
                                  {moment(licencia.fecha_vencimiento).format("DD/MM/YYYY")}
                                </Text>
                              </Box>
                              <Button variant={"outline"} colorScheme="afip" w={"100%"} fontWeight={"bold"} fontSize={18} mt="auto">
                                {moment(licencia.fecha_vencimiento).diff(moment(), 'days') < 30 ?
                                  "Solicitar turno de renovación" :
                                  "Renovación no requerida"
                                }
                              </Button>
                            </VStack>
                          </Box>
                        </CardBody>
                      </Card>


                    </Box>
                  </Box>
                  <Stack spacing={10} justify={"space-between"}>
                    <Box bg={"#E9E9E9"} pt={2} borderRadius={"2xl"}>
                      <Box w={"100%"} textAlign={"left"} ml={5}>
                        <Text fontSize={"3xl"} color={"gray.600"} fontWeight={600}>
                          Vencimientos</Text>
                      </Box>
                      <Card minH="83px" mt={4} boxShadow={"none"} borderRadius={"2xl"} >

                        <CardBody display="flex" flexDirection="column">

                          <Box flex='1' paddingTop={4} paddingBottom={4}>
                            <HStack spacing={{ base: 5, md: 10 }} justify={"space-between"}>
                              <Box style={{ flex: 1 }}>
                                <Text color={"muni.celeste"} fontWeight={600} textAlign={"left"} fontSize={{ base: 'lg', md: 'xl' }}>
                                  LICENCIAS DE CONDUCIR
                                </Text>
                              </Box>
                              <Box display={{ base: 'none', md: 'block' }}>
                                <Text fontSize={{ base: 'lg', md: 'xl' }}>22/06/2023 11:38</Text>
                              </Box>
                              <Box>
                                <Icon as={FiSearch} fontSize={30} color={"muni.celeste"} mr={2} /></Box>

                            </HStack>
                          </Box>

                          <Divider />
                          <Box flex='1'
                            paddingTop={4} paddingBottom={4}>
                            <HStack spacing={{ base: 5, md: 10 }} justify={"space-between"}>
                              <Box style={{ flex: 1 }}>
                                <Text color={"gray.500"} textAlign={"left"} fontSize={{ base: 'lg', md: 'xl' }}>COMPLETA TU BIBLIOTECA DIGITAL
                                </Text>
                              </Box>
                              <Box display={{ base: 'none', md: 'block' }}>
                                <Text fontSize={{ base: 'lg', md: 'xl' }}>22/06/2023 11:38</Text>
                              </Box>
                              <Box>
                                <Icon as={FiSearch} fontSize={30} color={"muni.celeste"} mr={2} /></Box>

                            </HStack>
                          </Box>
                          <Divider />
                          <Box flex='1'
                            paddingTop={4} paddingBottom={4}>
                            <HStack spacing={{ base: 5, md: 10 }} justify={"space-between"}>
                              <Box style={{ flex: 1 }}>
                                <Text color={"gray.500"} textAlign={"left"} fontSize={{ base: 'lg', md: 'xl' }}>TU RECLAMO N° 156345 FUE DERIVADO AL...
                                </Text>
                              </Box>
                              <Box display={{ base: 'none', md: 'block' }}>
                                <Text fontSize={{ base: 'lg', md: 'xl' }}>22/06/2023 11:38</Text>
                              </Box>
                              <Box>
                                <Icon as={FiSearch} fontSize={30} color={"muni.celeste"} mr={2} /></Box>

                            </HStack>
                          </Box>
                          <Divider />
                          <Button colorScheme={"afip"} variant={"outline"} w={"100%"} fontWeight={"bold"} fontSize={18} mt="auto">Ver todos los vencimientos</Button>
                        </CardBody>
                      </Card>
                    </Box>
                    <Box bg={"#E9E9E9"} pt={2} borderRadius={"2xl"}>
                      <Box w={"100%"} textAlign={"left"} ml={5}>
                        <Text fontSize={"3xl"} color={"gray.600"} fontWeight={600}>
                          Mis reclamos</Text>
                      </Box>
                      <Card minH="83px" mt={4} boxShadow={"none"} borderRadius={"2xl"}>
                        <CardBody display="flex" flexDirection="column">

                          {//@ts-ignore
                            reclamos.map((reclamo, index) => (
                              <div key={index}>
                                <Box flex='1' paddingTop={4} paddingBottom={4}>
                                  <HStack spacing={{ base: 5, md: 10 }} justify={"space-between"}>
                                    <Box style={{ flex: 1 }}>
                                      <Text color={//@ts-ignore
                                        reclamosEnRango.includes(reclamo) ? "muni.celeste" : "gray.500"} fontWeight={500} textAlign={"left"} fontSize={{ base: 'lg', md: 'xl' }}>
                                        {reclamo.categoria} - {reclamo.subcategoria}
                                      </Text>
                                    </Box>
                                    <Box display={{ base: 'none', md: 'block' }}>
                                      <Text fontSize={{ base: 'lg', md: 'xl' }}>{reclamo.formatted_fecha}</Text>
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

                          <Button colorScheme={"afip"} variant={"outline"} w={"100%"} fontWeight={"bold"} fontSize={18} mt="auto">
                            Ver todos los reclamos
                          </Button>
                        </CardBody>
                      </Card>

                    </Box>
                  </Stack>

                </SimpleGrid>

              </VStack>
            </Grid>
          </Box >
        </Container>
      </Header>
    </>
  );
}
