import os
import pandas as pd
from pymongo import MongoClient
from dotenv import load_dotenv

# Load environment variables from .env file


# Fetch MongoDB URI from environment variables
mongo_uri = "mongodb+srv://surya:Ntsn03062005@journaling.blduj.mongodb.net/CSEA-Event-Registration?retryWrites=true&w=majority&appName=Journaling"
if not mongo_uri:
    raise ValueError("MongoDB URI is undefined. Check your .env file and MONGO_URI variable.")

# Connect to MongoDB
client = MongoClient(mongo_uri)
db = client.get_database()  # Connect to the specified database

# Specify the collection name
collection_name = 'coderushes'  # Update with your collection name
collection = db[collection_name]

def export_to_csv():
    try:
        # Fetch all documents from the collection
        data = list(collection.find())
        
        # Convert MongoDB documents to a DataFrame
        df = pd.DataFrame(data)
        
        # Drop the MongoDB ObjectId if it's not needed
        if '_id' in df.columns:
            df = df.drop(columns=['_id'])
        
        # Save the DataFrame to a CSV file
        csv_file = 'coderush_data.csv'
        df.to_csv(csv_file, index=False)
        print(f"Data exported to {csv_file} successfully.")
    except Exception as e:
        print("Error exporting data:", e)
    finally:
        client.close()  # Ensure MongoDB connection is closed

# Run the export function
export_to_csv()
