<template>
  <div class="container-fluid">
    <div id="app">
      <div>
        <h1>Dev Vuejs</h1>
        <hr>
        <button
          id="fetch-users"
          class="btn btn-primary"
          @click="fetchUsers"
        >
          Fetch users
        </button>
        <input
          v-model="name"
          type="text"
          placeholder="Filter By Name"
        >
        <select
          id="genders"
          v-model="gender"
          name="genders"
        >
          <option value="">
            All
          </option>
          <option value="male">
            Male
          </option>
          <option value="female">
            Female
          </option>
        </select>
        <span
          v-if="gender != ''"
          class="counter"
        >
          {{ filteredList.length }} {{ gender }} /
          {{ nonFilteredUsers.length }} users</span>
        <span
          v-else
          class="counter"
        >{{ nonFilteredUsers.length }} users</span>
      </div>
      <item :userFiltered="filteredList"></item>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
import Item from './Item'

  export default {
    name: 'AnotherComponent',
     components: {
    Item
  },
    data() {
      return {
        gender: '',
        age: '',
        nonFilteredUsers: [],
        sortBy: '',
        sortDirection: 'asc',
        name: '',
      }
    },
    computed: {
      filteredList() {
        return this.nonFilteredUsers.filter(user => {
          if (this.gender === "") return true;
          return user.gender === this.gender;
        }).filter(users => {
          if (this.name !== '') {
            return this.name.toLowerCase().split(' ').every(word => users.name.toLowerCase().normalize('NFD')
              .replace(/[\u0300-\u036f]/gu, "").includes(word))
          }
          return true;
        }).sort((p1, p2) => {
          if (!this.sortBy) return 0;
          const modifier = this.sortDirection === 'asc' ? 1 : -1;
          if (typeof p1[this.sortBy] === "number")
            return modifier * (p1[this.sortBy] - p2[this.sortBy]);
          return modifier * p1[this.sortBy].localeCompare(p2[this.sortBy]);
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
      sort: function (sortby) {
        if (sortby === this.sortBy) {
          if (this.sortDirection === 'desc') {
            this.sortBy = '';
            this.sortDirection = 'asc';
            return;
          }

          if (this.sortDirection === 'asc') {
            this.sortDirection = 'desc';
            return;
          }
        }
        this.sortDirection = 'asc';
        this.sortBy = sortby;

      },
      fetchUsers() {
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
      },
    }
  }
</script>

<style >

  .asc:after {
    content: "\25B2"
  }

  .desc:after {
    content: "\25BC"
  }

  .highlightText {
    background: yellow;
  }
</style>