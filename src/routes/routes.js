import ProfileLayout from "@/layout/ProfileLayout"
import Profile from "@/components/Profile.vue"
import Status from "@/components/Status.vue"
import StatusLayout from "@/layout/StatusLayout.vue"

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
        path: "/profile",
        component:ProfileLayout,
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
        component:StatusLayout,
        redirect: "/postulaciones",
        children: [
            {
                path: "",
                name: "Postulaciones",
                component: Status,
            }
        ]

    },
]

export default routes;