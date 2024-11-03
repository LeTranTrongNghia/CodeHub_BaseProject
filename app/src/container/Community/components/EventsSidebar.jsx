import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

const EventsSidebar = () => {
    // Fixed tech news data
    const techNews = [
        { title: "Google's AI going nuclear", date: "October 14", image: "https://i.cdn.newsbytesapp.com/images/l24720241015094856.jpeg" },
        { title: "X is Back in Brazil 🇧🇷", date: "October 9", image: "https://media.wired.com/photos/66fc3d26968176ff6a71b810/master/w_2560%2Cc_limit/X-Back-in-Brazil-Business-2175241189.jpg" },
        { title: "Satoshi Found? New Bitcoin Documentary", date: "October 4", image: "https://coincierge.de/wp-content/uploads/2024/09/Krypto-News-Irre-Analyse-Bitcoin-Erfinder-Satoshi-Nakamoto-%E2%80%93-in-Wirklichkeit-die-CIA-coincierge-696x392.jpg" },
    ];

    // Fixed upcoming events data
    const events = [
        { title: "Club Exclusive LinkedIn Review", date: "Wed Oct 23rd @ 3:00pm ET", month: "OCT", day: "23", color: "#0c417b" },
        { title: "Hacker House Office Hours w/ Team", date: "Tue Oct 29th @ 2:00pm ET", month: "OCT", day: "29", color: "#047d4c" },
    ];

    return (
        <aside className="w-80 p-4 hidden lg:block border-l">
            <Card className="mb-4">
                <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                        <span>Tech News</span>
                        <Button variant="link" size="sm">See all</Button>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {techNews.map((news, index) => (
                        <div key={index} className="flex items-center space-x-2 mb-2">
                            <img src={news.image} alt={news.title} className="w-12 h-12 rounded object-cover" />
                            <div>
                                <h4 className="font-semibold">{news.title}</h4>
                                <p className="text-sm text-muted-foreground">{news.date}</p>
                            </div>
                        </div>
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
        </aside>
    );
};

export default EventsSidebar;