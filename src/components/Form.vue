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
              <InputForm
                v-model="initialValue.firstName"
                class-input="form-control"
                class-label="labels"
                type-input="text"
                id-input="firstname"
                for-label="firstname"
                text-label="FirstName"
                placeholder="FirstName"
              />
            </div>
            <div class="col-md-6">
              <InputForm
                v-model="initialValue.lastName"
                class-input="form-control"
                class-label="labels"
                type-input="text"
                id-input="lastName"
                for-label="lastName"
                text-label="Lastname"
                placeholder="Lastname"
              />
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-md-12">
              <InputForm
                v-model="initialValue.phone"
                class-input="form-control"
                class-label="labels"
                type-input="tel"
                id-input="phone"
                for-label="phone"
                text-label="PhoneNumber"
                placeholder="enter phone number"
              />
            </div>
            <div class="col-md-12">
              <InputForm
                v-model="initialValue.email"
                class-input="form-control"
                class-label="labels"
                type-input="email"
                id-input="email"
                for-label="email"
                text-label="Email"
                placeholder="enter email"
              />
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
              <InputForm
                v-model="initialValue.avatarUrl"
                class-input="form-control"
                class-label="labels"
                type-input="text"
                id-input="avatarUrl"
                for-label="avatarUrl"
                text-label="ImageUrl"
                placeholder="enter Url of image"
              />
            </div>
            <div class="col-md-12">
              <InputForm
                v-model="initialValue.details"
                class-input="form-control"
                class-label="labels"
                type-input="textarea"
                id-input="details"
                for-label="details"
                text-label="Details"
                placeholder="Your details"
              />
              <div class="col-md-12">
                <InputForm
                  v-model="initialValue.birthDate"
                  class-input="form-control"
                  class-label="labels"
                  type-input="date"
                  id-input="date"
                  for-label="date"
                  text-label="Bitrhday"
                />
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
    </div>
  </form>
</template>

<script>
import InputForm from './Input'
export default {

    components: { InputForm },

props:{
  user:Object,
  showAdd: Boolean
},
  data () {
    return {
      data:'',
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