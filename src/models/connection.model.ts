import mongoose, { InferSchemaType } from "mongoose";

const contactMethodSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["linkedin", "email", "phone", "github", "twitter"],

      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

const connectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    contactMethods: {
      type: [contactMethodSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

export type ConnectionDocument =
  InferSchemaType<typeof connectionSchema>;

const ConnectionModel =
  mongoose.model<ConnectionDocument>(
    "Connection",
    connectionSchema
  );

export default ConnectionModel;