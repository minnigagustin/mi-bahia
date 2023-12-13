"use client";

import {
    Box,
    Button,
    Divider,
    Icon,
    Input,
    Link,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Textarea,
    Th,
    Thead,
    Tr,
    useDisclosure,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import {
    FaRegEye,
    FaRegFilePdf,
    FaRegSquareCheck,
    FaRegTrashCan,
} from "react-icons/fa6";
import { AppContext } from "../context/Context";
import { axiosLoggedInNotif } from "../utilities/Axios";
import { LoadingIcon } from "./LoadingIcon";

export interface Notification {
    loader: number;
    user_name: string;
    cuit: number;
    notification_type: string;
    amount: number;
    notification_url: string;
    notification_id: number;
    status: string;
    date: Date;
    fecha: string;
    user_notif: string;
    reason?: string;
    notification_date: Date;
    notification_upload_date: Date;
    rejected_reason?: string;
}

export const TableReusable = ({
    data = [],
    busqueda,
    sendTo,
    isOrigin,
    originCuit,
}: any) => {
    const name = data[0]?.user_name;

    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
    const [notifications, setNotifications] = useState<Notification[]>(data);
    const [toVerify, setToVerify] = useState<Notification[]>([]);
    const [idToVerify, setIdToVerify] = useState<number[]>([]);
    const [sendingToVerify, setSendingToVerify] = useState<boolean>(false);
    const [sendToDeny, setSendToDeny] = useState<Notification>();
    const [view, setView] = useState<Notification>();
    const [sendingToDeny, setSendingToDeny] = useState<boolean>(false);
    const [cuit, setCuit] = useState<number>();

    useEffect(() => {
        if (data[0] !== undefined) {
            setCuit(data[0].cuit);
        }
        data[0].cuit === 11111111111 && setCuit(originCuit);
    }, [data, originCuit]);

    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        setNotifications(data);
    }, [data]);
    if (data == undefined) {
        return <LoadingIcon />;
    }

    const handleSort = (column: any) => {
        const sorted = [...notifications].sort((a, b) => {
            if (sortDirection === "asc") {
                //@ts-ignore
                return a[column] > b[column] ? 1 : -1;
            } else {
                //@ts-ignore
                return a[column] < b[column] ? 1 : -1;
            }
        });
        setNotifications(sorted);
        setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    };

    const handleRemove = (data: Notification) => {
        const filtered = toVerify.filter(
            (item) => item.notification_id !== data.notification_id
        );
        setToVerify(filtered);

        const poped = toVerify.filter(
            (item) => item.notification_id === data.notification_id
        );
        setNotifications((prev: Notification[]) => [...prev, ...poped]);
        const idFilter = idToVerify.filter((item) => item !== data.notification_id);
        setIdToVerify(idFilter);
    };

    return (
        <Box>
            <TableContainer my={50}>
                <Text>{`Notificaciones pendientes de ${name}, CUIT: ${cuit}`}</Text>

                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>CUIT</Th>
                            <Th>RAZÓN SOCIAL</Th>
                            <Th isNumeric>ID NOTIFICACIÓN</Th>
                            <Th
                                onClick={() => handleSort("notification_type")}
                                cursor={"pointer"}
                            >
                                TIPO {"↑↓"}
                            </Th>
                            <Th
                                onClick={() => handleSort("notification_date")}
                                cursor={"pointer"}
                            >
                                FECHA {"↑↓"}
                            </Th>
                            <Th
                                isNumeric
                                onClick={() => handleSort("amount")}
                                cursor={"pointer"}
                            >
                                MONTO {"↑↓"}
                            </Th>
                            <Th textAlign={"center"} cursor={"pointer"}>
                                NOTIFICACIÓN
                            </Th>
                            <Th textAlign={"center"}>ACCIONES</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {notifications?.map((notifications: Notification) => (
                            <Tr key={notifications.notification_id}>
                                <Td>{cuit}</Td>
                                <Td>{notifications.user_name}</Td>
                                <Td isNumeric>
                                    <Link
                                        href={`/notificaciones/${notifications.notification_id}`}
                                    >
                                        {notifications.notification_id}
                                    </Link>
                                </Td>
                                <Td>{notifications.notification_type}</Td>
                                <Td>
                                    {dayjs(notifications?.notification_date).format("DD-MM-YYYY")}
                                </Td>
                                <Td isNumeric>
                                    ${" "}
                                    {notifications.amount.toLocaleString("es-ES", {
                                        minimumFractionDigits: 2,
                                    })}
                                </Td>
                                <Td textAlign={"center"}>
                                    <Button>
                                        <Icon w={5} h={20} as={FaRegFilePdf} />
                                    </Button>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>

            {view !== undefined && (
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Notificación</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody
                            display={"flex"}
                            flexDirection={"column"}
                            gap={5}
                            color={"GrayText"}
                            fontSize={16}
                        >
                            <Box>
                                <Text fontSize={24}>{view.user_name || view.user_notif}</Text>
                                <Text fontSize={24}>{view.cuit}</Text>
                            </Box>
                            <Text>Tipo: {view.notification_type}</Text>
                            <Text>
                                Fecha de origen:{" "}
                                {dayjs(view.notification_date).format("DD-MM-YYYY")}
                            </Text>
                            <Text>
                                Fecha de actualizacion:{" "}
                                {dayjs(view.notification_upload_date).format("DD-MM-YYYY")}
                            </Text>
                            <Text>
                                Monto: $
                                {view.amount.toLocaleString("es-ES", {
                                    minimumFractionDigits: 2,
                                })}
                            </Text>
                        </ModalBody>
                        <ModalFooter>
                            <Button variant={"ghost"} mr={3} onClick={onClose}>
                                Cerrar
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            )}
        </Box>
    );
};