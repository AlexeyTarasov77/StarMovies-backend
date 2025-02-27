import { Request, Response } from "express";
import { sign } from 'jsonwebtoken'
import { UserService } from './services'
import { validateRequest } from "../core/validation";
// import { registrationSchema, loginSchema } from "../users/schemas";

export function login(req: Request, res: Response){
  res.render('login')
}

export function registration(req: Request, res: Response){
  res.render('registration')
}

export async function registrationUser(req: Request, res: Response) {
  try {
    const data = req.body;
    const existingUser = await UserService.registrationUser(data)
    if (existingUser) return res.status(400).json({ message: "Email already used" });

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

export async function loginUser(req: Request, res: Response) {
  try {
    const data = req.body
    const user = await UserService.loginUser(data.email, data.password)
    
    res.status(200).json({ message: "The user has successfully logged in" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}