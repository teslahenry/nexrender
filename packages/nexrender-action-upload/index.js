let mysql = require('mysql');
let jsftp = require("jsftp");
let config = {
  host    : 'localhost',
  user    : 'root',
  password: '',
  database: 'todoapp'
};
const 
let sql = `UPDATE status = ?`


module.exports = (job, settings, { input, output, dbconfig, ftpconfig }, type) => {
    if (type != 'postrender') {
        throw new Error(`Action ${name} can be only run in postrender mode, you provided: ${type}.`)
    }

    /* check if input has been provided */
    input = input || job.output;

    /* fill absolute/relative paths */
    if (!path.isAbsolute(input)) input = path.join(job.workpath, input);
    if (!path.isAbsolute(output)) output = path.join(job.workpath, output);

    /* output is a directory, save to input filename */
    if (path.dirname(output) === output) {
        output = path.join(output, path.basename(input));
    }
	
	dbCfg = JSON.parse(dbconfig)
	ftpCfg = JSON.parse(ftpconfig)
	connection = mysql.createConnection(dbCfg);
	const ftp = new jsftp({
	  host: "myserver.com",
	  port: 3331, // defaults to 21
	  user: "user", // defaults to "anonymous"
	  pass: "1234" // defaults to "@anonymous"
	});

    let data = [`RENDER_SUCC`];

    return new Promise(function(resolve, reject) {
		ftp.put(buffer, input, err => {
		  if (!err) {
			console.log("File transferred successfully!");
		  }
		});
		connection.query( sql, data, ( err, rows ) => {
			if ( err )
				return reject( err );
			console.log('Rows affected:', results.affectedRows);
			resolve( rows );
		} );
		connection.end();
    }).catch((error) => {
        connection.end();
        throw error
    })
}