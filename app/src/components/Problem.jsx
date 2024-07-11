// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// export default function Problem() {
//   const [form, setForm] = useState({
//     title: "",
//     type: "",
//     difficulty: "",
//     statement: "",
//     constraints: "",
//     testCases: [{ explanation: "", inputText: "", outputText: "" }],
//   });
//   const [isNew, setIsNew] = useState(true);
//   const params = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     async function fetchData() {
//       const id = params.id?.toString() || undefined;
//       if (!id) return;
//       setIsNew(false);
//       const response = await fetch(`http://localhost:5050/problem/${id}`);
//       if (!response.ok) {
//         const message = `An error has occurred: ${response.statusText}`;
//         console.error(message);
//         return;
//       }
//       const problem = await response.json();
//       if (!problem) {
//         console.warn(`Problem with id ${id} not found`);
//         navigate("/problems");
//         return;
//       }

//       // Set the problem details including test cases
//       setForm({
//         title: problem.title || "",
//         type: problem.type || "",
//         difficulty: problem.difficulty || "",
//         statement: problem.statement || "",
//         constraints: problem.constraints || "",
//         testCases: problem.testCases || [{ explanation: "", inputText: "", outputText: "" }],
//       });
//     }
//     fetchData();
//   }, [params.id, navigate]);


//   function updateForm(value) {
//     setForm((prev) => ({ ...prev, ...value }));
//   }

//   function updateTestCase(index, value) {
//     setForm((prev) => {
//       const updatedTestCases = [...prev.testCases];
//       updatedTestCases[index] = { ...updatedTestCases[index], ...value };
//       return { ...prev, testCases: updatedTestCases };
//     });
//   }

//   async function onSubmit(e) {
//     e.preventDefault();
//     const problemData = { ...form };
//     try {
//       let response;
//       if (isNew) {
//         response = await fetch("http://localhost:5050/problem", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(problemData),
//         });
//       } else {
//         response = await fetch(`http://localhost:5050/problem/${params.id}`, {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(problemData),
//         });
//       }

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//     } catch (error) {
//       console.error("A problem occurred with your fetch operation: ", error);
//     } finally {
//       // Reset form after submission
//       setForm({
//         title: "",
//         type: "",
//         difficulty: "",
//         statement: "",
//         constraints: "",
//         testCases: [{ explanation: "", inputText: "", outputText: "" }],
//       });
//       navigate("/problems");
//     }
//   }

//   function addTestCase() {
//     setForm((prev) => ({
//       ...prev,
//       testCases: [
//         ...prev.testCases,
//         { explanation: "", inputText: "", outputText: "" },
//       ],
//     }));
//   }

//   function removeTestCase(index) {
//     setForm((prev) => {
//       const updatedTestCases = [...prev.testCases];
//       updatedTestCases.splice(index, 1);
//       return { ...prev, testCases: updatedTestCases };
//     });
//   }

//   return (
//     <>
//       <h3 className="text-lg font-semibold p-4">
//         {isNew ? "Create Problem" : "Update Problem"}
//       </h3>
//       <form
//         onSubmit={onSubmit}
//         className="border rounded-lg overflow-hidden p-4"
//         action={isNew ? "/problems/create" : `/problems/edit/${params.id}`}
//       >
//         <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-slate-900/10 pb-12 md:grid-cols-2">
//           <div>
//             <h2 className="text-base font-semibold leading-7 text-slate-900">
//               Problem Details
//             </h2>
//             <p className="mt-1 text-sm leading-6 text-slate-600">
//               Please fill out the problem details.
//             </p>
//           </div>

//           <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8">
//             <div className="sm:col-span-4">
//               <label
//                 htmlFor="title"
//                 className="block text-sm font-medium leading-6 text-slate-900"
//               >
//                 Title
//               </label>
//               <div className="mt-2">
//                 <input
//                   type="text"
//                   name="title"
//                   id="title"
//                   className="block w-full border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-slate-600 focus:border-slate-600"
//                   placeholder="Enter problem title"
//                   value={form.title}
//                   onChange={(e) => updateForm({ title: e.target.value })}
//                 />
//               </div>
//             </div>
//             <div className="sm:col-span-4">
//               <label
//                 htmlFor="type"
//                 className="block text-sm font-medium leading-6 text-slate-900"
//               >
//                 Type
//               </label>
//               <div className="mt-2">
//                 <input
//                   type="text"
//                   name="type"
//                   id="type"
//                   className="block w-full border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-slate-600 focus:border-slate-600"
//                   placeholder="Enter problem type"
//                   value={form.type}
//                   onChange={(e) => updateForm({ type: e.target.value })}
//                 />
//               </div>
//             </div>
//             <div>
//               <fieldset className="mt-4">
//                 <legend className="block text-sm font-medium leading-6 text-slate-900">
//                   Difficulty
//                 </legend>
//                 <div className="space-y-2 sm:flex sm:items-center sm:space-x-4 sm:space-y-0">
//                   <div className="flex items-center">
//                     <input
//                       id="difficultyEasy"
//                       name="difficulty"
//                       type="radio"
//                       value="Easy"
//                       className="h-4 w-4 border-slate-300 text-slate-600 focus:ring-slate-600 cursor-pointer"
//                       checked={form.difficulty === "Easy"}
//                       onChange={(e) =>
//                         updateForm({ difficulty: e.target.value })
//                       }
//                     />
//                     <label
//                       htmlFor="difficultyEasy"
//                       className="ml-3 block text-sm font-medium leading-6 text-slate-900"
//                     >
//                       Easy
//                     </label>
//                   </div>
//                   <div className="flex items-center">
//                     <input
//                       id="difficultyMedium"
//                       name="difficulty"
//                       type="radio"
//                       value="Medium"
//                       className="h-4 w-4 border-slate-300 text-slate-600 focus:ring-slate-600 cursor-pointer"
//                       checked={form.difficulty === "Medium"}
//                       onChange={(e) =>
//                         updateForm({ difficulty: e.target.value })
//                       }
//                     />
//                     <label
//                       htmlFor="difficultyMedium"
//                       className="ml-3 block text-sm font-medium leading-6 text-slate-900"
//                     >
//                       Medium
//                     </label>
//                   </div>
//                   <div className="flex items-center">
//                     <input
//                       id="difficultyHard"
//                       name="difficulty"
//                       type="radio"
//                       value="Hard"
//                       className="h-4 w-4 border-slate-300 text-slate-600 focus:ring-slate-600 cursor-pointer"
//                       checked={form.difficulty === "Hard"}
//                       onChange={(e) =>
//                         updateForm({ difficulty: e.target.value })
//                       }
//                     />
//                     <label
//                       htmlFor="difficultyHard"
//                       className="ml-3 block text-sm font-medium leading-6 text-slate-900"
//                     >
//                       Hard
//                     </label>
//                   </div>
//                 </div>
//               </fieldset>
//             </div>
//             <div className="sm:col-span-4">
//               <label
//                 htmlFor="statement"
//                 className="block text-sm font-medium leading-6 text-slate-900"
//               >
//                 Statement
//               </label>
//               <div className="mt-2">
//                 <textarea
//                   id="statement"
//                   name="statement"
//                   className="block w-full border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-slate-600 focus:border-slate-600"
//                   rows="3"
//                   placeholder="Enter problem statement"
//                   value={form.statement}
//                   onChange={(e) => updateForm({ statement: e.target.value })}
//                 ></textarea>
//               </div>
//             </div>
//             <div className="sm:col-span-4">
//               <label
//                 htmlFor="constraints"
//                 className="block text-sm font-medium leading-6 text-slate-900"
//               >
//                 Constraints
//               </label>
//               <div className="mt-2">
//                 <textarea
//                   id="constraints"
//                   name="constraints"
//                   className="block w-full border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-slate-600 focus:border-slate-600"
//                   rows="3"
//                   placeholder="Enter problem constraints"
//                   value={form.constraints}
//                   onChange={(e) => updateForm({ constraints: e.target.value })}
//                 ></textarea>
//               </div>
//             </div>

//             {/* Test Cases section */}
//             <div className="sm:col-span-4">
//               <label className="block text-sm font-medium leading-6 text-slate-900">
//                 Test Cases
//               </label>
//               <div className="mt-2">
//                 {form.testCases.map((testCase, index) => (
//                   <div
//                     key={index}
//                     className="border border-slate-900/10 rounded-lg p-4 mb-4"
//                   >
//                     <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-4">
//                       <div className="sm:col-span-2">
//                         <label
//                           htmlFor={`explanation${index}`}
//                           className="block text-sm font-medium leading-6 text-slate-900"
//                         >
//                           Explanation
//                         </label>
//                         <textarea
//                           id={`explanation${index}`}
//                           name={`explanation${index}`}
//                           className="block w-full border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-slate-600 focus:border-slate-600"
//                           rows="2"
//                           placeholder="Enter test case explanation"
//                           value={testCase.explanation}
//                           onChange={(e) =>
//                             updateTestCase(index, {
//                               explanation: e.target.value,
//                             })
//                           }
//                         ></textarea>
//                       </div>
//                       <div>
//                         <label
//                           htmlFor={`inputText${index}`}
//                           className="block text-sm font-medium leading-6 text-slate-900"
//                         >
//                           Input Text
//                         </label>
//                         <textarea
//                           id={`inputText${index}`}
//                           name={`inputText${index}`}
//                           className="block w-full border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-slate-600 focus:border-slate-600"
//                           rows="2"
//                           placeholder="Enter input text for test case"
//                           value={testCase.inputText}
//                           onChange={(e) =>
//                             updateTestCase(index, {
//                               inputText: e.target.value,
//                             })
//                           }
//                         ></textarea>
//                       </div>
//                       <div>
//                         <label
//                           htmlFor={`outputText${index}`}
//                           className="block text-sm font-medium leading-6 text-slate-900"
//                         >
//                           Output Text
//                         </label>
//                         <textarea
//                           id={`outputText${index}`}
//                           name={`outputText${index}`}
//                           className="block w-full border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-slate-600 focus:border-slate-600"
//                           rows="2"
//                           placeholder="Enter expected output text"
//                           value={testCase.outputText}
//                           onChange={(e) =>
//                             updateTestCase(index, {
//                               outputText: e.target.value,
//                             })
//                           }
//                         ></textarea>
//                       </div>
//                     </div>
//                     <button
//                       type="button"
//                       className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
//                       onClick={() => removeTestCase(index)}
//                     >
//                       Remove Test Case
//                     </button>
//                   </div>
//                 ))}
//                 <button
//                   type="button"
//                   className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                   onClick={addTestCase}
//                 >
//                   Add Test Case
//                 </button>
//               </div>
//             </div>

//             {/* Submit button */}
//             <input
//               type="submit"
//               value={isNew ? "Create Problem" : "Update Problem"}
//               className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3 cursor-pointer mt-4"
//             />
//           </div>
//         </div>
//       </form >
//     </>
//   );
// }

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Problem() {
  const [form, setForm] = useState({});
  const [isNew, setIsNew] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id?.toString() || undefined;
      if (!id) return;
      setIsNew(false);

      try {
        const response = await fetch(`http://localhost:5050/problem/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        if (!result) {
          console.warn(`Problem with id ${id} not found`);
          navigate("/problems");
          return;
        }

        // Log the fetched result object
        console.log("Fetched Result:", result);

        // Update form state with fetched data
        setForm(result);
      } catch (error) {
        console.error('Fetch error:', error);
        // Handle error state or navigate away
      }
    }
    fetchData();
  }, [params.id, navigate]);

  useEffect(() => {
    console.log("Form State:", form);
  }, [form]);

  return (
    <>
      <h3>{isNew ? "Create Problem" : "Update Problem"}</h3>
      <div>
        <h4>Problem Details:</h4>
        <p>Title: {form.title}</p>
        <p>Type: {form.type}</p>
        <p>Difficulty: {form.difficulty}</p>
        <p>Statement: {form.statement}</p>
        <p>Constraints: {form.constraints}</p>
      </div>
      <div>
        <h4>Test Cases:</h4>
        {form.testCases && form.testCases.length > 0 ? (
          form.testCases.map((testCase, index) => (
            <div key={index}>
              <p>Test Case {index + 1}</p>
              <p>Explanation: {testCase.explanation}</p>
              <p>Input Text: {testCase.inputText}</p>
              <p>Output Text: {testCase.outputText}</p>
            </div>
          ))
        ) : (
          <p>No test cases provided.</p>
        )}
      </div>
    </>
  );
}
