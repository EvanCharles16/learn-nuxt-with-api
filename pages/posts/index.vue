<template>
  <div class="posts-page">
    <PostList :posts="loadedPosts" />
  </div>
</template>

<script>
import PostList from "@/components/Posts/PostList.vue";
export default {
  components: {
    PostList
  },
  // fetch(context) {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve({
  //         loadedPosts: [
  //           {
  //             id: "1",
  //             title: "First Post",
  //             previewText: "This is our first post!",
  //             thumbnail:
  //               "https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg"
  //           },
  //           {
  //             id: "2",
  //             title: "Second Post",
  //             previewText: "This is our second post!",
  //             thumbnail:
  //               "https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg"
  //           },
  //           {
  //             id: "3",
  //             title: "Third Post",
  //             previewText: "This is our third post!",
  //             thumbnail:
  //               "https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg"
  //           }
  //         ]
  //       });
  //     }, 1000);
  //   })
  //     .then(data => {
  //       context.store.dispatch("setPosts", data.loadedPosts);
  //     })
  //     .catch(e => {
  //       context.error(new Error());
  //     });
  // },
  computed: {
    loadedPosts() {
      return this.$store.getters.loadedPosts;
    }
  }
};
</script>

<style scoped>
.posts-page {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
