import React from "react";
import { Container} from "@material-ui/core";
import Navbar from "./components/Navbar/Navbar.js";
import { BrowserRouter,Switch,Route} from "react-router-dom";
import Home from "./components/Home/Home.js";
import Auth from "./components/Auth/Auth.js";
import { GoogleOAuthProvider } from '@react-oauth/google';
const App = () => {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_API_TOKEN ||'478236345592-1ikl4jlpnht2l4l35kf710dc9b30ct8m.apps.googleusercontent.com'}>
    <BrowserRouter>
    <Container maxWidth="lg">
      <Navbar/>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/auth' exact component={Auth} />
      </Switch>
    </Container>
    </BrowserRouter>
    </GoogleOAuthProvider>
  );
};

export default App;