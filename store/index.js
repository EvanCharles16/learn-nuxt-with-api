import Vuex from "vuex";
import axios from "axios";

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: []
    },
    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts;
      },
      addPost(state, post) {
        state.loadedPosts.push(post);
      },
      editPost(state, editedPost) {
        const postIndex = state.loadedPosts.findIndex(
          post => post.id === editedPost.id
        );
        // Replacing an element in the array with a new element
        state.loadedPosts[postIndex] = editedPost;
      }
    },
    actions: {
      // About nuxtServerInit => https://stackoverflow.com/questions/54495944/what-is-the-difference-between-fetch-and-nuxtserverinit-in-nuxt-js
      nuxtServerInit(vuexContext, context) {
        return axios
          .get("https://nuxt-blog-37571.firebaseio.com/posts.json")
          .then(res => {
            const postsArray = [];
            for (const key in res.data) {
              postsArray.push({ ...res.data[key], id: key });
            }
            console.log(res.data);
            vuexContext.commit("setPosts", postsArray);
          })
          .catch(error => console.log(error));
      },
      // setPosts(vuexContext, posts) {
      //   vuexContext.commit("setPosts", posts);
      // },

      addPost(vuexContext, postData) {
        const createdPost = {
          ...postData,
          updatedDate: new Date()
        };
        return axios
          .post(
            "https://nuxt-blog-37571.firebaseio.com/posts.json",
            createdPost
          )
          .then(res => {
            console.log(res);
            vuexContext.commit("addPost", {
              ...createdPost,
              // res.data.name is the id (on firebase)
              id: res.data.name
            });
          })
          .catch(e => console.log(e));
      },

      editPost(vuexContext, editedPost) {
        return (
          axios
            // editedPost.id from LoadedPosts with Spread Operator and add a id on it
            .put(
              "https://nuxt-blog-37571.firebaseio.com/posts/" +
                editedPost.id +
                ".json",
              editedPost
            )
            .then(res => {
              console.log(res);
              vuexContext.commit("editPost", editedPost);
            })
            .catch(error => console.log(error))
        );
      }
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts;
      }
    }
  });
};

export default createStore;
