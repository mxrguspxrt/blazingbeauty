require "rethinkdb"
include RethinkDB::Shortcuts

DB_CONNECTION = r.connect(host: "localhost")
DB = r.db("api")

USERS = DB.table("users")
