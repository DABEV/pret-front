import Access from "@/layout/LoginLayout.vue";
import RegisterVacancy from "@/components/reclutador/RegisterVacancy.vue";
import CandidatesList from "@/components/reclutador/CandidateList.vue";
import PropiceCandidates from "@/components/reclutador/PropiceCandidatesList.vue";
import Login from "@/components/login/Login.vue";
import RegisterRecuiter from "@/components/login/RegisterRecuiter.vue";
import RegisterUser from "@/components/login/RegisterUser.vue";

import ContentLayout from "@/layout/ContentLayout";
import Profile from "@/components/candidato/Profile.vue";
import Status from "@/components/candidato/Status.vue";
import ContactList from "@/components/candidato/ContactList.vue";
import VacanciesList from "@/components/reclutador/VacanciesList.vue";

import Vacancies from "@/components/candidato/Vacancies.vue";
import ErrorLayout from "@/layout/ErrorLayout.vue"
import ErrorPage from "@/components/ErrorPage.vue"
import Favorites from "@/components/candidato/Favorites.vue"

const routes = [
  {
    path: "/",
    component: ContentLayout,
    redirect: "/",
    children: [
      {
        path: "",
        name: "Buscar",
        component: Vacancies,
      },
    ],
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
      },
    ],
  },

  {
    path: "/vacancy",
    component: ContentLayout,
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
      },
    ],
  },


  {
    path: "/vacantes",
    component: ContentLayout,
    redirect: "/vacantes",
    children: [
      {
        path: "",
        name: "Vacantes",
        component: VacanciesList,
      },
    ],
  },

  {
    path: "/candidato",
    component: ContentLayout,
    children: [
      {
        path: "buscar",
        name: "Vacantes disponibles",
        component: Vacancies,
      },
      {
        path: "perfil",
        name: "Perfil de usuario",
        component: Profile,
      },
      {
        path: "contactos",
        name: "Contactos",
        component: ContactList,
      },
      {
        path: "postulaciones",
        name: "Postulaciones",
        component: Status,
      },
      {
        path: "favoritos",
        name: "Favoritos",
        component: Favorites,
      },
    ],
  },

  {
    path: "/error",
    component: ErrorLayout,
    children: [
      {
        path: "",
        name: "Error 404",
        component: ErrorPage,
      },
    ],
  },
];

export default routes;
