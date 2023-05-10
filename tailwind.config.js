module.exports = {
    content: ["./src/**/*.{html,js,jsx}"],
    theme: {
      extend: {
        backgroundImage: {
          colors: {
            brand: '#6366f1',
          },
          banner: `url('../public/img/banner.jpg')`
        },
      },
    },
    plugins: [],
}