<template>
  <table
    id="tbl-users"
    class="table table-hover"
  >
    <thead>
      <tr>
        <th />
        <th>Nom</th>
        <th>Email</th>
        <th>Tel</th>
        <th>Naissance</th>
        <th>Gender</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="user in userFiltered"
        :key="user.email"
      >
        <td>
          <img :src="user.avatar">
        </td>
        <td v-html="user.name" />
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
  props: {
    userFiltered: Array
  },

}
</script>