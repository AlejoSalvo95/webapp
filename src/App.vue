<template>
  <v-app>
    <v-navigation-drawer v-model="sidebar" width="200" app class="blue lighten-5">
      <v-list>
        <v-toolbar flat class="transparent"  v-if="isAuthenticated">
          <v-list class="pa-0">
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img src="https://randomuser.me/api/portraits/men/86.jpg" >
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>Seba Sanguinetti</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-toolbar>
        <v-divider v-if="isAuthenticated"></v-divider>
        <v-list-tile
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="isAuthenticated" @click="userSignOut">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Sign Out</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app class="blue lighten-5">
      <span class="hidden-sm-and-up">
        <v-toolbar-side-icon  @click.prevent="sidebar = !sidebar" class="toolbar-icon">
        </v-toolbar-side-icon>
      </span>
      <router-link :to="landingOrHome"><img class="logo-size hidden-xs-only" src="@/assets/images/logo.png"/></router-link>
      <v-spacer></v-spacer>
      <router-link :to="landingOrHome"><img class="logo-size hidden-sm-and-up" src="@/assets/images/logo.png" /></router-link>

      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          flat
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
        <v-btn v-if="isAuthenticated" flat @click="userSignOut">
          <v-icon left>exit_to_app</v-icon>
          Sign Out
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    
    <v-content>
      <router-view></router-view>
    </v-content> 
    
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      sidebar: false
    }
  },
  computed: {
    appTitle() {
      return this.$store.state.appTitle
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated
    },
    menuItems() {
      var menuItems = []
      if (this.isAuthenticated) {
        return menuItems.concat(
          { title: 'Contact', path: '/customercontact', icon: 'mail_outline' },
          {
            title: 'Create Booking',
            path: '/createbooking',
            icon: 'calendar_today'
          }
        )
      } else {
        return menuItems.concat(
          { title: 'Contact', path: '/contact', icon: 'mail_outline' },
          { title: 'Sign Up', path: '/signup', icon: 'face' },
          { title: 'Sign In', path: '/signin', icon: 'lock_open' }
        )
      }
    },
    landingOrHome() {
      if (this.isAuthenticated) {
        return '/home'
      } else {
        return '/'
      }
    }
  },
  methods: {
    userSignOut() {
      this.$store.dispatch('userSignOut')
    }
  }
}
</script>
