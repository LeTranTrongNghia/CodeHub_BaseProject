'use client';

import { Bar, BarChart, LabelList, XAxis, YAxis } from 'recharts';
import { Card, CardContent } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import React from 'react';

const chartConfig = {
	syntax: { label: 'Syntax', color: 'hsl(var(--chart-1))' },
	functionDefinition: {
		label: 'Function Definition',
		color: 'hsl(var(--chart-2))',
	},
	logic: { label: 'Logic', color: 'hsl(var(--chart-3))' },
	efficiency: { label: 'Efficiency', color: 'hsl(var(--chart-4))' },
	readability: { label: 'Readability', color: 'hsl(var(--chart-5))' },
};

const extractScore = text => {
	const match = text.match(/(\d+)/);
	return match ? parseInt(match[1], 10) : 0;
};

export default function Chart({ ratings = {} }) {
	console.log('Ratings:', ratings); // Debugging line

	// Map the ratings to the data array with numeric values
	const data = [
		{
			name: 'Syntax',
			score: extractScore(ratings.syntax),
			fill: 'var(--color-syntax)',
		},
		{
			name: 'Function Definition',
			score: extractScore(ratings.functionDefinition),
			fill: 'var(--color-functionDefinition)',
		},
		{
			name: 'Logic',
			score: extractScore(ratings.logic),
			fill: 'var(--color-logic)',
		},
		{
			name: 'Efficiency',
			score: extractScore(ratings.efficiency),
			fill: 'var(--color-efficiency)',
		},
		{
			name: 'Readability',
			score: extractScore(ratings.readability),
			fill: 'var(--color-readability)',
		},
	];

	return (
		<Card className='max-w'>
			<CardContent className='flex gap-4 p-4 pb-2'>
				<ChartContainer config={chartConfig} className='h-[140px] w-full'>
					<BarChart
						margin={{ left: 10, right: 0, top: 0, bottom: 10 }}
						data={data}
						layout='vertical'
						barSize={32}
						barGap={2}
					>
						<XAxis type='number' dataKey='score' hide />
						<YAxis
							dataKey='name'
							type='category'
							tickLine={false}
							tickMargin={4}
							axisLine={false}
							className='capitalize'
						/>
						<Bar dataKey='score' radius={5}>
							<LabelList
								position='insideLeft'
								dataKey='score'
								fill='white'
								offset={8}
								fontSize={12}
							/>
						</Bar>
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
