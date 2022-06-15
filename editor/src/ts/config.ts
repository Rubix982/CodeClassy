//
// This file configures the domain url that is used to connect to the Convergence service.
//
// By default, it is configured to use the default options in the Convergence Omnibus Container
// (https://hub.docker.com/r/convergencelabs/convergence-omnibus)
//
// These are the relevant parts of the URL: http://<host>:<host-port>/api/realtime/<namespace>/<domainId>
// USE API only when running with local docker container, http://0.0.0.0:8000/api/realtime/convergence/default
// If using Docker Compose, use the url, https://localhost/realtime/convergence/default
const CONVERGENCE_URL: string =
  "https://localhost/realtime/convergence/default";
