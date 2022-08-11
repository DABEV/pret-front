import Access from "@/layout/LoginLayout.vue";
import RegisterVacancy from "@/components/reclutador/RegisterVacancy.vue";
import CandidatesList from "@/components/reclutador/CandidateList.vue";
import Login from "@/components/login/Login.vue";
import RegisterRecuiter from "@/components/login/RegisterRecuiter.vue";
import RegisterUser from "@/components/login/RegisterUser.vue";

import ContentLayout from "@/layout/ContentLayout";
import Profile from "@/components/candidato/Profile.vue";
import Status from "@/components/candidato/Status.vue";
import ContactList from "@/components/candidato/ContactList.vue";
import VacanciesList from "@/components/reclutador/VacanciesList.vue";
import PDF from "@/components/candidato/PDF.vue";

import Vacancies from "@/components/candidato/Vacancies.vue";
import ErrorLayout from "@/layout/ErrorLayout.vue"
import ErrorPage from "@/components/ErrorPage.vue"
import Favorites from "@/components/candidato/Favorites.vue"
import EditProfile from "@/components/candidato/EditProfile.vue"
import ProfileRec from "@/components/reclutador/Profile.vue"

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
    path: "/acceso",
    component: Access,
    children: [
      {
        path: "login",
        name: "Login",
        component: Login,
      },
      {
        path: "registroReclutador",
        name: "Register Recruiter",
        component: RegisterRecuiter,
      },
      {
        path: "registroCandidato",
        name: "Register User",
        component: RegisterUser,
      },
    ],
  },


  {
    path: "/reclutador",
    component: ContentLayout,
    children: [
      {
        path: "vacantes",
        name: "Vacantes",
        component: VacanciesList,
      },
      {
        path: "registrarVacante",
        name: "Registro Vacante",
        component: RegisterVacancy,
      },
      {
        path: "candidatos",
        name: "Lista de Candidaos",
        component: CandidatesList,
      },
      {
        path: "perfil",
        name: "Perfil reclutador",
        component: ProfileRec,
      },
    ],
  },

  {
    path: "/candidato",
    component: ContentLayout,
    children: [
      {
        path: "pdfconvert",
        name: "Generate",
        component: PDF,
      },
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
        path: "editarPerfil",
        name: "Editar Perfil",
        component: EditProfile,
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
