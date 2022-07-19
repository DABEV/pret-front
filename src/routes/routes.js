
const routes = [

    {
        path: "/",
        component: () => import("@/components/HelloWorld.vue"),
        redirect: "/",
        children: [
            {
                path: "",
                name: "Example",
                component: () => import("@/components/HelloWorld.vue"),
            }
        ],
        component: () => import("@/components/error-view/index.vue"),
        redirect: "/error",
        children: [
            {
                path: "",
                name: "Example",
                component: () => import("@/components/error-view/index.vue"),
            }
        ]
    },
]

export default routes;