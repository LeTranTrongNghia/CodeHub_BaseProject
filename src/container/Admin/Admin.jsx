import React, { useState } from 'react';
import { firestore } from '@/firebase/firebase';

function AddProblemForm() {
    const [title, setTitle] = useState('');
    const [statement, setStatement] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [constraints, setConstraints] = useState('');
    const [testCases, setTestCases] = useState([]); // Array to store test cases

    const handleAddTestCase = () => {
        setTestCases([...testCases, { explanation: '', inputText: '', outputText: '' }]);
    };

    const handleRemoveTestCase = (index) => {
        const updatedTestCases = [...testCases];
        updatedTestCases.splice(index, 1);
        setTestCases(updatedTestCases);
    };

    const handleTestCaseChange = (e, index, field) => {
        const updatedTestCases = [...testCases];
        updatedTestCases[index][field] = e.target.value;
        setTestCases(updatedTestCases);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const testCaseIds = [];
        const testCaseRefs = []; // To store references to added test cases

        // Add test cases to a separate collection (TestCases) and get references
        for (const testCase of testCases) {
            const testCaseRef = await firestore.collection('TestCases').add(testCase);
            testCaseIds.push(testCaseRef.id);
            testCaseRefs.push(testCaseRef);
        }

        const newProblem = {
            title,
            statement,
            difficulty,
            constraints,
            likes: 0,
            dislikes: 0,
            starred: false,
            testCaseId: testCaseIds, // Array of test case IDs
        };

        try {
            await firestore.collection('Problems').add(newProblem);
            alert('Problem added successfully!'); 

            // After adding the problem, update references in test cases
            for (let i = 0; i < testCaseRefs.length; i++) {
                await testCaseRefs[i].update({ problemId: firestore.collection('Problems').doc(newProblem.id) });
            }

            setTitle('');
            setStatement('');
            setDifficulty('');
            setConstraints('');
            setTestCases([]);
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div className="flex flex-col">
                <label htmlFor="title" className="text-sm font-medium">
                    Title
                </label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="statement" className="text-sm font-medium">
                    Problem Statement
                </label>
                <textarea
                    id="statement"
                    value={statement}
                    onChange={(e) => setStatement(e.target.value)}
                    className="rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="difficulty" className="text-sm font-medium">
                    Difficulty
                </label>
                <select
                    id="difficulty"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                </select>
            </div>
            <div className="flex flex-col">
                <label htmlFor="constraints" className="text-sm font-medium">
                    Constraints (Optional)
                </label>
                <textarea
                    id="constraints"
                    value={constraints}
                    onChange={(e) => setConstraints(e.target.value)}
                    className="rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
            </div>

            {/* Test Cases Section */}
            <div className="flex flex-col space-y-2">
                <h3 className="text-lg font-bold">Test Cases</h3>
                <button type="button" onClick={handleAddTestCase} className="inline-flex items-center px-2 py-1 bg-green-500 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                    Add Test Case
                </button>
                {testCases.map((testCase, index) => (
                    <div key={index} className="flex flex-col space-y-2 border border-gray-300 rounded-md p-2">
                        <label htmlFor={`explanation-${index}`} className="text-sm font-medium">
                            Explanation
                        </label>
                        <textarea
                            id={`explanation-${index}`}
                            value={testCase.explanation}
                            onChange={(e) => handleTestCaseChange(e, index, 'explanation')}
                            className="rounded-md border-none focus:outline-none"
                        />
                        <label htmlFor={`inputText-${index}`} className="text-sm font-medium">
                            Input Text
                        </label>
                        <input
                            id={`inputText-${index}`}
                            type="text"
                            value={testCase.inputText}
                            onChange={(e) => handleTestCaseChange(e, index, 'inputText')}
                            className="rounded-md border-none focus:outline-none"
                        />
                        <label htmlFor={`outputText-${index}`} className="text-sm font-medium">
                            Output Text
                        </label>
                        <input
                            id={`outputText-${index}`}
                            type="text"
                            value={testCase.outputText}
                            onChange={(e) => handleTestCaseChange(e, index, 'outputText')}
                            className="rounded-md border-none focus:outline-none"
                        />
                        <button
                            type="button"
                            onClick={() => handleRemoveTestCase(index)}
                            className="inline-flex items-center px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                            Remove Test Case
                        </button>
                    </div>
                ))}
            </div>

            <button
                type="submit"
                className="inline-flex items-center px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Add Problem
            </button>
        </form>
    );
}

export default AddProblemForm;

