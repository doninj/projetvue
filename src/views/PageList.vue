<template>
  <div>
    <Header
      v-model="gender"
      :filtered="filteredList.length"
      :non-filtered="nonFilteredUsers.length"
      :options="['all','male','female']"
      @fetchuser="fetchUser"
      @name="nameEmit"
      @showmodal="showModal"
    />
    <div
      v-if="loading"
      class="items-center justify-center loader "
    >
      Loading...
    </div>
    <div v-else>
      <Table
        :filter-list="filteredList"
        @delete=" deleteUser"
      />
      <div>
        <Modale
          v-if="Modal"
          @close=" Modal = false"
        >
          <Formulaire
            :show-add="true"
            @submit="AddUser"
          />
        </Modale>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Table from '@/components/Table'
import Modale from '@/components/Modal'
import Formulaire from '@/components/Form'
import 'bootstrap/dist/css/bootstrap.min.css';

//import Table from '@/components/Table'
import axios from 'axios'
//import Table from '@/components/Table'
export default {
  name: 'PageListe',
  components: { Header, Table, Modale, Formulaire},
  props: {
  },
  data () {
    return {
      gender: '',
      nonFilteredUsers: [],
      name:'',
      loading:true,
      Modal:false
    }
  },
  computed: {
      filteredList() {
        return this.nonFilteredUsers.filter(user => {
          if (this.gender === "all") return true;
          return user.gender === this.gender;
        }).filter(users => {
          if (this.name !== '') {
            return this.name.toLowerCase().split(' ').every(word => users.name.toLowerCase().normalize('NFD')
              .replace(/[\u0300-\u036f]/gu, "").includes(word))
          }
          return true;
        }).map(user => {
          if (this.name) {
            return {
              ...user,
              nameFormated: user.name.replace(new RegExp(this.name, "gi"),
                `<span class="highlightText">$&</span>`)
            }
          }
          return {
            ...user,
            nameFormated: user.name
          }
        })
      }
    },
  created () {
    setTimeout(() => {  this.fetchUser() }, 1000);

  },
  methods: {
//     getAge(dateString) {
//     var today = new Date();
//     var birthDate = new Date(dateString);
//     var age = today.getFullYear() - birthDate.getFullYear();
//     var m = today.getMonth() - birthDate.getMonth();
//     if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
//         age--;
//     }
//     return age;
// },
    AddUser(user) {
        console.log(user)
        const payload = user
        axios.post(`https://ynov-front.herokuapp.com/api/users`,payload)
        .then( () => {
           this.$notify({
              group: 'foo',
              title: 'Important message',
              text: `Ajout d'un utilisateur éffectué`,
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
      },
    nameEmit(value) {
      console.log(value)
      this.name = value
    },
    showModal () {
      this.Modal = !this.Modal
      console.log(true)
    },
    deleteUser(id){
      axios.delete(`https://ynov-front.herokuapp.com/api/users/${id}`)
        .then(() => {
          this.$notify({
              group: 'foo',
              title: 'Important message',
              text: `Suppression d'un utilisateur éffectué`,
              type: 'success',
              Width: '100px'});
        })
    },
    fetchUser() {
      const self = this
        axios('https://ynov-front.herokuapp.com/api/users')
        .then((r) => {
          console.log(r.data)
            self.loading = false
          this.nonFilteredUsers = r.data.data.map(user => {
            return {
              id: user._id,
              email: user.email,
              name : `${user.lastName} ${user.firstName}`,
              phone: user.phone,
              gender: user.gender,
              age: new Date(Date.now() - new Date(user.birthDate).getTime()).getFullYear() - 1970,
              avatar: user.avatarUrl
            }
          });
        });
      }
  }
}
</script>

<style >
.loader,
.loader:before,
.loader:after {
  background: black;
  -webkit-animation: load1 1s infinite ease-in-out;
  animation: load1 1s infinite ease-in-out;
  width: 0.5em;
  height: 4em;
}
.loader {
  color: black;
  text-indent: -9999em;
  margin: auto auto;
  margin-top: 50px;
  font-size: 11px;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}
.loader:before,
.loader:after {
  position: absolute;
  top: 0;
  content: '';
}
.loader:before {
  left: -1.5em;
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}
.loader:after {
  left: 1.5em;
}
@-webkit-keyframes load1 {
  0%,
  80%,
  100% {
    box-shadow: 0 0;
    height: 4em;
  }
  40% {
    box-shadow: 0 -2em;
    height: 5em;
  }
}
@keyframes load1 {
  0%,
  80%,
  100% {
    box-shadow: 0 0;
    height: 4em;
  }
  40% {
    box-shadow: 0 -2em;
    height: 5em;
  }
}
</style>
