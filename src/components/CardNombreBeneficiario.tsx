import React, { useState } from "react";
import {
  VStack,
  Button,
  Text,
  Stack,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  Card,
  CardBody,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Icon,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Input,
} from "@chakra-ui/react";
import { getUsersNombre } from "@component/store/consultaSlice";
import NiceModal from "@ebay/nice-modal-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@component/store";

const CardNombreBeneficiario = ({
  color,
  title,
  description,
  total,
  icon,
  list,
}: any) => {
  const dispatch: AppDispatch = useDispatch();
  const { loading } = useSelector((resp: any) => resp.consulta);

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const consultar = () => {
    if (nombre || apellido) {
      dispatch(getUsersNombre({ nombre: nombre, apellido: apellido }));
      NiceModal.show("users-modal");
    }
  };
  return (
    <>
      <Stack spacing={4}>
        <Stack align={"center"} direction={["column", "row"]}>
          <Text>Apellido</Text>
          <Input
            variant="filled"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === 'Return') {
                consultar();
              }
            }}
            onChange={(e) => setApellido(e.target.value)}
          />
        </Stack>
        <Stack align={"center"} direction={["column", "row"]}>
          <Text>Nombre</Text>
          <Input variant="filled" onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === 'Return') {
              consultar();
            }
          }} onChange={(e) => setNombre(e.target.value)} />
        </Stack>
      </Stack>
      <Button
        isLoading={loading}
        loadingText="Buscando..."
        type="submit"
        mt={4}
        color={"white"}
        bg={"#6690F4"}
        fontSize={19}
        w="full"
        onClick={consultar}
      >
        CONSULTAR
      </Button>
    </>
  );
};

export default CardNombreBeneficiario;
