exports.root_url = "http://localhost:3500/";
exports.min_vanity_length = 4;
exports.num_of_urls_per_hour = 50;

exports.get_user_query = 'SELECT * FROM user_data WHERE userid =';
exports.add_query = 'INSERT INTO user_data SET userid = {userid}, email = {email}, password = {password}';
exports.update_passwd_query = 'UPDATE user_data SET password = {password} WHERE userid = {userid}';
exports.update_views_query = 'UPDATE urls SET num_of_clicks = {VIEWS} WHERE id = {ID}';
exports.insert_view = 'INSERT INTO stats SET ip = {IP}, url_id = {URL_ID}, referer = {REFERER}';
exports.check_ip_query = 'SELECT COUNT(id) as counted FROM urls WHERE datetime_added >= now() - INTERVAL 1 HOUR AND ip = {IP}';
//herokudb cleardb
//exports.host = 'us-cdbr-iron-east-04.cleardb.net';//?reconnect=true';
//exports.user = 'b4fafab11ca4dc';
//exports.password = '182d894d';
//exports.database = 'heroku_9d88e519e560328';

//herokudb jawsdb
exports.host = 'mwgmw3rs78pvwk4e.cbetxkdyhwsb.us-east-1.rds.amazonaws.com';//?reconnect=true';
exports.user = 'imp4tqfjlan8iqh3';
exports.password = 'fiq0ia739dawrris';
exports.database = 'fu57vhhzl3fvhhxq';

//*/
//local
if(process.env.NODE_ENV=="development"){
exports.host = '10.203.24.47';
exports.user = 'nodeuser';
exports.password = 'nodeuser';
exports.database = 'nodelocal';
}
//OC
/*exports.host = 'mysql://nodemysql:3306/';
exports.user = 'nodeuser';
exports.password = 'node@user';
exports.database = 'nodetestdb';*/