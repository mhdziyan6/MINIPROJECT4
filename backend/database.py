import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://127.0.0.1:27017")
DB_NAME = os.getenv("DB_NAME", "ESWEBSITE")

# Ensure variables are set correctly
if not MONGODB_URL:
    raise ValueError("❌ MONGODB_URL is not set!")
if not DB_NAME:
    raise ValueError("❌ DB_NAME is not set!")

# Create MongoDB client
client = AsyncIOMotorClient(MONGODB_URL)
database = client[DB_NAME]

# Debugging
print(f"✅ Connected to MongoDB at {MONGODB_URL}, Database: {DB_NAME}")
