from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel, EmailStr
from motor.motor_asyncio import AsyncIOMotorClient
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from bson import ObjectId
import bcrypt  # ✅ Import bcrypt for password hashing
import os
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import jwt, JWTError
import datetime
from bson import ObjectId, errors

# ✅ FastAPI Instance
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
contacts_collection = db["contacts"]
admins_collection = db["admins"]  # ✅ Admin collection

# ✅ JWT Security
SECRET_KEY = os.getenv("SECRET_KEY", "miniproject")  # Use an environment variable in production
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_HOURS = 2

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/admin/login")


# ✅ Models
class Contact(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str


class AdminCreate(BaseModel):
    name: str
    email: EmailStr
    password: str


class AdminUpdate(BaseModel):
    name: str | None = None
    email: EmailStr | None = None
    new_password: str | None = None


class Token(BaseModel):
    access_token: str
    token_type: str


# ✅ Password Hashing
def hash_password(password: str) -> str:
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode("utf-8"), salt)
    return hashed_password.decode("utf-8")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode("utf-8"), hashed_password.encode("utf-8"))


# ✅ Generate JWT Token
def create_access_token(data: dict, expires_delta: datetime.timedelta | None = None):
    to_encode = data.copy()
    expire = datetime.datetime.utcnow() + (expires_delta or datetime.timedelta(hours=ACCESS_TOKEN_EXPIRE_HOURS))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


# ✅ Authenticate Admin and Protect Routes
async def get_current_admin(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        return {"email": email}
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")


# ✅ Submit Contact Form
@app.post("/submit")
async def submit_form(contact: Contact):
    contact_data = contact.dict()
    contact_data["is_solved"] = False  # ✅ Default status
    result = await contacts_collection.insert_one(contact_data)

    if not result.acknowledged:
        raise HTTPException(status_code=500, detail="Failed to insert data")

    return {"message": "Form submitted successfully!"}


# ✅ Fetch Unsolved Inquiries
@app.get("/inquiries", response_model=list[dict])
async def get_inquiries():
    inquiries_cursor = contacts_collection.find({"is_solved": False}).sort("_id", -1)
    inquiries = await inquiries_cursor.to_list(length=None)

    return JSONResponse(
        content=[{
            "id": str(inq["_id"]),
            "name": inq["name"],
            "email": inq["email"],
            "subject": inq["subject"],
            "message": inq["message"],
            "is_solved": inq.get("is_solved", False),
        } for inq in inquiries]
    )


# ✅ Mark Inquiry as Solved
@app.patch("/inquiries/{inquiry_id}/solve")
async def solve_inquiry(inquiry_id: str):
    result = await contacts_collection.update_one(
        {"_id": ObjectId(inquiry_id)},
        {"$set": {"is_solved": True}}
    )

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Inquiry not found")

    return {"message": "Inquiry marked as solved"}


# ✅ Add New Admin
@app.post("/admin/add")
async def add_admin(admin: AdminCreate):
    existing_admin = await admins_collection.find_one({"email": admin.email})
    if existing_admin:
        raise HTTPException(status_code=400, detail="Admin with this email already exists.")

    hashed_password = hash_password(admin.password)  # ✅ Hash password before storing

    new_admin = {
        "name": admin.name,
        "email": admin.email,
        "password": hashed_password,  # ✅ Store hashed password
    }

    result = await admins_collection.insert_one(new_admin)
    return {"message": "Admin added successfully", "admin_id": str(result.inserted_id)}


# ✅ Update Admin Details
@app.patch("/admin/update/{admin_id}")
async def update_admin(admin_id: str, admin_update: AdminUpdate):
    update_data = {}

    if admin_update.name:
        update_data["name"] = admin_update.name
    if admin_update.email:
        update_data["email"] = admin_update.email
    if admin_update.new_password:
        update_data["password"] = hash_password(admin_update.new_password)

    if not update_data:
        raise HTTPException(status_code=400, detail="No update data provided")

    result = await admins_collection.update_one({"_id": ObjectId(admin_id)}, {"$set": update_data})

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Admin not found")

    return {"message": "Admin updated successfully!"}


# ✅ Admin Login with JWT
@app.post("/admin/login", response_model=Token)
async def admin_login(form_data: OAuth2PasswordRequestForm = Depends()):
    admin = await admins_collection.find_one({"email": form_data.username})
    
    if not admin or not verify_password(form_data.password, admin["password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    # Generate JWT Token
    access_token = create_access_token(data={"sub": admin["email"]})
    
    return {"access_token": access_token, "token_type": "bearer"}


# ✅ Protected Admin Route Example
@app.get("/admin/dashboard")
async def admin_dashboard(admin: dict = Depends(get_current_admin)):
    return {"message": "Welcome, Admin!", "email": admin["email"]}



@app.put("/admin/update/{admin_id}")
async def update_admin(admin_id: str, update_data: dict):
    # Validate if admin_id is a valid ObjectId
    if not ObjectId.is_valid(admin_id):
        raise HTTPException(status_code=400, detail="Invalid admin ID format")

    # If valid, proceed with the update
    result = await admins_collection.update_one(
        {"_id": ObjectId(admin_id)}, {"$set": update_data}
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Admin not found or no changes made")

    return {"message": "Admin updated successfully"}
