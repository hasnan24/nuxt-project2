<template>
  <v-container>
    <v-dialog v-model="deleteAlert" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2">
          Are you sure to Delete this user ?
        </v-card-title>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="deleteUserAction"> Yes </v-btn>
          <v-btn color="primary" text @click="deleteAlert = false"> No </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <template v-if="editForm">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="edituser.firstName"
          :rules="nameRules"
          label="First Name"
          hint="John"
          persistent-hint
          filled
          required
        ></v-text-field>
        <v-text-field
          v-model="edituser.lastName"
          :rules="nameRules"
          label="Last Name"
          hint="Doe"
          persistent-hint
          filled
          required
        ></v-text-field>
        <v-text-field
          v-model="edituser.nis"
          :rules="nisRules"
          type="number"
          label="NIS"
          hint="00001"
          persistent-hint
          filled
          required
        ></v-text-field>
        <v-text-field
          v-model="edituser.address"
          :rules="addressRules"
          label="Address"
          hint="Only your City, like Djogja"
          persistent-hint
          filled
          required
          @keydown.space.prevent
        ></v-text-field>
        <v-select
          v-model="edituser.gender"
          :items="items"
          :rules="[(v) => !!v || 'Gender is required']"
          label="Gender"
          required
        ></v-select>
        <v-text-field
          v-model="edituser.phone"
          :rules="phoneRules"
          type="number"
          label="Phone"
          hint="+628123123123"
          persistent-hint
          filled
          required
        ></v-text-field>
        <v-text-field
          v-model="edituser.mail"
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
            v-model="edituser.dob"
            no-title
            @input="menu2 = false"
          ></v-date-picker>
        </v-menu>
        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="editUserAction"
        >
          Validate
        </v-btn>
        <v-btn color="yellow" @click="cancelForm"> Cancel </v-btn>
      </v-form>
      <v-dialog v-model="dialogEditFailed" width="500">
        <v-card>
          <v-card-title class="headline red"> Failed </v-card-title>

          <v-card-text> {{ dialogEditDescription }} </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialogEditFailed = false">
              Ok
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- <v-card>
        <v-card-title>
          <span class="headline">Edit User</span>
        </v-card-title>

        <v-card-text>
          <v-container fluid>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="edituser.firstName"
                  label="firstName"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="edituser.lastName"
                  label="lastName"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="edituser.nis" label="nis"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="edituser.address"
                  label="address"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <template>
                  <div>Gender</div>
                </template>
                <v-radio-group v-model="edituser.gender" row>
                  <v-radio label="Male" value="male"></v-radio>
                  <v-radio label="Female" value="female"></v-radio>
                </v-radio-group>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="edituser.phone"
                  label="phone"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="edituser.mail"
                  label="mail"
                ></v-text-field>
              </v-col>
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
                  :v-model="edituser.dob"
                  :show-current="edituser.dob"
                  no-title
                  @input="menu2 = false"
                ></v-date-picker>
              </v-menu>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="editForm = false">
            Cancel
          </v-btn>
          <v-btn color="blue darken-1" text @click="editUserAction">
            Save
          </v-btn>
        </v-card-actions>
      </v-card> -->
    </template>
    <template v-else>
      <v-card
        v-for="item in user_data"
        :key="item.id"
        class="mx-auto"
        max-width="600"
      >
        <v-img style="background: grey" height="200px"></v-img>

        <v-row>
          <v-col class="ml-2">
            <v-card-title>
              {{ item.firstName }} {{ item.lastName }} /
            </v-card-title>
            <v-card-text> {{ item.mail }} </v-card-text>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="3">
            <v-card-text style="text-align: center">
              {{ item.dob | potong(item.dob) }}
            </v-card-text>
          </v-col>
        </v-row>
        <v-card-text> {{ item.address }} </v-card-text>
        <v-card-text> {{ item.phone }} </v-card-text>
        <v-card-actions>
          <v-btn @click="editUser(item.id, item)"> Edit </v-btn>
          <v-btn @click="deleteAlert = true"> Delete </v-btn>
          <v-btn :to="'/tbusers2'"> Back </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </template>
  </v-container>
</template>

<script>
export default {
  filters: {
    potong(string) {
      return string.substring(0, 10)
    },
  },
  data: (vm) => ({
    id: '',
    idAction: '',
    editForm: false,
    deleteAlert: false,
    dialogEditFailed: false,
    dialogEditDescription: '',
    user_data: [],
    edituser: {
      id: '',
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
      return this.formatDate(this.edituser.dob)
    },
  },
  created() {
    this.getParams()
    this.getDataById()
  },
  methods: {
    getParams() {
      this.id = this.$route.params.id
    },
    async getDataById() {
      this.user_data = await this.$axios
        .$get('/tb_users2/' + this.id)
        .then((Response) => {
          return Response
        })
        .catch((err) => {
          console.log(err)
        })
    },
    async deleteUserAction() {
      await this.$axios
        .$post('/tb_users2/delete', { id: this.id })
        .then((res) => {
          if (res.response === 'Success') {
            this.$router.push('/tbusers2')
          } else if (res.response === 'Failed') {
            this.$router.push('/tbusers2')
          }
        })
    },
    async editUserAction() {
      await this.$axios
        .$post('/tb_users2/update', this.edituser)
        .then((res) => {
          if (res.response === 'Success') {
            this.$router.push('/tbusers2')
          } else if (res.response === 'Failed') {
            this.dialogEditFailed = true
            this.dialogEditDescription = res.error
            if (res.error === 'Email has been used') this.edituser.mail = ''
          }
        })
    },
    editUser(idUser, data) {
      this.edituser.id = idUser
      this.edituser.firstName = data.firstName
      this.edituser.lastName = data.lastName
      this.edituser.address = data.address
      this.edituser.dob = data.dob.substr(0, 10)
      this.edituser.nis = data.nis
      this.edituser.gender = data.gender
      this.edituser.mail = data.mail
      this.edituser.phone = data.phone
      this.editForm = true
    },
    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
    cancelForm() {
      this.editForm = false
    },
  },
}
</script>
