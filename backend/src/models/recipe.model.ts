import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IRecipe extends Document {
  title: string;
  description: string;
  ingredients: string;
  instructions: string;
  cookingTime: number;
  createdAt: Date;
  updatedAt: Date;
  owner: Types.ObjectId;
}

const RecipeSchema: Schema<IRecipe> = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    ingredients: { type: String, required: true },
    instructions: { type: String, required: true },
    cookingTime: { type: Number, required: true },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const RecipeModel: Model<IRecipe> =
  mongoose.models.Recipe || mongoose.model<IRecipe>("Recipe", RecipeSchema);
