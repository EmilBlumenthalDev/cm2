# Self-Assessment

### Example 1: Improving Code Quality

Initially, our `deleteJobById` endpoint was functional but lacked robustness to handle edge cases. Here's the original implementation:

```javascript
// Delete job by ID
const deleteJobById = async (req, res) => {
    const jobId = req.params.jobId;
    try {
        const result = await Job.deleteJobById(jobId);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
```

The endpoint worked for requests like:
`DELETE http://localhost:4000/api/jobs/12345`

However, it failed when:
1. `jobId` was invalid or non-existent.
2. The job was already deleted.

To address these issues, we refactored the code to handle edge cases effectively:

```javascript
// Optimized deleteJobById
const deleteJobById = async (req, res) => {
    const jobId = req.params.jobId;
    try {
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }
        await Job.deleteJobById(jobId);
        res.status(200).json({ message: 'Job deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
```

### Key Improvements:
- **Existence Check:** Added a check to ensure the job exists before attempting to delete it.
- **Clear Messaging:** Provided clear error messages for better debugging and user experience.

---

### Example 2: Debugging Route Order in Express

We encountered an issue with routing in our `jobRouter.js` file. Here's the problematic setup:

```javascript
// Problematic route order
router.get('/:id', getJob);
router.get('/', getAllJobs);
```

Requests to `/api/jobs` returned "Invalid ID" errors because Express evaluated the dynamic `/:id` route before `/`. This happened because Express matches routes in the order they are defined.

### Solution:
We reordered the routes to prioritize specific routes before dynamic ones:

```javascript
// Corrected route order
router.get('/', getAllJobs); // Specific route comes first
router.get('/:id', getJob); // Dynamic route follows
router.post('/', createJob);
router.put('/:id', editJob);
router.delete('/:jobId', deleteJobById);
```

**Lessons Learned:**

1. **Route Evaluation in Express:** Routes are matched sequentially. Specific routes (e.g., `/`) must be defined before dynamic ones (e.g., `/:id`).
2. **Testing Matters:** Thorough testing revealed this subtle issue, which could have led to unpredictable behavior in production.

---

### Example 3: Handling Job Creation Errors

Initially, our `createJob` endpoint did not handle validation errors effectively. Here's the original implementation:

```javascript
// Create job post
const createJob = async (req, res) => {
    const { title, type, location, description, salary, company } = req.body;
    try {
        const job = await Job.createJobPost(title, type, location, description, salary, company);
        res.status(200).json({ job });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
```

The endpoint worked for valid requests but failed to provide meaningful error messages for invalid inputs.

### Solution:
We added validation and improved error handling:

```javascript
// Optimized createJob
const createJob = async (req, res) => {
    const { title, type, location, description, salary, company } = req.body;
    if (!title || !type || !location || !description || !salary || !company) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    try {
        const job = await Job.createJobPost(title, type, location, description, salary, company);
        res.status(201).json({ job });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
```

### Key Improvements:
- **Validation:** Added checks to ensure all required fields are provided.
- **Clear Messaging:** Provided clear error messages for missing fields.

---

### Example 4: Fetching Jobs with Pagination

Initially, our `getAllJobs` endpoint fetched all jobs without pagination. Here's the original implementation:

```javascript
// Get all jobs
const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.status(200).json(jobs);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
```

Fetching all jobs at once could lead to performance issues with a large dataset.

### Solution:
We added pagination support:

```javascript
// Optimized getAllJobs with pagination
const getAllJobs = async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    try {
        const jobs = await Job.find().limit(limit).skip((page - 1) * limit);
        res.status(200).json(jobs);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
```

### Key Improvements:
- **Pagination:** Added support for pagination to improve performance.
- **Flexibility:** Allowed clients to specify the number of jobs per page and the page number.

---

### Example 5: Handling Job Updates

Initially, our `editJob` endpoint did not handle partial updates effectively. Here's the original implementation:

```javascript
// Edit job post
const editJob = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        const job = await Job.editJobPost(id, updates);
        res.status(200).json(job);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
```

The endpoint worked for full updates but failed to handle partial updates correctly.

### Solution:
We ensured partial updates are handled effectively:

```javascript
// Optimized editJob
const editJob = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        const job = await Job.findByIdAndUpdate(id, updates, { new: true });
        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }
        res.status(200).json(job);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
```

### Key Improvements:
- **Partial Updates:** Ensured partial updates are handled correctly.
- **Existence Check:** Added a check to ensure the job exists before attempting to update it.

---

### Example 6: Fetching Job by ID

Initially, our `getJob` endpoint did not handle invalid IDs effectively. Here's the original implementation:

```javascript
// Get job by ID
const getJob = async (req, res) => {
    const { id } = req.params;
    try {
        const job = await Job.findById(id);
        res.status(200).json(job);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
```

The endpoint worked for valid IDs but failed to provide meaningful error messages for invalid IDs.

### Solution:
We improved error handling for invalid IDs:

```javascript
// Optimized getJob
const getJob = async (req, res) => {
    const { id } = req.params;
    try {
        const job = await Job.findById(id);
        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }
        res.status(200).json(job);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
```

### Key Improvements:
- **Existence Check:** Added a check to ensure the job exists before returning it.
- **Clear Messaging:** Provided clear error messages for invalid IDs.

---

### Example 7: Fetching Jobs by Location

Initially, our `getJobsByLocation` endpoint did not exist. We added this feature to allow users to filter jobs by location:

```javascript
// Get jobs by location
const getJobsByLocation = async (req, res) => {
    const { location } = req.params;
    try {
        const jobs = await Job.find({ location });
        res.status(200).json(jobs);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
```

### Key Improvements:
- **New Feature:** Added support for fetching jobs by location.
- **Flexibility:** Allowed users to filter jobs based on their preferred location.

---

### Example 8: Handling Authentication

Initially, our routes did not have authentication middleware. We added authentication to secure our endpoints:

```javascript
// Apply authentication middleware
router.use(requireAuth);
```

### Key Improvements:
- **Security:** Secured our endpoints by requiring authentication.
- **Consistency:** Ensured all routes are protected by applying the middleware globally.

---

### Example 9: Handling Job Listings on Frontend

Initially, our frontend did not handle loading states effectively. Here's the original implementation:

```jsx
// JobListings component
const JobListings = ({ isHome = false }) => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            const apiUrl = isHome ? '/api/jobs?_limit=3' : '/api/jobs';
            try {
                const res = await fetch(apiUrl);
                const data = await res.json();
                setJobs(data);
            } catch (error) {
                console.log('Error fetching data', error);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, [isHome]);

    return (
        <section className='bg-blue-50 px-4 py-10'>
            <div className='container-xl lg:container m-auto'>
                <h2 className='text-3xl font-bold text-indigo-500 mb-6 text-center'>
                    {isHome ? 'Recent Jobs' : 'Browse Jobs'}
                </h2>
                {loading ? (
                    <Spinner loading={loading} />
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                        {jobs.length === 0 ? (
                            <p className='text-center text-gray-500'>No jobs available at the moment.</p>
                        ) : (
                            jobs.map((job) => (
                                <JobListing key={job.id} job={job} />
                            ))
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

export default JobListings;
```

### Key Improvements:
- **Loading State:** Added a loading state to provide feedback while data is being fetched.
- **Error Handling:** Improved error handling to log errors and provide fallback UI.

---

### Example 10: Adding Job Listings on Frontend

Initially, our frontend did not have a way to add job listings. We added a form to allow users to add new jobs:

```html
<!-- Add Job Form -->
<section class="bg-blue-50 py-4">
    <div class="container mx-auto px-4">
        <form id="add-job-form">
            <div class="mb-4">
                <label for="title" class="block text-gray-700">Job Title</label>
                <input type="text" id="title" class="w-full p-3 border border-gray-300 rounded-lg" required />
            </div>
            <div class="mb-4">
                <label for="type" class="block text-gray-700">Job Type</label>
                <input type="text" id="type" class="w-full p-3 border border-gray-300 rounded-lg" required />
            </div>
            <div class="mb-4">
                <label for="location" class="block text-gray-700">Location</label>
                <input type="text" id="location" class="w-full p-3 border border-gray-300 rounded-lg" required />
            </div>
            <div class="mb-4">
                <label for="description" class="block text-gray-700">Description</label>
                <textarea id="description" class="w-full p-3 border border-gray-300 rounded-lg" required></textarea>
            </div>
            <div class="mb-4">
                <label for="salary" class="block text-gray-700">Salary</label>
                <input type="number" id="salary" class="w-full p-3 border border-gray-300 rounded-lg" required />
            </div>
            <div class="mb-4">
                <label for="company" class="block text-gray-700">Company</label>
                <input type="text" id="company" class="w-full p-3 border border-gray-300 rounded-lg" required />
            </div>
            <button type="submit" class="bg-indigo-500 text-white px-4 py-2 rounded-lg">Add Job</button>
        </form>
    </div>
</section>
```

### Key Improvements:
- **New Feature:** Added a form to allow users to add new job listings.
- **User Experience:** Improved user experience by providing a way to add jobs directly from the frontend.
