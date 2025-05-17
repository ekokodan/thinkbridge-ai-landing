
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { fetchTutors, fetchAvailableSlots } from '@/api/booking';
import { useBookingStore } from '@/stores/useBookingStore';

const SelectDateTime = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTutor, setSelectedTutor] = useState<string | null>(null);
  
  const { 
    selectedSubjectId, 
    selectedPlanId,
    selectedTutorId,
    selectTutor,
    selectSlot
  } = useBookingStore();
  
  // Queries
  const { data: tutors, isLoading: isLoadingTutors } = useQuery({
    queryKey: ['tutors', selectedSubjectId],
    queryFn: () => selectedSubjectId ? fetchTutors(selectedSubjectId) : Promise.resolve([]),
    enabled: !!selectedSubjectId,
  });
  
  const { data: slots, isLoading: isLoadingSlots } = useQuery({
    queryKey: ['slots', selectedTutor, date],
    queryFn: () => {
      if (!selectedTutor || !date) return Promise.resolve([]);
      return fetchAvailableSlots(selectedTutor, date.toISOString());
    },
    enabled: !!selectedTutor && !!date,
  });
  
  // Redirect if required previous selections are missing
  if (!selectedSubjectId || !selectedPlanId) {
    navigate('/book');
    return null;
  }
  
  // Effect to set the selected tutor from store if available
  if (selectedTutorId && !selectedTutor && tutors?.some(t => t.id === selectedTutorId)) {
    setSelectedTutor(selectedTutorId);
  }
  
  const handleTutorSelect = (tutorId: string) => {
    setSelectedTutor(tutorId);
    selectTutor(tutorId);
  };
  
  const handleSlotSelect = (slotId: string) => {
    if (date) {
      selectSlot(slotId, date.toISOString());
      navigate('/book/review');
    }
  };
  
  const handleBack = () => {
    navigate('/book/plan');
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Select Date and Time</h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left column with calendar and tutors */}
        <div>
          <h3 className="text-lg font-medium mb-4">1. Pick a Day</h3>
          <div className="bg-white border rounded-lg p-4 mb-6">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="pointer-events-auto"
              disabled={(date) => 
                date < new Date() || // Can't select past dates
                date > new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // Can't book more than 30 days in advance
              }
            />
          </div>
          
          <h3 className="text-lg font-medium mb-4">2. Choose a Tutor</h3>
          {isLoadingTutors ? (
            <div className="flex justify-center py-8">
              <div className="w-8 h-8 border-4 border-thinkbridge-300 border-t-thinkbridge-600 rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {tutors?.map((tutor) => (
                <Card 
                  key={tutor.id}
                  className={`cursor-pointer transition-all ${
                    selectedTutor === tutor.id ? 'border-thinkbridge-600' : ''
                  }`}
                  onClick={() => handleTutorSelect(tutor.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`
                        h-10 w-10 rounded-full bg-thinkbridge-100 flex items-center justify-center
                        ${selectedTutor === tutor.id ? 'text-thinkbridge-600' : 'text-slate-600'}
                      `}>
                        {tutor.name.substring(0, 1)}
                      </div>
                      <div>
                        <div className="font-medium">{tutor.name}</div>
                        <div className="text-sm text-muted-foreground">{tutor.bio}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
        
        {/* Right column with available time slots */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>3. Available Time Slots</CardTitle>
              <CardDescription>
                {selectedTutor && date 
                  ? `Available times on ${format(date, 'MMMM d, yyyy')}`
                  : "Select a tutor and date to view available slots"
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingSlots ? (
                <div className="flex justify-center py-12">
                  <div className="w-8 h-8 border-4 border-thinkbridge-300 border-t-thinkbridge-600 rounded-full animate-spin"></div>
                </div>
              ) : !selectedTutor ? (
                <div className="text-center py-12 text-muted-foreground">
                  Please select a tutor
                </div>
              ) : !date ? (
                <div className="text-center py-12 text-muted-foreground">
                  Please select a date
                </div>
              ) : slots?.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  No available slots for this date. Please try another day.
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {slots?.filter(slot => slot.isAvailable).map((slot) => (
                    <Button
                      key={slot.id}
                      variant="outline"
                      className="justify-center"
                      onClick={() => handleSlotSelect(slot.id)}
                    >
                      {format(new Date(slot.startTime), 'h:mm a')}
                    </Button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="mt-12 flex justify-between">
        <Button 
          variant="outline" 
          onClick={handleBack}
          size="lg"
        >
          Back
        </Button>
      </div>
    </div>
  );
};

export default SelectDateTime;
