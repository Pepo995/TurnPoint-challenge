#!/bin/bash

# Function to check if SQL Server is up
wait_for_sql_server() {
  echo "Waiting for SQL Server to start..."
  until /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P YourStrong!Passw0rd123 -Q "SELECT 1;" > /dev/null 2>&1; do
    sleep 5
  done
  echo "SQL Server is up - executing script."
}

# Function to execute SQL commands
execute_sql_commands() {
  echo "Executing SQL commands..."
  /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P YourStrong!Passw0rd123 -Q "
    IF EXISTS (SELECT * FROM sys.databases WHERE name = 'turnPointdb')
    BEGIN
      DROP DATABASE turnPointdb;
    END
    CREATE DATABASE turnPointdb;
  "
  echo "SQL commands executed."
}

# Main script execution
wait_for_sql_server
execute_sql_commands

# Keep the container running
tail -f /dev/null