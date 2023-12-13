import React from "react";
import {
  VStack,
  Button,
  Text,
  Stack,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  ModalBody,
} from "@chakra-ui/react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { useDispatch, useSelector } from "react-redux";
import { checkBeneficiario } from "@component/store/consultaSlice";
import { AppDispatch } from "@component/store";
import { LoadSpinner } from "./Spinner";
const ModalUsers = ({ id }: any) => {
  const dispatch: AppDispatch = useDispatch();

  const { users, loadingUsers } = useSelector((resp: any) => resp.consulta);
  var usersclone = [...users];
  const onClose = () => {
    NiceModal.remove(id);
  };

  const onConsulta = (documento?: number) => {
    dispatch(checkBeneficiario({ documento: documento }));
    NiceModal.remove(id);
  };
  return (
    <Modal isOpen={true} onClose={onClose} isCentered scrollBehavior={"inside"}>
      <ModalOverlay />
      <ModalContent borderRadius={10} maxW={1200} justifyContent={"center"}>
        <ModalBody>
          {loadingUsers ? (
            <LoadSpinner />
          ) : (
            <TableContainer marginTop={14}>
              <Table variant="simple">
                <TableCaption>Selecciona un beneficiario...</TableCaption>
                <Thead>
                  <Tr>
                    <Th>Apellido</Th>
                    <Th>Nombre</Th>
                    <Th>Altura o DNI</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {usersclone
                    ?.sort((a: any, b: any) => a?.Altura - b?.Altura)
                    ?.map((users: any, key: any) => (
                      <Tr key={key}>
                        <Td fontWeight={"bold"}>{users.Apellido}</Td>
                        <Td>{users.Nombre}</Td>
                        <Td>{users.Altura ?? users.NumeroDocumento}</Td>
                        <Td>
                          <Button
                            type="submit"
                            mt={4}
                            color={"white"}
                            bg={"#6690F4"}
                            onClick={() => onConsulta(users.NumeroDocumento)}
                            w="full"
                          >
                            CONSULTAR {">"}
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </TableContainer>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalUsers;
