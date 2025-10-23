import { Request, Response } from "express";
import { toolsService } from "../services/toolsServices";

export const toolsController = {
  create: async (req: Request, res: Response) => {
    try {
      const tool = await toolsService.createTool(req.body);
      res.status(201).json(tool);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create tool" });
    }
  },

  getAll: async (_req: Request, res: Response) => {
    try {
      const tools = await toolsService.getAllTools();
      res.status(200).json(tools);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch tools" });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const toolId = req.params.id; // UUID is a string
      const tool = await toolsService.getToolById(toolId);
      if (!tool) return res.status(404).json({ error: "Tool not found" });
      res.status(200).json(tool);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch tool" });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const toolId = req.params.id;
      const updatedTool = await toolsService.updateTool(toolId, req.body);
      res.status(200).json(updatedTool);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update tool" });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const toolId = req.params.id;
      await toolsService.deleteTool(toolId);
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete tool" });
    }
  },
};
