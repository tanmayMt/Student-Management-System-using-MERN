const Admin = require("../model/Admin");
const bcrypt =require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const {email, password } = req.body;
    const existingUser = await Admin.findOne({email});
    if(existingUser)
    {
      return res.status(400).send({
        success:false,
        message:"Email already registered❌"
      });
    }

    //Let's Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword =  await bcrypt.hash(password,salt);

    const Newuser = new Admin({email, password:hashedPassword});
    await Newuser.save();

    res.status(200).send({
        success: true,
        data: Newuser,
        message: "User registered successfully✅"
    });        
  } 
  catch (error)
  {
    console.log(error);
    res.status(500).send({
        success: false,
        message: "Server Errro in Registeration!❌",
        error
    })
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin || !bcrypt.compareSync(password, admin.password)) {
    return res.status(401).json({ msg: "Invalid credentials" });
  }

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
  console.log({token})
  res.json({ token });
  
};
