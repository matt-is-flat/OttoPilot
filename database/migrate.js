var normalizedPath = require("path").join(__dirname, "migrations");

var migrations = [];

require("fs").readdirSync(normalizedPath).forEach(function(file) {
  migrations.push(require("./migrations/" + file));
});

migrations.forEach(migration => {
  migration.default.up()
});