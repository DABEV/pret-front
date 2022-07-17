import Access from "@/layout/LoginLayout.vue";
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
]

export default routes;