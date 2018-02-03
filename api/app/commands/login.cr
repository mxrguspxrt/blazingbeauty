require "digest/sha1"

def login(socket, params)
  email = params["email"].to_s
  password = params["password"].to_s
  crypted_password = Digest::SHA1.base64digest(password)

  filter = {
    email: email
  }
  users = USERS.filter(filter).run(DB_CONNECTION).to_a

  if users.size == 0
    return {
      errors: {
        email: ["Does not belong to existing user"]
      }
    }
  end

  user = users.first

  if user["password"] != crypted_password
    return {
      errors: {
        password: ["Is incorrect"]
      }
    }
  end

  return {
    session: {
      secret: "1234"
    }
  }
end
