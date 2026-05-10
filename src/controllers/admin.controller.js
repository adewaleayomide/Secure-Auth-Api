import { findAll, findInfo } from "../services/auth.service.js";


export const adminGetAllUsers = async (req, res) => {
  try {
    const users = await findAll();

    if (!users ) {
      return res.status(404).json({ message: 'No users found' }); 
    }
    
    res.json({ message: 'Get all users', ...users });
  } catch(err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to Get Users' });
  }
}

export const adminValidate = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  next();
};

export const adminGetUserByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await findInfo({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ success: true, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to Get User' });
  }
}
