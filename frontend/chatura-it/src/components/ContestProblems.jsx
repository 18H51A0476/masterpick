import React from "react";
import { List, ListItem, ListItemText, Link } from "@mui/material";

const problems = [
  { id: 1, title: "Problem 1" },
  { id: 2, title: "Problem 2" },
  { id: 3, title: "Problem 3" },
  // Add more problems here
];

const ContestProblems = () => {
  return (
    <div>
      <List>
        {problems.map((problem) => (
          <ListItem key={problem.id}>
            <ListItemText>
              <Link href={`/problem/${problem.id}`} underline="none">
                {problem.title}
              </Link>
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ContestProblems;
