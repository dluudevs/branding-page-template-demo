const remotePortal = process.env.REACT_APP_REMOTE_MODULE_PILOT;

module.exports = {
  name: "branding",
  filename: "remoteEntry.js",
  remotes: {
    portal: `portal@${remotePortal}/remoteEntry.js`,
  },
  exposes: {
    "./Auth": "./src/exposeComponent.js",
  },
};
