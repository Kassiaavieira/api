const AppError = require("../utils/AppError");
const sqliteConnection = require("../database/sqlite");
const { hash, compare } = require("bcryptjs");

class UsersController {
  async create(request, response) {
    const { nome, email, password, cep, cidade, uf, logradouro } = request.body;

    const database = await sqliteConnection();

    const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email]);
    if (checkUserExists) {
      throw new AppError("Este e-mail já está em uso.");
    }

    const hashedPassword = await hash(password, 8);

    await database.run(
      "INSERT INTO users (nome, email, password, cep, cidade, uf, logradouro) VALUES (?, ?, ?, ?, ?, ?, ?)", [nome, email, hashedPassword, cep, cidade, uf, logradouro]
    );

    return response.status(201).json();
  }
}

module.exports = UsersController;
