import {
    ListFilter,
    Shuffle,
} from "lucide-react"
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
import Sidebar from "@/components/MainHome/Sidebar";
import Topbar from "@/components/MainHome/Topbar";
import { useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '@/firebase/firebase';
import { useDispatch, useSelector } from 'react-redux';
import {
    setProblems,
    setSelectedProblem,
} from '@/redux/problemReducer/problemReducer';
import { useNavigate } from 'react-router-dom';

const ProblemsPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        (async () => {
            const data = await getDocs(collection(firestore, 'Problems'));
            const problemLists = data.docs.map(doc => doc.data());
            setProblems(problemLists);
            dispatch(setProblems(problemLists));
        })();
    }, []);
    const problemList = useSelector(state => state.problem.problemList);

    const handleRowClick = problem => {
        dispatch(setSelectedProblem(problem));
        navigate('/coding');
    };

    return <div className="flex min-h-screen w-full flex-col bg-black">
        {/* Topbar */}
        <Topbar />
        {/* Sidebar */}
        <Sidebar />
        {/* Mainbar */}
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 ml-16">
            <Tabs defaultValue="all">
                <div className="flex items-center hidden">
                    <div className="ml-auto flex items-center gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="h-8 gap-1">
                                    <ListFilter className="h-3.5 w-3.5" />
                                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                        Filter
                                    </span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuCheckboxItem checked>Title</DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem>Difficulty</DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem>Type</DropdownMenuCheckboxItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Button size="sm" className="h-8 gap-1">
                            <Shuffle className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                Random one
                            </span>
                        </Button>
                    </div>
                </div>
                <TabsContent value="all">
                    <Card x-chunk="dashboard-06-chunk-0">
                        <CardHeader>
                            <h1 className="text-white text-3xl font-medium">Problems</h1>
                            <CardDescription>
                                <h1 className="text-white text-sm font-medium">
                                    Level up your coding abilities! Explore problems designed for all skill sets, from beginner to advanced.
                                </h1>
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className='text-white'>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Title</TableHead>
                                            <TableHead>Type</TableHead>
                                            <TableHead>Difficulty</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {problemList.map((item, index) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    <div
                                                        className='font-medium'
                                                        onClick={() => handleRowClick(item)}
                                                    >
                                                        {item.title}
                                                    </div>
                                                </TableCell>
                                                <TableCell>{item.type}</TableCell>
                                                <TableCell className='text-right'>
                                                    {item.difficulty}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <div className="text-xs text-muted-foreground">
                                Showing <strong>{problemList.length}</strong> of <strong>{problemList.length}</strong>{" "}
                                Total Problems
                            </div>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </main>
    </div>
}

export default ProblemsPage;