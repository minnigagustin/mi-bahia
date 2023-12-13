import { useState } from "react";
import {
  Box,
  Container,
  Icon,
  SimpleGrid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Image,
  HStack,
  Input,
  Text,
} from "@chakra-ui/react";
import { MiBahiaIcon } from "@component/components/Icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@component/store";
import { getBiblioteca } from "@component/store/bibliotecaSlice";
import { useEffect } from "react";
import Header from "@component/components/Header";

export default function Home() {
  const dispatch: AppDispatch = useDispatch();
  //@ts-ignore
  const { documentaciones } = useSelector((state) => state.biblioteca);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedDocumentacion, setSelectedDocumentacion] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState("");

  const documentacionesAgrupadas = documentaciones.reduce((agrupadas, documentacion) => {
    const { Descripcion, NroDoc, Path_complete } = documentacion;
    const descripcionLimpia = Descripcion.trim();

    // Buscar el grupo existente con la misma descripción
    const grupoExistente = agrupadas.find((grupo) => grupo.Descripcion === descripcionLimpia);

    if (grupoExistente) {
      // Agregar a un grupo existente
      grupoExistente.Documentos.push({ NroDoc, Path_complete });
    } else {
      // Crear un nuevo grupo
      agrupadas.push({
        Descripcion: descripcionLimpia,
        Documentos: [{ NroDoc, Path_complete }],
      });
    }

    return agrupadas;
  }, []);

  useEffect(() => {
    dispatch(getBiblioteca());
  }, []);

  const handleItemClick = (documentacion) => {
    setSelectedDocumentacion(documentacion.Documentos);
    setSelectedTitle(documentacion.Descripcion);

    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedDocumentacion([]);
  };

  const filteredDocumentaciones = documentacionesAgrupadas.filter((documentacion) =>
    documentacion.Descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      <Header>
        <Container minHeight="100vh" maxW="full" h={"full"} bg="#EEF1F9" textAlign={"center"}>
          {/* Input de búsqueda */}
          <Input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            width={"98%"}
            size='lg'
            bg={"white"}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SimpleGrid
            columns={{ sm: 1, md: 2, xl: 4 }}
            spacing="24px"
            mt={4}
            paddingBottom={10}
            paddingRight={4}
            paddingLeft={4}
          >
            {filteredDocumentaciones.map((documentacion, index) => (
              <Box
                key={index}
                maxW="sm"
                borderRadius="lg"
                overflow="hidden"
                cursor="pointer"
                onClick={() => handleItemClick(documentacion)}
              >
                <Box
                  bg={"gray.50"}
                  h={40}
                  justifyContent={"center"}
                  textAlign={"center"}
                  justifySelf={"center"}
                  display="flex"
                  alignItems="center"
                >
                  <Icon
                    as={MiBahiaIcon}
                    fontSize={90}
                    color={"muni.celeste"}
                  />
                </Box>
                <Box
                  p="6"
                  bg={"muni.verde"}
                  h={"full"}
                  textAlign={"center"}
                  justifyContent="center"
                >
                  <Box fontWeight={600} fontSize={23} color={"white"}>
                    {documentacion.Descripcion}
                  </Box>
                </Box>
              </Box>
            ))}
          </SimpleGrid>

          {/* Modal */}
          <Modal isOpen={isModalOpen} onClose={handleCloseModal} size={"xl"} isCentered>
            <ModalOverlay />
            <ModalContent bg={"transparent"} >
              <Box bg={"muni.celeste"} pt={2} h={20} borderTopRadius={14} >
                <Box w={"100%"} textAlign={"left"} ml={5}>
                  <Text fontSize={"3xl"} color={"white"} fontWeight={600}>
                    {selectedTitle} | Documentaciones Adjuntas</Text>
                </Box></Box>                    <ModalCloseButton color={"white"} mt={2} />
              <ModalBody bg={"white"} borderTopRadius={14} mt={-5} borderBottomRadius={14}>
                {selectedDocumentacion.length > 0 && (
                  <Box mb={4}>
                    {selectedDocumentacion[0].Path_complete.endsWith(".PDF") ? (
                      // Si el documento principal es un PDF, usa la etiqueta <embed>
                      <embed
                        src={selectedDocumentacion[0].Path_complete}
                        type="application/pdf"
                        width="100%"
                        height="500px" // Ajusta la altura según tus necesidades
                      />
                    ) : (
                      // Si es una imagen, usa la etiqueta <Image>
                      <Image
                        src={selectedDocumentacion[0].Path_complete}
                        alt={`Documento principal`}
                        height="auto"
                        width="100%"
                      />
                    )}
                  </Box>
                )}

                <Box overflowX="auto" overflowY="hidden" whiteSpace="nowrap">
                  <HStack spacing={4}>
                    {selectedDocumentacion.slice(1).map((doc, index) => (
                      <Box
                        key={index}
                        onClick={() => {
                          // Cambiar el documento principal al hacer clic en la miniatura
                          setSelectedDocumentacion([doc, ...selectedDocumentacion.slice(1)]);
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        {doc.Path_complete.endsWith(".pdf") ? (
                          // Si la miniatura es un PDF, usa la etiqueta <embed>
                          <embed
                            src={doc.Path_complete}
                            type="application/pdf"
                            width="100px" // Ajusta el ancho según tus necesidades
                            height="100px" // Ajusta la altura según tus necesidades
                          />
                        ) : (
                          // Si es una imagen, usa la etiqueta <Image>
                          <Image
                            src={doc.Path_complete}
                            alt={`Documento ${index + 2}`}
                            maxH="100px"
                            maxW="100px"
                          />
                        )}
                      </Box>
                    ))}
                  </HStack>
                </Box>
              </ModalBody>
            </ModalContent>
          </Modal>

        </Container>
      </Header >
    </>
  );
}
