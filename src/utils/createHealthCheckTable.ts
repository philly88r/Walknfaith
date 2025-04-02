import { supabase } from './supabaseClient';

/**
 * Creates a health_check table in the Supabase database
 * This table is used to verify database connectivity
 */
export const createHealthCheckTable = async (): Promise<{ success: boolean; message: string }> => {
  try {
    // SQL to create the health_check table
    const { error } = await supabase.rpc('create_health_check_table');
    
    if (error) {
      console.error('Error creating health_check table via RPC:', error);
      
      // If RPC fails, try direct SQL execution
      const createTableSQL = `
        CREATE TABLE IF NOT EXISTS public.health_check (
          id SERIAL PRIMARY KEY,
          status TEXT NOT NULL,
          timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          details JSONB
        );
        
        INSERT INTO public.health_check (status, details)
        VALUES ('active', '{"created_by": "system", "purpose": "connectivity_test"}');
      `;
      
      const { error: sqlError } = await supabase.rpc('exec_sql', { sql: createTableSQL });
      
      if (sqlError) {
        console.error('Error creating health_check table via SQL:', sqlError);
        return { 
          success: false, 
          message: `Failed to create health_check table: ${sqlError.message}` 
        };
      }
    }
    
    return { 
      success: true, 
      message: 'Health check table created successfully' 
    };
  } catch (error: any) {
    console.error('Exception creating health_check table:', error);
    return { 
      success: false, 
      message: `Exception creating health_check table: ${error.message}` 
    };
  }
};

/**
 * Checks if the health_check table exists and creates it if it doesn't
 */
export const ensureHealthCheckTable = async (): Promise<{ success: boolean; message: string }> => {
  try {
    // First check if the table exists
    const { data, error } = await supabase
      .from('health_check')
      .select('id, status')
      .limit(1);
    
    if (error) {
      // Table likely doesn't exist, create it
      return await createHealthCheckTable();
    }
    
    return { 
      success: true, 
      message: 'Health check table exists' 
    };
  } catch (error: any) {
    console.error('Error checking health_check table:', error);
    return { 
      success: false, 
      message: `Error checking health_check table: ${error.message}` 
    };
  }
};

export default ensureHealthCheckTable;
