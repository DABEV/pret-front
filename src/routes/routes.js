
const routes = [
    
    {
        path: "/",
        component:() => import("@/layouts/VacancyView.vue"),
        redirect: "/",
        children: [
            {
                path: "",
                name: "Example",
                component:() => import("@/layouts/VacancyView.vue") ,
            }
        ],
    },
]

export default routes;

// @/layouts/VacancyView.vue
// @/components/ContactList.vue