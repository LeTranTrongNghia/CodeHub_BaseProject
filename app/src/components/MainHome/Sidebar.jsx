import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Book,
  Bot,
  Code2,
  LifeBuoy,
  SquareTerminal,
  Triangle,
  Users,
} from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="inset-y fixed left-0 z-20 flex h-full flex-col border-r">
      <div className="p-2 mt-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Home">
                <Triangle className="size-5 fill-foreground" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              <p>DevLab</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="grid gap-1 p-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-lg bg-muted"
                aria-label="Playground"
              >
                <a href="/main-home">
                  <SquareTerminal className="size-5" />
                </a>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              <p>Explore</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-lg"
                aria-label="API"
              >
                <a href="/problems">
                  <Code2 className="size-5" />
                </a>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Problem
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-lg"
                aria-label="Documentation"
              >
                <a href="/courses">
                  <Book className="size-5" />
                </a>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Courses
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-lg"
                aria-label="Playground"
              >
                <a href="/playground">
                  <Bot className="size-5" />
                </a>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              <p>Playground</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-lg"
                aria-label="Playground"
              >
                <a href="/community">
                  <Users className="size-5" />
                </a>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              <p>Community</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="mt-auto grid gap-1 p-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="mt-auto rounded-lg"
                aria-label="Help"
              >
                <a href="/contact">
                  <LifeBuoy className="size-5" />
                </a>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Support
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </aside>
  );
};
export default Sidebar;
