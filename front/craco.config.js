const CracoLessPlugin = require('craco-less')

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            // '@primary-color': '#FA7456',
                            '@btn-primary-bg': '#000',
                            '@btn-border-radius-base': '24px',
                            '@switch-color': '#FA7456',
                            // '@btn-default-color': '#FA7456'
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
}
