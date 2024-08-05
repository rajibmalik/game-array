// AuthCallback.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const AuthCallback = () => {
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const handleCallback = async () => {
      try {
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
      } catch (error) {
        console.error("Authentication error:", error);
        toast({
          title: "Authentication failed",
          description: "Please try again later",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        navigate("/"); // Redirect to home page on error
      }
    };

    handleCallback();
  }, [navigate, toast]);

  return null; // This component doesn't render anything
};

export default AuthCallback;
