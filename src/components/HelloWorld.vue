<template>
  <div class="hello">
    <button @click="auth">Google</button>
    <p>{{ result }}</p>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  data: () => {
    return {
      result: {}
    };
  },
  methods: {
    auth() {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
      firebase.auth().signInWithRedirect(provider);
    }
  },
  async created() {
    const result = await firebase
      .auth()
      .getRedirectResult()
      .catch(function(error) {
        console.error(error);
      });
      
    if (result) {
      this.result = result;
      console.log(JSON.stringify(result, null, 2));
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
