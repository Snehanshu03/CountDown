// Dynamic Countdown Timer to August 25th, 2025 at 12:00 AM IST
class CountdownTimer {
    constructor() {
        // Target date: August 25, 2025 at 12:00 AM IST
        // Create target date specifically in IST timezone
        this.targetDate = new Date('2025-08-25T00:00:00.000+05:30');
        this.intervalId = null;
        this.hasFinished = false;
        
        // DOM elements
        this.daysElement = document.getElementById('days');
        this.hoursElement = document.getElementById('hours');
        this.minutesElement = document.getElementById('minutes');
        this.secondsElement = document.getElementById('seconds');
        this.clickMeBtn = document.getElementById('clickMeBtn');
        
        this.init();
    }
    
    init() {
        // Log target date for debugging
        const targetIST = new Date(this.targetDate.toLocaleString("en-US", {timeZone: "Asia/Kolkata"}));
        console.log('Target date (IST):', this.targetDate.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }));
        
        // Initial display update
        this.updateDisplay();
        
        // Start the countdown timer
        this.start();
        
        // Add click handler for the button
        this.clickMeBtn.addEventListener('click', this.handleButtonClick.bind(this));
    }
    
    start() {
        if (this.hasFinished) return;
        
        // Update immediately, then every second
        this.intervalId = setInterval(() => {
            this.updateDisplay();
        }, 1000);
    }
    
    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
    
    getCurrentTimeIST() {
        // Get current time and convert to IST
        const now = new Date();
        // Convert current time to IST by getting the time in IST timezone
        const istTime = new Date(now.toLocaleString("en-US", {timeZone: "Asia/Kolkata"}));
        
        // Adjust for timezone offset difference between local and IST representation
        const offset = now.getTime() - istTime.getTime();
        return new Date(now.getTime() - offset);
    }
    
    calculateTimeRemaining() {
        const now = new Date(); // Current time in local timezone
        const timeRemaining = this.targetDate.getTime() - now.getTime();
        
        console.log('Current time (Local):', now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }));
        console.log('Target time (IST):', this.targetDate.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }));
        console.log('Time remaining (ms):', timeRemaining);
        
        if (timeRemaining <= 0) {
            return {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
                totalMs: 0
            };
        }
        
        // Convert milliseconds to time components
        const totalSeconds = Math.floor(timeRemaining / 1000);
        const days = Math.floor(totalSeconds / (24 * 60 * 60));
        const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
        const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
        const seconds = totalSeconds % 60;
        
        console.log(`Time remaining: ${days}d ${hours}h ${minutes}m ${seconds}s`);
        
        return {
            days,
            hours,
            minutes,
            seconds,
            totalMs: timeRemaining
        };
    }
    
    updateDisplay() {
        const timeRemaining = this.calculateTimeRemaining();
        
        // Update display with formatted numbers
        this.daysElement.textContent = this.formatNumber(timeRemaining.days);
        this.hoursElement.textContent = this.formatNumber(timeRemaining.hours);
        this.minutesElement.textContent = this.formatNumber(timeRemaining.minutes);
        this.secondsElement.textContent = this.formatNumber(timeRemaining.seconds);
        
        // Add pulse effect to seconds for visual feedback
        if (timeRemaining.totalMs > 0) {
            this.addPulseEffect(this.secondsElement);
        }
        
        // Check if countdown has reached zero
        if (timeRemaining.totalMs <= 0 && !this.hasFinished) {
            this.hasFinished = true;
            this.stop();
            this.showButton();
            console.log('Countdown finished! Target date reached.');
        }
    }
    
    formatNumber(number) {
        return number.toString().padStart(2, '0');
    }
    
    addPulseEffect(element) {
        element.style.transform = 'scale(1.1)';
        
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 200);
    }
    
    showButton() {
        console.log('Showing button - countdown finished!');
        
        // Remove hidden class
        this.clickMeBtn.classList.remove('hidden');
        
        // Force reflow
        this.clickMeBtn.offsetHeight;
        
        // Add show class with delay for smooth animation
        setTimeout(() => {
            this.clickMeBtn.classList.add('show');
        }, 50);
    }
    
    handleButtonClick(event) {
        event.preventDefault();
        
        console.log('Button clicked! Redirecting to Google...');
        
        // Visual feedback
        this.clickMeBtn.style.transform = 'scale(0.95)';
        this.clickMeBtn.textContent = 'Redirecting...';
        
        // Redirect after brief delay
        setTimeout(() => {
            window.location.href = 'https://www.google.com';
        }, 300);
    }
}

// Application data matching the provided JSON
const applicationData = {
    "target_date": "2025-08-25T00:00:00+05:30",
    "target_date_readable": "August 25, 2025 at 12:00 AM IST",
    "redirect_url": "https://www.google.com",
    "timer_labels": ["DAYS", "HOURS", "MINUTES", "SECONDS"],
    "timezone": "Asia/Kolkata"
};

// Initialize the countdown timer when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing countdown timer...');
    console.log('Application data:', applicationData);
    
    const timer = new CountdownTimer();
    
    // Make timer available globally for debugging
    window.countdownTimer = timer;
    
    // Add hover effects to countdown boxes
    const countdownBoxes = document.querySelectorAll('.countdown-box');
    
    countdownBoxes.forEach(box => {
        box.addEventListener('mouseenter', () => {
            box.style.background = 'rgba(255, 255, 255, 0.15)';
        });
        
        box.addEventListener('mouseleave', () => {
            box.style.background = 'rgba(255, 255, 255, 0.1)';
        });
    });
});