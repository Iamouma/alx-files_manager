import mongodb from 'mongodb';
import envLoader from './env_loader';

/**
 * represents a MongoDB client
 */
class DBClient {
  /**
   * creates a new DBClient instance
   */
  constructor() {
    envLoader();
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const dbURL = `mongodb://${host}:${port}/${database}`;

    this.client = new mongodb.MongoClient(dbURL, { useUnifiedTopology: true });
    this.client.connect();
  }

  /**
   * Checks if this clients connection to the MongoDB server is Active
   * @returns {boolean}
   */
  isAlive() {
    return this.client.isConnected();
  }

  /**
   * retrieves the number of the files in the database
   * @returns {Promise<Number>}
   */
  async nbUsers() {
    return this.client.db().collection('users').countDocuments();
  }

  /**
   * retrieves the number of files in the database
   * @returns {Promise<Number>}
   */

  async nbFiles() {
    return this.client.db().collection('files').countDocuments();
  }

  /**
   * retrieves a reference to the 'users' collection
   */

  async usersCollection() {
    return this.client.db().collection('users');
  }

  /**
   * retrieves a reference to the 'files' collection
   * @returns {Promise<Collection>}
   */
  async filesCollection() {
    return this.client.db().collection('files');
  }
}

export const dbClient = new DBClient();
export default dbClient;
