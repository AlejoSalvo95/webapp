
<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Sign In</h1>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 mt-3>
        <form @submit.prevent="userSignIn">
          <v-layout column>
            <v-flex>
              <v-alert type="error" dismissible v-model="alert">
                {{ error }}
              </v-alert>
            </v-flex>
            <v-flex>
              <v-text-field
                name="email"
                label="Email"
                id="email"
                type="email"
                v-model="email"
                :class="{ 'input-group--dirty': dirtyEmail, 'white-text':true }"
                required></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                name="password"
                label="Password"
                id="password"
                type="password"
                v-model="password"
                :class="{ 'input-group--dirty': dirtyPwd }"
                required></v-text-field>
            </v-flex>
            <v-flex class="text-xs-center" mt-5>
              <v-btn color="primary" type="submit">Sign In</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      alert: false,
      dirtyEmail: null,
      dirtyPwd: null
    }
  },
  methods: {
    userSignIn() {
      this.$store.dispatch('userSignIn', {
        email: this.email,
        password: this.password
      })
    }
  },
  computed: {
    error() {
      return this.$store.state.error
    },
    loading() {
      return this.$store.state.loading
    }
  },
  mounted() {
    let times = 0
    const interval = setInterval(() => {
      times += 1
      if ((this.dirtyEmail && this.dirtyPwd) || times === 20) {
        clearInterval(interval)
      }
      this.dirtyEmail = document.querySelector(
        'input[type="email"]:-webkit-autofill'
      )
      this.dirtyPwd = document.querySelector(
        'input[type="password"]:-webkit-autofill'
      )
    }, 100)
  },
  watch: {
    error(value) {
      if (value) {
        this.alert = true
      }
    },
    alert(value) {
      if (!value) {
        this.$store.commit('setError', null)
      }
    }
  }
}
</script>
