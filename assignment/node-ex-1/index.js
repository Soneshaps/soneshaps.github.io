const fileSystem = require("./fs");

//reading a file
fileSystem.readFile("file.txt");

//writing text to a new file
fileSystem.writeFile("extra.txt", "Hello Hello!");

//appending text to file.txt
fileSystem.appendFile("file.txt", " !!!!");

//deleting extra.txt file
fileSystem.deleteFile("extra.txt");
