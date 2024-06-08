# School Management System

This is a School Management System built with TypeScript, Node.js, Express.js, Prisma, and MySQL. The project includes comprehensive features for managing users, classes, subjects, attendance, gradebooks, homework, exams, announcements, messages, and calendar events. The system is designed with role-based access control for different user roles: Admin, Teacher, Student, and Parent.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup](#setup)
- [Environment Variables](#environment-variables)
- [Database Schema](#database-schema)
- [Authorization Levels](#authorization-levels)
- [Project Structure](#project-structure)
- [Data Flow](#data-flow)
- [Testing](#testing)
- [API Endpoints](#api-endpoints)
- [Future Improvements](#future-improvements)

## Features

- **User Management**: CRUD operations for users (admin, teacher, student, parent) with role-based access control.
- **Class Management**: Admins can create and manage classes. Teachers are assigned to classes.
- **Subject Management**: Teachers can manage subjects they teach.
- **Attendance Management**: Teachers can record and manage student attendance.
- **Gradebook Management**: Teachers can record and manage grades for their subjects.
- **Homework Management**: Teachers can assign and manage homework for their classes.
- **Exam Management**: Teachers can create and manage exams for their classes.
- **Exam Results Management**: Teachers can record and manage exam results for their students.
- **Announcements**: Admins and teachers can create announcements.
- **Messaging**: Users can send and receive messages.
- **Calendar Events**: Users can create and view calendar events.

## Technologies Used

- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express.js**: A minimal and flexible Node.js web application framework.
- **Prisma**: A next-generation ORM for Node.js and TypeScript.
- **MySQL**: A relational database management system.
- **Jest**: A delightful JavaScript testing framework.

## Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/school-management-system.git
   cd school-management-system
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and add your database connection string and JWT secret:

   ```env
   DATABASE_URL="mysql://user:password@localhost:3306/school_db"
   JWT_SECRET="your_jwt_secret"
   ```

4. **Run database migrations**:

   ```bash
   npx prisma migrate dev --name init
   ```

5. **Generate Prisma Client**:

   ```bash
   npx prisma generate
   ```

6. **Start the development server**:
   ```bash
   npm run dev
   ```

## Environment Variables

- `DATABASE_URL`: The connection string for your MySQL database.
- `JWT_SECRET`: The secret key for signing JWT tokens.

## Database Schema

The database schema is defined in the `prisma/schema.prisma` file. The schema includes models for User, Teacher, Student, Parent, Class, Subject, Attendance, Gradebook, Homework, Exam, ExamResult, Announcement, Message, and CalendarEvent.

## Authorization Levels

- **Admin**: Full access to manage users, classes, subjects, announcements, and calendar events.
- **Teacher**: Access to manage their classes, subjects, attendance, gradebooks, homework, exams, exam results, announcements, messages, and calendar events.
- **Student**: Access to view their classes, subjects, attendance, gradebooks, homework, exams, exam results, announcements, messages, and calendar events.
- **Parent**: Access to view their children's classes, subjects, attendance, gradebooks, homework, exams, exam results, announcements, messages, and calendar events.

## Project Structure

```
school-management-system/
├── src/
│   ├── controllers/
│   │   ├── authController.ts
│   │   ├── classController.ts
│   │   ├── userController.ts
│   │   ├── studentController.ts
│   │   ├── teacherController.ts
│   │   ├── parentController.ts
│   │   ├── subjectController.ts
│   │   ├── attendanceController.ts
│   │   ├── gradebookController.ts
│   │   ├── homeworkController.ts
│   │   ├── examController.ts
│   │   ├── examResultController.ts
│   │   ├── announcementController.ts
│   │   ├── messageController.ts
│   │   ├── calendarEventController.ts
│   ├── routes/
│   │   ├── authRoutes.ts
│   │   ├── classRoutes.ts
│   │   ├── userRoutes.ts
│   │   ├── studentRoutes.ts
│   │   ├── teacherRoutes.ts
│   │   ├── parentRoutes.ts
│   │   ├── subjectRoutes.ts
│   │   ├── attendanceRoutes.ts
│   │   ├── gradebookRoutes.ts
│   │   ├── homeworkRoutes.ts
│   │   ├── examRoutes.ts
│   │   ├── examResultRoutes.ts
│   │   ├── announcementRoutes.ts
│   │   ├── messageRoutes.ts
│   │   ├── calendarEventRoutes.ts
│   ├── utils/
│   │   ├── types.ts
│   │   ├── errorMiddleware.ts
|   |   ├── authMiddleware.ts
│   └── index.ts
├── prisma/
│   ├── migrations/
│   └── schema.prisma
├── tests/
│   ├── auth.test.ts
│   ├── class.test.ts
│   ├── user.test.ts
│   ├── student.test.ts
│   ├── teacher.test.ts
│   ├── parent.test.ts
│   ├── subject.test.ts
│   ├── attendance.test.ts
│   ├── gradebook.test.ts
│   ├── homework.test.ts
│   ├── exam.test.ts
│   ├── examResult.test.ts
│   ├── announcement.test.ts
│   ├── message.test.ts
│   ├── calendarEvent.test.ts
├── .env
├── .env.example
├── package.json
└── tsconfig.json
```

## Data Flow

1. **User Authentication**:

   - Users (Admin, Teacher, Student, Parent) register and log in.
   - JWT tokens are issued for authentication.
   - Middleware validates JWT tokens and assigns user roles for authorization.

2. **User Management**:

   - Admins can create, read, update, and delete users.

3. **Class Management**:

   - Admins create and manage classes.
   - Teachers are assigned to classes.

4. **Subject Management**:

   - Teachers manage subjects they teach.
   - Subjects are linked to classes.

5. **Attendance Management**:

   - Teachers record and manage student attendance for their classes.

6. **Gradebook Management**:

   - Teachers record and manage grades for their subjects.

7. **Homework Management**:

   - Teachers assign and manage homework for their classes.

8. **Exam Management**:

   - Teachers create and manage exams for their classes.

9. **Exam Results Management**:

   - Teachers record and manage exam results for their students.

10. **Announcements**:

    - Admins and teachers create and manage announcements.

11. **Messaging**:

    - Users send and receive messages.

12. **Calendar Events**:
    - Users create and view calendar events.

## Testing

- Tests are written using Jest.
- Tests cover all major functionalities, including authentication, user management, class management, etc.
- To run the tests:
  ```bash
  npm test
  ```

## API Endpoints

### Authentication

- **POST /auth/register**: Register a new user.
- **POST /auth/login**: Log in a user.

### Users

- **POST /users**: Create a new user (Admin only).
- **GET /users**: Get all users (Admin only).
- **GET /users/:id**: Get a user by ID (Admin, Teacher, Student, Parent).
- **PUT /users/:id**: Update a user by ID (Admin, Teacher, Student, Parent).
- **DELETE /users/:id**: Delete a user by ID (Admin only).

### Classes

- **POST /classes**: Create a new class (Admin only).
- **GET /classes**: Get all classes (Admin, Teacher, Student, Parent).
- **GET /classes/:id**: Get a class by ID (Admin, Teacher, Student, Parent).
- **PUT /classes/:id**: Update a class by ID (Admin only).
- **DELETE /classes/:id**: Delete a

class by ID (Admin only).

### Subjects

- **POST /subjects**: Create a new subject (Teacher only).
- **GET /subjects**: Get all subjects (Admin, Teacher, Student, Parent).
- **GET /subjects/:id**: Get a subject by ID (Admin, Teacher, Student, Parent).
- **PUT /subjects/:id**: Update a subject by ID (Teacher only).
- **DELETE /subjects/:id**: Delete a subject by ID (Teacher only).

### Attendance

- **POST /attendance**: Record attendance (Teacher only).
- **GET /attendance**: Get attendance records (Admin, Teacher, Student, Parent).

### Gradebook

- **POST /gradebook**: Record grades (Teacher only).
- **GET /gradebook**: Get gradebook records (Admin, Teacher, Student, Parent).

### Homework

- **POST /homework**: Assign homework (Teacher only).
- **GET /homework**: Get homework assignments (Admin, Teacher, Student, Parent).

### Exams

- **POST /exams**: Create an exam (Teacher only).
- **GET /exams**: Get exams (Admin, Teacher, Student, Parent).

### Exam Results

- **POST /exam-results**: Record exam results (Teacher only).
- **GET /exam-results**: Get exam results (Admin, Teacher, Student, Parent).

### Announcements

- **POST /announcements**: Create an announcement (Admin, Teacher).
- **GET /announcements**: Get announcements (Admin, Teacher, Student, Parent).

### Messages

- **POST /messages**: Send a message (Admin, Teacher, Student, Parent).
- **GET /messages**: Get messages (Admin, Teacher, Student, Parent).

### Calendar Events

- **POST /calendar-events**: Create a calendar event (Admin, Teacher).
- **GET /calendar-events**: Get calendar events (Admin, Teacher, Student, Parent).

## Future Improvements

- **Document Uploads**: Allow teachers to upload and manage documents for classes and subjects.
- **Notifications**: Implement a notification system for important events and deadlines.
- **Mobile App**: Develop a mobile app for students and parents to access the system on the go.
- **Reporting**: Add reporting features for generating performance reports, attendance reports, etc.

---

By following this detailed guide, you should be able to set up, understand, and extend the School Management System project. This project will demonstrate your backend development skills, knowledge of TypeScript, Node.js/Express, Prisma, and MySQL, and your ability to implement role-based access control and comprehensive testing.

```

This README file provides a comprehensive overview of the project, including setup instructions, the database schema, authorization levels, project structure, data flow, testing, API endpoints, and potential future improvements. This should help you effectively set up and understand the School Management System project.
```
