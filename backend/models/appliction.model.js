import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: String,
      require: true,
    },
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const Application = mongoose.model("Application", applicationSchema);