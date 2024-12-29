import { useState } from "react";
import { useRouter } from "next/router";
import { Box, Text } from "@chakra-ui/react"
import { Button } from "@chakra-ui/react"

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      router.push("/homepage");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <Box
      backgroundImage="url('/images/1.jpg')"
      backgroundSize="cover"
      minH="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      textAlign="center"
    >
      <Text
        fontSize="3xl"
        fontWeight="bold"
        color="white"
        fontFamily="tahoma"
      >
        Welcome to the Favorite Cities App!
      </Text>
      <br/>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ display: "block", margin: "10px auto" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ display: "block", margin: "10px auto" }}
        />
        <Button
          type="submit"
          marginTop="4"
          height="8"
          width="auto"
          padding="4"
          backgroundColor="#256C95"
          variant="outline"
        >
          <Text
            fontSize="1xl"
            fontWeight="bold"
            color="white"
            fontFamily="georgia"
          >
            Login
          </Text>
        </Button>
      </form>
    </Box>
  );
}