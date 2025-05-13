import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface MessageEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editMessageInput: string;
  onEditMessageChange: (value: string) => void;
  onConfirmEdit: () => void;
}

export function MessageEditDialog({
  open,
  onOpenChange,
  editMessageInput,
  onEditMessageChange,
  onConfirmEdit,
}: MessageEditDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[90vw] max-h-[200px] sm:w-[400px] p-4 sm:p-6 gap-4">
        <DialogHeader>
          <DialogTitle>Edit Message</DialogTitle>
        </DialogHeader>
        <div>
          <Input
            value={editMessageInput}
            onChange={(e) => onEditMessageChange(e.target.value)}
            autoFocus
            className="min-h-0"
          />
        </div>
        <DialogFooter className="sm:justify-end">
          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 sm:flex-initial"
            >
              Cancel
            </Button>
            <Button
              onClick={onConfirmEdit}
              disabled={!editMessageInput.trim()}
              className="flex-1 sm:flex-initial"
            >
              Save
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
