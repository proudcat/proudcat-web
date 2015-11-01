/**
 * mongodb 初始化授权配置脚本。
 *
 * 说明
 *   mongodb 2.6以后授权变为基于角色授权，装完数据库并没有任何用户，只有一堆角色.
 *   我们得先直接启动数据库，然后创建用户并给用户设置角色。
 *   这个脚本就是用于为MongoDB授权一键设置。
 *
 * want know why？ read the fuck manual!
 *   https://docs.mongodb.org/manual/tutorial/enable-authentication/
 *
 * step in brief:
 *	  1. Start MongoDB without access control.
 *	  2. Connect to the instance.
 *	  3. Create the user administrator in admin db.
 *	  4. Authenticate as the user administrator.
 * 	  5. Create user for piano db.
 *    6 .Start the MongoDB instance with access control.
 *
 *    啥？问我为啥写英文？老子乐意啊！我会说我是copy文档来的么！！
 */


var process = require('child_process');
var os = require('os');

var platform = os.platform();
var shell = './start.sh';
var shell_auth = './start_auth.sh';

if (platform == 'win32') { //windows
  shell = './start.bat';
  shell_auth = './start_auth.bat';
}

console.log('-----------------------------------------');
console.log('START CONFIGURING YOUR MONGO, PLEASE WAIT FOR A MOMMENT.....');

console.log('starting mongodb!');

//start mongo db
var proc = process.exec(shell + ' &', function(error,
  stdout, stderr) {
  if (error !== null) {
    console.error('SHIT:', error);
  } else {
    console.log('Finished\n');
  };
});

proc.on('exit', function(code) {

  if (code != 0) {
    console.error('start mongodb error! exit code: ', code);
    return;
  }

  console.log('successful!\n');

  console.log('Creating database and import test data!');

  //create db & import test data
  process.exec('mongoimport -d piano -c product ./db/product.json',
    function(error, stdout, stderr) {

      if (error !== null) {
        console.log('SHIT:', error);
        return;
      }

      console.log('successful!\n');

      console.log('Creating the user administrator in admin db.');
      auth(function() {
        console.log('successful\n');

        console.log('configuration is over! \n');

        console.log('now you can run ' + shell_auth + ' to start your mongodb!\n');

        console.log('-----------------------------------------');

        // process.exec('pkill mongod', function(error, stdout, stderr) {
        //   if (error != null) {
        //     console.log('failed to shutdown mongo database!');
        //     console.log('please shutdown it yourself!');
        //     console.log('and then run ' + shell_auth + ' to start your mongodb!');
        //   } else {
        //     console.log('now you can run ' + shell_auth + ' to start your mongodb!');
        //   }
        // });
      });
    })
});

//Create the user administrator in admin db.
var auth = function(cb) {
  var proc = process.exec('mongo < ./db/auth.js', function(error, stdout,
    stderr) {
    if (error !== null) {
      console.log('SHIT ERROR: ' + error);
    };
    cb();
  });
}
