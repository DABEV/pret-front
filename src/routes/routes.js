
import Access from "@/layout/LoginLayout.vue";
import Vacancy from "@/layout/VacancyLayout.vue";
import RegisterVacancy from "@/components/RegisterVacancy.vue";
import CandidatesList from "@/components/CandidateList.vue";
import PropiceCandidates from "@/components/PropiceCandidatesList.vue";
import Login from "@/components/login/Login.vue";
import RegisterRecuiter from "@/components/login/RegisterRecuiter.vue";
import RegisterUser from "@/components/login/RegisterUser.vue";

import ContentLayout from "@/layout/ContentLayout"
import Profile from "@/components/Profile.vue"
import Status from "@/components/Status.vue"
import ContactList from "@/components/ContactList.vue"
import VacanciesList from "@/components/VacanciesList.vue"


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
            },
            {
                path: "candidatesList",
                name: "Candidates List",
                component: CandidatesList,
            },
            {
                path: "propiceCandidates",
                name: "Propice Candidates List",
                component: PropiceCandidates,
            }
        ]
      },
      
      {
        path: "/profile",
        component:ContentLayout,
        redirect: "/profile",
        children: [
            {
                path: "",
                name: "Profile",
                component: Profile,
            }
        ]

    },
    {
        path: "/postulaciones",
        component:ContentLayout,
        redirect: "/postulaciones",
        children: [
            {
                path: "",
                name: "Postulaciones",
                component: Status,
            }
        ]

    },

    {
        path: "/contactos",
        component:ContentLayout,
        redirect: "/contactos",
        children: [
            {
                path: "",
                name: "Contactos",
                component: ContactList,
            }
        ]

    },

    {
        path: "/vacantes",
        component:ContentLayout,
        redirect: "/vacantes",
        children: [
            {
                path: "",
                name: "Vacantes",
                component: VacanciesList,
            }
        ]
    },
]

export default routes;