var ghpages = require('gh-pages');

ghpages.publish(
  'src', // path to public directory
  {
    branch: 'gh-pages',
    repo: ' https://github.com/tengine8000/speech-synth-app.git', // Update to point to your repository
    user: {
      name: 'Emmanuel Torty', // update to use your name
      email: 'torty.emmanuel@gmail.com' // Update to use your email
    }
  },
  () => {
    console.log('Deploy Complete!')
  }
)