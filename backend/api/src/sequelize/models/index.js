import Sequelize from 'sequelize';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

const DB_NAME = process.env.DB_NAME || 'lingua';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASS = process.env.DB_PASS || '';
const DB_HOST = process.env.DB_HOST || '127.0.0.1';
const DB_PORT = Number(process.env.DB_PORT || 3306);

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'mysql',
  logging: false
});

export const User = sequelize.define('User', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: Sequelize.STRING, unique: true, allowNull: false },
  name: { type: Sequelize.STRING },
  passwordHash: { type: Sequelize.STRING },
  role: { type: Sequelize.ENUM('user', 'admin'), defaultValue: 'user' },
  createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
});

export const Lesson = sequelize.define('Lesson', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: Sequelize.STRING, allowNull: false },
  description: { type: Sequelize.TEXT },
  createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
});

export const LessonContent = sequelize.define('LessonContent', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  lessonId: { type: Sequelize.INTEGER, allowNull: false },
  contentType: { type: Sequelize.STRING },
  content: { type: Sequelize.TEXT('long') },
  createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
});

export const Conversation = sequelize.define('Conversation', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  lessonId: { type: Sequelize.INTEGER, allowNull: false },
  title: { type: Sequelize.STRING },
  createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
});

export const ConversationLine = sequelize.define('ConversationLine', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  conversationId: { type: Sequelize.INTEGER, allowNull: false },
  speaker: { type: Sequelize.STRING },
  text: { type: Sequelize.TEXT },
  audioUrl: { type: Sequelize.STRING },
  createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
});

export const ConversationVideo = sequelize.define('ConversationVideo', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  conversationId: { type: Sequelize.INTEGER, allowNull: false },
  url: { type: Sequelize.STRING },
  label: { type: Sequelize.STRING },
  createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
});

export const UserProgress = sequelize.define('UserProgress', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: Sequelize.INTEGER, allowNull: false },
  lessonId: { type: Sequelize.INTEGER, allowNull: false },
  unlocked: { type: Sequelize.BOOLEAN, defaultValue: false },
  createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
});

export const UnderstandingFeedback = sequelize.define('UnderstandingFeedback', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: Sequelize.INTEGER, allowNull: false },
  lessonId: { type: Sequelize.INTEGER, allowNull: false },
  status: { type: Sequelize.ENUM('understood', 'not_understood') },
  createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
});

export const PracticeAttempt = sequelize.define('PracticeAttempt', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: Sequelize.INTEGER, allowNull: false },
  lessonId: { type: Sequelize.INTEGER, allowNull: false },
  lineId: { type: Sequelize.INTEGER, allowNull: false },
  transcribedText: { type: Sequelize.TEXT },
  accuracyScore: { type: Sequelize.FLOAT },
  fluencyScore: { type: Sequelize.FLOAT },
  createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
});

export const PracticeWord = sequelize.define('PracticeWord', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  attemptId: { type: Sequelize.INTEGER, allowNull: false },
  word: { type: Sequelize.STRING },
  status: { type: Sequelize.ENUM('correct', 'wrong', 'missing', 'extra', 'order_mismatch') },
  expected: { type: Sequelize.STRING },
  position: { type: Sequelize.INTEGER },
  createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
});

export const Submission = sequelize.define('Submission', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: Sequelize.INTEGER, allowNull: false },
  lessonId: { type: Sequelize.INTEGER, allowNull: false },
  transcribedText: { type: Sequelize.TEXT },
  accuracyScore: { type: Sequelize.FLOAT },
  fluencyScore: { type: Sequelize.FLOAT },
  createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
});

// Associations
Lesson.hasMany(LessonContent, { foreignKey: 'lessonId', as: 'contents' });
LessonContent.belongsTo(Lesson, { foreignKey: 'lessonId' });

Lesson.hasOne(Conversation, { foreignKey: 'lessonId' });
Conversation.belongsTo(Lesson, { foreignKey: 'lessonId' });

Conversation.hasMany(ConversationLine, { foreignKey: 'conversationId', as: 'lines' });
ConversationLine.belongsTo(Conversation, { foreignKey: 'conversationId' });

Conversation.hasMany(ConversationVideo, { foreignKey: 'conversationId' });
ConversationVideo.belongsTo(Conversation, { foreignKey: 'conversationId' });

User.hasMany(UserProgress, { foreignKey: 'userId' });
UserProgress.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(UnderstandingFeedback, { foreignKey: 'userId' });
UnderstandingFeedback.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(PracticeAttempt, { foreignKey: 'userId' });
PracticeAttempt.belongsTo(User, { foreignKey: 'userId' });

PracticeAttempt.hasMany(PracticeWord, { foreignKey: 'attemptId' });
PracticeWord.belongsTo(PracticeAttempt, { foreignKey: 'attemptId' });

User.hasMany(Submission, { foreignKey: 'userId' });
Submission.belongsTo(User, { foreignKey: 'userId' });

export async function initDb() {
  const connection = await mysql.createConnection({ host: DB_HOST, port: DB_PORT, user: DB_USER, password: DB_PASS });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``);
  await connection.end();

  await sequelize.authenticate();
  await sequelize.sync({alter: true});
}

export default sequelize;


