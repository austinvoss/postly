import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div className="container mx-auto text-neutral-50">
        <Switch>
          <Route path="/posts">{/* My Posts Component Here */}</Route>
          <Route path="/profile">{/* My Profile Component Here */}</Route>
          <Route path="/login">{/* My Login Component Here */}</Route>
          <Route path="/register">{/* My Register Component Here */}</Route>
          <Route path="/">{/* My Home Component or Redirect Here */}</Route>
        </Switch>
      </div>
    </Router>
  );
}
