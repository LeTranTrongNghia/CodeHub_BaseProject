import {
    Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from '@/components/ui/input';
import Sidebar from "@/components/MainHome/Sidebar";
import Topbar from "@/components/MainHome/Topbar";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/firebase/firebase";
import { useNavigate } from "react-router-dom";

const ProblemsPerPage = 7; // Number of problems displayed per page

const ProblemsPage = () => {
    const [problems, setProblems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const handleRowClick = (problem) => {
        navigate("/coding", { state: { problem } }); // Pass problem data to coding page
    };

    useEffect(() => {
        const fetchProblems = async () => {
            const q = searchTerm ? query(collection(firestore, "Problems"), where("title", "like", searchTerm)) : collection(firestore, "Problems");
            const data = await getDocs(q);
            const problemLists = data.docs.map((doc) => doc.data());
            setProblems(problemLists);
        };

        fetchProblems();
    }, [searchTerm]); // Re-fetch data on search term change

    const filteredProblems = problems.filter((problem) => {
        const searchTextLower = searchTerm.toLowerCase();
        return (
            problem.title.toLowerCase().includes(searchTextLower) ||
            problem.type.toLowerCase().includes(searchTextLower) ||
            problem.difficulty.toLowerCase().includes(searchTextLower)
        );
    });

    const paginatedProblems = filteredProblems.slice(
        (currentPage - 1) * ProblemsPerPage,
        currentPage * ProblemsPerPage
    );

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const totalPages = Math.ceil(filteredProblems.length / ProblemsPerPage);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className="flex min-h-screen w-full flex-col">
            <Topbar />
            <Sidebar />
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 ml-16">
                <Tabs defaultValue="all">
                    <TabsContent value="all">
                        <Card x-chunk="dashboard-06-chunk-0">
                            <CardHeader>
                                <h1 className="text-3xl font-medium">Problems</h1>
                                <CardDescription>
                                    <div className="flex justify-between items-center">
                                        <h1 className="text-sm font-medium">
                                            Level up your coding abilities! Explore problems designed for all skill sets, from beginner to advanced.
                                        </h1>
                                        <form className="ml-auto flex-1 sm:flex-initial">
                                            <div className="relative">
                                                <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
                                                <Input
                                                    type='search'
                                                    placeholder='Search problems...'
                                                    className='pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]'
                                                    value={searchTerm}
                                                    onChange={handleSearchChange}
                                                />
                                            </div>
                                        </form>
                                    </div>
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Title</TableHead>
                                            <TableHead>Type</TableHead>
                                            <TableHead>Difficulty</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {paginatedProblems.map((item, index) => (
                                            <TableRow key={index}>
                                                <TableCell className="font-medium cursor-pointer" onClick={() => handleRowClick(item)}>
                                                    {item.title}
                                                </TableCell>
                                                <TableCell>{item.type}</TableCell>
                                                <TableCell>{item.difficulty}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                            <CardFooter>
                                <Pagination>
                                    <PaginationContent>
                                        {currentPage > 1 && (
                                            <PaginationItem>
                                                <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} />
                                            </PaginationItem>
                                        )}
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                                            <PaginationItem key={pageNumber}>
                                                {pageNumber === currentPage ? (
                                                    <span className="text-black font-bold">{pageNumber}</span>
                                                ) : (
                                                    <PaginationLink onClick={() => handlePageChange(pageNumber)}>
                                                        {pageNumber}
                                                    </PaginationLink>
                                                )}
                                            </PaginationItem>
                                        ))}
                                        {currentPage < totalPages && (
                                            <PaginationItem>
                                                <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
                                            </PaginationItem>
                                        )}
                                        {totalPages > 5 && currentPage !== totalPages && currentPage !== 1 && (
                                            <PaginationItem>
                                                <PaginationEllipsis />
                                            </PaginationItem>
                                        )}
                                    </PaginationContent>
                                </Pagination>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
};

export default ProblemsPage;
