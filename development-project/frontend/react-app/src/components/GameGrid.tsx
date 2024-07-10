import { SimpleGrid, Text } from "@chakra-ui/react";
import useUserGames from "../hooks/useUserGames";
import GameCard from "./GameCard";
import { GameQuery } from "../pages/Library";

interface Props {
  steamID: number | null;
  username: string | null;
  gameQuery: GameQuery;
}

// interface Props {

// }

const GameGrid = ({ steamID, username, gameQuery }: Props) => {
  // Uses custom hook to get the UserGames with their respective game data
  // else error information
  const { userGames, error } = useUserGames(steamID, gameQuery);

  return (
    <>
      {error && <Text>{error}</Text>}
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
        padding="25px"
        spacing={10}
      >
        {userGames.map((game) => (
          <GameCard key={game.appid} game={game}></GameCard>
        ))}
      </SimpleGrid>
    </>
  );
};

export default GameGrid;
