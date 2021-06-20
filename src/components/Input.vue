<template>
  <div>
    <label
      :for="forLabel"
      :class="classLabel"
    >{{ textLabel }}</label><input
      :id="idInput"
      :value="value"
      @input="$emit('input', $event.target.value)"
      :type="typeInput"
      :class="classInput"
      :placeholder="placeholder"
    >
  </div>
</template>
<script>
export default {
  methods: {
      updateText (e) {
    this.$emit('input',  e.target.value)
  }
  },
  props:{
    value: {
    type: String},
    textLabel:String,
    forLabel:String,
    classLabel:String,
    idInput:String,
    typeInput:String,
    classInput:String,
    placeholder:String,
  },
  data () {
    return {
      data:''
    }
  }
}
</script>