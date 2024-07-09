import { Button } from "@/components/ui/button";
import Sidebar from "@/components/MainHome/Sidebar";
import Topbar from "@/components/MainHome/Topbar";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '@/firebase/firebase';

const CoursesPage = () => {
    // Problems List
    const [lecturesList, setlecturesList] = useState([]);
    useEffect(() => {
        (async () => {
            const data = await getDocs(collection(firestore, 'Lectures'));
            const lecturesList = data.docs.map(doc => doc.data());
            setlecturesList(lecturesList);
        })();
    });


    return <div className="flex min-h-screen w-full flex-col">
        {/* Topbar */}
        <Topbar />
        {/* Sidebar */}
        <Sidebar />
        {/* Mainbar */}
        <main className="grid grid-cols-4 gap-4 p-4 md:gap-8 md:p-8 ml-16">
            {lecturesList.map((item, index) => (
                <Card className="w-[350px]" key={index}>
                    <CardHeader>
                        <CardTitle>
                            <div className="flex justify-between">
                                <div>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <p class="line-clamp-2 overflow-hidden text-overflow-ellipsis whitespace-normal">
                                                    {item.title}
                                                </p>
                                            </TooltipTrigger>
                                            <TooltipContent side="bottom" sideOffset={5}>
                                                <p>{item.title}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>

                                <div className="ml-2">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button variant="outline" size="icon"><p>{item.language_short}</p></Button>
                                            </TooltipTrigger>
                                            <TooltipContent side="bottom" sideOffset={5}>
                                                <p>{item.language}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                            </div>
                        </CardTitle>
                        <CardDescription><p>{item.author} • {item.video_num} Videos</p></CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="grid w-full items-center gap-4">
                                <a href={item.video_link}>
                                    <div className="grid gap-2 w-full h-[170px] place-items-center rounded bg-cover bg-no-repeat" style={{ backgroundImage: `url(${item.image_cover})` }}>
                                    </div>
                                </a>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            ))}
        </main>
    </div>
}

export default CoursesPage;