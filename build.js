var Metalsmith = require('metalsmith'),
	markdown = require('metalsmith-markdown'),
	serve = require('metalsmith-serve'),
	watch = require('metalsmith-watch'),
	templates = require('metalsmith-templates'),
 	moment = require('moment'),
	harmony = require('harmonize')(),
	Handlebars = require('handlebars'),
	collections = require('metalsmith-collections'),
    permalinks  = require('metalsmith-permalinks'),
	fs = require('fs'),
	baseUrl = 'http://localhost:8080';

Handlebars.registerPartial({
	'header': fs.readFileSync(__dirname + '/templates/partials/header.hbt').toString(),
	'footer': fs.readFileSync(__dirname + '/templates/partials/footer.hbt').toString(),
	'sidebar': fs.readFileSync(__dirname + '/templates/partials/sidebar.hbt').toString()
})
Handlebars.registerHelper('baseUrl', function() {
  return baseUrl;
});

var plugin = function(files, metalsmith, done) {
    console.log(files);
    done();
};

Metalsmith(__dirname)
 .use(plugin)
  .use(collections({
	 pages: {
		 pattern: 'content/pages/*.md'
	 },
	 posts: {
        pattern: 'content/posts/*.md',
        sortBy: 'date',
        reverse: true
    }
  }))
  .metadata({
    site: {
      title: 'karianne.org',
      url: 'https://karianne.org'
    }
  })

  .use(markdown())
  .use(permalinks({
	  pattern: ':collection/:title'
  }))
  .use(templates({
	  engine: 'handlebars',
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

    .destination('./build')
  // build plugins go here
  .build(function (err) {
    if (err) {
      console.log(err);
    }
    else {
      console.log('Site build complete!');
    }
 });
