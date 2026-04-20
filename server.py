from fastapi import FastAPI
from sqlmodel import SQLModel, Field, create_engine, Session, select
from typing import Optional
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse


app = FastAPI()


app.mount("/static", StaticFiles(directory="static"), name="static")


@app.get("/")
def read_index():
    return FileResponse("index.html")


engine = create_engine("sqlite:///database.db")

class Exercise(SQLModel, table=True):
    id: Optional[int] = Field(default= None, primary_key=True)
    name: str

def create_db():
    SQLModel.metadata.create_all(engine)

@app.on_event('startup')
def on_startup():
    create_db()

@app.get('/exercises')
def get_exerc():
    with Session(engine) as session:
        get_exerc = select(Exercise)
        result_get_exerc = session.exec(get_exerc)
        return result_get_exerc.all()

@app.post('/exercises')
def post_exerc(exerc: Exercise):
    with Session(engine) as session1:
        session1.add(exerc)
        session1.commit()
        return exerc