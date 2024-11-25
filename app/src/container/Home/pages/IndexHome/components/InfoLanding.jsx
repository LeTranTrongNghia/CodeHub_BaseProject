import {
	Bird,
	Rabbit,
	Turtle,
	RotateCw,
	Activity,
	Code2,
	Dices,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	TooltipProvider,
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { PolarAngleAxis, RadialBar, RadialBarChart } from 'recharts';
import { Card, CardContent } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import React from 'react';
import MaskText from '@/container/Home/pages/IndexHome/common/MaskText';

const InfoLanding = () => {
	return (
		<div className='py-16 sm:py-20'>
			<div className='mx-auto grid max-w-7xl gap-10 px-4 sm:gap-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8'>
				<div className='lg:order-2'>
					<MaskText phrases={['Master Coding, Faster']} tag='h2'/>
					<MaskText phrases={['Unlock your full coding potential with our AI-powered platform. Learn at your own pace, master new skills, and build amazing projects.']} tag='p'/>
					<dl className='mt-6 space-y-4 leading-7'>
						<div className='relative pl-8'>
							<dt className='font-semibold'>
								<Activity className='absolute left-0 top-1 size-5 stroke-purple-700' />
								<MaskText phrases={['Track Your Progress']} tag='span'/>
							</dt>
							<dd className='text-sm text-muted-foreground'>
								<MaskText phrases={['Stay motivated with detailed learning analytics and time management tools.']} tag='p'/>
							</dd>
						</div>
						<div className='relative pl-8'>
							<dt className='font-semibold'>
								<Code2 className='absolute left-0 top-1 size-5 stroke-purple-700' />
								<MaskText phrases={['Learn Smarter, Not Harder']} tag='span'/>
							</dt>
							<dd className='text-sm text-muted-foreground'>
								<MaskText phrases={['Dive into interactive lessons, practice with quizzes, and get expert feedback from our AI tutor.']} tag='p'/>
							</dd>
						</div>
						<div className='relative pl-8'>
							<dt className='font-semibold'>
								<Dices className='absolute left-0 top-1 size-5 stroke-purple-700' />
								<MaskText phrases={['Conquer Coding Challenges']} tag='span'/>
							</dt>
							<dd className='text-sm text-muted-foreground'>
								<MaskText phrases={['Solve coding problems, get hints from our AI, and improve your problem-solving skills.']} tag='p'/>
							</dd>
						</div>
					</dl>
				</div>
				<div className='rounded-xl overflow-hidden border lg:-m-4 '>
					<div className='relative aspect-video p-2'>
						<div className='relative hidden flex-col items-start gap-8 md:flex'>
							<form className='grid w-full items-start gap-6'>
								<fieldset className='grid gap-6 rounded-lg border p-4'>
									<legend className='-ml-1 px-1 text-sm font-medium'>
										Infomation
									</legend>

									<div className='grid gap-3'>
										<Label htmlFor='model'>Model</Label>
										<Select>
											<SelectTrigger
												id='model'
												className='items-start [&_[data-description]]:hidden'
											>
												<SelectValue placeholder='Select a model' />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value='syntax'>
													<div className='flex items-start gap-3 text-muted-foreground'>
														<Rabbit className='size-5' />
														<div className='grid gap-0.5'>
															<p>
																Neural{' '}
																<span className='font-medium text-foreground'>
																	Genesis
																</span>
															</p>
															<p className='text-xs' data-description>
																Code Syntax and Debugging Expert
															</p>
														</div>
													</div>
												</SelectItem>
												<SelectItem value='algorithm'>
													<div className='flex items-start gap-3 text-muted-foreground'>
														<Bird className='size-5' />
														<div className='grid gap-0.5'>
															<p>
																Neural{' '}
																<span className='font-medium text-foreground'>
																	Explorer
																</span>
															</p>
															<p className='text-xs' data-description>
																Algorithm and Data Structure Guru
															</p>
														</div>
													</div>
												</SelectItem>
												<SelectItem value='quality'>
													<div className='flex items-start gap-3 text-muted-foreground'>
														<Turtle className='size-5' />
														<div className='grid gap-0.5'>
															<p>
																Neural{' '}
																<span className='font-medium text-foreground'>
																	Quantum
																</span>
															</p>
															<p className='text-xs' data-description>
																Code Quality and Collaboration Mentor
															</p>
														</div>
													</div>
												</SelectItem>
											</SelectContent>
										</Select>
									</div>

									<div className='grid gap-3'>
										<Label htmlFor='file'>Upload your code files</Label>
										<Input id='file' type='file' />
									</div>
								</fieldset>
								<fieldset className='grid gap-6 rounded-lg border p-4'>
									<legend className='-ml-1 px-1 text-sm font-medium'>
										Result
									</legend>
									<div className='grid gap-3'>
										<Label htmlFor='model'>Files</Label>
										<Select>
											<SelectTrigger id='file' className='items-start'>
												<SelectValue placeholder='Select a file' />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value='mycode'>
													<div className='flex items-start gap-3 text-muted-foreground'>
														<div className='grid gap-0.5'>
															<p>mycode.py</p>
														</div>
													</div>
												</SelectItem>
												<SelectItem value='awesome1'>
													<div className='flex items-start gap-3 text-muted-foreground'>
														<div className='grid gap-0.5'>
															<p>awesome1.java</p>
														</div>
													</div>
												</SelectItem>
												<SelectItem value='great2'>
													<div className='flex items-start gap-3 text-muted-foreground'>
														<div className='grid gap-0.5'>
															<p>great2.js</p>
														</div>
													</div>
												</SelectItem>
											</SelectContent>
										</Select>
									</div>
									<div className='grid gap-3'>
										<div className='flex justify-between items-center'>
											<Label htmlFor='content' className='flex-shrink-0'>
												Overall Review
											</Label>
										</div>
										<Card className=''>
											<CardContent className='flex gap-4 p-4'>
												<div className='grid items-center gap-2'>
													<div className='grid flex-1 auto-rows-min gap-0.5'>
														<div className='text-sm text-muted-foreground'>
															Correctness
														</div>
														<div className='flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none text-[#e88c30]'>
															75/100
															<span className='text-sm font-normal text-muted-foreground'>
																points
															</span>
														</div>
													</div>
													<div className='grid flex-1 auto-rows-min gap-0.5'>
														<div className='text-sm text-muted-foreground'>
															Performance
														</div>
														<div className='flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none text-[#2eb88a]'>
															80/100
															<span className='text-sm font-normal text-muted-foreground'>
																points
															</span>
														</div>
													</div>
													<div className='grid flex-1 auto-rows-min gap-0.5'>
														<div className='text-sm text-muted-foreground'>
															Clarity
														</div>
														<div className='flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none text-[#2662d9]'>
															90/100
															<span className='text-sm font-normal text-muted-foreground'>
																points
															</span>
														</div>
													</div>
												</div>
												<ChartContainer
													config={{
														Correctness: {
															label: 'Correctness',
															color: 'hsl(var(--chart-3))',
														},
														Performance: {
															label: 'Performance',
															color: 'hsl(var(--chart-2))',
														},
														Clarity: {
															label: 'Clarity',
															color: 'hsl(var(--chart-1))',
														},
													}}
													className='mx-auto aspect-square w-full max-w-[80%]'
												>
													<RadialBarChart
														margin={{
															left: -10,
															right: -10,
															top: -10,
															bottom: -10,
														}}
														data={[
															{
																activity: 'Correctness',
																value: (75 / 100) * 100,
																fill: 'var(--color-Correctness)',
															},
															{
																activity: 'Performance',
																value: (8 / 10) * 100,
																fill: 'var(--color-Performance)',
															},
															{
																activity: 'Clarity',
																value: (9 / 10) * 100,
																fill: 'var(--color-Clarity)',
															},
														]}
														innerRadius='20%'
														barSize={24}
														startAngle={90}
														endAngle={450}
													>
														<PolarAngleAxis
															type='number'
															domain={[0, 100]}
															dataKey='value'
															tick={false}
														/>
														<RadialBar
															dataKey='value'
															background
															cornerRadius={5}
														/>
													</RadialBarChart>
												</ChartContainer>
											</CardContent>
										</Card>
									</div>
								</fieldset>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default InfoLanding;
