// App State
const appState = {
    activeTab: 'dashboard',
    courses: [
        {
            id: 1,
            title: 'React Development',
            description: 'Complete React.js course with hooks and context',
            totalTopics: 25,
            completedTopics: 18,
            estimatedHours: 40,
            completedHours: 28,
            color: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
            nextSession: 'Today, 2:00 PM'
        },
        {
            id: 2,
            title: 'JavaScript Fundamentals',
            description: 'Master JavaScript ES6+ features and async programming',
            totalTopics: 20,
            completedTopics: 12,
            estimatedHours: 30,
            completedHours: 18,
            color: 'linear-gradient(135deg, #f59e0b, #d97706)',
            nextSession: 'Tomorrow, 10:00 AM'
        },
        {
            id: 3,
            title: 'Python Data Science',
            description: 'Learn pandas, numpy, and data visualization',
            totalTopics: 15,
            completedTopics: 5,
            estimatedHours: 35,
            completedHours: 12,
            color: 'linear-gradient(135deg, #10b981, #059669)',
            nextSession: 'Wed, 3:00 PM'
        }
    ],
    todos: [
        {
            id: 1,
            title: 'Complete React Hooks chapter',
            description: 'Study useEffect, useState, and custom hooks',
            priority: 'high',
            category: 'study',
            completed: false,
            dueDate: '2024-01-15',
            course: 'React Development'
        },
        {
            id: 2,
            title: 'Review JavaScript closures',
            description: 'Practice closure examples and use cases',
            priority: 'medium',
            category: 'study',
            completed: true,
            dueDate: '2024-01-14',
            course: 'JavaScript Fundamentals'
        },
        {
            id: 3,
            title: 'Set up development environment',
            description: 'Install Node.js, VS Code extensions, and Git',
            priority: 'high',
            category: 'setup',
            completed: false,
            dueDate: '2024-01-16',
            course: 'General'
        },
        {
            id: 4,
            title: 'Practice Python data structures',
            description: 'Work on lists, dictionaries, and sets exercises',
            priority: 'low',
            category: 'practice',
            completed: false,
            dueDate: '2024-01-18',
            course: 'Python Data Science'
        }
    ],
    currentFilter: 'all'
};

// DOM Elements
const navButtons = document.querySelectorAll('.nav-btn');
const tabContents = document.querySelectorAll('.tab-content');
const coursesGrid = document.getElementById('coursesGrid');
const todoList = document.getElementById('todoList');
const filterButtons = document.querySelectorAll('.filter-btn');

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    renderCourses();
    renderTodos();
    initializeCharts();
    updateStats();
});

// Navigation
function initializeNavigation() {
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tab = button.getAttribute('data-tab');
            switchTab(tab);
        });
    });
}

function switchTab(tabName) {
    // Update nav buttons
    navButtons.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    
    // Update tab content
    tabContents.forEach(content => content.classList.remove('active'));
    document.getElementById(tabName).classList.add('active');
    
    appState.activeTab = tabName;
}

// Course Management
function renderCourses() {
    if (!coursesGrid) return;
    
    coursesGrid.innerHTML = appState.courses.map(course => {
        const progress = Math.round((course.completedTopics / course.totalTopics) * 100);
        const hoursProgress = Math.round((course.completedHours / course.estimatedHours) * 100);
        
        return `
            <div class="course-card">
                <div class="course-header">
                    <div class="course-color" style="background: ${course.color}"></div>
                    <div class="course-info">
                        <h3>${course.title}</h3>
                        <p>${course.description}</p>
                    </div>
                </div>
                <div class="course-progress">
                    <div class="progress-info">
                        <span class="progress-text">Topics: ${course.completedTopics}/${course.totalTopics}</span>
                        <span class="progress-percentage">${progress}%</span>
                    </div>
                    <div class="stat-progress">
                        <div class="progress-bar" style="width: ${progress}%"></div>
                    </div>
                </div>
                <div class="course-progress">
                    <div class="progress-info">
                        <span class="progress-text">Hours: ${course.completedHours}/${course.estimatedHours}</span>
                        <span class="progress-percentage">${hoursProgress}%</span>
                    </div>
                    <div class="stat-progress">
                        <div class="progress-bar" style="width: ${hoursProgress}%"></div>
                    </div>
                </div>
                <div class="next-session">
                    <i class="fas fa-clock"></i>
                    <span>Next: ${course.nextSession}</span>
                </div>
            </div>
        `;
    }).join('');
}

// Todo Management
function renderTodos() {
    if (!todoList) return;
    
    const filteredTodos = filterTodos();
    
    if (filteredTodos.length === 0) {
        todoList.innerHTML = `
            <div style="text-align: center; padding: 3rem; color: #6b7280;">
                <p style="font-size: 1.125rem; margin-bottom: 0.5rem;">No tasks found</p>
                <p>Add a new task to get started!</p>
            </div>
        `;
        return;
    }
    
    todoList.innerHTML = filteredTodos.map(todo => `
        <div class="todo-item ${todo.completed ? 'completed' : ''}">
            <div class="todo-checkbox ${todo.completed ? 'checked' : ''}" 
                 onclick="toggleTodo(${todo.id})"></div>
            <div class="todo-content">
                <div class="todo-title">${todo.title}</div>
                <div class="todo-description">${todo.description}</div>
                <div class="todo-meta">
                    <span class="priority-badge priority-${todo.priority}">${todo.priority.toUpperCase()}</span>
                    <span>Due: ${formatDate(todo.dueDate)}</span>
                    <span>Course: ${todo.course}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function filterTodos() {
    switch (appState.currentFilter) {
        case 'completed':
            return appState.todos.filter(todo => todo.completed);
        case 'pending':
            return appState.todos.filter(todo => !todo.completed);
        case 'high':
            return appState.todos.filter(todo => todo.priority === 'high');
        default:
            return appState.todos;
    }
}

function toggleTodo(id) {
    const todo = appState.todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        renderTodos();
        updateStats();
    }
}

// Filter Management
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        if (filter) {
            appState.currentFilter = filter;
            
            // Update active filter button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            renderTodos();
        }
    });
});

// Modal Management
function openAddCourseModal() {
    document.getElementById('addCourseModal').classList.add('active');
}

function closeAddCourseModal() {
    document.getElementById('addCourseModal').classList.remove('active');
}

function openAddTodoModal() {
    document.getElementById('addTodoModal').classList.add('active');
}

function closeAddTodoModal() {
    document.getElementById('addTodoModal').classList.remove('active');
}

// Form Handling
document.getElementById('addCourseForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const newCourse = {
        id: appState.courses.length + 1,
        title: e.target.querySelector('input[type="text"]').value,
        description: e.target.querySelector('textarea').value,
        totalTopics: parseInt(e.target.querySelectorAll('input[type="number"]')[0].value),
        completedTopics: 0,
        estimatedHours: parseInt(e.target.querySelectorAll('input[type="number"]')[1].value),
        completedHours: 0,
        color: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
        nextSession: 'Not scheduled'
    };
    
    appState.courses.push(newCourse);
    renderCourses();
    closeAddCourseModal();
    e.target.reset();
});

document.getElementById('addTodoForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const inputs = e.target.querySelectorAll('input, textarea, select');
    const newTodo = {
        id: appState.todos.length + 1,
        title: inputs[0].value,
        description: inputs[1].value,
        priority: inputs[2].value,
        category: 'study',
        completed: false,
        dueDate: inputs[3].value,
        course: 'General'
    };
    
    appState.todos.push(newTodo);
    renderTodos();
    updateStats();
    closeAddTodoModal();
    e.target.reset();
});

// Charts
function initializeCharts() {
    // Example data: total study hours for each day of the week
    const studyHours = [2, 3.5, 4, 1, 5, 2.5, 3]; // Sun to Sat

    const ctx = document.getElementById('progressChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            datasets: [{
                label: 'Study Hours',
                data: studyHours,
                backgroundColor: 'rgba(59, 130, 246, 0.7)'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false },
                title: { display: true, text: 'Study Hours This Week' }
            },
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

// Stats Update
function updateStats() {
    const totalTodos = appState.todos.length;
    const completedTodos = appState.todos.filter(t => t.completed).length;
    const pendingTodos = totalTodos - completedTodos;
    const highPriorityTodos = appState.todos.filter(t => t.priority === 'high' && !t.completed).length;
    
    // Update todo stats if on todo tab
    const todoStats = document.querySelectorAll('.todo-stat .stat-value');
    if (todoStats.length >= 4) {
        todoStats[0].textContent = totalTodos;
        todoStats[1].textContent = completedTodos;
        todoStats[2].textContent = pendingTodos;
        todoStats[3].textContent = highPriorityTodos;
    }
}

// Utility Functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
}

// Close modals when clicking outside
document.addEventListener('click', function(e) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const activeModal = document.querySelector('.modal.active');
        if (activeModal) {
            activeModal.classList.remove('active');
        }
    }
});

// Responsive navigation for mobile
function toggleMobileNav() {
    const nav = document.querySelector('.navigation');
    nav.classList.toggle('mobile-open');
}

// Touch gestures for mobile (basic swipe detection)
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeDistance = touchEndX - touchStartX;
    const minSwipeDistance = 100;
    
    if (Math.abs(swipeDistance) > minSwipeDistance) {
        const tabs = ['dashboard', 'planner', 'todo', 'analytics'];
        const currentIndex = tabs.indexOf(appState.activeTab);
        
        if (swipeDistance > 0 && currentIndex > 0) {
            // Swipe right - previous tab
            switchTab(tabs[currentIndex - 1]);
        } else if (swipeDistance < 0 && currentIndex < tabs.length - 1) {
            // Swipe left - next tab
            switchTab(tabs[currentIndex + 1]);
        }
    }
}

// Auto-save to localStorage
function saveToLocalStorage() {
    localStorage.setItem('studySchedulerData', JSON.stringify({
        courses: appState.courses,
        todos: appState.todos
    }));
}

function loadFromLocalStorage() {
    const saved = localStorage.getItem('studySchedulerData');
    if (saved) {
        const data = JSON.parse(saved);
        appState.courses = data.courses || appState.courses;
        appState.todos = data.todos || appState.todos;
    }
}

// Load saved data on startup
loadFromLocalStorage();

// Save data periodically
setInterval(saveToLocalStorage, 30000); // Save every 30 seconds

// Save data when leaving the page
window.addEventListener('beforeunload', saveToLocalStorage);

// Notification system (basic)
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        z-index: 9999;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(notificationStyles);

// Demo notifications
setTimeout(() => {
    showNotification('Welcome to Study Scheduler!', 'success');
}, 1000);

console.log('Study Scheduler App initialized successfully!');
