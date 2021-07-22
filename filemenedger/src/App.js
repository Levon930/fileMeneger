import "./App.css";

import { MuiThemeProvider, StylesProvider } from "@material-ui/core/styles";
import { ThemeProvider } from "styled-components";
import { CssBaseline } from "@material-ui/core";
import { BrowserRouter } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import createMyTheme from "./theme/theme";
import Files from "./pages/rootFiles/filesPage";
import Folder from "./pages/files/files";


function App() {
  const theme = createMyTheme({ appColor: { color: "red" } });
  return (
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <div className="App">
            <CssBaseline />
            <BrowserRouter>
              <Switch>
                <Route path="/" component={Files} exact />
                <Route path="/folder/:slug" component={Folder} />
              </Switch>
            </BrowserRouter>
          </div>
        </ThemeProvider>
      </MuiThemeProvider>
    </StylesProvider>
  );
}

export default App;
