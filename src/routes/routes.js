import Access from "@/layout/LoginLayout.vue";
import Login from "@/components/Login.vue";

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
        redirect: "/session/login",
        children: [
            {
                path: "login",
                name: "Login",
                component: Login,
            }
        ]
    },
]

export default routes;