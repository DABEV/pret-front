import Access from "@/layout/LoginLayout.vue";
import Vacancy from "@/layout/VacancyLayout.vue";
import RegisterVacancy from "@/components/RegisterVacancy.vue";
import Login from "@/components/login/Login.vue";
import RegisterRecuiter from "@/components/login/RegisterRecuiter.vue";
import RegisterUser from "@/components/login/RegisterUser.vue";

const routes = [
    
    {
        path: "/",
        component:() => import("@/components/HelloWorld.vue"),
        redirect: "/",
        children: [
            {
                path: "",
                name: "Example",
                component:() => import("@/components/HelloWorld.vue") ,
            }
        ]

    },
    {
        path: "/session",
        component: Access,
        children: [
            {
                path: "login",
                name: "Login",
                component: Login,
            },
            {
                path: "registerRecruiter",
                name: "Register Recruiter",
                component: RegisterRecuiter,
            },
            {
                path: "registerUser",
                name: "Register User",
                component: RegisterUser,
            }
        ]
    },
    {
        path: "/vacancy",
        component: Vacancy,
        children: [
            {
                path: "register",
                name: "Register Vacancy",
                component: RegisterVacancy,
            }
        ]
    },
]

export default routes;