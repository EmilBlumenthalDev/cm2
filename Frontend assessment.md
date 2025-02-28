# Self-Assessment (Template)

### Example 1: Improving Code Quality

Initially, our `addJob` function was functional but lacked proper error handling and feedback to the user. Here's the original implementation:

```javascript
// Add New Job
const addJob = async (newJob) => {
    const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newJob),
    });
    return;
};
```

The function worked for adding jobs but did not provide any feedback to the user or handle errors effectively.

To address these issues, we refactored the code to include error handling and user feedback:

```javascript
// Optimized addJob
const addJob = async (newJob) => {
    try {
        const res = await fetch('/api/jobs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newJob),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || 'Failed to add job');
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error adding job:', error);
        alert('Failed to add job. Please try again.');
    }
};
```

### Key Improvements:
- **Error Handling:** Added try-catch block to handle errors and provide meaningful feedback.
- **User Feedback:** Used `alert` to notify the user in case of failure.

---

### Example 2: Debugging Route Order in React Router

We encountered an issue with route matching in our `App.jsx` file. Here's the problematic setup:

```jsx
import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import JobsPage from './pages/JobsPage';
import NotFoundPage from './pages/NotFoundPage';
import JobPage, { jobLoader } from './pages/JobPage';
import AddJobPage from './pages/AddJobPage';
import EditJobPage from './pages/EditJobPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const App = () => {
    // Add New Job
    const addJob = async (newJob) => {
        const res = await fetch('/api/jobs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newJob),
        });
        return;
    };

    // Delete Job
    const deleteJob = async (id) => {
        const res = await fetch(`/api/jobs/${id}`, {
            method: 'DELETE',
        });
        return;
    };

    // Update Job
    const updateJob = async (job) => {
        const res = await fetch(`/api/jobs/${job.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(job),
        });
        return;
    };

    // Login Submit
    const loginSubmit = async (credentials) => {
        const res = await fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || 'Login failed');
        }

        const data = await res.json();
        localStorage.setItem('token', data.token);
        return data;
    };

    // Register Submit
    const registerSubmit = async (userData) => {
        const res = await fetch('/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || 'Registration failed');
        }

        const data = await res.json();
        return data;
    };

    return (
        <RouterProvider
            router={createBrowserRouter(
                createRoutesFromElements(
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<HomePage />} />
                        <Route path="jobs" element={<JobsPage />} />
                        <Route path="jobs/:id" element={<JobPage />} loader={jobLoader} />
                        <Route path="add-job" element={<AddJobPage />} />
                        <Route path="edit-job/:id" element={<EditJobPage />} />
                        <Route path="login" element={<LoginPage />} />
                        <Route path="register" element={<RegisterPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Route>
                )
            )}
        />
    );
};

export default App;
```

Requests to `/jobs/:id` were not matching correctly due to the order of routes.

### Solution:
We ensured that specific routes are defined before dynamic ones:

```jsx
<Route path="jobs" element={<JobsPage />} />
<Route path="jobs/:id" element={<JobPage />} loader={jobLoader} />
<Route path="add-job" element={<AddJobPage />} />
<Route path="edit-job/:id" element={<EditJobPage />} />
<Route path="login" element={<LoginPage />} />
<Route path="register" element={<RegisterPage />} />
<Route path="*" element={<NotFoundPage />} />
```

**Lessons Learned:**

1. **Route Order in React Router:** Specific routes must be defined before dynamic ones to ensure correct matching.
2. **Testing Matters:** Thorough testing revealed this subtle issue, which could have led to unpredictable behavior in production.