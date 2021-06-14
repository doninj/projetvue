<template>
  <form
    @submit.prevent="submitValue"
  >
    <div
      class="row"
    >
      <div class="col-md-3 border-right">
        <div class="d-flex flex-column align-items-center text-center p-3 py-5">
          <img
            class="rounded-circle mt-5 image"
            :src="initialValue.avatarUrl"
          >
        </div>
      </div>
      <div class="col-md-7 border-right">
        <div class="p-3 py-5">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h4 class="text-right">
              Profile Settings
            </h4>
          </div>
          <div class="row mt-2">
            <div class="col-md-6">
              <label
                for="firstName"
                class="labels"
              >Name</label><input
                id="firstName"
                v-model="initialValue.firstName"
                type="text"
                class="form-control"
                placeholder="first name"
              >
            </div>
            <div class="col-md-6">
              <label
                for="lastName"
                class="labels"
              >Surname</label><input
                id="lastName"
                v-model="initialValue.lastName"
                type="text"
                class="form-control"
                placeholder="surname"
              >
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-md-12">
              <label
                for="phone"
                class="labels"
              >PhoneNumber</label><input
                id="phone"
                v-model="initialValue.phone"
                type="tel"
                class="form-control"
                placeholder="enter phone number"
              >
            </div>
            <div class="col-md-12">
              <label
                for="email"
                class="labels"
              >Email </label><input
                id="email"
                v-model="initialValue.email"
                type="text"
                class="form-control"
                placeholder="enter email id"
              >
            </div>
            <div class="col-md-12">
              <label
                for="gender"
                class="labels"
              >Genre </label>
              <select
                id="gender"
                v-model="initialValue.gender"
                class="form-select  form-control"
              >
                <option
                  disabled
                  value=""
                >
                  Choisissez
                </option>
                <option>male</option>
                <option>female</option>
              </select>
            </div>
            <div class="col-md-12">
              <label
                for="avatarUrl"
                class="labels"
              >ImageUrl </label><input
                id="avatarUrl"
                v-model="initialValue.avatarUrl"
                type="text"
                class="form-control"
                placeholder="enter Url of image"
              >
            </div>
          </div>
          <div class="col-md-12">
            <label
              for="details"
              class="labels"
            >Details </label><textarea
              id="details"
              v-model="initialValue.details"
              type="textarea"
              class="form-control"
              placeholder="Your details"
            />
            <div class="col-md-12">
              <label
                for="date"
                class="labels"
              >Date de naissance </label>
              <input
                id="date"
                v-model="initialValue.birthDate"
                class="form-control btn btn-primary profile-button"
                type="date"
              >
            </div>
            <div
              v-if="showAdd == false"
              class="mt-5 text-center"
            >
              <button
                class=" btn btn-primary profile-button"
                @click="goToProfile"
              >
                Go to profile
              </button>
              <button
                class="btn btn-success profile-button"
                type="submit"
              >
                Save Profile
              </button>
            </div>
            <div
              v-if="showAdd == true"
              class="mt-5 text-center"
            >
              <button
                class="btn btn-success profile-button"
                type="submit"
              >
                Add user
              </button>
            </div>
          </div>
        </div>
        <div class="col-md-4" />
      </div>
    </div>
  </form>
</template>

<script>
export default {
props:{
  user:Object,
  showAdd: Boolean
},
  data () {
    return {
      file: undefined,
      initialValue: this.user !=undefined ? this.user : {}
    }
  },
  methods: {
    goToProfile(e){
      this.$emit('click')
      e.preventDefault()
    },
    file_selected: function (e) {
      console.log(e)
      this.file = e.target.files[0]
      this.url_img = URL.createObjectURL(this.file)
    },
    submitValue(e) {
      this.$emit('submit',this.initialValue)
      console.log(e)
      e.preventDefault()
    }
  }
}
</script>