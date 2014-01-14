camunda webapp
==============

The camunda webapplication.


Development Setup
-----------------

For developing the application you can use the `develop` profile.
It will bootstrap the application in an embedded jetty and allows it to reload web resources on the fly.

Start the application on an embedded jetty by executing `mvn clean jetty:run -Pdevelop` from within the `camunda-webapp` folder.

The build tool used for web assets is a [Node.js](http://nodejs.org) based project called [Grunt.js](http://gruntjs.com).

When starting development of javascripts, you should run the following command (from the directory the `Gruntfile.js` is in).

`grunt watch:scripts`

This will watch for changes in the scripts and copy them into the right directory for you.

`grunt watch:scripts`


Test Suite
----------


### Server side

Run tests via `mvn clean test`.


### Client side

> Requires [NodeJS](http://nodejs.org/), [compass](http://compass-style.org/install/), [grunt](http://gruntjs.com/) and [karma](http://karma-runner.github.com).
>
>
> Install karma `npm -g install karma@canary` + dependencies `npm update --dev`.
>
> Additionally paths to browser runtimes may need to be defined in environment variables:
> <code>GRUNT_BIN</code>, <code>PHANTOMJS_BIN</code>, <code>FIREFOX_BIN</code>, <code>CHROME_BIN</code>.

Run unit tests via `karma start src/test/js/config/karma.unit.js`.

Run end-to-end tests via `karma start src/test/js/config/karma.e2e.js` (requires the develop environment to be running).
