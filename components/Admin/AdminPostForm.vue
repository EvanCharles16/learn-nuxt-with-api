<template>
  <form @submit.prevent="onSave">
    <AppControlInput v-model="editedPost.author">Author Name</AppControlInput>

    <AppControlInput v-model="editedPost.title">Title</AppControlInput>

    <AppControlInput v-model="editedPost.thumbnail"
      >Thumbnail Link</AppControlInput
    >

    <AppControlInput control-type="textarea" v-model="editedPost.content"
      >Content</AppControlInput
    >
    <AppControlInput control-type="textarea" v-model="editedPost.previewText"
      >Preview text</AppControlInput
    >

    <AppButton type="submit">Save</AppButton>

    <AppButton
      type="button"
      style="margin-left: 10px"
      btn-style="cancel"
      @click="onCancel"
      >Cancel</AppButton
    >
  </form>
</template>

<script>
import AppButton from "@/components/UI/AppButton.vue";
import AppControlInput from "@/components/UI/AppControlInput.vue";
export default {
  props: {
    post: {
      type: Object,
      required: false
    }
  },
  components: {
    AppButton,
    AppControlInput
  },
  data() {
    return {
      // If (this post) => return ...this.post , else object with empty string
      editedPost: this.post
        ? { ...this.post }
        : {
            author: "",
            title: "",
            thumbnail: "",
            content: "",
            previewText: ""
          }
    };
  },
  methods: {
    onSave() {
      // Save the Post
      this.$emit("submit", this.editedPost);
      this.editedPost = "";
      console.log(this.editedPost);
    },
    onCancel() {
      //  Navigate Back
      this.$router.push("/admin");
    }
  }
};
</script>

<style></style>
