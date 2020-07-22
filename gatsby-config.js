const siteMetadata = {
  title: `theRDnotes`,
  description: `my digital notebook...`,
};

module.exports = {
  siteMetadata: siteMetadata,
  plugins: [
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
  ],
};
