<template>
  <div>
    <button
      id="fetch-users"
      class="btn btn-primary"
      @click="fetchUsers"
    >
      Fetch users
    </button>
    <button
      id="fetch-users"
      class="btn btn-primary mr-4"
      @click="showModal"
    >
      add user
    </button>
    <input
      v-model="name"
      type="text"
      placeholder="Filter By Name"
      @input="emitName(name)"
    >
    <select
      id="genders"
      v-model="gender"
      name="genders"
      @change="genderChange"
    >
      <!-- <option value="">
        All
      </option>
      <option value="male">
        Male
      </option>
      <option value="female">
        Female
      </option> -->
      <option
        v-for="option in options"
        :key="option"
      >
        {{ option }}
      </option>
    </select>
    <span
      v-if="gender != ''"
      class="counter"
    >
      {{ filtered }} {{ gender }} /
      {{ nonFiltered }} users</span>
    <span
      v-else
      class="counter"
    >{{ filtered }} users</span>
  </div>
</template>

<script>

export default {

  props:{
  filtered:Number,
  nonFiltered: Number,
  options : Array
  },
  data () {
    return {
      gender : 'all',
      name: '',
    }
  },
  methods: {
    fetchUsers () {
      this.$emit('fetchuser')
    },
    showModal () {
      this.$emit('showmodal')
    },
    genderChange(event) {
      console.log(event)
      this.$emit('input',event.target.value)
    },
    emitName(value){
      this.$emit('name', value)
    }
  },

}
</script>

<style>

</style>