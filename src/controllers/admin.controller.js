
export const adminGetAllUsers = (req, res) => {
    res.json({ message: 'Get all users' });
}

export const adminGetUserById = (req, res) => {
    const { id } = req.params;
    res.json({ message: `Get user with ID: ${id}` });
}