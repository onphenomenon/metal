var Metalsmith = require('metalsmith'),
	markdown = require('metalsmith-markdown'),
	serve = require('metalsmith-serve'),
	watch = require('metalsmith-watch'),
	templates = require('metalsmith-templates'),
 	moment = require('moment'),
	harmony = require('harmonize')();

Metalsmith(__dirname)
  .metadata({
    site: {
      title: 'karianne.org',
      url: 'https://karianne.org'
    }
  })
  .source('./src')
  .destination('./build')
  .use(markdown())
  .use(templates({
	  engine: 'jade',
	  moment: moment
  }))
	.use(serve({
	  port: 8080,
	  verbose: true
	}))
	.use(watch({
	  pattern: '**/*',
	  livereload: true
	}))
  // build plugins go here
  .build(function (err) {
    if (err) {
      console.log(err);
    }
    else {
      console.log('Site build complete!');
    }
 });
