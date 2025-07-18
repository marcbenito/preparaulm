# Application Pages

This document lists the main pages of the application, their purpose, and access level.

| Route                         | Purpose                                    | Access Level          |
| ----------------------------- | ------------------------------------------ | --------------------- |
| `/`                           | Main landing page                          | Public                |
| `/about`                      | Information about the project/company      | Public                |
| `/account/billing`            | Manage user billing information            | Restricted (User)     |
| `/account/change-plan`        | Change user subscription plan            | Restricted (User)     |
| `/category/[category]`        | Browse questions by specific category    | Public                |
| `/cookies`                    | Cookie policy details                      | Public                |
| `/dashboard`                  | User's main dashboard after login        | Restricted (User)     |
| `/instructor/student/[studentId]` | View specific student details/progress   | Restricted (Instructor)|
| `/login`                      | User login page                            | Public (Auth Flow)    |
| `/pricing`                    | Display pricing plans and options          | Public                |
| `/privacy`                    | Privacy policy details                     | Public                |
| `/profile`                    | Manage user profile settings               | Restricted (User)     |
| `/register`                   | User registration page                     | Public (Auth Flow)    |
| `/reset-password`             | Password reset flow                        | Public (Auth Flow)    |
| `/styleguide/...`             | Internal style guide pages               | Internal (Exclude)    |
| `/terms`                      | Terms of service details                   | Public                |
| `/test/[uid]`                 | Page for taking a specific test            | Restricted (User)     |
| `/test/[uid]/review`          | Review results of a completed test       | Restricted (User)     |
| `/test-categories`            | Browse available test categories         | Public                |
| `/test-selection`             | Select a test category/type to start     | Restricted (User)     |

**Notes:**

*   **Restricted (User):** Requires a standard user to be logged in.
*   **Restricted (Instructor):** Requires an instructor-level user to be logged in.
*   **Public (Auth Flow):** Publicly accessible, but part of the authentication process.
*   **Internal (Exclude):** Should not be linked publicly or indexed; primarily for development/internal use. 