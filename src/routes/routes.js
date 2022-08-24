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

import VacancyDetail from "@/components/candidato/VacancyDetail.vue"
import pdf from "@/components/candidato/ContentPdf.vue"

const routes = [
  {
    path: "/",
    component: ContentLayout,
    children: [
      {
        path: "",
        name: "Buscar",
        component: Vacancies,
      },
      {
        path: "pdf",
        name: "pdf",
        component: pdf,
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
        meta: {
          requiresAuth: true,
          isCandidate: false
        },
      },
      {
        path: "registrarVacante",
        name: "Registro Vacante",
        component: RegisterVacancy,
        meta: {
          requiresAuth: true,
          isCandidate: false
        },
      },
      {
        path: "candidatos",
        name: "Lista de Candidatos",
        component: CandidatesList,
        meta: {
          requiresAuth: true,
          isCandidate: false
        },
      },
      {
        path: "perfil",
        name: "Perfil reclutador",
        component: ProfileRec,
        meta: {
          requiresAuth: true,
          isCandidate: false
        },
      },
      
    ],
    meta: {
      requiresAuth: true,
      isCandidate: false
    },
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
        meta: {
          requiresAuth: true,
          isCandidate: true
        },
      },
      {
        path: "perfil",
        name: "Perfil de usuario",
        component: Profile,
        meta: {
          requiresAuth: true,
          isCandidate: true
        },
      },
      {
        path: "editarPerfil",
        name: "Editar Perfil",
        component: EditProfile,
        meta: {
          requiresAuth: true,
          isCandidate: true
        },
      },
      {
        path: "contactos",
        name: "Contactos",
        component: ContactList,
        meta: {
          requiresAuth: true,
          isCandidate: true
        },
      },
      {
        path: "postulaciones",
        name: "Postulaciones",
        component: Status,
        meta: {
          requiresAuth: true,
          isCandidate: true
        },
      },
      {
        path: "favoritos",
        name: "Favoritos",
        component: Favorites,
        meta: {
          requiresAuth: true,
          isCandidate: true
        },
      },
      {
        path: "vacanteDetalle/:id",
        name: "Detalle de Vacante",
        component: VacancyDetail,
        meta: {
          requiresAuth: true,
          isCandidate: true
        },
      },
    ],
    meta: {
      requiresAuth: true,
      isCandidate: true
    },
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
