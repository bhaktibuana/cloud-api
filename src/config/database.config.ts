import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

export class DatabaseConfig {
	public readonly MAIN_DB_DSN = process.env.MAIN_DB_DSN || '';
	public readonly MAIN_DB_NAME = process.env.MAIN_DB_NAME || '';
	public readonly UTILITY_DB_DSN = process.env.UTILITY_DB_DSN || '';
	public readonly UTILITY_DB_NAME = process.env.UTILITY_DB_NAME || '';
}
