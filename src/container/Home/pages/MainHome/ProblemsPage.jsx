import {
    ListFilter,
    Shuffle,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Tabs,
    TabsContent,
} from "@/components/ui/tabs"
import React from 'react';
import Sidebar from "@/components/MainHome/Sidebar";
import Topbar from "@/components/MainHome/Topbar";
import Spline from '@splinetool/react-spline';

const ProblemsPage = () => {

    return <div className="flex min-h-screen w-full flex-col bg-white">
        <div className="w-full h-[300px]">
            <Spline scene="https://prod.spline.design/8rK8Mhnerno7UApB/scene.splinecode" />
        </div>
    </div>
}

export default ProblemsPage;