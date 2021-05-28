<template>
  <div>
    <Header
      v-model="gender"
      :filtered="filteredList.length"
      :non-filtered="nonFilteredUsers.length"
      @fetchuser="fetchUser"
      @name="nameEmit"
      :options="['all','male','female']"
    />
    <Table :filter-list="filteredList" />
  </div>
</template>

<script>
import Header from '@/components/Header'
import Table from '@/components/Table'
import 'bootstrap/dist/css/bootstrap.min.css';

//import Table from '@/components/Table'
import axios from 'axios'
//import Table from '@/components/Table'
export default {
  name: 'PageListe',
  components: { Header, Table },
  props: {
  },
  data () {
    return {
      gender: '',
      nonFilteredUsers: [],
      name:''
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
  methods: {
    nameEmit(value) {
      console.log(value)
      this.name = value
    },
    fetchUser() {
        axios('https://randomuser.me/api/?results=20').then(({
          data: {
            results
          }
        }) => {
          this.nonFilteredUsers = results.map(user => {
            return {
              age: user.dob.age,
              name: `${user.name.first} ${user.name.last.toUpperCase()}`,
              email: user.email,
              phone: user.phone,
              gender: user.gender,
              avatar: user.picture.thumbnail
            }
          });
        });
      }
  }
}
</script>
