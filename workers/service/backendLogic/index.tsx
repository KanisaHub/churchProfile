import type { DrizzleD1Database } from 'drizzle-orm/d1';
import { drizzle } from 'drizzle-orm/d1';
import ChurchService from './church';
import DistrictService from './district';

/**
 * Service Container that aggregates all individual services
 * Provides centralized access to all business logic services
 */
export default class ServiceContainer {
  public district: DistrictService;
  public church: ChurchService;
  private db: DrizzleD1Database;

  constructor(database: D1Database) {
    // Initialize all services with the database connection
    this.db = initializeDb(database);
    this.district = new DistrictService(this.db);
    this.church = new ChurchService(this.db);
  }

  /**
   * Get all available services
   * Useful for debugging or service discovery
   */
  getServices() {
    return {
      district: this.district,
      church: this.church,
    };
  }

  /**
   * Health check for all services
   * Can be extended to check database connectivity, etc.
   */
  async healthCheck(): Promise<{
    status: 'healthy' | 'unhealthy';
    services: Record<string, boolean>;
  }> {
    const services = {
      district: true, // In a real scenario, you might want to check DB connectivity or other factors
      church: true, // In a real scenario, you might want to check DB connectivity or other factors
    };

    // Check if all services are available
    const allHealthy = Object.values(services).every(Boolean);

    return {
      status: allHealthy ? 'healthy' : 'unhealthy',
      services,
    };
  }
}
function initializeDb(
  database: D1Database
): DrizzleD1Database<Record<string, never>> {
  return drizzle(database);
}
