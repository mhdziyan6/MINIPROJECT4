import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
DB_NAME = os.getenv("DB_NAME", "ESWEBSITE")

print(f"Connecting to {MONGODB_URL}...")

try:
    client = AsyncIOMotorClient(MONGODB_URL)
    database = client[DB_NAME]
    print("✅ Connected successfully!")
except Exception as e:
    print(f"❌ Connection failed: {e}")
