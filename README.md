# frontend-vue

## Project setup
```
npm install
follow prompts until there are 0 vulnerabilities
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
## Initial Datbase Population-
Lecturer Features-

-Navigate to http://localhost:8080/register and input lecturer username , First name, Surname and Password
-Navigate to http://localhost:8080/login and input lecturer username and passsword to access the lecturer homepage
-View My Sessions will take you to a list of your sessions, where you can display each sessions' attendance code.
-Logout will log you out

Student Features-
-Navigate to http://localhost:8080/registerStu and input student username , First name, Surname and Password
-Navigate to http://localhost:8080/loginStu and input student username and passsword to access the lecturer homepage
-Possible Sessions includes past sessions that could've been attended, sessions that were attended and a score calculated off those
-RegisterAttendance will take you to a page where you can type in the attendance code to register your attendance (this feature is tempremental and buggy due to a cacheing issue that I can't for the life of me solve, if you want to test the functionality then you can restart the backend when on the registerattendance page)
-Logout will log you out

Admin Features
-Navigate to http://localhost:8080/adminHome
-from there you can add, edit and delete courses, modules and sesions
currently there is no login system for the admin as it is an incomplete prototype
