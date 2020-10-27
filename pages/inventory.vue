<template>
  <v-container class="grey lighten-5">
    <v-row class="mb-6">
      <v-col v-for="(item, idx) in users" :key="idx" class="mb-2" cols="3">
        <v-card outlined tile height="100%">
          <v-card-title
            class="headline"
            :style="'color: white; background: ' + choseColor(idx)"
            >{{ item.name.first }} {{ item.name.last }}</v-card-title
          >
          <v-card-text class="mb-6">{{ item.cell }}</v-card-text>
          <v-card-actions style="position: absolute; bottom: 0">
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text>Cancel</v-btn>
            <v-btn color="blue darken-1" text>OK</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    color: '',
    id: '',
    username: '',
    creator: [],
    creator2: [],
    items: [],
    users: [],
  }),

  computed: {
    cols() {
      const { sm } = this.$vuetify.breakpoint
      return sm ? [9, 3] : [6, 6]
    },
  },
  created() {
    this.initialize()
  },
  methods: {
    async initialize() {
      this.users = await this.$axios
        .$get(
          'https://randomuser.me/api/?results=10&exc=gender,login,registered,phone,id,nat&format=pretty&nat=us&seed=014db9281d0d9f2e'
        )
        .then(function (response) {
          return response.results
        })
        .catch(function (error) {
          console.log(error)
        })
    }, // seed
    choseColor(id) {
      if (id % 4 === 0) {
        return 'lime'
      } else if (id % 4 === 1) {
        return 'purple'
      } else if (id % 4 === 2) {
        return 'blue'
      } else {
        return `indigo`
      }
    },
  },
}
</script>
