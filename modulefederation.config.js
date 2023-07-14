const deps = require("./package.json").dependencies;

module.exports = {
  name: "branding",
  filename: "remoteEntry.js",
  remotes: {
    pilot: "pilot@http://localhost:3000/remoteEntry.js",
  },
  exposes: {
    "./Auth": "./src/Views/Login/Auth.jsx",
  },
  shared: {
    ...deps,
    react: {
      singleton: true,
      requiredVersion: deps["react"],
    },
    "react-dom": {
      singleton: true,
      requiredVersion: deps["react-dom"],
    },
    "react-router-dom": {
      singleton: true,
      requiredVersion: deps["react-router-dom"],
      shareScope: "react-router-dep",
      shareKey: "react-router-dep-react-router-dom",
    },
    "path-to-regexp": {
      requiredVersion: "1.8.0",
      shareScope: "react-router-dep",
      shareKey: "react-router-dep-path-to-regexp",
    },
  },
};
