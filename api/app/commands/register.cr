require "digest/sha1"

def register(socket, params)
  email = params["email"].to_s
  password = params["password"].to_s
  crypted_password = Digest::SHA1.base64digest(password)

  filter = {
    email: email
  }
  users = USERS.filter(filter).run(DB_CONNECTION).to_a

  if users.size > 0
    return {
      errors: {
        email: ["User with this email address already exists"]
      }
    }
  end

  user = {
    email: email,
    password: crypted_password
  }
  id = USERS.insert(user).run(DB_CONNECTION)["generated_keys"].first.to_s

  return {
    id: id
  }
end
