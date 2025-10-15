import React, { useState, useEffect } from 'react';
import BookLayout from './components/BookLayout';
import CoverPage from './components/CoverPage';
import Timer from './components/Timer';
import MessagePage from './components/MessagePage';
import GalleryPage from './components/GalleryPage';
import ListPage from './components/ListPage';
import JokesPage from './components/JokesPage';
import CouponsPage from './components/CouponsPage';
import { bookContent } from './data/bookContent';

function App() {
  const [isTimerComplete, setIsTimerComplete] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  // Check if timer is complete on component mount and every second
  useEffect(() => {
    const checkTimerStatus = () => {
      const now = new Date();
      const target = new Date(bookContent.birthdayDate);
      
      console.log('Checking timer status:');
      console.log('Now:', now);
      console.log('Target:', target);
      console.log('Is complete?', now >= target);
      
      if (now >= target) {
        setIsTimerComplete(true);
      }
    };
    
    // Check immediately
    checkTimerStatus();
    
    // Check every second
    const interval = setInterval(checkTimerStatus, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const handleOpenLetter = () => {
    if (isTimerComplete) {
      setCurrentPage(2); // Skip to first content page (after cover and timer)
    }
  };

  const handlePageChange = (newPage) => {
    // Only allow page changes if timer is complete or if staying on cover/timer pages
    if (isTimerComplete || newPage <= 1) {
      setCurrentPage(newPage);
    }
  };

  const renderPageByType = (page) => {
    switch (page.type) {
      case 'message':
        return <MessagePage title={page.title} content={page.content} />;
      case 'gallery':
        return <GalleryPage title={page.title} images={page.images} />;
      case 'list':
        return <ListPage title={page.title} items={page.items} />;
      case 'coupons':
        return <CouponsPage title={page.title} coupons={page.coupons} />;
      default:
        return <div>Unknown page type</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 flex items-center justify-center p-4">
      <div className="w-full">
        <BookLayout 
          currentPage={currentPage} 
          onPageChange={handlePageChange}
          isTimerComplete={isTimerComplete}
        >
          {/* Cover Page (Page 0) */}
          <div className="page-content">
            <CoverPage
              title={bookContent.title}
              subtitle={bookContent.subtitle}
              recipientName={bookContent.recipientName}
              onOpenLetter={handleOpenLetter}
              isTimerComplete={isTimerComplete}
            />
          </div>
          
          {/* Timer Page (Page 1) */}
          <div className="page-content">
            <Timer 
              targetDate={bookContent.birthdayDate} 
              onComplete={() => {
                console.log('Timer completed!');
                setIsTimerComplete(true);
              }}
            />
          </div>
          
          {/* Content Pages - Only accessible after timer completes */}
          {bookContent.pages.map((page, index) => (
            <div key={page.id} className="page-content">
              {renderPageByType(page)}
            </div>
          ))}
        </BookLayout>
      </div>
    </div>
  );
}

export default App;