import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, FileText, Clock } from 'lucide-react';
import Sidebar from "../../MainHome/Sidebar";
import Topbar from "../../MainHome/Topbar";

const CourseDetails = () => {
    return (
        <div className="flex min-h-screen w-full flex-col bg-white text-black">
            <Topbar />
            <Sidebar />
            <main className="min-h-screen bg-white text-black">
                <div className="container mx-auto px-4 pt-12 pb-8">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            <h1 className="text-4xl font-bold mb-4">
                                ChatGPT Complete Guide: Learn Generative AI, ChatGPT & More
                            </h1>
                            <p className="text-lg mb-6">
                                25+ Generative AI Tools to 10x Business, Productivity, Creativity | Prompt Engineering,
                                ChatGPT, Custom GPTs, Midjourney
                            </p>

                            {/* Course Stats */}
                            <div className="flex flex-wrap items-center gap-4 mb-6">
                                <Badge variant="secondary" className="bg-yellow-200 text-black">
                                    Bestseller
                                </Badge>
                            </div>

                            {/* Course Creator */}
                            <div className="mb-6">
                                <p>
                                    Created by{" "}
                                    <a href="#" className="text-purple-600">
                                        Julian Melanson
                                    </a>
                                    ,{" "}
                                    <a href="#" className="text-purple-600">
                                        Benza Maman
                                    </a>
                                    ,{" "}
                                    <a href="#" className="text-purple-600">
                                        Leap Year Learning
                                    </a>
                                </p>
                            </div>

                            {/* Course Meta */}
                            <div className="flex flex-wrap gap-4 text-sm mb-8">
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    Last updated 10/2024
                                </div>
                                <div className="flex items-center gap-2">
                                    English
                                </div>
                                <div className="flex items-center gap-2">
                                    English [CC], Arabic [Auto],{" "}
                                </div>
                            </div>

                            {/* What You'll Learn */}
                            <Card className="bg-gray-100 border-gray-200">
                                <CardContent className="p-6">
                                    <h2 className="text-2xl font-bold mb-6">What you'll learn</h2>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="space-y-4">
                                            <div className="flex gap-2">
                                                <span className="text-green-600">✓</span>
                                                <p>ChatGPT: Create content, synthesize information, and learn faster than ever with effective prompt engineering!</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <span className="text-green-600">✓</span>
                                                <p>Productivity: Achieve your goals faster with ChatGPT, manage your time, prioritize tasks, and create an optimized daily schedule!</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <span className="text-green-600">✓</span>
                                                <p>Soft Skills: Improve your communication, leadership, and problem-solving abilities!</p>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="flex gap-2">
                                                <span className="text-green-600">✓</span>
                                                <p>ChatGPT: Turn your creativity into paid work, generate fresh ideas, reach new audiences, and scale your projects!</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <span className="text-green-600">✓</span>
                                                <p>Marketing: Generate targeted content with ChatGPT, capitalize on trends, create ads, newsletters, and media campaigns!</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <span className="text-green-600">✓</span>
                                                <p>AI Voice Tools: Easily create AI-generated voiceovers for your content!</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Pricing Card */}
                        <div className="lg:col-span-1">
                            <Card className="bg-white shadow-lg sticky top-4">
                                <CardContent className="p-0">
                                    <div className="relative aspect-video bg-gray-900">
                                        <img
                                            src="/src/assets/cover.png?height=200&width=300"
                                            alt="Course thumbnail"
                                            className="object-cover w-full h-full"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="rounded-full bg-white/90 p-4">
                                                <Play className="w-8 h-8" />
                                            </div>
                                        </div>
                                        <div className="absolute bottom-4 left-4 text-white">
                                            <p className="text-lg font-semibold">Preview this course</p>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="space-y-3">
                                            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                                                Enter Course
                                            </Button>
                                            <Button variant="outline" className="w-full">
                                                Save
                                            </Button>
                                        </div>
                                        <div className="mt-6">
                                            <h3 className="font-semibold text-lg mb-4">This course includes:</h3>
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-2">
                                                    <Play className="w-4 h-4" />
                                                    <span>26.5 hours on-demand video</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <FileText className="w-4 h-4" />
                                                    <span>20 articles</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CourseDetails;
