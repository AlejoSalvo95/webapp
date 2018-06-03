<template>
  <v-layout column v-if="!cardChosen">
    <v-flex xs12>
        <v-container fluid grid-list-md>
          <v-layout row wrap>
            <v-flex mx-3 my-2
              v-for="card in cards"
              v-bind="{ [`xs${card.flex}`]: true }"
              :key="card.title"
            >
              <v-card mx-auto >
                <v-card-media @click="cardClicked(card.value)"
                  :src="card.src"
                  height="200px"
                >
                  <v-container fill-height fluid>
                    <v-layout fill-height>
                      <v-flex xs12 align-end flexbox>
                        <span class="headline white--text" v-text="card.title"></span>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-media>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
    </v-flex>
  </v-layout>

  <v-layout column v-else-if="cardChosen">
    <v-flex xs12 mt-4 mx-auto>
        <v-date-picker v-model="date" landscape reactive></v-date-picker>
    </v-flex>
    <v-flex xs12 mt-4 mx-auto>
        <v-time-picker v-model="time" landscape ></v-time-picker>
    </v-flex>
    <v-flex xs12 sm6 mx-auto>
      <v-text-field box multi-line label="Insert notes here" v-model="notes"></v-text-field>
    </v-flex>
    <v-flex xs12 mx-auto my-4>
        <v-btn @click="createBooking">Create booking</v-btn>
    </v-flex>
  </v-layout>

  <v-layout column v-else-if="bookingCreated">
    <v-container> Booking created successfuly
    </v-container>
  </v-layout>
  
</template>
<script>
export default {
  data: () => ({
    cardChosen: null,
    bookingCreated: null,
    date: null,
    time: '00:00',
    notes: null,
    cards: [
      {
        title: 'Decorate garden',
        src: '/static/flowersPots.jpg',
        flex: 12,
        value: 'Decorate'
      },
      {
        title: 'Cut garden',
        src: '/static/cutGarden.jpg',
        flex: 12,
        value: 'Cut'
      },
      {
        title: 'Water plants',
        src: '/static/wetGrass.jpg',
        flex: 12,
        value: 'Water'
      }
    ]
  }),
  methods: {
    cardClicked(val) {
      this.cardChosen = val
      console.log(val)
    },
    validDates() {
      if (!this.date || !this.time) return false
      else return false
      // implementar
    },
    createBooking() {
      if (!this.date || !this.time) {
        this.error = 'Please insert valid date and time'
        this.bookingCreated = false
      }
      this.$store.dispatch('createBooking', {
        notes: this.notes,
        date: this.date,
        time: this.time,
        cardChosen: this.cardChosen
      })

      // dispatch action to create a booking
      this.createBooking = true
    }
  },
  mounted() {
    let today = new Date()
    let day = today.getDate() + 1
    let month = today.getMonth() + 1
    let year = today.getFullYear()
    this.date = year + '-' + month + '-' + day
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
