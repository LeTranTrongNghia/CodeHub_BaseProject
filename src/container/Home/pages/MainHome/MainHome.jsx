import React, { useEffect, useState } from 'react';
import Problem from '../../../../components/MainHome/Problem';
import DateButton from '../../../../components/MainHome/DateButton';

const MainHome = () => {
	return <div className="h-screen bg-black text-gray-400 overflow-hidden">
		{/* Sidebar */}
		<button data-drawer-target="separator-sidebar" data-drawer-toggle="separator-sidebar" aria-controls="separator-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
			<span class="sr-only">Open sidebar</span>
			<svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
				<path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
			</svg>
		</button>
		<aside id="separator-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
			<div class="h-full px-3 py-4 overflow-y-auto bg-black">
				<a href="" class="flex items-center ps-2.5 mb-5">
					<svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9 8L5 11.6923L9 16M15 8L19 11.6923L15 16" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
					<span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">CodeSpace</span>
				</a>
				<ul class="space-y-2 font-medium">
					<li>
						<a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
							<svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
								<path fill-rule="evenodd" d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z" clip-rule="evenodd" />
							</svg>
							<span class="ms-3">Dashboard</span>
						</a>
					</li>
					<li>
						<a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
							<svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
								<path fill-rule="evenodd" d="M20 10H4v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8ZM9 13v-1h6v1a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1Z" clip-rule="evenodd" />
								<path d="M2 6a2 2 0 0 1 2-2h16a2 2 0 1 1 0 4H4a2 2 0 0 1-2-2Z" />
							</svg>
							<span class="flex-1 ms-3 whitespace-nowrap">My Courses</span>
							<span class="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">Pro</span>
						</a>
					</li>
					<li>
						<a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
							<svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
								<path fill-rule="evenodd" d="M4 3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h1v2a1 1 0 0 0 1.707.707L9.414 13H15a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4Z" clip-rule="evenodd" />
								<path fill-rule="evenodd" d="M8.023 17.215c.033-.03.066-.062.098-.094L10.243 15H15a3 3 0 0 0 3-3V8h2a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-1v2a1 1 0 0 1-1.707.707L14.586 18H9a1 1 0 0 1-.977-.785Z" clip-rule="evenodd" />
							</svg>
							<span class="flex-1 ms-3 whitespace-nowrap">Messages</span>
							<span class="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
						</a>
					</li>
					<li>
						<a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
							<svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
								<path fill-rule="evenodd" d="M12 14a3 3 0 0 1 3-3h4a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-4a3 3 0 0 1-3-3Zm3-1a1 1 0 1 0 0 2h4v-2h-4Z" clip-rule="evenodd" />
								<path fill-rule="evenodd" d="M12.293 3.293a1 1 0 0 1 1.414 0L16.414 6h-2.828l-1.293-1.293a1 1 0 0 1 0-1.414ZM12.414 6 9.707 3.293a1 1 0 0 0-1.414 0L5.586 6h6.828ZM4.586 7l-.056.055A2 2 0 0 0 3 9v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2h-4a5 5 0 0 1 0-10h4a2 2 0 0 0-1.53-1.945L17.414 7H4.586Z" clip-rule="evenodd" />
							</svg>
							<span class="flex-1 ms-3 whitespace-nowrap">Payments</span>
						</a>
					</li>
					<li>
						<a href="#" class="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
							<svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
								<path d="M5 13.17a3.001 3.001 0 0 0 0 5.66V20a1 1 0 1 0 2 0v-1.17a3.001 3.001 0 0 0 0-5.66V4a1 1 0 0 0-2 0v9.17ZM11 20v-9.17a3.001 3.001 0 0 1 0-5.66V4a1 1 0 1 1 2 0v1.17a3.001 3.001 0 0 1 0 5.66V20a1 1 0 1 1-2 0Zm6-1.17V20a1 1 0 1 0 2 0v-1.17a3.001 3.001 0 0 0 0-5.66V4a1 1 0 1 0-2 0v9.17a3.001 3.001 0 0 0 0 5.66Z" />
							</svg>

							<span class="ms-3">Analytics</span>
						</a>
					</li>
				</ul>
				<div id="dropdown-cta" class="p-4 mt-6 rounded-lg bg-blue-50 dark:bg-blue-900" role="alert">
					<div class="flex items-center mb-3">
						<span class="bg-orange-100 text-orange-800 text-sm font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-orange-200 dark:text-orange-900">Beta</span>
						<button type="button" class="ms-auto -mx-1.5 -my-1.5 bg-blue-50 inline-flex justify-center items-center w-6 h-6 text-blue-900 rounded-lg focus:ring-2 focus:ring-blue-400 p-1 hover:bg-blue-200 h-6 w-6 dark:bg-blue-900 dark:text-blue-400 dark:hover:bg-blue-800" data-dismiss-target="#dropdown-cta" aria-label="Close">
							<span class="sr-only">Close</span>
							<svg class="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
								<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
							</svg>
						</button>
					</div>
					<p class="mb-3 text-sm text-blue-800 dark:text-blue-400">
						Calling all future coders! Our coding education platform is blasting off in beta soon. Sign up to join the adventure!
					</p>
					<a class="text-sm text-blue-800 underline font-medium hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300" href="#">Join us!</a>
				</div>
				<ul class="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
					<li>
						<a href="#" class="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
							<svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
								<path d="M5 13.17a3.001 3.001 0 0 0 0 5.66V20a1 1 0 1 0 2 0v-1.17a3.001 3.001 0 0 0 0-5.66V4a1 1 0 0 0-2 0v9.17ZM11 20v-9.17a3.001 3.001 0 0 1 0-5.66V4a1 1 0 1 1 2 0v1.17a3.001 3.001 0 0 1 0 5.66V20a1 1 0 1 1-2 0Zm6-1.17V20a1 1 0 1 0 2 0v-1.17a3.001 3.001 0 0 0 0-5.66V4a1 1 0 1 0-2 0v9.17a3.001 3.001 0 0 0 0 5.66Z" />
							</svg>
							<span class="ms-3">Setting</span>
						</a>
					</li>
					<li>
						<a href="#" class="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
							<svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
								<path fill-rule="evenodd" d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z" clip-rule="evenodd" />
							</svg>
							<span class="ms-3">Account</span>
						</a>
					</li>
				</ul>
			</div>
		</aside>

		{/* Main */}
		<div class="p-4 sm:ml-64">
			{/* class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700" */}
			<div className='p-4'>
				<div class="flex h-300 mb-4 rounded bg-gray-800 bg-[url('https://media.istockphoto.com/id/1406263653/nl/vector/dark-blue-abstract-with-colorful-light-for-background.jpg?s=612x612&w=0&k=20&c=q_hOjh_XpzA4ZxaApExc7CBbAtW3Se2hw7ZxlvDfujw=')] bg-cover">
					<p class="text-5xl font-bold text-white dark:text-white mt-6 ml-10">
						<h1>WELCOME BACK,</h1>
						<h1 className="mt-4">IVEL</h1>
						<div className="flex items-center w-[1280px]">
							<h1 className="flex-1 text-base text-white font-medium mt-4 mb-4">Track your progress, manage your courses activity and conversion</h1>
							<div className="flex items-center">
								<DateButton />
								<button className="bg-green-400 p-3 rounded-md hover:bg-green-300 transition-all duration-300 mx-2 text-left px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 bg-gray-900 text-black text-sm">
									Add course +
								</button>
							</div>
						</div>
					</p>
				</div>
				<div class="grid grid-cols-2 gap-4 mb-4">
					<div class="flex h-[520px] items-center justify-center rounded h-28 bg-gray-800">
						<div className="flex h-[515px] rounded h-28 bg-gray-800">
							<div className='w-[650px] items-center justify-center overflow-auto scrollbar ml-2 mr-2'>
								<Problem />
								<Problem />
								<Problem />
								<Problem />
								<Problem />
								<Problem />
							</div>
						</div>
					</div>
					<div class="grid grid-rows-2 h-[520px] items-center justify-center rounded h-28 bg-gray-800">
						<div class="flex mt-4 h-[250px] w-[600px] rounded">
							<div class="h-full w-[395px] rounded mr-5">
								<div class="flex h-[170px] w-[395px] rounded h-28 mb-4">
									<article
										class="h-[170px] w-[395px] rounded-lg p-6 bg-gray-700"
									>
										<div class="flex items-center justify-between">
											<div>
												<p class="text-xl text-white mb-1">Assignments</p>

												<p class="text-4xl font-medium text-gray-900 dark:text-white mb-2">12</p>
											</div>

											<span class="rounded-full bg-blue-100 p-3 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
												<svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5.5 8C6.88071 8 8 6.88071 8 5.5C8 4.11929 6.88071 3 5.5 3C4.11929 3 3 4.11929 3 5.5C3 6.88071 4.11929 8 5.5 8ZM5.5 8V16M5.5 16C4.11929 16 3 17.1193 3 18.5C3 19.8807 4.11929 21 5.5 21C6.88071 21 8 19.8807 8 18.5C8 17.1193 6.88071 16 5.5 16ZM18.5 16V8.7C18.5 7.5799 18.5 7.01984 18.282 6.59202C18.0903 6.21569 17.7843 5.90973 17.408 5.71799C16.9802 5.5 16.4201 5.5 15.3 5.5H12M18.5 16C19.8807 16 21 17.1193 21 18.5C21 19.8807 19.8807 21 18.5 21C17.1193 21 16 19.8807 16 18.5C16 17.1193 17.1193 16 18.5 16ZM12 5.5L14.5 8M12 5.5L14.5 3" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
											</span>
										</div>

										<div class="mt-1 flex gap-1 text-green-600">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												class="h-7 w-7"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
												/>
											</svg>

											<p class="flex gap-2 text-xl">
												<span class="font-medium"> 24.81% </span>

												<span class="text-lg text-gray-400 ml-1"> Since last week </span>
											</p>
										</div>
									</article>

								</div>
								<div class="grid grid-cols-2 h-[78px] w-[395px] rounded h-28">
									<div class="flex items-center justify-center h-full w-[190px] rounded bg-gray-700 h-28 mt-1 mr-2">
										<div class="w-3 h-3 rounded-full bg-green-300 mb-5 mr-4"></div>
										<div>
											<h1 className='text-xl text-white font-medium'>28</h1>
											<h1 className='text-sm text-white font-medium'>Lesson complete</h1>
										</div>
									</div>
									<div class="flex items-center justify-center h-full w-[190px] rounded bg-gray-700 h-28 mt-1 ml-2">
										<div class="w-3 h-3 rounded-full bg-blue-300 mb-5 mr-4"></div>
										<div>
											<h1 className='text-xl text-white font-medium'>120</h1>
											<h1 className='text-sm text-white font-medium'>Homework complete</h1>
										</div>
									</div>
								</div>
							</div>
							<div class="h-full w-[195px] rounded h-28">
								<div class="flex items-center justify-center h-[80px] w-full rounded mb-3 bg-gray-700">
									<svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 7V12L14.5 10.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
									<span class="ms-3 text-lg text-white">3 this week</span>
								</div>
								<div class="flex items-center justify-center h-[80px] w-full rounded mb-3 bg-gray-700">
									<svg fill="#ffffff" width="28px" height="28px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M19,4H17V3a1,1,0,0,0-2,0V4H9V3A1,1,0,0,0,7,3V4H5A3,3,0,0,0,2,7V19a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V7A3,3,0,0,0,19,4Zm1,15a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V12H20Zm0-9H4V7A1,1,0,0,1,5,6H7V7A1,1,0,0,0,9,7V6h6V7a1,1,0,0,0,2,0V6h2a1,1,0,0,1,1,1Z"></path></g></svg>
									<span class="ms-3 text-lg text-white">76 all time</span>
								</div>
								<div class="flex items-center justify-center h-[80px] w-full rounded mb-3 bg-gray-700 mt-4">
									<div class="w-3 h-3 rounded-full bg-purple-300 mb-5 mr-2"></div>
									<div>
										<h1 className='text-xl text-white font-medium'>6</h1>
										<h1 className='text-sm text-white font-medium'>Average learning time</h1>
									</div>
								</div>
							</div>
						</div>

						<div class="h-[200px] w-[600px] relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-gray-700 bg-gray-700 mt-8">
							<div class="w-full md:w-1/3 grid place-items-center bg-green-300 bg-[url('https://media.istockphoto.com/id/1406263653/nl/vector/dark-blue-abstract-with-colorful-light-for-background.jpg?s=612x612&w=0&k=20&c=q_hOjh_XpzA4ZxaApExc7CBbAtW3Se2hw7ZxlvDfujw=')] bg-cover rounded">
								<svg width="100px" height="100px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9 8L5 11.6923L9 16M15 8L19 11.6923L15 16" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
								<span class="mb-4 self-center text-2xl font-semibold whitespace-nowrap dark:text-white">CodeSpace</span>
							</div>
							<div class="w-full md:w-2/3 flex flex-col p-3">
								<h3 class="font-black text-white md:text-3xl text-xl"> Grand Coding Contest</h3>
								<p class="md:text-lg text-white font-medium mt-4">Biggest Coding Contest
									<br />Prizes Worth 1 Million $
									<br />Grand Coding Contest World Wide
									</p>
							</div>


						</div>
					</div>
				</div>
			</div>
		</div>
	</div>;
};

export default MainHome;