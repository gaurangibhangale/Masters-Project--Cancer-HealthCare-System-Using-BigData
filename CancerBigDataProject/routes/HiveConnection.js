/**
 * New node file
 */
var java = require('java');
java.classpath.push("commons-lang3-3.1.jar");
java.classpath.push("commons-io.jar");
 
var list = java.newInstanceSync("java.util.ArrayList");
 
java.newInstance("java.util.ArrayList", function(err, list) {
  list.addSync("item1");
  list.addSync("item2");
});
 
var ArrayList = java.import('java.util.ArrayList');
var list = new ArrayList();
list.addSync('item1');
