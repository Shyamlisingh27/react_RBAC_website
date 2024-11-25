# Brief Explanation of RBAC project:
This project is an Admin Dashboard designed to manage Users, Roles, and Permissions efficiently. It implements Role-Based Access Control (RBAC) principles to streamline the administration of user roles and permissions. The dashboard provides the following functionalities:

# Features:

1. User Management

- View, add, edit, and delete users.
- Assign roles to users and manage their status (Active/Inactive).
- Ensure role suggestions in the dropdown dynamically reflect roles added in the Role Management page.

2. Role Management

- Create, view, edit, and delete roles.
- Assign permissions (e.g., Read, Write, Delete) to roles.
- Store roles persistently in localStorage to maintain data consistency across the application.

3. Data Persistence

- Leveraged localStorage to store users and roles, ensuring data remains intact even after navigating between pages or refreshing the browser.
- Dynamically fetch roles from localStorage to display in the User Management dropdown.

# Technical Stack:
- React.js: Core framework for building reusable components and managing the state of the application.
- CSS: Custom responsive design ensuring seamless user experience across devices.
- LocalStorage: Simple client-side storage for persisting data like users and roles.

# How It Works:
- The application consists of two primary pages: User Management and Role Management.
- Roles created on the Role Management page are saved to localStorage and automatically populate the dropdown in User Management.
- CRUD operations on both users and roles are implemented with intuitive forms and tables.
- Responsive design ensures usability on mobile, tablet, and desktop devices.
This project emphasizes modularity, usability, and persistence, making it an ideal tool for managing RBAC systems in real-world applications.
