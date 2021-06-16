<template>
  <div
    v-if="user"
    class="container rounded bg-white mt-5 mb-5"
  >
    <div
      v-if="!modify"
    >
      <div
        class="row"
      >
        <div class="col-md-3 border-right">
          <div class="d-flex flex-column align-items-center text-center p-3 py-5">
            <img
              class="rounded-circle mt-5 image"
              :src="user.avatarUrl"
            >
          </div>
        </div>
        <div class="col-md-4 border-right">
          <div class="d-flex justify-content-between align-items-center">
            <h4 class="text-right">
              Profile Settings
            </h4>
          </div>
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
                  <dd v-html="details" />
                </div>
                <div class="col-md-12">
                  <dt>Gender : </dt>
                  <dd>{{ user.gender }}</dd>
                </div>
                <button
                  class="btn btn-primary profile-button"
                  type="button"
                  @click="edit"
                >
                  Editez profile
                </button>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Formulaire
      v-else
      :user="user"
      @submit="modifUser"
      @click="ChangeModify"
    />
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css';
import Formulaire from '@/components/Form'
  import axios from 'axios'
export default {
    components: { Formulaire },

  data () {
    return {
      userModifiy : undefined,
      user: undefined,
      modify:false
      }
  },
computed:{
  details(){
     return this.user.details.replace(new RegExp("\\n", "gi"),`<br>`)
  }
},
  created(){
    const p = axios.get(`https://ynov-front.herokuapp.com/api/users/${this.$route.params.id}`)
      .then( (r) => {
        this.user = r.data.data
        this.user.birthDate = this.modifyDate(Date.parse(new Date(r.data.data.birthDate)))
      } )
      return p
  },
    methods: {
      ChangeModify () {
        this.modify = !this.modify
      },
      edit(){
        this.modify = true
      },
      zeroPad(number){
        return number < 10 ? '0' + number : number
      },
      modifyDate(date){
        date = new Date(date)
        const year = date.getFullYear();
        const month = this.zeroPad(date.getMonth() + 1);
        const day = this.zeroPad(date.getDate());
        const dateString = `${year}-${month}-${day}`;
        return dateString
      },

      modifUser(user) {
        console.log(user)
        const payload = user
        axios.put(`https://ynov-front.herokuapp.com/api/users/${user._id}`,payload)
        .then( () => {
          this.$notify({
            group: 'foo',
            title: 'Important message',
            text: `Modification de l'utilisateur éffectué`,
            type: 'success',
            Width: '100px'});
        })
        .catch((error) => {
          this.$notify({
            group: 'foo',
            title: 'Important message',
            text: `${error}`,
            type: 'error',
            Width: '100px'});
        })
        this.$router.push({ name: 'List' })
      }
    }
}
</script>

<style >

  .image{
    width: 100%!important;
    height: 100%;
  }
</style>