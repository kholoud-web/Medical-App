import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Utility function for classnames
const cn = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

// Inline Button Component
const Button = ({ 
  children, 
  variant = "default", 
  size = "default", 
  className = "", 
  onClick,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
  };
  
  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  };
  
  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [stats] = useState({
    todayTotal: 30,
    online: 20,
    inClinic: 10,
    homeVisit: 0,
  });

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Get the week days starting from Sunday
  const getWeekDays = (date) => {
    const days = [];
    const current = new Date(date);
    const dayOfWeek = current.getDay();
    
    // Go back to Sunday
    current.setDate(current.getDate() - dayOfWeek);
    
    for (let i = 0; i < 7; i++) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    
    return days;
  };

  const weekDays = getWeekDays(currentDate);

  const previousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const nextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const formatTodayDate = () => {
    const today = new Date();
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    return `Today: ${monthNames[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;
  };

  return (
    <div className="w-[330px] sm:w-[476px] h-[414px] mx-auto bg-card rounded-2xl shadow-medium overflow-hidden">
      {/* Header - Blue Section */}
      <div className="bg-[#3868C8] px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={previousWeek}
            className="h-10 w-10 rounded-full bg-[#3868C8] hover:bg-card-bg text-primary-foreground"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          
          <div className="flex-1 px-4">
            <div className="grid grid-cols-7 gap-1">
              {weekDays.map((date, index) => {
                const today = isToday(date);
                return (
                  <div key={index} className="text-center">
                    <div className="text-xs font-medium text-primary-foreground/80 mb-2">
                      {dayNames[index]}
                    </div>
                    <div
                      className={cn(
                        "w-8 h-8 mx-auto rounded-full flex items-center justify-center text-sm font-semibold transition-all",
                        today
                          ? "bg-card-bg text-primary shadow-lg scale-110"
                          : "text-primary-foreground"
                      )}
                    >
                      {date.getDate()}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={nextWeek}
            className="h-10 w-10 rounded-full bg-[#3868C8] hover:bg-card-bg text-primary-foreground"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        <div className="text-center text-primary-foreground font-semibold text-base">
          {formatTodayDate()}
        </div>
      </div>

      {/* Stats Section - White Section */}
      <div className="bg-card-bg px-6 py-6">
        <div className="flex items-center justify-between py-3 border-b border-border">
          <span className="text-foreground font-semibold text-lg">
            Today appointment
          </span>
          <span className="text-foreground font-bold text-2xl">
            {stats.todayTotal}
          </span>
        </div>

        <div className="flex items-center justify-between py-3 border-b border-border">
          <span className="text-foreground font-semibold text-lg">
            Online
          </span>
          <span className="text-foreground font-bold text-2xl">
            {stats.online}
          </span>
        </div>

        <div className="flex items-center justify-between py-3 border-b border-border">
          <span className="text-foreground font-semibold text-lg">
            In-Clinic
          </span>
          <span className="text-foreground font-bold text-2xl">
            {stats.inClinic}
          </span>
        </div>

        <div className="flex items-center justify-between py-3">
          <span className="text-foreground font-semibold text-lg">
            Home visit
          </span>
          <span className="text-foreground font-bold text-2xl">
            {stats.homeVisit}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Calendar;