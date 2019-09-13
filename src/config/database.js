require('dotenv').config();

module.exports = {
  dialect: process.env.DB_DIALECT,
  storage: process.env.DB_STORAGE,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
