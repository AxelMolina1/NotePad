
const routes = [
  {
    path: '/',
    component: () => import('src/layouts/BlocNote.vue'),
    children: [
      { path: '', component: () => import('src/pages/NotesMenu.vue') },
      { path: '/notes', component: () => import('src/pages/NotesPage.vue') }
    ]
  }
]

export default routes
