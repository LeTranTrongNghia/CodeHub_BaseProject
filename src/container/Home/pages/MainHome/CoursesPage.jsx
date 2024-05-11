import { Button } from "@/components/ui/button"
import React from 'react';
import Sidebar from "@/components/MainHome/Sidebar";
import Topbar from "@/components/MainHome/Topbar";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

const CoursesPage = () => {

    return <div className="flex min-h-screen w-full flex-col bg-black">
        {/* Topbar */}
        <Topbar />
        {/* Sidebar */}
        <Sidebar />
        {/* Mainbar */}
        <main className="grid grid-cols-4 gap-4 p-4 md:gap-8 md:p-8 ml-16">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>
                        <div className="flex justify-between">
                            <p className="text-white">JavaScript Programming Course</p>
                            <div className="ml-2">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="outline" size="icon"><p>JS</p></Button>
                                        </TooltipTrigger>
                                        <TooltipContent side="bottom" sideOffset={5}>
                                            <p>JavaScript</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </div>
                    </CardTitle>
                    <CardDescription><p className="text-white">freeCodeCamp.org • 1 Videos</p></CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="grid gap-2 w-full h-[170px] place-items-center bg-[url('https://www.freecodecamp.org/news/content/images/2021/06/javascriptfull.png')] bg-cover rounded"></div>
                        </div>
                    </form>
                </CardContent>
            </Card>
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>
                        <div className="flex justify-between">
                            <p className="text-white">JavaScript Programming Course</p>
                            <div className="ml-2">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="outline" size="icon"><p>JS</p></Button>
                                        </TooltipTrigger>
                                        <TooltipContent side="bottom" sideOffset={5}>
                                            <p>JavaScript</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </div>
                    </CardTitle>
                    <CardDescription><p className="text-white">freeCodeCamp.org • 1 Videos</p></CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="grid gap-2 w-full h-[170px] place-items-center bg-[url('https://www.freecodecamp.org/news/content/images/2021/06/javascriptfull.png')] bg-cover rounded"></div>
                        </div>
                    </form>
                </CardContent>
            </Card>
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>
                        <div className="flex justify-between">
                            <p className="text-white">JavaScript Programming Course</p>
                            <div className="ml-2">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="outline" size="icon"><p>JS</p></Button>
                                        </TooltipTrigger>
                                        <TooltipContent side="bottom" sideOffset={5}>
                                            <p>JavaScript</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </div>
                    </CardTitle>
                    <CardDescription><p className="text-white">freeCodeCamp.org • 1 Videos</p></CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="grid gap-2 w-full h-[170px] place-items-center bg-[url('https://www.freecodecamp.org/news/content/images/2021/06/javascriptfull.png')] bg-cover rounded"></div>
                        </div>
                    </form>
                </CardContent>
            </Card>
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>
                        <div className="flex justify-between">
                            <p className="text-white">JavaScript Programming Course</p>
                            <div className="ml-2">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="outline" size="icon"><p>JS</p></Button>
                                        </TooltipTrigger>
                                        <TooltipContent side="bottom" sideOffset={5}>
                                            <p>JavaScript</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </div>
                    </CardTitle>
                    <CardDescription><p className="text-white">freeCodeCamp.org • 1 Videos</p></CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="grid gap-2 w-full h-[170px] place-items-center bg-[url('https://www.freecodecamp.org/news/content/images/2021/06/javascriptfull.png')] bg-cover rounded"></div>
                        </div>
                    </form>
                </CardContent>
            </Card>
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>
                        <div className="flex justify-between">
                            <p className="text-white">JavaScript Programming Course</p>
                            <div className="ml-2">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="outline" size="icon"><p>JS</p></Button>
                                        </TooltipTrigger>
                                        <TooltipContent side="bottom" sideOffset={5}>
                                            <p>JavaScript</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </div>
                    </CardTitle>
                    <CardDescription><p className="text-white">freeCodeCamp.org • 1 Videos</p></CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="grid gap-2 w-full h-[170px] place-items-center bg-[url('https://www.freecodecamp.org/news/content/images/2021/06/javascriptfull.png')] bg-cover rounded"></div>
                        </div>
                    </form>
                </CardContent>
            </Card>
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>
                        <div className="flex justify-between">
                            <p className="text-white">JavaScript Programming Course</p>
                            <div className="ml-2">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="outline" size="icon"><p>JS</p></Button>
                                        </TooltipTrigger>
                                        <TooltipContent side="bottom" sideOffset={5}>
                                            <p>JavaScript</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </div>
                    </CardTitle>
                    <CardDescription><p className="text-white">freeCodeCamp.org • 1 Videos</p></CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="grid gap-2 w-full h-[170px] place-items-center bg-[url('https://www.freecodecamp.org/news/content/images/2021/06/javascriptfull.png')] bg-cover rounded"></div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </main>
    </div>
}

export default CoursesPage;