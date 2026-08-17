import { Router } from "express";
import { chat } from './../controller.js';

export const route = Router()

route.post("/chat", chat)