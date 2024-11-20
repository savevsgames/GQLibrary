// use this to decode a token and get the user's information out of it
import { jwtDecode, type JwtPayload } from "jwt-decode";

interface ExtendedJwt extends JwtPayload {
  data: {
    username: string;
    email: string;
    id: string;
  };
}

// create a new class to instantiate for a user
class AuthService {
  // get user data
  getProfile() {
    return jwtDecode<ExtendedJwt>(this.getToken() || "");
  }

  // check if user's logged in
  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // check if token is expired
  isTokenExpired(token: string) {
    try {
      const decoded = jwtDecode<ExtendedJwt>(token);
      if (decoded?.exp && decoded?.exp < Date.now() / 1000) {
        return true;
      }
      // if there is an error in decoding the token
      return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    // Retrieves the user token ("id_token") from localStorage
    const loggedInUser = localStorage.getItem("id_token");
    return loggedInUser;
  }

  login(idToken: string) {
    // Saves user token to localStorage
    localStorage.setItem("id_token", idToken);
    // this will reload the page and reset the state of the application - re-rendering the page (navbar logged in)
    window.location.assign("/");
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem("id_token");
    // this will reload the page and reset the state of the application
    window.location.assign("/");
  }
}

export default new AuthService();
