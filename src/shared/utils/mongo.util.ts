import mongoose, { Connection } from 'mongoose';
import { Console } from '@/shared/utils/console.util';

export class Mongo {
	private static mainDbConnection: Connection;
	private static utilityDbConnection: Connection;

	/**
	 * Connect to cloud_db for User model
	 *
	 * @param dbDsn
	 * @param dbName
	 */
	public static async connectMainDb(dbDsn: string, dbName: string) {
		try {
			Mongo.mainDbConnection = mongoose.createConnection(dbDsn, {
				dbName,
			});
			Console.log(
				'MongoDB',
				`Successfully connected to cloud_db (${dbName})`,
			);
		} catch (error) {
			Console.error('MongoDB', error);
			process.exit(1);
		}
	}

	/**
	 * Connect to utility_db for SystemLog model
	 *
	 * @param dbDsn
	 * @param dbName
	 */
	public static async connectUtilityDb(dbDsn: string, dbName: string) {
		try {
			Mongo.utilityDbConnection = mongoose.createConnection(dbDsn, {
				dbName,
			});
			Console.log(
				'MongoDB',
				`Successfully connected to utility_db (${dbName})`,
			);
		} catch (error) {
			Console.error('MongoDB', error);
			process.exit(1);
		}
	}

	/**
	 * Disconnect all connections
	 */
	public static async disconnectAll() {
		await Promise.all([
			Mongo.mainDbConnection?.close(),
			Mongo.utilityDbConnection?.close(),
		]);
		Console.log('MongoDB', 'All connections disconnected.');
	}

	/**
	 * Get the cloud_db connection instance
	 */
	public static getMainDbConnection(): Connection {
		return Mongo.mainDbConnection;
	}

	/**
	 * Get the utility_db connection instance
	 */
	public static getUtilityDbConnection(): Connection {
		return Mongo.utilityDbConnection;
	}
}
