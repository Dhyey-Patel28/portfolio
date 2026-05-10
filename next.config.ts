import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/work",
        destination: "/projects",
        permanent: true,
      },
      {
        source: "/work/macon-banquet",
        destination: "/projects/macon-banquet",
        permanent: true,
      },
      {
        source: "/work/transfer-planning-tools",
        destination: "/experience/eastern-michigan-university",
        permanent: true,
      },
      {
        source: "/work/givaudan-internal-tools",
        destination: "/experience/givaudan",
        permanent: true,
      },
      {
        source: "/work/visual-data-mining-dashboard",
        destination: "/projects/visual-data-mining-dashboard",
        permanent: true,
      },
      {
        source: "/work/job-fair-match",
        destination: "/projects/job-fair-match",
        permanent: true,
      },
      {
        source: "/work/automata-workbench",
        destination: "/projects/automata-workbench",
        permanent: true,
      },
      {
        source: "/work/drone-flight-analytics",
        destination: "/projects/drone-flight-data-analytics",
        permanent: true,
      },
      {
        source: "/work/ml-systems",
        destination: "/projects/seglungai",
        permanent: true,
      },
      {
        source: "/work/code-visualizer",
        destination: "/lab/code-visualizer",
        permanent: true,
      },
      {
        source: "/work/defi-protocol-safety",
        destination: "/lab/defi-protocol-safety",
        permanent: true,
      },
      {
        source: "/work/momentum-app",
        destination: "/lab/momentum-app",
        permanent: true,
      },
      {
        source: "/work/weather-dashboard",
        destination: "/lab",
        permanent: true,
      },
      {
        source: "/work/:slug",
        destination: "/projects",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;