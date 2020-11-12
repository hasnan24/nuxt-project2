<template>
  <v-container class="grey lighten-5">
    <v-row class="mb-6">
      <v-col v-for="item in users" :key="item.id" class="mb-2" cols="3">
        <v-card outlined tile height="100%">
          <v-img height="165px" :style="'background: ' + choseColor(item.id)">
            <v-app-bar flat color="rgba(0, 0, 0, 0)">
              <v-toolbar-title class="title white--text pl-0">
                {{ item.name.first }} {{ item.name.last }}
              </v-toolbar-title>
            </v-app-bar>

            <v-card-title class="white--text">
              <v-avatar size="56">
                <img :src="item.picture.medium" />
              </v-avatar>
              <p class="ml-3">{{ item.name.title }}. {{ item.name.first }}</p>
              <p style="font-size: 12px">{{ item.email }}</p>
            </v-card-title>
          </v-img>
          <v-card-text class="mb-8">{{ item.cell }}</v-card-text>
          <v-card-actions style="position: absolute; bottom: 0">
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialogDetil(item)"
              >Detail</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-dialog v-model="dialog" persistent max-width="500">
        <v-card class="animation-background" style="padding: 2px">
          <div
            v-for="(user, idx) in userDetil"
            :key="idx"
            style="background: white"
          >
            <v-row no-gutters>
              <v-col cols="6">
                <v-avatar class="profile" color="grey" size="220" tile>
                  <v-img :src="user.picture.large" :cover="true"></v-img>
                </v-avatar>
              </v-col>
              <v-col cols="6">
                <v-card-title class="headline">
                  {{ user.name.first }}
                </v-card-title>
                <v-card-text>
                  <p>DOB : {{ user.dob.date }}</p>
                  <p>
                    Address : {{ user.location.street.number }},{{
                      user.location.street.name
                    }}
                    {{ user.location.city }} {{ user.location.state }}
                    {{ user.location.country }}
                  </p>
                  <p>Cell : {{ user.cell }}</p>
                  <p>Email : {{ user.email }}</p></v-card-text
                >
              </v-col>
            </v-row>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="closeDialog">
                Ok
              </v-btn>
            </v-card-actions>
          </div>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    dialogEdit: false,
    dialogDelete: false,
    id: '',
    users: '',
    userDetil: [],
  }),

  created() {
    this.initialize()
  },
  methods: {
    async initialize() {
      // 'https://randomuser.me/api/?results=10&exc=gender,login,registered,phone,id,nat&format=pretty&nat=us&seed=014db9281d0d9f2e'
      this.users = await this.$axios
        .$get(
          'http://my-json-server.typicode.com/hasnan24/nuxt-project2/results'
        )
        .then(function (response) {
          return response
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    choseColor(id) {
      if (id % 4 === 0) {
        return '#607D8B'
      } else if (id % 4 === 1) {
        return 'purple'
      } else if (id % 4 === 2) {
        return 'blue'
      } else {
        return `indigo`
      }
    },
    dialogDetil(dt) {
      this.dialog = true
      this.userDetil = [dt]
    },
    closeDialog() {
      this.dialog = false
      this.userDetil = []
    },
  },
}
</script>

<style>
.animation-background {
  animation: colorchange 15s linear 1s infinite; /* animation-name followed by duration in seconds*/
  /* you could also use milliseconds (ms) or something like 2.5s */
}

@keyframes colorchange {
  0% {
    background: magenta;
  }
  25% {
    background: rgb(68, 236, 68);
  }
  50% {
    background: rgb(128, 108, 245);
  }
  75% {
    background: rgb(248, 193, 11);
  }
  100% {
    background: magenta;
  }
}

@-webkit-keyframes colorchange /* Safari and Chrome - necessary duplicate */ {
  0% {
    background: magenta;
  }
  25% {
    background: rgb(68, 236, 68);
  }
  50% {
    background: rgb(128, 108, 245);
  }
  75% {
    background: rgb(248, 193, 11);
  }
  100% {
    background: magenta;
  }
}
</style>
