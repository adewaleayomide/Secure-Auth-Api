
import bcrypt from "bcrypt";
import { createUser, findInfo } from "../services/auth.service.js";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";


export const register = async (req, res) => {
  try{
    const { name, username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const isAdmin = email === env.SUPER_ADMIN_EMAIL; 
    
    const newUser = await createUser({ 
      name, 
      username, 
      email, 
      password: hashedPassword,
      role: isAdmin ? 'admin' : 'user'  // add this
    });

    res.removeHeader("x-powered-by");
    res.status(201).json({
      success: true,
      user: newUser
    })
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Registration Failed', error: err.message });
  }
};
// separate controllers(http - res/req) from services (db logic)
export const login = async (req, res) => {
    res.removeHeader("x-powered-by");
    try {
        const { email, password } = req.body;
        const user = await findInfo({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
          { id: user._id, role: user.role },
          env.JWT_SECRET,
          { expiresIn: env.JWT_EXPIRES_IN }
        );

        res.cookie('token', token, { httpOnly: true, secure: false, sameSite: 'lax' }); // Dev secure: false, Prod secure: true
        return res.status(200).json({ message: 'Login successful', user });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Login Failed', error: err.message });
    }
};

