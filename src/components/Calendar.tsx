import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import "moment/locale/es";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Stack,
    Input,
    Box,
    Text,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { AppDispatch } from "@component/store";
import { useAuthStore } from "@component/stores/auth";

const localizer = momentLocalizer(moment);

const CalendarDay = (props: any) => {
    const dispatch: AppDispatch = useDispatch();
    //@ts-ignore
    const { vencimientos } = useSelector((state) => state.vencimientos);
    //@ts-ignore
    const { turnos } = useSelector((state) => state.hospital);

    const [selectedEvent, setSelectedEvent] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const customEventPropGetter = (
        event: any,
        start: any,
        end: any,
        isSelected: any
    ) => {
        let backgroundColor = "#4283d3"; // Color predeterminado
        let color = "white"; // Color predeterminado
        switch (event.tasa) {
            case "ALC":
                backgroundColor = "#d73027";
                break;
            case "SH1":
                backgroundColor = "#fdae61";
                color = "black"
                break;
            case "SH2":
                backgroundColor = "#8c510a";
                break;
            case "PMC":
                backgroundColor = "#66bd63";
                break;
            case "PAT":
                backgroundColor = "#4393c3";
                break;
            case "CEM":
                backgroundColor = "#35978f";
                break;
            case "AMB":
                backgroundColor = "#006837";
                break;
            default:
                break;
        }

        return { style: { backgroundColor, color } };
    };

    const eventosVencimientos = vencimientos.map((documento) => {
        const startDate = new Date(documento.fecha);

        return {
            title: documento.referencia,
            start: startDate,
            end: startDate, // Puedes ajustar según tus necesidades
            shift: documento.detalle,
            tasa: documento.tasa,
            tipo: "VENCIMIENTO",
            id: documento.id,
            titulomodal: `${documento.tasa} | VENCIMIENTO`

        };
    });

    const eventosTurnos = turnos.map((turno) => {
        const startDate = moment(`${turno.fecha} ${turno.hora}`, "DD/MM/YYYY HH:mm").toDate();
        // Utilizar expresión regular para extraer el contenido entre corchetes
        const match = turno.especialidad.match(/\[([^)]+)\]/);

        // Obtener el contenido entre corchetes
        const contenidoEntreCorchetes = match ? match[1] : null;
        return {
            title: `TURNO - ${contenidoEntreCorchetes}`,
            start: startDate,
            end: startDate, // Puedes ajustar según tus necesidades
            tipo: "TURNO",
            hora: turno.hora,
            medico: turno.medico,
            especialidad: turno.especialidad,
            titulomodal: `${contenidoEntreCorchetes}`
        };
    });

    const handleEventClick = (event: any) => {
        setSelectedEvent(event);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const allEvents = [...eventosVencimientos, ...eventosTurnos];
    return (
        <div>
            <Calendar
                localizer={{
                    ...localizer,
                    messages: {
                        today: "Hoy",
                        month: "Mes",
                        week: "Semana",
                        day: "Día",
                        agenda: "Agenda",
                    },
                }}
                events={allEvents}
                startAccessor={(event: any) => new Date(event.start)}
                endAccessor={(event: any) => new Date(event.end)}
                style={{ height: 1000 }}
                views={["month", "week"]}
                messages={{
                    today: "Hoy",
                    month: "Mes",
                    week: "Semana",
                    day: "Día",
                    agenda: "Agenda",
                    previous: "Atrás",
                    next: "Después",
                    noEventsInRange: "No tienes vencimientos en este periodo.",
                }}
                selectable={true}
                eventPropGetter={customEventPropGetter}
                onSelectEvent={handleEventClick}
            />

            {/* Modal para mostrar información detallada del evento */}
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} size={"xl"} isCentered>
                <ModalOverlay />
                <ModalContent bg={"transparent"} >
                    <Box bg={"muni.celeste"} pt={2} h={20} borderTopRadius={14}>
                        <Box w={"100%"} textAlign={"left"} ml={5}>
                            <Text fontSize={"3xl"} color={"white"} fontWeight={600}>
                                {selectedEvent?.titulomodal}</Text>
                        </Box></Box>                    <ModalCloseButton color={"white"} mt={2} />
                    <ModalBody bg={"white"} borderTopRadius={14} mt={-5}>
                        <Stack spacing={3} mt={10}>
                            {selectedEvent?.tipo === 'VENCIMIENTO' ? <><div>
                                <strong>Fecha:</strong> {moment(selectedEvent?.start).format('D [de] MMMM [de] YYYY')}
                            </div>
                                <div>
                                    <strong>Tasa:</strong> {selectedEvent?.tasa}
                                </div>

                                <div>
                                    <strong>Referencia:</strong> {selectedEvent?.title}
                                </div>
                                <div>
                                    <strong>Detalle:</strong> {selectedEvent?.shift}
                                </div> </> : <><div>
                                    <strong>Fecha:</strong> {moment(selectedEvent?.start).format('D [de] MMMM [de] YYYY')}
                                </div>
                                <div>
                                    <strong>Hora:</strong> {selectedEvent?.hora}
                                </div>
                                <div>
                                    <strong>Medico:</strong> {selectedEvent?.medico}
                                </div>
                                <div>
                                    <strong>Especialidad:</strong> {selectedEvent?.especialidad}
                                </div></>}
                        </Stack>
                    </ModalBody>
                    <ModalFooter bg={"white"} borderBottomRadius={14}>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default CalendarDay;
