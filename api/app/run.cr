require "kemal"
require "./config/rethink"
require "./models/*"
require "./commands/*"
require "json"


LOGGER = Logger.new
SOCKETS = [] of HTTP::WebSocket


ws "/api" do |socket|

  SOCKETS << socket

  socket.on_message do |message|
    handle_request(socket, message)
  end

  socket.on_close do
    SOCKETS.delete(socket)
  end

end


def handle_request(socket, message)
  LOGGER.debug("REQUEST: #{message}")
  hash = JSON.parse(message)
  run_command(socket, hash["command"], hash["params"])
end


def handle_response(socket, response)
  response_string = response.to_json
  LOGGER.debug("RESPONSE: #{response_string}")
  socket.send(response_string)
end


def run_command(socket, command, params)
  case command
  when "login"
    result = login(socket, params)
  when "register"
    result = register(socket, params)
  end

  response = {
    command: command,
    result: result
  }

  handle_response(socket, response)
end


Kemal.run
