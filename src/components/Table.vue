<template>
  <table
    id="tbl-users"
    class="table table-hover"
  >
    <thead>
      <tr>
        <th />
        <th @click="sort('name')">Nom</th>
        <th @click="sort('email')"> Email</th>
        <th>Tel</th>
        <th  @click="sort('age')">Naissance</th>
        <th>Gender</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="user in sortFilter"
        :key="user.email"
      >
        <td>
          <img :src="user.avatar">
        </td>
        <td v-html="user.nameFormated" />
        <td>{{ user.email }}</td>
        <td>{{ user.phone }}</td>
        <td>{{ user.age }}</td>
        <td>{{ user.gender }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  computed :{
    sortFilter(){
    return [...this.filterList].sort((p1, p2) => {
          if (!this.sortBy) return 0;
          const modifier = this.sortDirection === 'asc' ? 1 : -1;
          if (typeof p1[this.sortBy] === "number")
            return modifier * (p1[this.sortBy] - p2[this.sortBy]);
          return modifier * p1[this.sortBy].localeCompare(p2[this.sortBy]);
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

      }
  },
  data () {
    return {
      sortBy: '',
      sortDirection: 'asc',
    }
  },
  props: {
    filterList: Array
  },
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