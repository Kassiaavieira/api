const createUsers = `
  CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome VARCHAR,
  email VARCHAR,
  password VARCHAR,
  cep VARCHAR,
  cidade VARCHAR,
  uf VARCHAR,
  logradouro VARCHAR
)
`;
module.exports = createUsers;