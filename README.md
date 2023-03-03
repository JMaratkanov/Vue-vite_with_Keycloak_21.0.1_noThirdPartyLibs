# I managed to implement keycloak-js adapter 21.0.1 with Vue 3 Vite, without any third party libraries
# Given you entered your keycloak configurations correctly, you should be able to perform GET-Requests to your backend
# by passing your URI into the inputfield

This is a ready to use solution for creating an instance of keycloak and passing it to the App.vue.
A realm, a client and an user with given roles should already exist on your keycloak server, in order to
perform a GET-request to your backend application, after keycloak login. Using spring security 6 cors and csrf should be configured properly too.

# Configuration of a frontend client in keycloak with PKCE
On your realm create a new client with following settings:
Client authentication: Off - we dont have a client_secret as we choose using a JS-framework
Authorization: Off
Authentication flow checkboxes: Only standart flow
Proof Key for Code Exchange Code Challenge Method: none (sha256 is recommend though)

Root Url: http://localhost:3000
Valid redirect URIs: http://localhost:3000/*
Valid post logout redirect URIs: +
Web origins: *
Admin URL: http://localhost:3000

# Make sure you use the right keycloak endpoints. Some older versions have different paths
http://localhost:8180/realms/itcare_dev/.well-known/openid-configuration (assuming your keycloak is running on 8180)