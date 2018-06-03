<template>
  <v-container fluid class="contact-background">
    <v-container grid-list-md >
      <v-layout row wrap>
        <v-flex xs12 sm6>
          <v-text-field v-model="first" box label="First Name"></v-text-field>
        </v-flex>
        <v-flex xs12 sm6>
          <v-text-field v-model="last" box label="Last Name"></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field
            :rules="emailRules"
            v-model="email"
            box
            label="Email address"
            persistent-hint
          ></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field box multi-line label="Please send your concerns, we will reply as soon as possible"></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      first: '',
      last: '',
      emailRules: [],
      email: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
