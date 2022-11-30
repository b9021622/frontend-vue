import { createWebHistory, createRouter } from 'vue-router';
 
const routes = [
    {
        path: '/view-courses',
        name: 'view-courses',
        component: () => import("./components/AdminViewCourses")
    },
    {
        path: '/viewall-modules',
        name: 'viewall-modules',
        component: () => import("./components/adminviewAllModules")
    },
    {
        path: '/viewall-sessions',
        name: 'viewall-sessions',
        component: () => import("./components/adminViewSessions")
    },
    {
        path: '/lec-view-modules',
        name: 'lec-view-modules',
        component: () => import("./components/LecturerViewModules")
    },
    {
        path: '/lec-view-sessions',
        name: 'lec-view-sessions',
        component: () => import("./components/LecturerViewSessions")
    },
    {
        path: '/lec-view-code/:id',
        name: 'lec-view-code',
        component: () => import("./components/LecturerViewAttendanceCode")
    },
    {
        path: '/adminDeets/:id',
        name: 'adminDeets',
        component: () => import("./components/adminModuleDetails")
    },
    {
        path: '/adminCDeets/:id',
        name: 'adminCDeets',
        component: () => import("./components/adminCourseDetails")
    },
    {
        path: '/adminSDeets/:id',
        name: 'adminSDeets',
        component: () => import("./components/adminSessionDetails")
    },
    {
        path: '/addLecsTo/:id',
        name: 'addLecsTo',
        component: () => import("./components/addLecturersToModule")
    },
    {
        path: '/addStuToMod/:id',
        name: 'addStuToMod',
        component: () => import("./components/addStudentsToModule")
    },
    {
        path: '/addmod',
        name: 'addmod',
        component: () => import("./components/addModules")
    },
    {
        path: '/addcourse',
        name: 'addcourse',
        component: () => import("./components/addCourses")
    },
    {
        path: '/addSession',
        name: 'addSession',
        component: () => import("./components/addSession")
    },
    {
        path: '/register',
        name: 'register',
        component: () => import("./components/RegisterPageLecturer")
    },
    {
        path: '/registerStu',
        name: 'registerStu',
        component: () => import("./components/RegisterPageStudent")
    },
    {
        path: '/protected',
        name: 'protected',
        component: () => import("./components/ProtectedContent")
    },
    {
        path: '/login',
        name: 'login',
        component: () => import("./components/LoginPageLecturer")
    },
    {
        path: '/loginStu',
        name: 'loginStu',
        component: () => import("./components/LoginPageStudent")
    },
    {
        path: '/adminHome',
        name: 'adminHome',
        component: () => import("./components/adminHomepage")
    },
    {
        path: '/studentHome',
        name: 'studentHome',
        component: () => import("./components/StudentHomepage")
    },
    {
        path: '/stu-registerAtt',
        name: '/stu-registerAtt',
        component: () => import("./components/RegisterAttendance")
    },
    
    {
        path: '/lecturerHome',
        name: 'lecturerHome',
        component: () => import("./components/LecturerHomepage")
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;