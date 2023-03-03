import { createApp } from "vue";
import App from "./App.vue";
import Keycloak from "keycloak-js";
import axios from "axios";
import VueAxios from "vue-axios";
import { h, reactive } from "vue";


//==== Keycloack ====================== 
let initOptions = {
  url: "http://localhost:8180/",
  realm: "yourrealm_dev",
  clientId: "your_client",
  onLoad: "login-required",
};

let keycloak = new Keycloak(initOptions);
const props = reactive({ keycloak: keycloak })

keycloak
  .init({ onLoad: initOptions.onLoad })
  .then((auth) => {
    if (!auth) {
      window.location.reload();
    } else {
      console.log("Authenticated");

      const app = createApp({
        render: () => h(App, props)
      })

      app.use(VueAxios, axios);
      app.mount("#app"); 
    }

    //Token Refresh
    setInterval(() => {
      keycloak
        .updateToken(70)
        .then((refreshed) => {
          if (refreshed) {
            console.log("Token refreshed" + refreshed);
          } else {
            console.log(
              "Token not refreshed, valid for " +
                Math.round(
                  keycloak.tokenParsed.exp +
                    keycloak.timeSkew -
                    new Date().getTime() / 1000
                ) +
                " seconds"
            );
          }
        })
        .catch(() => {
          console.log("Failed to refresh token");
        });
    }, 6000);
  })
  .catch(() => {
    console.log("Authenticated Failed");
  });
//==== Keycloack ====================== 

