import Sidebar from '@/components/MainHome/Sidebar';
import Topbar from '@/components/MainHome/Topbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail } from 'lucide-react';
import emailjs from '@emailjs/browser';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const ContactPage = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');

	const handleSubmit = e => {
		e.preventDefault();

		const serviceId = 'service_aw846rv';
		const templateId = 'template_pkektpo';
		const publicKey = 'FQU8BOsoDAZsnN-ui';

		// Create a new object that contains dynamic template params
		const templateParams = {
			from_name: name,
			user_email: email,
			to_name: 'TrongNghia from DevLab',
			message: message,
		};

		emailjs
			.send(serviceId, templateId, templateParams, publicKey)
			.then(response => {
				console.log('Email sent successfully!', response);
				toast('Your message has been sent successfully!');
				setName('');
				setEmail('');
				setMessage('');
			})
			.catch(error => {
				console.error('Error sending email: ', error);
				toast('Error sending email: ', error);
			});
	};

	return (
		<div className='flex min-h-screen w-full flex-col'>
			<Topbar />
			<Sidebar />
			<div className='relative flex w-full min-h-svh items-center justify-center'>
				<div className='px-4 py-5 sm:p-6 bg-background border rounded-xl overflow-hidden -mt-36'>
					<div className='flex flex-col gap-y-5 w-full max-w-sm'>
						<div className='space-y-3'>
							<Mail className='size-10' />
							<h1 className='text-2xl font-heading tracking-wide'>
								Get in Touch with Our Team!
							</h1>
							<p className='text-sm text-muted-foreground'>
								<p>
									<a href='/' className='underline text-black'>
										DevLab
									</a>{' '}
									is all about empowering you to learn and create with AI. Feel
									free to reach out with any questions, feedback, or
									collaboration ideas!
								</p>
							</p>
						</div>

						<form
							onSubmit={handleSubmit}
							className='flex flex-col items-start w-full gap-y-2'
						>
							<label className='text-sm font-medium leading-none'>Name</label>
							<Input
								type='text'
								placeholder='Your Name'
								value={name}
								onChange={e => setName(e.target.value)}
							/>
							<label className='text-sm font-medium leading-none'>Email</label>
							<Input
								type='email'
								placeholder='Your Email'
								value={email}
								onChange={e => setEmail(e.target.value)}
							/>
							<label className='text-sm font-medium leading-none'>
								Message
							</label>
							<textarea
								className='w-full h-[100px] border border-gray rounded-sm'
								value={message}
								onChange={e => setMessage(e.target.value)}
							></textarea>
							<Button type='submit'>Submit</Button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContactPage;
