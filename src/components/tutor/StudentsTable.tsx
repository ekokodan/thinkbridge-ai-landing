
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Student } from '@/api/tutors';
import { Search, MoreHorizontal, ChevronDown, ChevronUp } from 'lucide-react';
import { useTutorStore } from '@/stores/useTutorStore';
import { format } from 'date-fns';

interface StudentsTableProps {
  students: Student[];
  isLoading: boolean;
}

type SortField = 'name' | 'progress' | 'plan';
type SortDirection = 'asc' | 'desc';

const StudentsTable: React.FC<StudentsTableProps> = ({ students, isLoading }) => {
  const navigate = useNavigate();
  const { actions } = useTutorStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredStudents = React.useMemo(() => {
    if (!students) return [];
    
    let results = [...students];
    
    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      results = results.filter(student => 
        student.name.toLowerCase().includes(searchLower) ||
        student.subjects.some(subject => subject.toLowerCase().includes(searchLower)) ||
        student.plan.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply sorting
    results.sort((a, b) => {
      if (sortField === 'name') {
        return sortDirection === 'asc' 
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } 
      
      if (sortField === 'progress') {
        return sortDirection === 'asc'
          ? a.progress - b.progress
          : b.progress - a.progress;
      }
      
      if (sortField === 'plan') {
        return sortDirection === 'asc'
          ? a.plan.localeCompare(b.plan)
          : b.plan.localeCompare(a.plan);
      }
      
      return 0;
    });
    
    return results;
  }, [students, searchTerm, sortField, sortDirection]);

  const handleViewStudent = (studentId: string) => {
    actions.setSelectedStudent(studentId);
    navigate(`/tutor/students/${studentId}`);
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-8 h-8 border-4 border-indigo-300 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button>Add New Student</Button>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead onClick={() => handleSort('name')} className="cursor-pointer">
                <div className="flex items-center">
                  Student Name
                  {getSortIcon('name')}
                </div>
              </TableHead>
              <TableHead>Subjects</TableHead>
              <TableHead onClick={() => handleSort('plan')} className="cursor-pointer">
                <div className="flex items-center">
                  Plan
                  {getSortIcon('plan')}
                </div>
              </TableHead>
              <TableHead>Next Lesson</TableHead>
              <TableHead onClick={() => handleSort('progress')} className="cursor-pointer">
                <div className="flex items-center">
                  Progress
                  {getSortIcon('progress')}
                </div>
              </TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No students found.
                </TableCell>
              </TableRow>
            ) : (
              filteredStudents.map((student) => (
                <TableRow key={student.id} className="cursor-pointer hover:bg-slate-50" onClick={() => handleViewStudent(student.id)}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      {student.avatar && (
                        <img
                          src={student.avatar}
                          alt={student.name}
                          className="w-8 h-8 rounded-full mr-2 object-cover"
                        />
                      )}
                      {student.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {student.subjects.map((subject) => (
                        <span key={subject} className="px-2 py-1 text-xs rounded-full bg-indigo-100 text-indigo-700">
                          {subject}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{student.plan}</TableCell>
                  <TableCell>
                    {student.nextLesson ? (
                      format(new Date(student.nextLesson), 'MMM dd, h:mm a')
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-indigo-600 h-2.5 rounded-full"
                        style={{ width: `${student.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500">{student.progress}%</span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          // Handle scheduling
                        }}>
                          Schedule Lesson
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          // Handle message
                        }}>
                          Message Student
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          // Handle edit
                        }}>
                          Edit Profile
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default StudentsTable;
