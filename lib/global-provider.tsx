import { createContext, useContext } from "react";
import { getCurrentUser } from "./appwirte";
import { useAppwrite } from "./use-appwrite";

interface User {
    $id: string;
    name: string;
    email: string;
    avatar: string;
}

interface GlobalCotextType {
    isLoggedIn: boolean;
    user: User | null;
    loading: boolean;
    refetch: (newParams: Record<string, string | number>) => Promise<void>;
}

const GlobalContext = createContext<GlobalCotextType | undefined>(undefined);

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {

    const { data: user, loading, refetch } = useAppwrite({ fn: getCurrentUser });
    const isLoggedIn = !!user;

    return (
        <GlobalContext.Provider value={{
            isLoggedIn,
            user,
            loading,
            refetch
        }}>
            {children}
        </GlobalContext.Provider>
    );
}

export const useGlobalContext = (): GlobalCotextType => {
    const ctx = useContext(GlobalContext);

    if (!ctx) {
        throw new Error('useGlobalContext must be used  within a GlobalProvider')
    }

    return ctx;
}

export default GlobalProvider;