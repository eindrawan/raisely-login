<template>
  <v-container>
    <div class="login-box">
      <div
        style="height:100px; background: url(/img/logo.png) left center / cover;"
      ></div>
      <div style="padding:30px;">
        <v-form v-model="isValid">
          <v-text-field
            label="First Name"
            v-model="firstName"
            :rules="firstNameRules"
            placeholder=" "
          ></v-text-field>
          <v-text-field
            label="Last Name"
            v-model="lastName"
            :rules="lastNameRules"
            placeholder=" "
          ></v-text-field>
          <v-text-field
            label="Email"
            placeholder=" "
            v-model="email"
            :error-messages="emailErrors"
            :rules="emailRules"
            @change="checkMail"
          ></v-text-field>
          <v-text-field
            label="Password"
            type="password"
            v-model="password"
            :rules="passwordRules"
            placeholder=" "
          ></v-text-field>
          <br />
          <div style="color:red; font-size:small;">{{ errors }}</div>
          <v-btn color="primary" @click="register" style="width:210px"
            >REGISTER</v-btn
          >
        </v-form>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    email: "",
    emailErrors: "",
    emailRules: [
      v => !!v || "Email is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    firstName: "",
    firstNameRules: [
      v => !!v || "First Name is required",
      v => !/\s/.test(v.trim()) || "Please enter your first name only"
    ],
    lastName: "",
    lastNameRules: [
      v => !!v || "Last Name is required",
      v => !/\s/.test(v.trim()) || "Please enter your last name only"
    ],
    password: "",
    passwordRules: [
      v => !!v || "Password is required",
      v => (v && v.length >= 5) || "Password must have 5+ characters",
      v => /(?=.*[A-Z])/.test(v) || "Must have one uppercase character",
      v => /(?=.*\d)/.test(v) || "Must have one number",
      v => /([!@$%])/.test(v) || "Must have one special character [!@#$%]"
    ],
    isValid: true,
    errors: ""
  }),
  computed: {
    lastNameError() {
      if (this.lastName.match(/\s/)) return "Please enter your last name only";
      else return "";
    }
  },
  methods: {
    async checkMail() {
      this.emailErrors = "checking ..";
      let ret = await this.$api.post("https://api.raisely.com/v3/check-user", {
        campaignUuid: "46aa3270-d2ee-11ea-a9f0-e9a68ccff42a",
        data: {
          email: this.email
        }
      });
      if (!ret.errors) {
        if (ret.data.status === "EXISTS") {
          this.emailErrors = "This email is already registered.";
        } else {
          this.emailErrors = "";
        }
      }
    },
    async register() {
      if (!this.isValid) {
        this.$toast.open({
          message: "All fields must be entered correctly.",
          type: "error",
          position: "top",
          dismissible: true
        });
      } else {
        let ret = await this.$api.post("https://api.raisely.com/v3/signup", {
          campaignUuid: "46aa3270-d2ee-11ea-a9f0-e9a68ccff42a",
          data: {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password
          }
        });
        if (!ret.errors) {
          this.$toast.open({
            message: "Registered Successfully.",
            type: "success",
            position: "top",
            dismissible: true
          });
        }
      }
    }
  }
};
</script>
<style lang="scss">
.login-box {
  width: 300px;
  background: white;
  box-sizing: content-box;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  margin: auto;
  margin-top: 10%;
  text-align: center;
  overflow: hidden;
}
</style>
