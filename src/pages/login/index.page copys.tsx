import { useEffect, useState } from "react";
import React from "react";
import {
  Box,
  Text,
  Link,
  VStack,
  Flex,
  Image,
  Heading,
  Collapse,
  FormControl,
  Stack,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  HStack,
  Divider,
  Spinner,
  useColorModeValue,
  useDisclosure,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Center,
  PinInput,
  PinInputField,
  Alert,
  AlertIcon,
  Drawer,
  DrawerOverlay,
  DrawerHeader,
  DrawerBody,
  DrawerContent,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { AfipIcon, AutenticaIcon, AyudasIcon, MiBahiaIcon } from "../../components/Icons";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useRouter } from "next/router";
import { useAuthStore } from "@component/stores/auth";
import Head from "next/head";
import { AxiosLogout } from "@component/configs/AxiosConfig";

export default function Home() {
  // Chakra color mode
  const titleColor = useColorModeValue("muni.celeste", "teal.200");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenHelp, onToggle: onToggleHelp } = useDisclosure();
  const {
    isOpen: isOpenPolitica,
    onOpen: onOpenPolitica,
    onClose: onClosePolitica,
  } = useDisclosure();
  const [descriptionError, setDescriptionError] = useState("");
  const [dni, setDni] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };



  const router = useRouter();
  const [error, setError] = useState(false);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuthStore();

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    setError(false);
    setLoading(true);
    console.log(username);
    console.log(password);
    try {
      const data = await AxiosLogout
        .post(`login/`, {
          dni: username,
          password: password,
        })
        .then((response) => response.data);

      login(data);
      console.log(data);
      router.push("/");
    } catch (e) {
      setDescriptionError("Ha ocurrido un error en la solicitud.");
      setError(true);
      onOpen()
      //setPassword("");
      setLoading(false);
    }
  };
  return (
    <>
      <Head>
        <title>Ayudas Sociales | MBB</title>
        <meta name="description" content="Ayuda Sociales | MBB" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>


        <Image flex={1} objectFit="cover" bg={"muni.celeste"} display={{ base: 'none', md: 'flex' }} align={"center"} src="https://hablemosdeargentina.com/wp-content/uploads/2018/03/Bah%C3%ADa-Blanca-4.jpg" />

        <Flex flex={1} bg={"#f5f6fa"} justify={"center"}>
          <Flex
            alignItems="center"
            justifyContent="center"
            style={{ userSelect: "none" }}
            w={{ base: "100%", md: "80%", lg: "50%" }}
          >
            <Flex
              direction="column"
              w="100%"
              minH={"90vh"}
              justify={"space-between"}
              p="20px"
              mt={{ md: "0px", lg: "0px" }}
            >
              <Box>
                <Box alignItems={"center"} w={"100%"}>
                  <MiBahiaIcon w="90%" h="100%" />
                </Box>

                <Text
                  mb="30px"
                  ms="4px"
                  ml={3}
                  mt="0px"
                  color={useColorModeValue("blackAlpha.800", "white")}
                  fontWeight={400}
                  fontSize={{ base: "15px", md: "20px", lg: "22px" }}
                >
                  Ingresá al Municipio de Bahía Blanca
                </Text>
              </Box>
              <Collapse in={isOpen} animateOpacity>
                <Box
                  p="20px"
                  color="white"
                  mb="14px"
                  bg="red.500"
                  rounded="md"
                  shadow="md"
                >
                  <Text
                    fontWeight={"bold"}
                    fontSize={"14px"}
                    textAlign={"center"}
                  >
                    error: {descriptionError}
                  </Text>
                </Box>
              </Collapse>
              <FormControl>
                <Stack
                  direction={{ base: "column", md: "column", lg: "column" }}
                  justify="space-between"
                  align="center"
                  mb="20px"
                >
                  <Box width="100%">
                    <Input
                      borderRadius="8px"
                      bg={"white"}
                      type="number"
                      placeholder="Número de documento (DNI)"
                      size='lg'
                      borderColor={"blackAlpha.600"}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === 'Return') {
                          handleSubmit(e);
                        }
                      }}
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Box>
                  <Box width="100%">
                    <InputGroup size="md">
                      <Input
                        borderRadius="8px"
                        bg={"white"}
                        type={showPassword ? "text" : "password"}
                        placeholder="Contraseña"
                        size='lg'
                        borderColor={"blackAlpha.600"}
                        value={password}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === 'Return') {
                            handleSubmit(e);
                          }
                        }}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <InputRightElement width="4.5rem">
                        <Flex onClick={handleShowPassword}>
                          {showPassword ? (
                            <ViewIcon
                              w={6}
                              h={6}
                              _hover={{ cursor: "pointer" }}
                              mt="25%"
                              ml="25%"
                            />
                          ) : (
                            <ViewOffIcon
                              w={6}
                              h={6}
                              _hover={{ cursor: "pointer" }}
                              mt="25%"
                              ml="25%"
                            />
                          )}
                        </Flex>
                      </InputRightElement>
                    </InputGroup>
                  </Box>
                </Stack>

                <Button
                  fontSize="10px"
                  type="submit"
                  bg="muni.celeste"
                  w="100%"
                  h="45"
                  mb="20px"
                  isDisabled={!username || !password}
                  color="white"
                  _hover={{
                    bg: "muni.verde",
                  }}
                  _active={{
                    bg: "muni.verde",
                  }}
                  _disabled={{
                    bg: "gray.300",
                    color: "gray.700",
                  }}
                  onClick={handleSubmit}
                >
                  {loading ? (
                    <Spinner />
                  ) : (
                    <Text fontWeight={"bold"} fontSize={"18px"}>
                      Iniciar sesión
                    </Text>
                  )}
                </Button>
                <FormControl
                  alignItems="center"
                  justifyContent="space-between"
                  alignContent={"center"}
                  textAlign={"center"}
                  alignSelf={"center"}
                  mb="32px"
                  mt="10px"
                >{/* 
                  <VStack align="stretch">
                    <Link
                      color={titleColor}
                      fontWeight="bold"
                      onClick={() => onToggleHelp()}
                    >
                      ¿Necesitás ayuda para ingresar?
                    </Link>
                  </VStack> */}
                </FormControl>
                {/*  <Collapse in={isOpenHelp} animateOpacity>
                  <Stack
                    direction={{ base: "column", md: "row", lg: "row" }}
                    justify="center"
                    align="center"
                    mb="20px"
                  >
                    <Button
                      fontSize="10px"
                      type="submit"
                      bg="muni.celeste"
                      w="100%"
                      h="45"
                      color="white"
                      _hover={{
                        bg: "white",
                        color: "muni.celeste",
                      }}
                      _active={{
                        bg: "muni.celeste",
                      }}
                      onClick={() => navigate("/forgotpassword/")}
                    >
                      <Text fontWeight={"bold"} fontSize={"13px"}>
                        OLVIDÉ MI CONTRASEÑA
                      </Text>
                    </Button>
                    <Button
                      fontSize="10px"
                      type="submit"
                      bg="muni.verde"
                      w="100%"
                      h="45"
                      color="white"
                      _hover={{
                        bg: "white",
                        color: "muni.verde",
                      }}
                      _active={{
                        bg: "muni.verde",
                        color: "white",
                      }}
                      onClick={() => navigate("/ResendVerification/")}
                    >
                      <Text fontWeight={"bold"} fontSize={"13px"}>
                        REENVIAR VERIFICACIÓN
                      </Text>
                    </Button>
                  </Stack> 
              </Collapse>*/}
                <HStack>
                  <Divider />
                </HStack>
                {/* <Link href="http://autentica.bahia.gob.ar/afiplogin/">
                  <Button
                    fontSize="10px"
                    type="submit"
                    colorScheme={"gray"}
                    color="muni.celeste"
                    w="100%"
                    h="45"
                    variant={"outline"}
                    mb="20px"
                    p={6}
                    mt="20px"
                    _hover={{
                      bg: "black",
                      color: "white",
                    }}
                    _active={{
                      bg: "black",
                      color: "white",
                    }}
                  >
                    <Text fontWeight={"bold"} fontSize={"18px"}>
                      Ingresar con Clave Fiscal
                    </Text>
                  </Button>
                </Link> */}


                <Divider />
              </FormControl>
              <FormControl
                alignItems="center"
                justifyContent="space-between"
                alignContent={"center"}
                textAlign={"center"}
                alignSelf={"center"}
                mb="32px"
                mt="10px"
              >
              </FormControl>

            </Flex>

          </Flex>
          <Box>
            <Drawer placement={"bottom"} onClose={onClosePolitica} isOpen={isOpenPolitica}>
              <DrawerOverlay />
              <DrawerContent >
                <DrawerHeader borderBottomWidth='1px' color={"muni.celeste"}>Politica de Privacidad de Datos</DrawerHeader>
                <DrawerBody>
                  <p>Fecha de última actualización: 3 de agosto de 2023</p>
                  <p>El sitio web "autentica.bahia" es gestionado por el Gobierno de Bahía Blanca. Nos preocupamos por la privacidad y seguridad de la información personal de nuestros usuarios. Esta Política de Privacidad describe cómo recopilamos, utilizamos, compartimos y protegemos la información personal que nos proporciona al utilizar nuestro sistema de logueo centralizado.</p>

                  <h2>1. Recopilación de información personal:</h2>
                  <p>Para utilizar los servicios ofrecidos en "autentica.bahia", es necesario registrarse y proporcionar cierta información personal, que puede incluir su nombre, dirección de correo electrónico y contraseña cifrada. Esta información es necesaria para autenticar y autorizar el acceso a los servicios gubernamentales en línea.</p>

                  <h2>2. Uso de la información personal:</h2>
                  <p>La información personal recopilada se utilizará exclusivamente para fines del sistema de logueo centralizado. Su objetivo principal es facilitar un acceso seguro y unificado a los servicios gubernamentales ofrecidos en línea, minimizando la necesidad de múltiples credenciales.</p>

                  <h2>3. Protección de la información personal:</h2>
                  <p>Hemos implementado medidas de seguridad adecuadas para proteger la información personal de los usuarios contra pérdidas, usos no autorizados o accesos indebidos. El acceso a los datos se limita solo a personal autorizado que requiere esta información para el correcto funcionamiento del sistema.</p>

                  <h2>4. Compartir información personal:</h2>
                  <p>La información personal recopilada no será compartida, vendida o transferida a terceros, excepto cuando sea necesario para cumplir con obligaciones legales o regulaciones gubernamentales. La información podrá ser compartida con otras entidades gubernamentales bajo los mismos estándares de protección de privacidad.</p>

                  <h2>5. Retención de datos:</h2>
                  <p>Los datos personales se retendrán únicamente durante el tiempo necesario para cumplir con los fines para los que fueron recopilados, o el tiempo requerido por la ley.</p>

                  <h2>6. Derechos de los usuarios:</h2>
                  <p>Los usuarios tienen derecho a acceder, corregir y eliminar su información personal. Si desean ejercer estos derechos o tienen alguna inquietud sobre la privacidad de sus datos, pueden comunicarse con el departamento de soporte del sitio autentica.bahia.</p>

                  <h2>7. Enlaces a sitios externos:</h2>
                  <p>El sitio web autentica.bahia puede contener enlaces a sitios web de terceros. Esta Política de Privacidad se aplica únicamente al sitio autentica.bahia. Se recomienda a los usuarios revisar las políticas de privacidad de los sitios externos antes de proporcionar información personal.</p>

                  <h2>8. Cambios en la Política de Privacidad:</h2>
                  <p>Esta política puede ser modificada en cualquier momento por el Gobierno de Bahía Blanca. En caso de cambios significativos, se notificará a los usuarios a través de un aviso en el sitio web.</p>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </Box>
        </Flex>

      </Stack >
    </>
  );
}
