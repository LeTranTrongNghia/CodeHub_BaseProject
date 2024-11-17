import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const EventsSidebar = () => {
    const [techNews, setTechNews] = useState([]);
    const [allNews, setAllNews] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        // Fetch news data when component mounts
        const fetchNews = async () => {
            try {
                const response = await fetch('http://localhost:5050/news');
                const data = await response.json();
                // Lấy 3 tin tức mới nhất
                const latestNews = data.slice(0, 3).map(news => ({
                    title: news.title,
                    date: new Date(news.date).toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric' 
                    }),
                    image: news.imageURL,
                    url: news.newsURL
                }));
                setTechNews(latestNews);
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };

        fetchNews();
    }, []);

    const fetchAllNews = async () => {
        try {
            const response = await fetch('http://localhost:5050/news');
            const data = await response.json();
            setAllNews(data);
        } catch (error) {
            console.error('Error fetching all news:', error);
        }
    };

    const handleSeeAllClick = () => {
        fetchAllNews();
        setIsDialogOpen(true);
    };

    // Fixed upcoming events data
    const events = [
        { title: "Club Exclusive LinkedIn Review", date: "Wed Nov 23rd • 3:00pm ET", month: "Nov", day: "23", color: "#0c417b" },
        { title: "Hacker House Office Hours w/ Team", date: "Tue Nov 29th • 2:00pm ET", month: "Nov", day: "29", color: "#047d4c" },
    ];

    return (
        <aside className="w-80 p-4 hidden lg:block">
            <Card className="mb-4">
                <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                        <span>Tech News</span>
                        <Button variant="link" size="sm" onClick={handleSeeAllClick}>See all</Button>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {techNews.map((news, index) => (
                        <a 
                            key={index} 
                            href={news.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 mb-2 hover:bg-gray-50 p-2 rounded transition-colors"
                        >
                            <img 
                                src={news.image || 'default-news-image.jpg'} 
                                alt={news.title} 
                                className="w-12 h-12 rounded object-cover"
                            />
                            <div>
                                <h4 className="font-semibold line-clamp-2">{news.title}</h4>
                                <p className="text-sm text-muted-foreground">{news.date}</p>
                            </div>
                        </a>
                    ))}
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                        <span>Upcoming Events</span>
                        <Button variant="link" size="sm">See all</Button>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {events.map((event, index) => (
                        <div key={index} className="flex items-center space-x-2 mb-2">
                            <div
                                className="p-2 rounded text-center"
                                style={{
                                    backgroundColor: event.color,
                                    color: '#ffffff',
                                }}
                            >
                                <div className="text-xs">{event.month}</div>
                                <div className="text-lg font-bold">{event.day}</div>
                            </div>
                            <div>
                                <h4 className="font-semibold">{event.title}</h4>
                                <p className="text-sm text-muted-foreground">{event.date}</p>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>All Tech News</DialogTitle>
                    </DialogHeader>
                    <div>
                        {allNews.map((news, index) => (
                            <a 
                                key={index} 
                                href={news.newsURL} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center space-x-2 mb-2 hover:bg-gray-50 p-2 rounded transition-colors"
                            >
                                <img 
                                    src={news.imageURL || 'default-news-image.jpg'} 
                                    alt={news.title} 
                                    className="w-12 h-12 rounded object-cover"
                                />
                                <div>
                                    <h4 className="font-semibold line-clamp-2">{news.title}</h4>
                                    <p className="text-sm text-muted-foreground">{new Date(news.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</p>
                                </div>
                            </a>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
        </aside>
    );
};

export default EventsSidebar;