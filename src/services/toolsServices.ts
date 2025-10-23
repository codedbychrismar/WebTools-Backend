import { db } from "../db";
import { tools, NewTool } from "../db/schema/tools";
import { eq } from "drizzle-orm";

export const toolsService = {
  createTool: async (toolData: NewTool) => {
    const [result] = await db.insert(tools).values(toolData).returning();
    return result;
  },

  getAllTools: async () => {
    return await db.select().from(tools);
  },

  getToolById: async (toolId: string) => {
    const [tool] = await db.select().from(tools).where(eq(tools.tool_id, toolId));
    return tool;
  },

  updateTool: async (toolId: string, toolData: Partial<NewTool>) => {
    const [result] = await db
      .update(tools)
      .set(toolData)
      .where(eq(tools.tool_id, toolId))
      .returning();
    return result;
  },

  deleteTool: async (toolId: string) => {
    await db.delete(tools).where(eq(tools.tool_id, toolId));
  },
};
