import mongoose from "mongoose";
import * as z from "zod";

export const createJobSChema = z.object({
  company: z.string(),
  position: z.string(),
  description: z.string().max(500, "Description cannot exceed 500 characters"),
  status: z
    .enum(["Applied", "Interview", "Offer", "Rejected"])
    .default("Applied"),
//   connections: z.array(
//     z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
//       message: "invalid connection id ",
//     }),
//   ),

});


export const updateJobSchema = createJobSChema.partial()
export type CreateJobDTO = z.infer<typeof createJobSChema>;
export type UpdateJobDTO = z.infer<typeof updateJobSchema>;
