"use client";
import { createContext, useEffect, useState } from "react";
import { Notification } from "./types";
import { useToast } from "@chakra-ui/react";

export const AppContext = createContext<any>(null);

export const AppProvider = ({ children }: any) => {
    const [notifications, setNotifications] = useState<Notification[] | any>([]);
    const toast = useToast();

    const confirmedToast = (text: string) => {
        toast({
            title: "Exito",
            description: text,
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "bottom-right",
        });
    };

    const errorToast = (error: any) => {
        toast({
            title: "Error encontrado",
            description: error,
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "bottom-right",
        });
    };
    useEffect(() => { }, [notifications]);

    return (
        <AppContext.Provider
            value={{ notifications, setNotifications, confirmedToast, errorToast }}
        >
            {children}
        </AppContext.Provider>
    );
};