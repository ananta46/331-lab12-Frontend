import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '@/views/EventListView.vue'
import AboutView from '@/views/AboutView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import OrganizerView from '@/views/OrganizerView.vue'
import OrganizerDetail from '@/views/OrganizerDetail.vue'
import EventDetailView from '@/views/event/EventDetailView.vue'
import EventRegisterView from '@/views/event/EventRegisterView.vue'
import EventEditView from '@/views/event/EventEditView.vue'
import EventLayoutView from '@/views/event/EventLayoutView.vue'
import AddEventView from '@/views/event/EventFormView.vue'
import AddOrganizerView from '@/views/event/OrganizerFormView.vue'

import StudentListView from '@/views/StudentListView.vue'
import nProgress from 'nprogress'
import { useEventStore } from '@/stores/event'
import EventService from '@/services/EventService'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'event-list-view',
      component: EventListView,
      props: (route) => ({ page: parseInt(route.query.page?.toString() || '1') })
    },
      {
        path: '/event/:id',
        name: 'event-layout-view',
        component: EventLayoutView,
        props: true,
        beforeEnter: (to) => {
          const id = parseInt(to.params.id as string)
          const eventStore = useEventStore()
          return EventService.getEventById(id)
          .then((Response) => {
            eventStore.setEvent(Response.data)
          })
          .catch((error) => {
            if (error.Response && error.response.status === 404) {
              return {
                name: '404-resource-view',
                params: { resource: 'event' }
              }
            }else {
              return { name: 'network-error-view'}
            }
          })
      },
      children: [
        {
          path: '',
          name: 'event-detail-view',
          component: EventDetailView,
          props: true
        },
        {
          path: 'register',
          name: 'event-register-view',
          component: EventRegisterView,
          props: true
        },
        {
          path: 'edit',
          name: 'event-edit-view',
          component: EventEditView,
          props: true
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/add-event',
      name: 'add-event',
      component: AddEventView
    },
    {
      path: '/organizer',
      name: 'organizer',
      component: OrganizerView,
      props: (route) => ({ page: parseInt(route.query.page?.toString() || '1') })
    },
    {
      path: '/add-organier',
      name: 'add-organier',
      component: AddOrganizerView
    },
    {
      path: '/404/:resource',
      name: '404-resource-view',
      component: NotFoundView,
      props: true
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView
    },
    {
      path: '/Student',
      name: 'student',
      component: StudentListView
    },
    {
      path: '/organizer/:id',
      name: 'organizer-detail-view',
      component: OrganizerDetail, 
      props: true
    }
    
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }else {
    return { top: 0 }
    }
  }
})

router.beforeEach(() => {
  nProgress.start()
})

router.afterEach(() => {
  nProgress.done
})

export default router