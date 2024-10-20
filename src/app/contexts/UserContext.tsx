import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useUser } from "@account-kit/react";
import { getBalance } from "@wagmi/core";
import { config as wagmiConfig } from "../wagmiConfig";
import { formatEther } from "viem";

interface UserContextType {
  balance: string;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userBalance, setUserBalance] = useState<string>("0");
  const user = useUser();

  useEffect(() => {
    const fetchUserBalance = async () => {
      if (!user?.address) return;
      try {
        const wagmiBalance = await getBalance(wagmiConfig, {
          address: user.address,
        });
        setUserBalance(formatEther(wagmiBalance.value) + " ETH");
      } catch (error) {
        console.error("Error fetching user balance:", error);
      }
    };

    fetchUserBalance();
  }, [user?.address]);

  return (
    <UserContext.Provider value={{ balance: userBalance }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserBalance = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserBalance must be used within a UserProvider");
  }
  return context.balance;
};
