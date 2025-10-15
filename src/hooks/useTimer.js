import { useState, useEffect } from 'react';
import { 
  differenceInSeconds, 
  differenceInMinutes, 
  differenceInHours, 
  differenceInDays,
  isAfter,
  parseISO
} from 'date-fns';

export const useTimer = (targetDate) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isComplete: false,
    totalSeconds: 0
  });

  useEffect(() => {
    // Clear any saved state to ensure fresh calculation
    localStorage.removeItem('birthdayTimerState');
    
    const calculateTimeLeft = () => {
      const now = new Date();
      let target;
      
      // Handle different date formats
      try {
        if (typeof targetDate === 'string') {
          // If it's an ISO string, parse it
          target = parseISO(targetDate);
        } else {
          // If it's already a Date object or can be converted
          target = new Date(targetDate);
        }
      } catch (error) {
        console.error('Invalid date format:', error);
        target = new Date(targetDate);
      }
      
      // Ensure we have a valid date
      if (isNaN(target.getTime())) {
        console.error('Invalid target date:', targetDate);
        return;
      }
      
      // Debug logging
      console.log('Current time:', now.toISOString());
      console.log('Target time:', target.toISOString());
      console.log('Is after target?', isAfter(now, target));
      
      if (isAfter(now, target)) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isComplete: true,
          totalSeconds: 0
        });
        return;
      }
      
      // Calculate differences
      const totalSeconds = differenceInSeconds(target, now);
      const days = differenceInDays(target, now);
      const hours = differenceInHours(target, now) % 24;
      const minutes = differenceInMinutes(target, now) % 60;
      const seconds = differenceInSeconds(target, now) % 60;
      
      // Debug logging
      console.log('Time left:', { days, hours, minutes, seconds, totalSeconds });
      
      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isComplete: false,
        totalSeconds
      });
    };

    // Calculate immediately
    calculateTimeLeft();
    
    // Set up interval
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [targetDate]); // Remove dependency on savedState

  return timeLeft;
};