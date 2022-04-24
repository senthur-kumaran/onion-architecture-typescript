import { Services } from "./routes";
import { goalService } from "./service/goalService";

export const bootstrapServices = (): Services => {
  return {
    goalService: goalService(),
  }
};
