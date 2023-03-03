<template>
  <h2>User: {{ keycloak.idTokenParsed.preferred_username }}</h2>

  <ul>
    <li><b>Access Token:</b> {{ keycloak.token }}</li>
    <li><b>JWT Token:</b> {{ keycloak.idToken }}</li>
    <li><b>clientId:</b> {{ keycloak.clientId }}</li>
    <li><b>Auth Server Url:</b> {{ keycloak.authServerUrl }}</li>
  </ul>

  <button @click="keycloak.logout()">logout</button>

  <h1>Oauth2 & Keycloak PKCE tester</h1>
  <hr/>
  <label for="url"
    >Test requests with your auth token to some backend URL:
  </label>
  <input
    style="width: 300px"
    type="text"
    id="url"
    name="url"
    placeholder="http://localhost:8080/test"
    v-model="testUrl"
  />

  <button @click="sendRequest()">Send GET Request to URL</button>

  <div>
   
      Response:<br>
      <hr>
      {{ this.data }}
  
  </div>
</template>

<script>
export default {
  name: "App",
  props: ["keycloak"],
  data: () => {
    return {
      data: "Nothing here",
      testUrl: "http://localhost:8090/appartmentlist",
    };
  },
  methods: {
    sendRequest() {
      this.data = "send";

      this.axios
        .get(this.testUrl, {
          headers: {
            Authorization: "Bearer " + this.keycloak.token,
          },
        })
        .then((response) => {
          this.data = response.data;
        })
        .catch((error) => {
          console.error("Der Request ist gescheitert", error);
        });
    },
  },
};
</script>

<style scoped>
label {
  display: block;
}

input,
label {
  margin: 0.4rem 0;
}
</style>
