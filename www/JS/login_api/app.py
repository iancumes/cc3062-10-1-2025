from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sqlite3
import bcrypt
import os


DATABASE = "./data/users.db"

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class User(BaseModel):
    username: str
    password: str


def get_db():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row

    return conn


@app.on_event("startup")
def startup():
    os.makedirs("data", exist_ok=True)

    conn = get_db()

    cursor = conn.cursor()
    cursor.execute(
        """
        create table if not exists users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        )
    """
    )

    conn.commit()
    conn.close()


@app.get("/ping")
def ping():
    return {"message": "pong"}


@app.post("/register")
def register(usr: User):
    conn = get_db()
    cursor = conn.cursor()

    hashed = bcrypt.hashpw(usr.password.encode("utf-8"), bcrypt.gensalt()).decode(
        "utf-8"
    )

    try:
        cursor.execute(
            "insert into users (username, password) values (?, ?)",
            (usr.username, hashed),
        )
        conn.commit()
    except sqlite3.IntegrityError:
        conn.close()
        raise HTTPException(
            status_code=409,
            detail="No fué posible registrarte, intentalo más tarde o con otra cuenta.",
        )

    conn.close()

    return {"message": "Usuario registrado exitosamente"}


@app.post("/login")
def login(usr: User):
    conn = get_db()
    cursor = conn.cursor()

    cursor.execute("SELECT password FROM users WHERE username = ?", (usr.username,))

    row = cursor.fetchone()

    conn.close()

    if row is None:
        raise HTTPException(status_code=401, detail="Usuario incorrecto")

    stored_pasword = row["password"]

    if not bcrypt.checkpw(usr.password.encode("utf-8"), stored_pasword.encode("utf-8")):
        raise HTTPException(status_code=401, detail="Usuario incorrecto")

    return {"success": True, "message": "Usuario autenticado exitosamente"}
