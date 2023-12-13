import React, { useEffect, useState } from "react";
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
  Collapse,
  Box,
  useDisclosure,
} from "@chakra-ui/react";
import { AppDispatch } from "@component/store";
import { useDispatch, useSelector } from "react-redux";
import {
  atencionMedicaGet,
  checkBeneficiario,
} from "@component/store/consultaSlice";

const CardDniBeneficiario = ({
  color,
  title,
  description,
  total,
  icon,
  list,
}: any) => {
  const dispatch: AppDispatch = useDispatch();
  const [documento, setDocumento] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { loading, error: hasError } = useSelector(
    (resp: any) => resp.consulta
  );

  useEffect(() => {
    if (hasError.message) {
      onOpen();
    } else {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasError]);

  const consultar = () => {
    dispatch(checkBeneficiario({ documento: documento }));
  };
  return (
    <>
      <Stack spacing={4}>
        <Stack align={"center"} direction={["column", "row"]}>
          <Text>D.N.I</Text>
          <Input
            variant="filled"
            onChange={(e) => setDocumento(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === 'Return') {
                consultar();
              }
            }}
          />
        </Stack>
      </Stack>
      <Button
        isLoading={loading}
        loadingText="Buscando..."
        isDisabled={documento === ""}
        type="submit"
        onClick={consultar}
        mt={4}
        color={"white"}
        bg={"#6690F4"}
        fontSize={19}
        w="full"
      >
        CONSULTAR
      </Button>
      <Collapse in={isOpen} animateOpacity>
        <Box
          p="20px"
          color="white"
          mt={4}
          mb="14px"
          bg="red.500"
          rounded="md"
          shadow="md"
        >
          <Text fontWeight={"bold"} fontSize={"14px"} textAlign={"center"}>
            {hasError.message}
          </Text>
        </Box>
      </Collapse>
    </>
  );
};

export default CardDniBeneficiario;
