import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Problem = (props) => (
  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
      {props.problem.title}
    </td>
    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
      {props.problem.type}
    </td>
    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
      {props.problem.difficulty}
    </td>
    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
      <div className="flex gap-2">
        <Link
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3"
          to={`/problems/edit/${props.problem._id}`}  // Adjusted path for editing problems
        >
          Edit
        </Link>

        <button
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3"
          style={{ color: "red" }}
          type="button"
          onClick={() => {
            props.deleteProblem(props.problem._id);
          }}
        >
          Delete
        </button>
      </div>
    </td>
  </tr>
);

export default function ProblemList() {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    async function getProblems() {
      const response = await fetch(`http://localhost:5050/problem/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const problems = await response.json();
      setProblems(problems);
    }
    getProblems();
    return;
  }, [problems.length]);

  async function deleteProblem(id) {
    await fetch(`http://localhost:5050/problem/${id}`, {
      method: "DELETE",
    });
    const newProblems = problems.filter((el) => el._id !== id);
    setProblems(newProblems);
  }

  function problemList() {
    return problems.map((problem) => (
      <Problem
        problem={problem}
        deleteProblem={() => deleteProblem(problem._id)}
        key={problem._id}
      />
    ));
  }

  return (
    <>
      <h3 className="text-lg font-semibold p-4">Problem Records</h3>
      <div className="border rounded-lg overflow-hidden">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&amp;_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  Title
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  Type
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  Difficulty
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="[&amp;_tr:last-child]:border-0">
              {problemList()}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
