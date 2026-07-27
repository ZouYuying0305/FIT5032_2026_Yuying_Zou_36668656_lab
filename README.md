# FIT5032 2026 - Laboratory Coursework

**Student:** Yuying Zou  
**Student ID:** 36668656  
**Repository:** `FIT5032_2026_Yuying_Zou_36668656_lab`

## Overview

This repository stores FIT5032 laboratory work completed during the semester. The labs
are developed with Vue.js 3 and progressively cover core front-end development topics,
including component-based development, JSON data handling, Bootstrap styling, form
validation, PrimeVue components, Vue Router, and secure navigation.
Recent lab work also covers Firebase Authentication, including user registration, sign in,
logout, current user inspection, and role-based sign-in evidence.
The latest lab extends the Firebase work by integrating Cloud Firestore for adding,
retrieving, updating, deleting, and querying book records.

Lab 1 is maintained in a separate repository as required by the unit instructions. This
repository is used for later laboratory work and ongoing Vue.js practice.

## Repository Structure

```text
FIT5032_2026_Yuying_Zou_36668656_lab
|
├── Lab2/
│   └── yzou-library/
│       └── JSON data, computed properties, Vue directives, and data binding
|
├── Lab3/
│   └── yzou-library/
│       └── Bootstrap 5 integration, responsive forms, and UI components
|
├── Lab4/
│   └── yzou-library/
│       └── HTML validation, Vue custom validation, and PrimeVue DataTable
|
├── Lab5/
│   └── yzou-library/
│       └── Event handling, password confirmation, Vue DevTools, Vue Router, and secure navigation
|
├── Lab7/
│   └── yzou-library/
│       └── Firebase Authentication, registration, sign in, logout, and role-based testing
|
├── Lab8/
│   └── yzou-library/
│       └── Cloud Firestore setup, add/update/delete operations, and query retrieval
|
├── Assignment2/
│   └── Health charity web application development
|
├── Assignment3/
│   └── Advanced web application features and deployment
|
└── README.md
```

## Technologies Used

- Vue.js 3
- Vite
- JavaScript
- HTML5
- CSS3
- Bootstrap 5
- PrimeVue
- Vue Router
- Firebase Authentication
- Cloud Firestore
- Git and GitHub

## Lab Progress

| Lab | Topic | Status |
| --- | --- | --- |
| Lab 2 | JSON data, computed properties, directives, and binding | Completed |
| Lab 3 | Bootstrap styling and responsive form design | Completed |
| Lab 4 | HTML validation, Vue custom validation, and PrimeVue DataTable | Completed |
| Lab 5 | Event handling, two-way binding, Vue DevTools, routing, and secure navigation | Completed |
| Lab 7 | Firebase Authentication, user registration, sign in, logout, and role-based testing | Completed |
| Lab 8 | Cloud Firestore data management, CRUD operations, and query retrieval | Completed |

## Running a Lab Project

Each lab project is stored in its own `yzou-library` folder. To run a specific lab, enter
that lab folder and start the Vite development server.

Example for Lab 8:

```bash
cd Lab8/yzou-library
npm install
npm run dev
```

Then open the localhost URL shown in the terminal, usually:

```text
http://localhost:5173/
```

## Notes

- `node_modules/` and `dist/` are excluded from version control.
- `.env.local` is excluded from version control to avoid exposing local Firebase configuration.
- Each lab is kept in a separate folder so previous work remains available for reference.
- Later assessments can reuse the same Vue.js concepts practised in these labs.

## Author

**Yuying Zou**  
Student ID: **36668656**
