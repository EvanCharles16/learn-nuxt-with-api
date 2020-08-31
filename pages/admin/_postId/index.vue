<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm :post="loadedPosts" @submit="onSubmitted" />
    </section>
  </div>
</template>

<script>
import axios from "axios";
import AdminPostForm from "@/components/Admin/AdminPostForm";
export default {
  layout: "admin",
  components: {
    AdminPostForm
  },
  asyncData(context) {
    return axios
      .get(
        "https://nuxt-blog-37571.firebaseio.com/posts/" +
          context.params.postId +
          ".json"
      )
      .then(res => {
        return {
          // Adding id for editting , to target the specific edited post with the id
          loadedPosts: { ...res.data, id: context.params.postId }
        };
      })
      .catch(e => context.error(e));
  },
  methods: {
    // Edit Data func
    // Passing editedPost from AdminPostForm as a argument
    onSubmitted(editedPost) {
      this.$store.dispatch("editPost", editedPost).then(() => {
        this.$router.push("/admin");
      });
    }
  }
};
</script>

<style scoped>
.update-form {
  width: 90%;
  margin: 20px auto;
}
@media (min-width: 768px) {
  .update-form {
    width: 500px;
  }
}
</style>
