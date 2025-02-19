from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from motor.motor_asyncio import AsyncIOMotorClient
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from bson import ObjectId

app = FastAPI()

# ✅ CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Change in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ MongoDB Connection
MONGO_URI = "mongodb://127.0.0.1:27017/"
DB_NAME = "ESWEBSITE"
client = AsyncIOMotorClient(MONGO_URI)
db = client[DB_NAME]
collection = db["contacts"]

# ✅ Data Model
class Contact(BaseModel):
    name: str
    email: str
    subject: str
    message: str

# ✅ Submit Form (POST /submit)
@app.post("/submit")
async def submit_form(contact: Contact):
    contact_data = contact.dict()
    contact_data["is_solved"] = False  # ✅ Default to "not solved"
    result = await collection.insert_one(contact_data)
    
    if not result.acknowledged:
        raise HTTPException(status_code=500, detail="Failed to insert data")
    
    return {"message": "Form submitted successfully!"}

# ✅ Fetch All Inquiries (Only Unsolved)
@app.get("/inquiries", response_model=list[dict])
async def get_inquiries():
    inquiries_cursor = collection.find({"is_solved": False}).sort("_id", -1)
    inquiries = await inquiries_cursor.to_list(length=None)

    formatted_inquiries = [
        {
            "id": str(inq["_id"]),
            "name": inq["name"],
            "email": inq["email"],
            "subject": inq["subject"],
            "message": inq["message"],
            "is_solved": inq.get("is_solved", False)
        }
        for inq in inquiries
    ]

    return JSONResponse(content=formatted_inquiries)

# ✅ Mark Inquiry as Solved
@app.patch("/inquiries/{inquiry_id}/solve")
async def solve_inquiry(inquiry_id: str):
    result = await collection.update_one(
        {"_id": ObjectId(inquiry_id)},
        {"$set": {"is_solved": True}}
    )

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Inquiry not found")

    return {"message": "Inquiry marked as solved"}
