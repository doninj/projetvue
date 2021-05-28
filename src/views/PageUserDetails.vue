<template>
  <div class="container rounded bg-white mt-5 mb-5">
    <div
      v-if="!modify"
      class="row"
    >
      <div class="col-md-3 border-right">
        <div class="d-flex flex-column align-items-center text-center p-3 py-5">
          <img
            class="rounded-circle mt-5"
            :src="user.avatarUrl"
          >
        </div>
      </div>
      <div class="col-md-4 border-right">
        <div class="p-3 py-5">
          <div class="row mt-2">
            <dl>
              <div class="col-md-12">
                <dt>Prenom : </dt>
                <dd>{{ user.firstName }}</dd>
              </div>
              <div class="col-md-12">
                <dt>Nom : </dt>
                <dd>{{ user.lastName }}</dd>
              </div>
              <div class="col-md-12">
                <dt>Email : </dt>
                <dd>{{ user.email }}</dd>
              </div>
              <div class="col-md-12">
                <dt>Anniversaire : </dt>
                <dd>{{ user.birthDate }}</dd>
              </div>
              <div class="col-md-12">
                <dt>Details : </dt>
                <dd>{{ user.details }}</dd>
              </div>
              <div class="col-md-12">
                <dt>Gender : </dt>
                <dd>{{ user.gender }}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
    <div
      v-else
      class="row"
    >
      <div class="col-md-3 border-right">
        <div class="d-flex flex-column align-items-center text-center p-3 py-5">
          <img
            class="rounded-circle mt-5"
            :src="user.avatarUrl"
          >
        </div>
      </div>
      <div class="col-md-5 border-right">
        <div class="p-3 py-5">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h4 class="text-right">
              Profile Settings
            </h4>
          </div>
          <div class="row mt-2">
            <div class="col-md-6">
              <label class="labels">Name</label><input
                v-model="user.firstName"
                type="text"
                class="form-control"
                placeholder="first name"
              >
            </div>
            <div class="col-md-6">
              <label class="labels">Surname</label><input
                v-model="user.lastName"
                type="text"
                class="form-control"
                placeholder="surname"
              >
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-md-12">
              <label class="labels">PhoneNumber</label><input
                v-model="user.phone"
                type="text"
                class="form-control"
                placeholder="enter phone number"
              >
            </div>
            <div class="col-md-12">
              <label class="labels">Email </label><input
                v-model="user.email"
                type="text"
                class="form-control"
                placeholder="enter email id"
              >
            </div>
            <div class="col-md-12">
              <label class="labels">Genre </label><input
                v-model="user.gender"
                type="text"
                class="form-control"
                placeholder="enter email id"
              >
            </div>
          </div>
          <div class="row mt-3" />
          <div class="mt-5 text-center">
            <input
              value="1991-05-03"
              class="btn btn-primary profile-button"
              type="date"
            >
          </div>
          <div class="mt-5 text-center">
            <button
              class="btn btn-primary profile-button"
              type="button"
              @click="ModifProfile"
            >
              Save Profile
            </button>
          </div>
        </div>
      </div>
      <div class="col-md-4" />
    </div>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css';
  import axios from 'axios'
export default {
  data () {
    return {
      userModifiy : undefined,
      user: undefined,
      modify:false
          }
  },
  created(){
    const p = axios.get(`https://ynov-front.herokuapp.com/api/users/${this.$route.params.id}`)
      .then( (r) => {
              this.user = r.data.data
              this.user.birthDate = new Date(Date.now() - new Date(this.user.birthDate).getTime()).getFullYear() - 1970
      } )
      return p
  },
    methods: {
      modifyDate(date){
        date = new Date(date)
        return +date.getFullYear()+
          "/"+(date.getMonth()+1)+
          "/"+date.getDay()
      },

      ModifProfile() {
        const payload = this.user
        axios.put(`https://ynov-front.herokuapp.com/api/users/${this.$route.params.id}`,payload)
        .then( () => {
          console.log("modif faites")
        })
        .catch((error) => {
          console.log(error)
        })
      }
    }

}
</script>