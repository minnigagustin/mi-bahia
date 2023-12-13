import axios from "axios";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { useAuthStore } from "@component/stores/auth";
import { AxiosLoggedAutentica } from "@component/configs/AxiosConfig";

export const useGetDashboard = () => {
  const { logout, token } = useAuthStore();
  const router = useRouter();
  const { data, isLoading, isError, error } = useQuery(
    ["dashboard"],
    () => AxiosLoggedAutentica.get(`userprofile/`).then((res) => res.data),
    {
      onError: (err) => {
        console.error(err);
        logout();
        router.push("/login");

        // Aquí puedes hacer cualquier acción que quieras realizar en caso de un error
      },
    }
  );

  return {
    dashboard: data || [],
    isLoading,
    isError,
  };
};
