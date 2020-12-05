require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
const siteMetadata = {
  title: `theRDnotes`,
  description: `my digital notebook...`,
};

module.exports = {
  siteMetadata: siteMetadata,
  plugins: [
    {
      resolve: `gatsby-plugin-env-variables`,
      options: {
        allowList: ["REACT_APP_EVENTS_COUNTER_API_KEY"]
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/notes`,
        name: `notes`,
      },
    },
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `theRDnotes`,
        short_name: `theRDnotes`,
        start_url: `/`,
        background_color: `#ffffff`,
        display: `standalone`,
        icon: `src/images/favicon.png`
      },
    },
    {
      resolve: "gatsby-plugin-firebase",
      options: { 
      credentials: {
          apiKey: process.env.REACT_APP_FIREBASE_WEB_API_KEY
          ,
          // authDomain: "<auth-domain>",
          // databaseURL: "<db-url>",
          projectId: process.env.REACT_APP_FIREBASE_WEB_PROJECT_ID,
          // storageBucket: "<storage-bucket>",
          // messagingSenderId: "<msg-sender-id>",
          appId: process.env.REACT_APP_FIREBASE_WEB_APP_ID,
          // measurementId: "<-measurement-id>"
      }
      }
  },
  ],
};
