import { db } from "../db/index";
import { tools, NewTool } from "../db/schema/tools";
import { eq, sql } from "drizzle-orm";

export const toolsService = {
  // 🧩 CREATE
  createTool: async (toolData: NewTool) => {
    const result = await db.insert(tools).values(toolData).returning();
    return result[0];
  },

  // 🧰 GET ALL
  getAllTools: async () => {
    return await db.select().from(tools);
  },

  // 🔍 GET BY ID
  getToolById: async (toolId: string) => {
    const result = await db
      .select()
      .from(tools)
      .where(eq(tools.tool_id, toolId))
      .limit(1);
    return result[0];
  },

  // 🔧 UPDATE
  updateTool: async (toolId: string, toolData: Partial<NewTool>) => {
    const result = await db
      .update(tools)
      .set(toolData)
      .where(eq(tools.tool_id, toolId))
      .returning();

    return result.length > 0 ? result[0] : null;
  },

  // 🗑️ DELETE
  deleteTool: async (toolId: string): Promise<boolean> => {
    const result = await db
      .delete(tools)
      .where(eq(tools.tool_id, toolId))
      .returning();

    return result.length > 0;
  },

  // 🧭 GET ALL CATEGORIES
  getAllCategories: async () => {
    const result = await db.execute(
      sql`SELECT DISTINCT category FROM tools ORDER BY category ASC`
    );
    return result.rows.map((row: any) => row.category);
  },
};
