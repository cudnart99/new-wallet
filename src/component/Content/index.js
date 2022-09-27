import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function Content() {
  const [routes, setRoutes] = useState([]);
  useEffect(() => {}, [routes]);
  const handleCreate = () => {
    var newAcc = {};
    newAcc.path = `/account/${routes.length}`;
    newAcc.exact = true;
    newAcc.main = () => <h2>Content {routes.length}</h2>;
    setRoutes((routes) => [...routes, newAcc]);
    console.log(routes, "helo123");
  };
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <div
          style={{
            padding: "10px",
            width: "20%",
            background: "red",
          }}
        >
          <button onClick={() => handleCreate()}>Create new account</button>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {routes.map((item, index) => {
              return (
                <li>
                  <Link to={`/account/${index}`}>Account {index}</Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div style={{ flex: 1, padding: "10px" }}>
          <Switch>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} children={<route.main />} />
            ))}
          </Switch>
        </div>
      </div>
    </Router>
  );
}
