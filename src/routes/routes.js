import ContentLayout from "@/layout/ContentLayout"
import Profile from "@/components/Profile.vue"
import Status from "@/components/Status.vue"
import ContactList from "@/components/ContactList.vue"

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
]

export default routes;