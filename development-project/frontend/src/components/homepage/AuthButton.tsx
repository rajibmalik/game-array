import { useState, useEffect } from "react";
import { Button, Icon } from "@chakra-ui/react";
import { FaSteam } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AuthButton = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticating) {
      // Check if the current URL includes the Steam callback parameters
      if (window.location.search.includes("openid.ns")) {
        // Extract the necessary parameters and send them to your backend
        fetch(
          "https://your-render-backend-url.onrender.com/auth/steam/callback" +
            window.location.search,
          {
            method: "GET",
            credentials: "include", // Important for maintaining session
          }
        )
          .then((response) => response.json())
          .then((data) => {
            if (data.status === "success") {
              // Authentication successful, redirect to library
              navigate("/library");
            } else {
              // Handle authentication failure
              console.error("Authentication failed");
            }
          })
          .catch((error) => {
            console.error("Error during authentication:", error);
          })
          .finally(() => {
            setIsAuthenticating(false);
          });
      }
    }
  }, [isAuthenticating, navigate]);

  const handleAuth = () => {
    setIsAuthenticating(true);
    window.location.href =
      "https://your-render-backend-url.onrender.com/auth/steam";
  };

  return (
    <Button
      leftIcon={<Icon as={FaSteam} boxSize="3rem" />}
      textColor={"white"}
      bgColor="#17252A"
      variant={"solid"}
      size={"lg"}
      onClick={handleAuth}
      isLoading={isAuthenticating}
      _hover={{ bgColor: "#17252A" }}
      p={10}
    >
      LOGIN WITH STEAM
    </Button>
  );
};

export default AuthButton;
