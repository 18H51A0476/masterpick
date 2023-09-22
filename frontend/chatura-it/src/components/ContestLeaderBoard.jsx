import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, Typography } from "@mui/material";

const leaderboardData = [
  { rank: 1, username: "User 1", score: 100 },
  { rank: 2, username: "User 2", score: 90 },
  { rank: 3, username: "User 3", score: 85 },
  // Add more leaderboard entries here
];

const Leaderboard = () => {
  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Leaderboard
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {leaderboardData.map((entry) => (
              <TableRow key={entry.rank}>
                <TableCell>{entry.rank}</TableCell>
                <TableCell>{entry.username}</TableCell>
                <TableCell>{entry.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Leaderboard;
