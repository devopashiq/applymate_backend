
import * as z from "zod";

export const createJobSchema = z.object({
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


export const updateJobSchema = createJobSchema.partial()

