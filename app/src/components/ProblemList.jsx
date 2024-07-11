import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Problem = ({ problem, deleteProblem }) => {
  // Function to determine difficulty color class based on the level
  const getDifficultyColorClass = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-600"; // Green color for Easy
      case "Medium":
        return "text-yellow-600"; // Yellow color for Medium
      case "Hard":
        return "text-red-600"; // Red color for Hard
      default:
        return "text-gray-600"; // Default to gray if no match
    }
  };

  return (
    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
      <td className="p-4 align-middle">{problem.title}</td>
      <td className="p-4 align-middle">{problem.type}</td>
      <td className={`p-4 align-middle ${getDifficultyColorClass(problem.difficulty)}`}>
        {problem.difficulty}
      </td>
      <td className="p-4 align-middle">
        <div className="flex gap-2">
          <Link
            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3"
            to={`/problems/edit/${problem._id}`}  // Adjusted path for editing problems
          >
            Edit
          </Link>

          <button
            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3"
            style={{ color: "red" }}
            type="button"
            onClick={() => deleteProblem(problem._id)}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

const ProblemList = () => {
  const [problems, setProblems] = useState([]);
  const [filteredProblems, setFilteredProblems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function getProblems() {
      try {
        const response = await fetch(`http://localhost:5050/problem/`);
        if (!response.ok) {
          throw new Error(`An error occurred: ${response.statusText}`);
        }
        const problems = await response.json();
        setProblems(problems);
        setFilteredProblems(problems); // Initialize filtered problems with all problems
      } catch (error) {
        console.error(error);
      }
    }
    getProblems();
  }, []);

  useEffect(() => {
    // Filter problems based on search term
    const filtered = problems.filter(
      (problem) =>
        problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        problem.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        problem.difficulty.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProblems(filtered);
  }, [searchTerm, problems]);

  async function deleteProblem(id) {
    try {
      await fetch(`http://localhost:5050/problem/${id}`, {
        method: "DELETE",
      });
      const newProblems = problems.filter((problem) => problem._id !== id);
      setProblems(newProblems);
      setFilteredProblems(newProblems); // Update filtered problems after deletion
    } catch (error) {
      console.error(error);
    }
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <h3 className="text-lg font-semibold p-4">Problems's list</h3>
      <div className="border rounded-lg overflow-hidden">
        <div className="p-4">
          <input
            type="text"
            placeholder="Search by title, type, or difficulty"
            className="border rounded-md px-3 py-2 w-full"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&amp;_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Title</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Type</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Difficulty</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProblems.map((problem) => (
                <Problem
                  problem={problem}
                  deleteProblem={deleteProblem}
                  key={problem._id}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ProblemList;
