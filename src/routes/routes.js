import ProfileLayout from "@/layout/ProfileLayout"
import Profile from "@/components/Profile.vue"

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
]

export default routes;