import Sidebar from "@/components/MainHome/Sidebar";
import Topbar from "@/components/MainHome/Topbar";
import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const Profile = () => {
	return <div>
		{/* Topbar */}
		<Topbar />
		{/* Sidebar */}
		<Sidebar />
		{/* Main */}
		<main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
			<div className="mx-auto grid w-full max-w-6xl gap-2">
				<h1 className="text-3xl font-semibold">Settings</h1>
			</div>
			<div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
				<div
					className="grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0"
				>
					<a href="#" className="font-semibold text-primary">
						General
					</a>
					<a href="#">Security</a>
					<a href="#">Integrations</a>
					<a href="#">Support</a>
					<a href="#">Organizations</a>
					<a href="#">Advanced</a>
				</div>
				<div className="grid gap-6">
					<Card x-chunk="dashboard-04-chunk-1">
						<CardHeader>
							<CardTitle>Display name</CardTitle>
							<CardDescription>
								Used to identify your account.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<form>
								<Input placeholder="Your name" />
							</form>
						</CardContent>
						<CardFooter className="border-t px-6 py-4">
							<Button>Save</Button>
						</CardFooter>
					</Card>
				</div>
			</div>
		</main>
	</div>;
};

export default Profile;
