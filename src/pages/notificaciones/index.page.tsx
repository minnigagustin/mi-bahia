import React, { useContext, useEffect, useState } from "react";
import { SidebarWithHeader } from "../dashboard/SidebarWithHeader";
import { TableReusable } from "../../components/TableReusable";
import { axiosLoggedInNotif } from "../../utilities/Axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/StoreRoot";
import Header from "@component/components/Header";
import { Declaration } from "@component/components/Declaration";
import { AppContext } from "@component/context/Context";
import { Box } from "@chakra-ui/react";

const Notifications = () => {
    const [notifications, setNotifications] = useState<Notification[]>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { errorToast } = useContext(AppContext);
    const [isRelated, setIsRelated] = useState<boolean>(false);

    const NOTIFICATIONS_URL = "/my_notifications/";
    const SEE_RELATION_URL = "/see_relations/";

    const dispatch: AppDispatch = useDispatch();
    //@ts-ignore
    // const { user } = useSelector((state) => state.profile);
    const getUser = async () => {
        //@ts-ignore
        //  dispatch(getCurrentProfile());
        /*  const getUser = await getUserInfo(localStorage.getItem("lgac"));
          dispatch(setUser(getUser.data)); */
    };

    React.useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            try {
                await Promise.all([getMyNotificactions(), getUserRelation()]);
                // Ambas funciones se han completado correctamente
                // Realiza cualquier acción adicional después de que ambas funciones se completen
            } catch (error) {
                // Manejar errores si alguna de las funciones falla
                console.error("Error al ejecutar las funciones:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const getMyNotificactions = async () => {
        try {
            // const response = await axiosLoggedInNotif().get(NOTIFICATIONS_URL);
            // if (!response.data) {
            //   errorToast("error !response");
            // }
            // setNotifications(response.data);
            const options = {
                method: "POST",
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMxNjY5NTg0LCJqdGkiOiJkMmUxZTYxMTcyMGQ0OTk4OTcxM2FkMjBmNjUzYjVmZCIsInVzZXJfZG5pIjozODkxOTg0N30.TTQKoXm0RFWyu6mwmn8jVbc0wE2-Hsl5STU_ZaWK91k`,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ cuit: 20175367714 }),
            };

            fetch("http://128.0.202.248:8050/my_notifications/", options)
                .then((response) => response.json())
                .then((response) => console.log(response))
                .catch((err) => console.error(err));
        } catch (error) {
            errorToast("error catch");
            throw error; // Propagar el error hacia arriba
        }
    };
    const getUserRelation = async () => {
        try {
            // const response = await axiosLoggedInNotif().post(SEE_RELATION_URL, {
            //   cuit: cuit,
            // });
            // if (!response.data) {
            //   errorToast("error !response");
            // }
            const options = {
                method: "POST",
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMxNjY5NTg0LCJqdGkiOiJkMmUxZTYxMTcyMGQ0OTk4OTcxM2FkMjBmNjUzYjVmZCIsInVzZXJfZG5pIjozODkxOTg0N30.TTQKoXm0RFWyu6mwmn8jVbc0wE2-Hsl5STU_ZaWK91k`,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ cuit: user.cuit }),
            };

            fetch("http://128.0.202.248:8050/see_relations/", options)
                .then((response) =>
                    response.status !== 200
                        ? errorToast("error en la peticion")
                        : response.json()
                )
                .then((response) => {
                    if (response) {
                        setIsRelated(true);
                    }
                })
                .catch((err) => console.error(err));
        } catch (error) {
            errorToast("error catch");
            throw error; // Propagar el error hacia arriba
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isRelated) {
        return (
            <>
                <Header>
                    <Box ml={4}>
                        <Declaration /></Box>
                </Header></>
        );
    }
    return (
        <Header>
            {notifications && notifications.length > 0 && (
                <TableReusable data={notifications} />
            )}
        </Header>
    );
};

export default Notifications;