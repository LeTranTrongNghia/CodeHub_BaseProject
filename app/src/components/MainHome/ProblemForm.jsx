import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function ProblemForm() {
	const [form, setForm] = useState({
		title: '',
		type: '',
		difficulty: '',
		statement: '',
		constraints: '',
		testCases: [
			{
				explanation: '',
				inputText: '',
				outputText: '',
			},
		],
	});
	const [isNew, setIsNew] = useState(true);
	const params = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		async function fetchData() {
			const id = params.id?.toString() || undefined;
			if (!id) return;
			setIsNew(false);
			const response = await fetch(`http://localhost:5050/problem/${id}`);
			if (!response.ok) {
				const message = `An error has occurred: ${response.statusText}`;
				console.error(message);
				return;
			}
			const problem = await response.json();
			if (!problem) {
				console.warn(`Problem with id ${id} not found`);
				navigate('/');
				return;
			}
			setForm(problem);
		}
		fetchData();
		return;
	}, [params.id, navigate]);

	function updateForm(value) {
		return setForm(prev => {
			return { ...prev, ...value };
		});
	}

	function updateTestCase(index, value) {
		const updatedTestCases = form.testCases.map((testCase, i) =>
			i === index ? { ...testCase, ...value } : testCase,
		);
		setForm(prev => ({ ...prev, testCases: updatedTestCases }));
	}

	function addTestCase() {
		setForm(prev => ({
			...prev,
			testCases: [
				...prev.testCases,
				{ explanation: '', inputText: '', outputText: '' },
			],
		}));
	}

	function removeTestCase(index) {
		const updatedTestCases = form.testCases.filter((_, i) => i !== index);
		setForm(prev => ({ ...prev, testCases: updatedTestCases }));
	}

	async function onSubmit(e) {
		e.preventDefault();
		const problem = { ...form };
		try {
			let response;
			if (isNew) {
				response = await fetch('http://localhost:5050/problem', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(problem),
				});
			} else {
				response = await fetch(`http://localhost:5050/problem/${params.id}`, {
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(problem),
				});
			}

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
		} catch (error) {
			console.error('A problem occurred with your fetch operation: ', error);
		} finally {
			setForm({
				title: '',
				type: '',
				difficulty: '',
				statement: '',
				constraints: '',
				testCases: [{ explanation: '', inputText: '', outputText: '' }],
			});
			navigate('/problems');
		}
	}

	return (
		<>
			<h3 className='text-lg font-semibold p-4'>Create/Update Problem</h3>
			<form
				onSubmit={onSubmit}
				className='border rounded-lg overflow-hidden p-4'
			>
				<div className='grid grid-cols-1 gap-x-8 gap-y-10 border-b border-slate-900/10 pb-12 md:grid-cols-2'>
					<div>
						<h2 className='text-base font-semibold leading-7 text-slate-900'>
							Problem Info
						</h2>
						<p className='mt-1 text-sm leading-6 text-slate-600'>
							This information will be displayed publicly so be careful what you
							share.
						</p>
					</div>

					<div className='grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8'>
						<div className='sm:col-span-4'>
							<label
								htmlFor='title'
								className='block text-sm font-medium leading-6 text-slate-900'
							>
								Title
							</label>
							<div className='mt-2'>
								<div className='flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
									<input
										type='text'
										name='title'
										id='title'
										className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6'
										value={form.title}
										onChange={e => updateForm({ title: e.target.value })}
									/>
								</div>
							</div>
						</div>
						<div className='sm:col-span-4'>
							<label
								htmlFor='type'
								className='block text-sm font-medium leading-6 text-slate-900'
							>
								Type
							</label>
							<div className='mt-2'>
								<div className='flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
									<input
										type='text'
										name='type'
										id='type'
										className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6'
										value={form.type}
										onChange={e => updateForm({ type: e.target.value })}
									/>
								</div>
							</div>
						</div>
						<div className='sm:col-span-4'>
							<label
								htmlFor='difficulty'
								className='block text-sm font-medium leading-6 text-slate-900'
							>
								Difficulty
							</label>
							<div className='mt-2 flex space-x-4'>
								<div className='flex items-center'>
									<input
										id='easy'
										name='difficulty'
										type='radio'
										value='Easy'
										className='border-slate-300 text-slate-900 focus:ring-0 cursor-pointer'
										checked={form.difficulty === 'Easy'}
										onChange={e => updateForm({ difficulty: e.target.value })}
									/>
									<label
										htmlFor='easy'
										className='ml-2 text-sm font-medium leading-6 text-slate-900'
									>
										Easy
									</label>
								</div>
								<div className='flex items-center'>
									<input
										id='medium'
										name='difficulty'
										type='radio'
										value='Medium'
										className='border-slate-300 text-slate-900 focus:ring-0 cursor-pointer'
										checked={form.difficulty === 'Medium'}
										onChange={e => updateForm({ difficulty: e.target.value })}
									/>
									<label
										htmlFor='medium'
										className='ml-2 text-sm font-medium leading-6 text-slate-900'
									>
										Medium
									</label>
								</div>
								<div className='flex items-center'>
									<input
										id='hard'
										name='difficulty'
										type='radio'
										value='Hard'
										className='border-slate-300 text-slate-900 focus:ring-0 cursor-pointer'
										checked={form.difficulty === 'Hard'}
										onChange={e => updateForm({ difficulty: e.target.value })}
									/>
									<label
										htmlFor='hard'
										className='ml-2 text-sm font-medium leading-6 text-slate-900'
									>
										Hard
									</label>
								</div>
							</div>
						</div>

						<div className='sm:col-span-4'>
							<label
								htmlFor='statement'
								className='block text-sm font-medium leading-6 text-slate-900'
							>
								Statement
							</label>
							<div className='mt-2'>
								<textarea
									name='statement'
									id='statement'
									className='py-1.5 pl-1 block w-full rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
									value={form.statement}
									onChange={e => updateForm({ statement: e.target.value })}
								/>
							</div>
						</div>
						<div className='sm:col-span-4'>
							<label
								htmlFor='constraints'
								className='block text-sm font-medium leading-6 text-slate-900'
							>
								Constraints
							</label>
							<div className='mt-2'>
								<textarea
									name='constraints'
									id='constraints'
									className='py-1.5 pl-1 block w-full rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
									value={form.constraints}
									onChange={e => updateForm({ constraints: e.target.value })}
								/>
							</div>
						</div>
						{form.testCases.map((testCase, index) => (
							<div key={index} className='sm:col-span-4'>
								<label
									htmlFor={`explanation-${index}`}
									className='block text-sm font-medium leading-6 text-slate-900'
								>
									Test Case {index + 1} Explanation
								</label>
								<div className='mt-2'>
									<textarea
										name={`explanation-${index}`}
										id={`explanation-${index}`}
										className='py-1.5 pl-1 block w-full rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
										value={testCase.explanation}
										onChange={e =>
											updateTestCase(index, { explanation: e.target.value })
										}
									/>
								</div>
								<label
									htmlFor={`inputText-${index}`}
									className='block text-sm font-medium leading-6 text-slate-900 mt-4'
								>
									Test Case {index + 1} Input Text
								</label>
								<div className='mt-2'>
									<textarea
										name={`inputText-${index}`}
										id={`inputText-${index}`}
										className='py-1.5 pl-1 block w-full rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
										value={testCase.inputText}
										onChange={e =>
											updateTestCase(index, { inputText: e.target.value })
										}
									/>
								</div>
								<label
									htmlFor={`outputText-${index}`}
									className='block text-sm font-medium leading-6 text-slate-900 mt-4'
								>
									Test Case {index + 1} Output Text
								</label>
								<div className='mt-2'>
									<textarea
										name={`outputText-${index}`}
										id={`outputText-${index}`}
										className='py-1.5 pl-1 block w-full rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
										value={testCase.outputText}
										onChange={e =>
											updateTestCase(index, { outputText: e.target.value })
										}
									/>
								</div>
								<button
									type='button'
									className='inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-red-100 hover:text-red-600 h-9 rounded-md px-3 mt-4 cursor-pointer'
									onClick={() => removeTestCase(index)}
								>
									Remove Test Case
								</button>
							</div>
						))}
						<button
							type='button'
							className='inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3 mt-4 cursor-pointer'
							onClick={addTestCase}
						>
							Add Test Case
						</button>
					</div>
				</div>
				<input
					type='submit'
					value='Save Problem'
					className='inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3 cursor-pointer mt-4'
				/>
			</form>
		</>
	);
}
