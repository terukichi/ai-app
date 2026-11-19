# -*- coding: utf-8 -*-

import io
import os

import torch
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from NeuralNetwork import NeuralNetwork
from PIL import Image
from torch import nn
from torch.nn import functional as F
from torchvision import transforms
from torchvision.datasets import CIFAR10

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

dataset = CIFAR10(root="./data", train=True, download=True)

classes = dataset.classes

device = (
    torch.accelerator.current_accelerator().type
    if torch.accelerator.is_available()
    else "cpu"
)
model = NeuralNetwork().to(device)

if os.path.exists("model.pth"):
    model.load_state_dict(torch.load("model.pth", weights_only=True))

model.eval()

transform = transforms.Compose(
    [
        transforms.Resize((32, 32)),
        transforms.ToTensor(),
    ]
)


@app.post("/api/text")
async def text(file: UploadFile = File(...)):
    # img = Image.open("../frontend/src/assets/hero.png").convert("RGB")
    img_file = await file.read()
    # print(file.filename)
    img = Image.open(io.BytesIO(img_file)).convert("RGB")
    input_tensor = transform(img).unsqueeze(0)
    input_tensor = input_tensor.to(device)
    with torch.no_grad():
        output_txt = model(input_tensor)
    probabilities = torch.nn.functional.softmax(output_txt, dim=1)
    top_prob, top_catid = torch.max(probabilities, dim=1)
    result = classes[top_catid.item()]
    percentage = top_prob.item() * 100
    formatted_per = f"{percentage:.3f}"
    print(f"{result}\n{formatted_per}%")
    return {"text": result, "per": formatted_per}
