import { Request, Response } from "express";
import { toolsService } from "../services/toolsServices";

export const toolsController = {
  // 🧩 CREATE
  create: async (req: Request, res: Response) => {
    try {
      const { name, description, icon, category, url } = req.body;

      if (!name || !description || !icon || !category || !url) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields (name, description, icon, category, url).",
        });
      }

      const tool = await toolsService.createTool(req.body);
      res.status(201).json({
        success: true,
        message: "Tool created successfully.",
        data: tool,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Failed to create tool." });
    }
  },

  // 🧰 GET ALL
  getAll: async (_req: Request, res: Response) => {
    try {
      const tools = await toolsService.getAllTools();
      res.status(200).json({
        success: true,
        message: tools.length > 0 ? "Tools fetched successfully." : "No tools found.",
        data: tools,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Failed to fetch tools." });
    }
  },

  // 🔍 GET BY ID
  getById: async (req: Request, res: Response) => {
    try {
      const toolId = req.params.id;
      const tool = await toolsService.getToolById(toolId);

      if (!tool) {
        return res.status(404).json({ success: false, message: "Tool not found." });
      }

      res.status(200).json({
        success: true,
        message: "Tool fetched successfully.",
        data: tool,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Failed to fetch tool." });
    }
  },

  // 🔧 UPDATE
  update: async (req: Request, res: Response) => {
    try {
      const toolId = req.params.id;
      const updatedTool = await toolsService.updateTool(toolId, req.body);

      if (!updatedTool) {
        return res.status(404).json({
          success: false,
          message: "Tool not found or not updated.",
        });
      }

      res.status(200).json({
        success: true,
        message: "Tool updated successfully.",
        data: updatedTool,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Failed to update tool." });
    }
  },

  // 🗑️ DELETE
  delete: async (req: Request, res: Response) => {
    try {
      const toolId = req.params.id;
      const deleted = await toolsService.deleteTool(toolId);

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: "Tool not found or already deleted.",
        });
      }

      res.status(200).json({
        success: true,
        message: "Tool deleted successfully.",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Failed to delete tool." });
    }
  },

  // 🧭 GET ALL CATEGORIES
  getCategories: async (_req: Request, res: Response) => {
    try {
      const categories = await toolsService.getAllCategories();
      res.status(200).json({
        success: true,
        message: "Categories fetched successfully.",
        data: categories,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Failed to fetch categories." });
    }
  },
};
