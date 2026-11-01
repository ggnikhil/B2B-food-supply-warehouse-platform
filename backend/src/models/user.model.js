import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: [true, "User Id must required"],
        unique: true,
    },
    name: {
        type: String,
        required: [true, "User Name must required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email Id must required"],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        select: false,
        required: [true, "Password must required"]
    },
    contactNumber: {
        type: String,
        required: [true, "Contact Number must required"],
        unique: true,
        trim: true
    },
    role: {
        type: String,
        enum: ["MANAGER", "SUPERVISOR", "WORKER"],
        required: [true, "Role must required"],
    },
    department: {
        type: String,
        enum: ["PICKER", "CHECKER", "LOADER", "DISPATCHER"],
        required: [function () { return this.role === "WORKER"; }, "Department must required"]
    },
    warehouseCode: {
        type: String,
        default: "WH-MUM3",
        trim: true
    },
    shiftHour: {
        type: String,
        enum: ["9hr", "12hr", "Depends"],
        default: "9hr",
        required: [true, "Shift hour must required"]
    },
    profilePhoto: {
        type: String,
        default: "https://ik.imagekit.io/nikhil29/download.jpg?updatedAt=1770782693099",
    },
    joiningDate: {
        type: Date,
        default: Date.now
    },
    status: {
        isActive: { type: Boolean, default: true },
        isEmailVerified: { type: Boolean, default: false },
        isBackgroundVerified: { type: Boolean, default: false },
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
},{timestamps:true}
);


userSchema.pre("save" , async function() {
    if(!this.isModified("password")) return;

    this.password = await bcryptjs.hash(this.password,10);
})

userSchema.methods.comparePassword = async function(givenPassword) {
    return bcryptjs.compare(givenPassword,this.password)
}

export const userModel = mongoose.model("User", userSchema)