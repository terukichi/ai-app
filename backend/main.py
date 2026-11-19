# -*- coding: utf-8 -*-

import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import torch

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = torch.load('model.pth')

@app.get("/api/text")
def text():
    return {"text": "実行結果"}
