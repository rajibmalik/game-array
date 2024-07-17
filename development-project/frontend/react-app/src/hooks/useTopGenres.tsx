import axios, { CanceledError } from "axios";
import { useEffect, useState } from "react";
import useSessionData from "./useSessionData";

export interface TopGenres {
  genre: string;
  totalPlaytime: number;
  totalPlaytimeHours: number;
}

interface fetchDashboardDataResponse {
  results: number;
  // Uses the UserGame interface when defining UserGame[]
  data: {
    topGenres: TopGenres[];
  };
}

const useTopGenres = () => {
  const { userData, error } = useSessionData();
  const [topGenres, setTopGenres] = useState<TopGenres[]>([]);

  useEffect(() => {
    if (userData) {
      const controller = new AbortController();

      axios
        .get<fetchDashboardDataResponse>(
          `http://localhost:3000/api/v1/usergames/top-genres-by-playtime/${userData.steamID}/6`,
          {
            signal: controller.signal,
            withCredentials: true,
          }
        )
        .then((res) => {
          // Sets userData to user session object, created in Passport.js in Express backend
          setTopGenres(res.data.data.topGenres);
        })
        .catch((err) => {
          if (err instanceof CanceledError) return;
        });

      return () => controller.abort();
    }
  }, [userData]);

  return topGenres;
};

export default useTopGenres;
