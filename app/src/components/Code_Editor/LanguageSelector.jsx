import React, { useState, useEffect } from 'react';
import { LANGUAGE_VERSIONS } from '/src/container/Workspace/Code_Editor/constant/constants';
import { useNavigate } from 'react-router-dom';

const LanguageSelector = ({ onSelect }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedLanguage, setSelectedLanguage] = useState(null);

	const navigate = useNavigate();
	useEffect(() => {
		// Set the default language to the first language in the LANGUAGE_VERSIONS object
		const defaultLanguage = Object.keys(LANGUAGE_VERSIONS)[0];
		setSelectedLanguage(defaultLanguage);
	}, []);

	const handleClick = lang => {
		setSelectedLanguage(lang);
		onSelect(lang);
		setIsOpen(false); // Close the dropdown list when a language is selected
	};

	return (
		<div className='ml-4 mb-4'>
			<h2 className='mb-2 text-lg'>Language:</h2>
			<div className='flex justify-between'>
				<button
					className={`text-left px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 hover:bg-blue-400 ${
						selectedLanguage
							? `bg-gray-900 text-white`
							: `border border-gray-300 hover:bg-gray-100`
					}`}
					onClick={() => setIsOpen(!isOpen)}
				>
					{selectedLanguage || 'Select Language'}
				</button>
				{isOpen && (
					<ul className='absolute bg-gray-900 text-white z-50 rounded-md overflow-hidden shadow-md mt-12'>
						{Object.entries(LANGUAGE_VERSIONS).map(([lang, version]) => (
							<li
								key={lang}
								className={`px-4 py-2 hover:bg-gray-800 cursor-pointer ${
									selectedLanguage === lang ? `bg-blue-500 text-white` : ''
								}`}
								onClick={() => handleClick(lang)}
							>
								{lang} &nbsp;
								<span className='text-gray-400 text-sm'>{version}</span>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};

export default LanguageSelector;
