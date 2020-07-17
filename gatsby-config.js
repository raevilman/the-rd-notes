const siteMetadata = {
    title: `theRDnotes`,
    description: `my digital notebook...`,
};

module.exports = {
    siteMetadata: siteMetadata,
    plugins: [
        `gatsby-transformer-remark`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/notes`,
                name: `notes`,
            },
        }
    ],
};