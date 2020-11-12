<template>
  <v-container>
    <v-btn v-show="btnAdd" block color="green" rounded @click="addUser">
      Add User
    </v-btn>
    <!--Change to Forms -->
    <template v-if="addForm">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="adduser.firstName"
          :rules="nameRules"
          label="First Name"
          hint="John"
          persistent-hint
          filled
          required
        ></v-text-field>
        <v-text-field
          v-model="adduser.lastName"
          :rules="nameRules"
          label="Last Name"
          hint="Doe"
          persistent-hint
          filled
          required
        ></v-text-field>
        <v-text-field
          v-model="adduser.nis"
          :rules="nisRules"
          type="number"
          label="NIS"
          hint="00001"
          persistent-hint
          filled
          required
        ></v-text-field>
        <v-text-field
          v-model="adduser.address"
          :rules="addressRules"
          label="Address"
          hint="Only your City, like Djogja"
          persistent-hint
          filled
          required
          @keydown.space.prevent
        ></v-text-field>
        <v-select
          v-model="adduser.gender"
          :items="items"
          :rules="[(v) => !!v || 'Gender is required']"
          label="Gender"
          required
        ></v-select>
        <v-text-field
          v-model="adduser.phone"
          :rules="phoneRules"
          type="number"
          label="Phone"
          hint="+628123123123"
          persistent-hint
          filled
          required
        ></v-text-field>
        <v-text-field
          v-model="adduser.mail"
          :rules="emailRules"
          label="E-mail"
          hint="abc@mail.com"
          persistent-hint
          filled
          required
        ></v-text-field>
        <v-menu
          v-model="menu2"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="computedDateFormatted"
              label="Date (read only text field)"
              hint="MM/DD/YYYY format"
              persistent-hint
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date"
            no-title
            @input="menu2 = false"
          ></v-date-picker>
        </v-menu>
        <p class="d-none d-print-block">
          Date in ISO format:
          <strong>{{ (adduser.dob = date) }}</strong>
        </p>
        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="addUserAction"
        >
          Validate
        </v-btn>
      </v-form>

      <!-- <v-card>
        <v-card-title>
          <span class="headline">Add User</span>
        </v-card-title>

        <v-card-text>
          <v-container fluid>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="adduser.firstName"
                  label="First Name"
                  hint="John"
                  persistent-hint
                  filled
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="adduser.lastName"
                  label="Last Name"
                  hint="Doe"
                  persistent-hint
                  filled
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="adduser.nis"
                  label="NIS"
                  hint="00001"
                  persistent-hint
                  filled
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="adduser.address"
                  label="Address"
                  hint="Only your City, like Djogja"
                  persistent-hint
                  filled
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <template>
                  <div>Gender</div>
                </template>
                <v-radio-group v-model="adduser.gender" row>
                  <v-radio label="Male" value="male"></v-radio>
                  <v-radio label="Female" value="female"></v-radio>
                </v-radio-group>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="adduser.phone"
                  label="Phone"
                  hint="+628123123123"
                  persistent-hint
                  filled
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="adduser.mail"
                  label="E-mail"
                  hint="abc@mail.com"
                  persistent-hint
                  filled
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-menu
                  v-model="menu2"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="computedDateFormatted"
                      label="Date (read only text field)"
                      hint="MM/DD/YYYY format"
                      persistent-hint
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="date"
                    no-title
                    @input="menu2 = false"
                  ></v-date-picker>
                </v-menu>
                <p class="d-none d-print-block">
                  Date in ISO format:
                  <strong>{{ (adduser.dob = date) }}</strong>
                </p>
              </v-col>
              <h1>{{ row }}</h1>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="cancelForm"> Cancel </v-btn>
          <v-btn color="blue darken-1" text @click="addUserAction">
            Save
          </v-btn>
        </v-card-actions>
      </v-card> -->
    </template>
    <template v-else>
      <v-row>
        <v-col v-for="user in users" :key="user.id" cols="4">
          <v-card class="mx-auto" max-width="344" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="overline mb-4">User Data</div>
                <v-list-item-title class="headline mb-1">
                  {{ user.firstName }} {{ user.lastName }}
                </v-list-item-title>
                <v-list-item-subtitle>{{ user.address }}</v-list-item-subtitle>
                <p class="mt-2">{{ user.mail }}</p>
              </v-list-item-content>

              <v-list-item-avatar size="80" color="grey"></v-list-item-avatar>
            </v-list-item>

            <v-card-actions>
              <v-btn
                router
                outlined
                rounded
                text
                color="#0288D1"
                :to="'/tbusers2/' + user.id"
              >
                See More
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>

<script>
export default {
  data: (vm) => ({
    addForm: false,
    btnAdd: true,
    users: [],
    adduser: {
      firstName: '',
      lastName: '',
      nis: '',
      address: '',
      gender: '',
      mail: '',
      phone: '',
      dob: '',
    },
    defaultForm: {
      firstName: '',
      lastName: '',
      nis: '',
      address: '',
      gender: '',
      mail: '',
      phone: '',
      dob: '',
    },
    date: new Date().toISOString().substr(0, 10),
    menu2: false,
    valid: true,
    nameRules: [(v) => !!v || 'Name is required'],
    addressRules: [(v) => !!v || 'Address is required'],
    nisRules: [
      (v) => !!v || 'NIS is required',
      (v) => (v && v.length >= 5) || 'NIS min 5 numbers',
    ],
    phoneRules: [(v) => !!v || 'Phone is required'],
    email: '',
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    select: null,
    items: ['male', 'female'],
  }),
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date)
    },
  },
  created() {
    this.getUsers()
  },
  methods: {
    async getUsers() {
      return await this.$axios.$get('/tb_users2').then((res) => {
        this.users = res
      })
    },
    async addUserAction() {
      if (this.$refs.form.validate()) {
        await this.$axios.$post('/tb_users2/add', this.adduser).then((res) => {
          if (res.response === 'Success') {
            window.location = '/tbusers2'
          } else if (res.response === 'Failed') {
            window.location = '/tbusers2'
          }
        })
      }
    },
    addUser() {
      this.addForm = true
      this.btnAdd = false
    },
    cancelForm() {
      this.adduser = this.defaultForm
      this.addForm = false
      this.btnAdd = true
    },
    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
  },
}
</script>
