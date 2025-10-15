db = db.getSiblingDB('admin');

// Crear usuario administrador
db.createUser({
  user: 'user',
  pwd: 'password',
  roles: [{ role: 'root', db: 'admin' }]
});

db.auth('user', 'password');

db = db.getSiblingDB('finance_db');

// Crear usuario para la base de datos de la aplicación
db.createUser({
  user: 'user',
  pwd: 'password',
  roles: [{ role: 'readWrite', db: 'finance_db' }]
});

// Crear colecciones con validación
db.createCollection('users', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['username', 'email', 'password'],
      properties: {
        username: { bsonType: 'string' },
        email: { bsonType: 'string' },
        password: { bsonType: 'string' }
      }
    }
  }
});

// Crear índices
db.users.createIndex({ 'username': 1 }, { unique: true });
db.users.createIndex({ 'email': 1 }, { unique: true });

// Otras colecciones
db.createCollection('challenges');
db.createCollection('rewards');
db.createCollection('transactions');