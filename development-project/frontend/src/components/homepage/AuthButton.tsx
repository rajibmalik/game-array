import { useState } from "react";
import { Button, Icon, useToast } from "@chakra-ui/react";
import { FaSteam } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AuthButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleAuth = async () => {
    setIsLoading(true);

    try {
      // Start the auth process
      window.location.href = "https://game-array.onrender.com/auth/steam";

      // The page will redirect, so the code below won't execute immediately
      // It will run when the user comes back to your site after auth

      // Check if we're returning from Steam auth
      if (window.location.pathname === "/auth/steam/callback") {
        const response = await fetch(
          "https://game-array.onrender.com/account",
          {
            credentials: "include",
          }
        );

        const data = await response.json();

        if (data.status === "success" && data.redirectUrl) {
          navigate(new URL(data.redirectUrl).pathname);
        } else {
          throw new Error("Authentication failed");
        }
      }
    } catch (error) {
      console.error("Authentication error:", error);
      toast({
        title: "Authentication failed",
        description: "Please try again later",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      leftIcon={<Icon as={FaSteam} boxSize="3rem" />}
      textColor={"white"}
      bgColor="#17252A"
      variant={"solid"}
      size={"lg"}
      onClick={handleAuth}
      isLoading={isLoading}
      _hover={{ bgColor: "#17252A" }}
      p={10}
    >
      LOGIN WITH STEAM
    </Button>
  );
};

export default AuthButton;
