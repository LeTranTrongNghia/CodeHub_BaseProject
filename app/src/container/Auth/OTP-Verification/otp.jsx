import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';

const OTPVerification = () => {
	const [otp, setOtp] = useState(['', '', '', '', '', '']);
	const [timeLeft, setTimeLeft] = useState(30);
	const [isResendDisabled, setIsResendDisabled] = useState(true);

	useEffect(() => {
		if (timeLeft > 0) {
			const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
			return () => clearTimeout(timerId);
		} else {
			setIsResendDisabled(false);
		}
	}, [timeLeft]);

	const navigate = useNavigate();

	const handleOtpChange = (index, value) => {
		if (value.length <= 1 && /^\d*$/.test(value)) {
			const newOtp = [...otp];
			newOtp[index] = value;
			setOtp(newOtp);

			if (value && index < 5) {
				const nextInput = document.getElementById(`otp-${index + 1}`);
				nextInput?.focus();
			}
		}
	};

	const handleKeyDown = (index, e) => {
		if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
			e.preventDefault();
			const newOtp = [...otp];
			newOtp[index - 1] = '';
			setOtp(newOtp);
			const prevInput = document.getElementById(`otp-${index - 1}`);
			prevInput?.focus();
		}
	};

	const handleResend = () => {
		setTimeLeft(30);
		setIsResendDisabled(true);
		setOtp(['', '', '', '', '', '']);
	};

	const handleVerify = async () => {
		const otpStr = otp.join('');
		try {
			const response = await fetch(
				`http://localhost:5050/user/otp/authenticate`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						otp: otpStr,
					}),
				},
			);
			navigate('/login');
		} catch (error) {
			console.log('🚀 ~ handleVerify ~ error:', error);
		}
	};

	return (
		<div
			className='min-h-screen bg-cover bg-center'
			style={{
				backgroundImage: `url(https://images.pexels.com/photos/7134986/pexels-photo-7134986.jpeg)`,
			}}
		>
			<div className='min-h-screen  flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
				<Card className='w-full max-w-md mx-auto'>
					<CardHeader className='pb-2'>
						<CardTitle className='text-2xl font-bold text-center'>
							Verify Your Email
						</CardTitle>
					</CardHeader>
					<CardContent className='space-y-6 pt-2'>
						<div className='text-center text-sm text-muted-foreground'>
							We've sent a 6-digit code to your email. Enter the code below to
							verify your account.
						</div>
						<div className='space-y-4'>
							<Label htmlFor='otp-0' className='text-center block'>
								Enter verification code
							</Label>
							<div className='flex justify-center gap-2'>
								{otp.map((digit, index) => (
									<Input
										key={index}
										id={`otp-${index}`}
										type='text'
										inputMode='numeric'
										pattern='\d*'
										maxLength={1}
										value={digit}
										onChange={e => handleOtpChange(index, e.target.value)}
										onKeyDown={e => handleKeyDown(index, e)}
										className='w-12 h-12 text-center text-lg'
										aria-label={`Digit ${index + 1}`}
									/>
								))}
							</div>
						</div>
						{timeLeft > 0 && (
							<div className='text-center text-sm text-muted-foreground'>
								Code expires in {timeLeft} seconds
							</div>
						)}
					</CardContent>
					<CardFooter className='flex justify-between'>
						<Button
							variant='outline'
							onClick={handleResend}
							disabled={isResendDisabled}
						>
							Resend Code
						</Button>
						<Button
							onClick={handleVerify}
							disabled={otp.some(digit => digit === '')}
						>
							Verify
						</Button>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
};

export default OTPVerification;
