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
import { Select } from "chakra-react-select";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@component/store";
import NiceModal from "@ebay/nice-modal-react";
import { getUsersDireccion } from "@component/store/consultaSlice";

const CardDireccionBeneficiario = ({
  color,
  title,
  description,
  total,
  icon,
  list,
}: any) => {
  const [direccionid, setDireccionId] = useState(0);

  const dispatch: AppDispatch = useDispatch();

  const { calles, loading } = useSelector((resp: any) => resp.consulta);
  const consultar = () => {
    dispatch(getUsersDireccion(direccionid));
    NiceModal.show("users-modal");
  };
  return (
    <>
      <Stack spacing={4}>
        <Stack align={"center"} direction={["column", "row"]}>
          <Select
            placeholder="Calle..."
            tagVariant="filled"
            onChange={(e: any) => setDireccionId(e.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === 'Return') {
                consultar();
              }
            }}
            chakraStyles={{
              container: (provided) => ({
                ...provided,
                width: "100%",
              }),
            }}
            options={calles.map((calle: any) => {
              return {
                label: calle.Nombre,
                value: calle.Calle_Codigo,
              };
            })}
          />
        </Stack>
      </Stack>
      <Button
        isLoading={loading}
        loadingText="Buscando..."
        isDisabled={direccionid === 0}
        type="submit"
        mt={4}
        color={"white"}
        bg={"#6690F4"}
        onClick={consultar}
        fontSize={19}
        w="full"
      >
        CONSULTAR
      </Button>
    </>
  );
};

export default CardDireccionBeneficiario;
