import os

from dotenv import load_dotenv
from pymongo import MongoClient


load_dotenv("/app/backend/.env")

MONGO_URL = os.environ["MONGO_URL"].strip().strip('"')
DB_NAME = os.environ["DB_NAME"].strip().strip('"')

TEST_IDS = [
    "e50ed32a-4d73-4b94-899f-fa807622bf48",
    "2dc7b80f-d70c-4001-adfd-297373647d79",
    "d1cc784f-d339-408f-bb67-8b4808de7794",
    "ad4f71aa-0018-4506-863d-825f252a46a3",
    "31bd025e-821a-4405-9f90-24280cffc36c",
]

client = MongoClient(MONGO_URL)
result = client[DB_NAME].media.update_many({"id": {"$in": TEST_IDS}}, {"$set": {"is_deleted": True}})
print(f"soft_deleted={result.modified_count}")
client.close()
