fx_version 'cerulean'
game 'gta5'
 
lua54 'yes'
 
client_scripts {
    'client/*.lua',
}
 
server_scripts {'@mysql-async/lib/MySQL.lua',"server/*.lua"}
shared_script "config.lua"

ui_page 'web/dist/index.html'
files {
    'web/dist/*',
	'web/dist/**/*',
    "collections/*.json"
}

-- NONE DEVELOPMENT ADVANCED POLICE MDT