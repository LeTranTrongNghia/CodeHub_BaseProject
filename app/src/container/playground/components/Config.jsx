import React from 'react';
import { ChevronRight, File, Folder } from 'lucide-react';
import { Bird, Rabbit, Turtle, RotateCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { PolarAngleAxis, RadialBar, RadialBarChart } from 'recharts';
import { Card, CardContent } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

const FileTree = ({ item, onFileSelect }) => {
  if (typeof item === 'string') {
    // This is a file
    return (
      <div className="flex items-center gap-2 py-1 px-2" onClick={() => onFileSelect(item)}>
        <File className="h-4 w-4" />
        <span>{item}</span>
      </div>
    );
  }

  // This is a directory
  const [name, children] = item;
  return (
    <Collapsible className="ml-2">
      <CollapsibleTrigger className="flex items-center gap-2 py-1 px-2 w-full hover:bg-accent rounded-sm">
        <ChevronRight className="h-4 w-4" />
        <Folder className="h-4 w-4" />
        <span>{name}</span>
      </CollapsibleTrigger>
      <CollapsibleContent className="ml-4">
        {Array.isArray(children) && children.map((subItem, index) => (
          <FileTree key={index} item={subItem} onFileSelect={onFileSelect} />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
};

const Config = ({
  selectedModel,
  setSelectedModel,
  handleFileChange,
  fileInputRef,
  selectedFile,
  handleFileSelect,
  files,
  requestRating,
  generatingAnswer,
  correctnessRating,
  performanceRating,
  clarityRating,
  data,
  fileTree,
}) => {
  return (
    <div className='relative flex-col items-start gap-8 md:flex max-w-[20rem]'>
      <Tabs defaultValue="config" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="config">Config</TabsTrigger>
          <TabsTrigger value="filetree">File Tree</TabsTrigger>
        </TabsList>
        
        <TabsContent value="config">
          <form className='grid w-full items-start gap-6'>
            <fieldset className='grid gap-6 rounded-lg border p-4'>
              <legend className='-ml-1 px-1 text-sm font-medium'>
                Information
              </legend>

              <div className='grid gap-3'>
                <Label htmlFor='model'>Model</Label>
                <Select onValueChange={value => setSelectedModel(value)}>
                  <SelectTrigger
                    id='model'
                    className='items-start [&_[data-description]]:hidden'
                  >
                    <SelectValue placeholder='Select a model' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='syntax'>
                      <div className='flex items-start gap-3 text-muted-foreground'>
                        <Rabbit className='size-5' />
                        <div className='grid gap-0.5'>
                          <p>
                            Neural{' '}
                            <span className='font-medium text-foreground'>
                              Genesis
                            </span>
                          </p>
                          <p className='text-xs' data-description>
                            Code Syntax and Debugging Expert
                          </p>
                        </div>
                      </div>
                    </SelectItem>
                    <SelectItem value='algorithm'>
                      <div className='flex items-start gap-3 text-muted-foreground'>
                        <Bird className='size-5' />
                        <div className='grid gap-0.5'>
                          <p>
                            Neural{' '}
                            <span className='font-medium text-foreground'>
                              Explorer
                            </span>
                          </p>
                          <p className='text-xs' data-description>
                            Algorithm and Data Structure Guru
                          </p>
                        </div>
                      </div>
                    </SelectItem>
                    <SelectItem value='quality'>
                      <div className='flex items-start gap-3 text-muted-foreground'>
                        <Turtle className='size-5' />
                        <div className='grid gap-0.5'>
                          <p>
                            Neural{' '}
                            <span className='font-medium text-foreground'>
                              Quantum
                            </span>
                          </p>
                          <p className='text-xs' data-description>
                            Code Quality and Collaboration Mentor
                          </p>
                        </div>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className='grid gap-3'>
                <Label htmlFor='file'>Upload your code files</Label>
                <Input
                  id='file'
                  type='file'
                  onChange={handleFileChange}
                  multiple
                  directory=""
                  webkitdirectory=""
                  ref={fileInputRef}
                />
              </div>
            </fieldset>
            
            <fieldset className='grid gap-6 rounded-lg border p-4'>
              <legend className='-ml-1 px-1 text-sm font-medium'>
                Result
              </legend>
              <div className='grid gap-3'>
                <Label htmlFor='role'>Files</Label>
                <Select
                  value={selectedFile ? selectedFile.name : ''}
                  onValueChange={handleFileSelect}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Select a file' />
                  </SelectTrigger>
                  <SelectContent>
                    {files.map((file, index) => (
                      <SelectItem key={index} value={file.name}>
                        {file.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className='grid gap-3'>
                <div className='flex justify-between items-center'>
                  <Label htmlFor='content' className='flex-shrink-0'>
                    Overall Review
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant='ghost'
                          size='icon'
                          onClick={requestRating}
                          disabled={generatingAnswer}
                        >
                          {generatingAnswer ? (
                            '...'
                          ) : (
                            <RotateCw className='size-4' />
                          )}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side='top'>
                        Reload rating
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Card className='max-w'>
                  <CardContent className='flex gap-4 p-4'>
                    <div className='grid items-center gap-2'>
                      {['Correctness', 'Performance', 'Clarity'].map(
                        (criteria, idx) => (
                          <div
                            key={idx}
                            className='grid flex-1 auto-rows-min gap-0.5'
                          >
                            <div className='text-sm text-muted-foreground'>
                              {criteria}
                            </div>
                            <div
                              className={`flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none ${
                                idx === 0
                                  ? 'text-[#e88c30]'
                                  : idx === 1
                                  ? 'text-[#2eb88a]'
                                  : 'text-[#2662d9]'
                              }`}
                            >
                              {criteria === 'Correctness'
                                ? correctnessRating !== null
                                  ? `${correctnessRating}/100`
                                  : 'N/A'
                                : criteria === 'Performance'
                                ? performanceRating !== null
                                  ? `${performanceRating}/100`
                                  : 'N/A'
                                : criteria === 'Clarity'
                                ? clarityRating !== null
                                  ? `${clarityRating}/100`
                                  : 'N/A'
                                : 'N/A'}
                              <span className='text-sm font-normal text-muted-foreground'>
                                points
                              </span>
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                    <ChartContainer
                      config={{
                        Correctness: {
                          label: 'Correctness',
                          color: 'hsl(var(--chart-3))',
                        },
                        Performance: {
                          label: 'Performance',
                          color: 'hsl(var(--chart-2))',
                        },
                        Clarity: {
                          label: 'Clarity',
                          color: 'hsl(var(--chart-1))',
                        },
                      }}
                      className='mx-auto aspect-square w-full max-w-[80%]'
                    >
                      <RadialBarChart
                        margin={{
                          left: -10,
                          right: -10,
                          top: -10,
                          bottom: -10,
                        }}
                        data={data}
                        innerRadius='20%'
                        barSize={24}
                        startAngle={90}
                        endAngle={450}
                      >
                        <PolarAngleAxis
                          type='number'
                          domain={[0, 100]}
                          dataKey='value'
                          tick={false}
                        />
                        <RadialBar
                          dataKey='value'
                          background
                          cornerRadius={5}
                        />
                      </RadialBarChart>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>
            </fieldset>
          </form>
        </TabsContent>
        
        <TabsContent value="filetree">
          <div className="p-4 border rounded-lg">
            {fileTree.length > 0 ? (
              <div className="max-h-[500px] overflow-auto">
                {fileTree.map((item, index) => (
                  <FileTree key={index} item={item} onFileSelect={handleFileSelect} />
                ))}
              </div>
            ) : (
              <div className="text-muted-foreground">
                Upload a folder to see its structure here.
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Config; 